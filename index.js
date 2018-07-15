const util = require('util')
const AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN
const Dropbox = require('dropbox').Dropbox

const { groupBy, serialPromise } = require('./utils')

function DropboxDOWN(_name, overrideOpts) {
  if (!(this instanceof DropboxDOWN)) return new DropboxDOWN(_name, overrideOpts)

  AbstractLevelDOWN.call(this, '')

  if (overrideOpts) {
    this.configure(overrideOpts)
  }
}

util.inherits(DropboxDOWN, AbstractLevelDOWN)

DropboxDOWN.prototype._open = function(options, cb) {
  if (options.accessToken) {
    this.configure(options)
  }
  setTimeout(cb)
}

DropboxDOWN.prototype._put = function(key, value, _options, cb) {
  this.upload(key, value)
    .then(() => cb())
    .catch(handleError(cb))
}

DropboxDOWN.prototype._get = function(key, options, cb) {
  this.download(key)
    .then(readFile(options.asBuffer, result => cb(null, result)))
    .catch(handleError(cb))
}

DropboxDOWN.prototype._del = function(key, _options, cb) {
  this.delete(key)
    .then(() => cb())
    .catch(() => cb())
}

DropboxDOWN.prototype._batch = function(array, _options, cb) {
  if (array.length === 0) {
    return setTimeout(cb)
  }

  const putOrDel = one =>
    one.type === 'del'
      ? this.delete(one.key).catch(() => cb())
      : this.upload(one.key, one.value).catch(handleError(cb))

  // Make sure operations for the same id are handled serially and in order,
  // run everything else in parallel.
  const groups = groupBy(array, '_id')
  Promise.all(Object.values(groups).map(docs => serialPromise(docs, putOrDel))).then(() => cb())
}

DropboxDOWN.prototype.download = function(key) {
  return this.dbx.filesDownload({ path: this.path(key) })
}

DropboxDOWN.prototype.upload = function(key, value) {
  return this.dbx.filesUpload({
    contents: value,
    path: this.path(key),
    mode: { '.tag': 'overwrite' },
    mute: true,
  })
}

DropboxDOWN.prototype.delete = function(key) {
  return this.dbx.filesDeleteV2({ path: this.path(key) })
}

DropboxDOWN.prototype.path = function(key) {
  return '/' + this.root + '/' + key + '.json'
}

DropboxDOWN.prototype.configure = function(opts) {
  this.root = opts.root || '/'
  this.dbx = new Dropbox({ accessToken: opts.accessToken })
}

module.exports = DropboxDOWN

function readFile(asBuffer, cb) {
  return file => {
    if (file.fileBinary) {
      cb(asBuffer !== false ? file.fileBinary : file.fileBinary.toString())
    } else if (file.fileBlob) {
      const readAs = asBuffer !== false ? 'readAsArrayBuffer' : 'readAsText'
      const reader = new FileReader()
      reader.onloadend = () => cb(reader.result)
      reader[readAs](file.fileBlob)
    } else {
      cb(new Error('Unknown file type'))
    }
  }
}

function handleError(cb) {
  return err => {
    let msg = 'Unknown Error'
    if (
      (err.response && err.response.statusText && err.response.statusText.match(/not_found/)) ||
      (err.error && err.error.error_status && err.error.error_status.match(/not_found/))
    ) {
      msg = 'NotFound'
    }
    cb(new Error(msg))
  }
}

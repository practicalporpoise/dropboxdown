const test = require('tape')
const testCommon = require('abstract-leveldown/testCommon')
const DropboxDOWN = require('./index')

/**
 * You need a dropbox access token to run these tests
 *
 * Create a .env file or prefix `npm run test` with
 * ```
 * DROPBOX_ACCESS_TOKEN=<your token>
 * DROPBOX_ROOT_FOLDER=<root folder>
 * ```
 */

/** compatibility with basic LevelDOWN API **/

// Skip this test because Dropboxdown doesn't have a location or constructor options
// require('abstract-leveldown/abstract/leveldown-test').args(DropboxDOWN, test)

const opts = {
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  root: process.env.DROPBOX_ROOT_FOLDER,
}

function factory() {
  return new DropboxDOWN('', opts)
}

require('abstract-leveldown/abstract/open-test').args(factory, test, testCommon)
require('abstract-leveldown/abstract/open-test').open(factory, test, testCommon)
require('abstract-leveldown/abstract/put-test').all(factory, test)
require('abstract-leveldown/abstract/get-test').all(factory, test)
require('abstract-leveldown/abstract/del-test').all(factory, test)
require('abstract-leveldown/abstract/put-get-del-test').all(factory, test)
require('abstract-leveldown/abstract/close-test').close(factory, test)
require('abstract-leveldown/abstract/batch-test').all(factory, test)
// TODO
// require('abstract-leveldown/abstract/chained-batch-test').all(factory, test)
// require('abstract-leveldown/abstract/iterator-test').all(factory, test)
// require('abstract-leveldown/abstract/iterator-range-test').all(factory, test)

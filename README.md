# DropboxDOWN

> An [`abstract-leveldown`](https://github.com/Level/abstract-leveldown) compliant Dropbox implementation of [levelDOWN](https://github.com/rvagg/node-leveldown).

[![level badge][level-badge]][awesome]

## Extremely experimental, use at your own risk.

## Usage with LevelUP

### Install

`npm install levelup dropboxdown`

### Use

```js
var levelup = require('levelup')
var db = levelup('mydb', {
  db: require('dropboxdown'),
  root: '<root folder>',
  accessToken: '<dropbox access token>',
})

db.put('foo', 'bar')
```

## Usage with PouchDB in browser

### Install

`npm install pouchdb-browser pouchdb-adapter-dropboxdown dropboxdown`

### Use

```js
var PouchDB = require('pouchdb-browser')
PouchDB.plugin(require('pouchdb-adapter-dropboxdown'))
var db = new PouchDB('mydb', {
  adapter: 'dropboxdown',
  root: '<root folder>',
  accessToken: '<dropbox access token>',
})

db.put('foo', 'bar')
```

## TODO

- Iterator
- Chained Batch

## License

[MIT](./LICENSE) © 2018-present [Practical Porpoise](https://github.com/maxogden).

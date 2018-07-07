# DropboxDOWN

> An [`abstract-leveldown`](https://github.com/Level/abstract-leveldown) compliant Dropbox implementation of [levelDOWN](https://github.com/rvagg/node-leveldown).

[![level badge][level-badge]][awesome]

## Extremely experimental, use at your own risk.

## Usage with LevelUP
```js
var levelup = require('levelup');
var db = levelup('mydb', {
  db: require('dropboxdown'),
  root: '<root folder>',
  accessToken: '<dropbox access token>'
});

db.put('foo', 'bar');
```

## Usage with PouchDB
```js
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-leveldb'));
var db = new PouchDB('mydb', {
  adapter: 'leveldb',
  db: require('dropboxdown'),
  root: '<root folder>',
  accessToken: '<dropbox access token>'
});

db.put('foo', 'bar');
```

## TODO

- Iterator
- Chained Batch

## License

[MIT](./LICENSE) © 2018-present [Practical Porpoise](https://github.com/maxogden).

function groupBy(ary, key) {
  return ary.reduce((acc, value) => {
    acc[value[key]] = (acc[value[key]] || []).concat(value)
    return acc
  }, {})
}

function serialPromise(array, fn) {
  return array.reduce((promise, item) => promise.then(() => fn(item)), Promise.resolve())
}

module.exports = { groupBy, serialPromise }

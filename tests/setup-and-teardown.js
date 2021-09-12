const path = require("path")
const exec = require("child_process").exec
const makeKey = require("./make-key.js")
const root = path.resolve("temp/" + makeKey(8))
let files, dirs

Array.prototype.random = function () {
  const self = this
  return self[parseInt(Math.random() * self.length)]
}

Object.defineProperty(Array.prototype, "last", {
  configurable: false,
  enumerable: true,

  get() {
    const self = this
    return self[self.length - 1]
  },
})

beforeAll(() => {
  files = []
  dirs = [root]

  for (let i = 0; i < 100; i++) {
    const name = makeKey(8)
    const dir = dirs.random()

    if (Math.random() < 0.5) {
      const newFile = path.resolve(dir + "/" + name)
      files.push(newFile)
      exec(`echo ${Math.random().toString()} >> ${newFile}`)
    } else {
      const newDir = path.resolve(dir + "/" + name)
      dirs.push(newDir)
      exec(`mkdir -p ${newDir}`)
    }
  }
})

afterAll(() => {
  exec(`rm -rf ${root}`)
})

module.exports = {
  get root() {
    return root
  },

  get files() {
    return files
  },

  get dirs() {
    return dirs
  },
}

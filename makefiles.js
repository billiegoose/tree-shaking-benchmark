const fs = require('fs-extra')
const path = require('path')

// Switch this out for 'tweaked-index.js' to experiment with things 
const file = 'node_modules/isomorphic-git/dist/for-future/isomorphic-git/index.js'

const _exports = [
  "E",
  "STAGE",
  "TREE",
  "WORKDIR",
  "add",
  "addRemote",
  "branch",
  "checkout",
  "clone",
  "commit",
  "config",
  "cores",
  "currentBranch",
  "deleteBranch",
  "deleteRemote",
  "expandOid",
  "expandRef",
  "fetch",
  "findMergeBase",
  "findRoot",
  "getRemoteInfo",
  "indexPack",
  "init",
  "isDescendent",
  "listBranches",
  "listFiles",
  "listRemotes",
  "listTags",
  "log",
  "merge",
  "plugins",
  "pull",
  "push",
  "readObject",
  "remove",
  "resetIndex",
  "resolveRef",
  "sign",
  "status",
  "statusMatrix",
  "utils",
  "verify",
  "version",
  "walkBeta1",
  "writeObject",
];

const mapExports = (fn) => _exports.map(fn).join('')

// Generate sample "use" cases
fs.emptyDirSync('src')
for (let ex of _exports) {
  fs.writeFileSync(`${__dirname}/src/${ex}.js`,
`
import { ${ex} } from '../${file}'
console.log(${ex})
`
  )
}

// Generate a webpack config
fs.emptyDirSync('dist')
fs.writeFileSync(`${__dirname}/webpack.config.js`,
`
const path = require('path')
module.exports = [
  {
    target: 'web',
    entry: {${mapExports(ex => `
      ${ex}: './src/${ex}.js',`)}
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    mode: 'production',
    devtool: false,
  }
]
`
)

// Generate a rollup config
fs.emptyDirSync('rollup')
fs.writeFileSync(`${__dirname}/rollup.config.js`,
`
export default [${mapExports(ex => `
  {
    input: 'src/${ex}.js',
    output: {
      file: 'rollup/${ex}.js',
      format: 'es'
    }
  },`)}
]
`
)
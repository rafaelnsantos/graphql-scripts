const path = require('path')

function mode () {
  return process.env.NODE_ENV === 'production' ? 'js' : 'ts'
}

function exportFolder (dirname, suffix = '', { inject = undefined, basepath = '' }) {
  basepath = path.join(dirname, basepath)
  const folder = {}
  suffix += `.${mode()}`
  require('fs')
    .readdirSync(basepath)
    .forEach(file => {
      if (file.includes('index') || !file.includes(suffix)) return
      const name = file.replace(suffix, '')
      file = basepath + '/' + file
      folder[name] = inject ? require(file)(inject) : require(file).default
    })
  return folder
}

function requireFolder (dirname, suffix = '', { inject = undefined, basepath = '' }) {
  basepath = path.join(dirname, basepath)
  suffix += `.${mode()}`
  require('fs')
    .readdirSync(basepath)
    .forEach(file => {
      if (file.includes('index') || !file.includes(suffix)) return
      file = basepath + '/' + file
      inject ? require(file)(inject) : require(file)
    })
}

module.exports = { exportFolder, requireFolder }

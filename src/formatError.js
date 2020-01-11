module.exports = function formatError(CODES){
  function formatError (err) {
    if (process.env.NODE_ENV === 'production') {
      return {
        message: CODES[err.message] || CODES.UNKNOWN_ERROR
      }
    }
  
    if (!CODES[err.message] && err.extensions) console.log(err.path, err.extensions.exception.stacktrace)
  
    return {
      message: CODES[err.message] || err.message,
      path: err.path
    }
  }

  return formatError
}

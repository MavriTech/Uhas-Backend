class ErrorHandler extends Error {
  constructor(error, statusCode, message) {
    super();
    this.error = error;
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ErrorHandler;

const { HTTP_STATUS_NOT_FOUND } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;

const { HTTP_STATUS_CONFLICT } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = HTTP_STATUS_CONFLICT;
  }
}

module.exports = ConflictError;

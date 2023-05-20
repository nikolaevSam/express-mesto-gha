class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409; // сделал из 401
  }
}

module.exports = ConflictError;

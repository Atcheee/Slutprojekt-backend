class errorHandler extends Error {}

class invalidUserCredentials extends errorHandler {
  constructor(msg) {
    super();
    this.message = msg;
    this.errorCode = 401;
  }
}
class UserNotFound extends errorHandler {
  constructor(id) {
    super();
    this.message = `User with id ${id} not found`;
    this.errorCode = 404;
  }
}
class Forbidden extends errorHandler {
  constructor(msg) {
    super();
    this.message = msg;
    this.errorCode = 403;
  }
}

class Unauthorized extends errorHandler {
  constructor(msg) {
    super();
    this.message = msg;
    this.errorCode = 401;
  }
}

class TokenExpired extends errorHandler {
  constructor() {
    super();
    this.message = `Token expired, please log in again`;
    this.errorCode = 401;
  }
}

class TaskNotFound extends errorHandler {
  constructor(id) {
    super();
    this.message = `Task with id ${id} not found`;
    this.errorCode = 404;
  }
}
class MessageNotFound extends errorHandler {
  constructor(id) {
    super();
    this.message = `Message with id ${id} not found`;
    this.errorCode = 404;
  }
}

module.exports = {
  invalidUserCredentials,
  UserNotFound,
  Forbidden,
  TokenExpired,
  TaskNotFound,
  MessageNotFound,
};

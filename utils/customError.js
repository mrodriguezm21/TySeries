function customError(message, statusCode, component) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.component = component;
    throw error;
}

module.exports = {
    customError
}
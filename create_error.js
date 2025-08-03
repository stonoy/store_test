class CustomError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

function createError(msg, statusCode){
    throw new CustomError(msg, statusCode)
}

module.exports = createError
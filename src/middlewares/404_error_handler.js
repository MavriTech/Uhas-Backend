const notFoundErrorHandler = (req, res , next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
}

module.exports = notFoundErrorHandler;
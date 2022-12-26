const errorHandler = (err, req, res , next) => {
    // const statusCode = res.status ? req.status : 500;

    res.send(err.message)

}

module.exports = errorHandler;
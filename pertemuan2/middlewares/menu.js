class MenuValidator {
    validateID = (req, res, next) => {
        if (req.params.id == "") {
            res.sendStatus(400)
            return
        }
        next()
    }
}

exports.MenuValidator = MenuValidator
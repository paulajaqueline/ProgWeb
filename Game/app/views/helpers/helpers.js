const showError = (errors, field) => {
    let res = "";
    if (errors)
        errors.forEach(error => {
            if (error.path === field)
                res = error.message;
        })
    return res;
}

module.exports = { showError }
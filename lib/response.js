const makeRes = (status, message = '', data = [])=>{
    return {
        status , message, data
    }
}

module.exports = makeRes
const asyncWrapper = (controller) =>{
    return async(req, res, next) => {
        try{
            await controller(req, res, next)
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = asyncWrapper
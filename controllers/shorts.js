const Address = require('../models/short')
const asyncWrapper = require('../middleware/async')

const cleanUrl = (url) => {
    url = url
            .replace('http://', "")
            .replace('https://', "")
    return url
}

function createHash(string) {
    var hash = 0;
    if (string == 0) {
        return hash;
    }
    for (let i = 0; i < string.length; i++) {
        var char = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; 
    }
    return Math.abs(hash);
}

const getUrl = asyncWrapper(async (req, res) => {
    const fullAddress = await Address.findOne({ hash: req.params.hash })
    if(fullAddress){
        res.status(301).redirect(fullAddress.url) 
    }else{
        res.status(404).send('404 NOT FOUND')
    }
    
})

const registerUrl = asyncWrapper(async(req, res) => {
    const hash = createHash(req.body.url)
    const found = await Address.findOne({ hash })
    if(!found){
        const fullAddress = await Address.create({
            hash: "" + hash, 
            url: `http://${cleanUrl(req.body.url)
        }`})
        res.status(200).json(fullAddress)
    }else{
        res.status(200).json(found)
    }   
})

module.exports = {
    getUrl,
    registerUrl
}
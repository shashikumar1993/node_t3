const contentModel = require("../models/content.model")
const { saveHomeBanner , getHomeBanner , getCategoryList, saveCategory, getBestProductsList } = require('../service/content.service')

class ContentController{

    async getBanner(req,res){
        let type = 'homeBanner'
        let data = await getHomeBanner(type);
        if( data ){
            res.json({status:200,msg:"Success",data:JSON.parse(data.content)});
        }
        res.json({status:200,msg:"No data found"});
    }

    async saveHomeBanner(req,res){

        console.log(req.body);

        let content = {
            title : req.body.title,
            bannerTitle : req.body.bannerTitle,
            backgroundImage : req.body.backgroundImage,
            bannerButton : req.body.bannerButton,
        }

        let type = 'homeBanner'
        
        let payload = { content : JSON.stringify(content) };
        let status = await saveHomeBanner(type,payload);
        if( status ){
            res.json({status:200,msg:"Saved successfully"});
        }else{
            res.json({status:200,msg:"Faled to save"});
        }
    }

    async getCategories(req,res){
        res.json({status:200,msg:"Success",data:await getCategoryList()});
    }

    async saveCategories(req,res){
        let data = await saveCategory(req.body);
        if( data ){
            res.json({status:200,msg:"Saved sucessfully"});
        }else{ res.json({status:400,msg:"failed to save"}); }
        res.end();
        
    }

    async getBestProducts(req,res){
        res.json({status:200,msg:"Success",data:await getBestProductsList()});
    }
}

module.exports = new ContentController();
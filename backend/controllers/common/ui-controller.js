const Banner = require("../../models/Banner");

const addUIBannerImage = async(req,res)=>{
    try{

        const {image} = req.body;

        const bannerImages = new Banner({
            image,
        });

        await bannerImages.save();

        res.status(201).json({
            success : true,
            data : bannerImages
        });

    } catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Error",
        });
    }
};

const getUIBannerImages = async(req,res)=>{
    try{

        const images = await Banner.find({});

        res.status(200).json({
            success : true,
            data : images,
        });

    } catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : "Error",
        });
    }
};

module.exports = {addUIBannerImage, getUIBannerImages};
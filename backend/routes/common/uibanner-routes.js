const express = require("express");

const { 
    addUIBannerImage,
    getUIBannerImages,
} = require("../../controllers/common/ui-controller");

const router = express.Router();

router.post("/add", addUIBannerImage);
router.get("/get", getUIBannerImages);


module.exports = router;
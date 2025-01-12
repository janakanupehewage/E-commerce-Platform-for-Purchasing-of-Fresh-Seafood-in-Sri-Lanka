const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
    cloud_name: "didnmrtki",
    api_key: "844112647979972",
    api_secret: "CAM2uaqWlOK8gZZ459-fLF6Y6aw",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });

    return result;
    
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };


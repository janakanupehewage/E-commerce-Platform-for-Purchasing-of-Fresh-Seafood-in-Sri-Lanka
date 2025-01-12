import ProductImageUpload from '@/components/admin-side/image-upload';
import { Button } from '@/components/ui/button';
import { addBannerImages, getBannerImages } from '@/store/common-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function UIComponents() {


  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { bannerImageList } = useSelector((state)=> state.commonBanner);

  function handleUploadUIBannerImage(){
    dispatch(addBannerImages(uploadedImageUrl)).then((data)=>{
      //console.log(data);
      if(data?.payload?.success){
        //console.log(bannerImageList, "bannerImagesList");
        dispatch(getBannerImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(()=>{
    //console.log(bannerImageList, "bannerImagesList");
    dispatch(getBannerImages());
  }, [dispatch]);

  //console.log(bannerImageList, "bannerImagesList");

  return (
    <div>
      
      <ProductImageUpload 
          imageFile={imageFile} 
          setImageFile={setImageFile} 
          uploadedImageUrl={uploadedImageUrl} 
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
          // isEditMode={currentEditedId !== null}
          
        />
        <Button onClick={handleUploadUIBannerImage} className="mt-5 w-full">Upload</Button>
        <div className="flex flex-col gap-4 mt-5">
        {bannerImageList && bannerImageList.length > 0
          ? bannerImageList.map((bannerImgItem) => (
              <div className="relative">
                <img
                  src={bannerImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default UIComponents;

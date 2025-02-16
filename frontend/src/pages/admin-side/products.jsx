import ProductImageUpload from "@/components/admin-side/image-upload";
import AdminProductTile from "@/components/admin-side/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";

import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image : null,
  title : "",
  description : "",
  category : "",
  price : "",
  salePrice : "",
  totalStock : "",
}

function AdminProducts(){

  const [openCreateProductsDialog, setOpenCreateProductsDialog ] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {productList} = useSelector((state)=>state.adminProducts);
  const dispatch = useDispatch();
  const {toast} = useToast();

  //const categories = ["fish", "shellfish", "Cephalopods", "Mollusks", "Dried & Salted Seafood"];

  const categories = [
    { label: "Fish", value: "fish" },
    { label: "Shellfish", value: "shellfish" },
    { label: "Cephalopods", value: "cephalopods" },
    { label: "Mollusks", value: "mollusks" },
    { label: "Dried & Salted Seafood", value: "driedandsaltedseafood" },
  ];

  function onSubmit(event){
    event.preventDefault();

    currentEditedId !== null ?
    dispatch(editProduct({
      id: currentEditedId, formData
    })).then((data) => {
      console.log(data, "edit");

      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
      }
    }) :
    dispatch(addNewProduct({
      ...formData,
      image : uploadedImageUrl
    })).then((data) => {
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setOpenCreateProductsDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast({
          title : "Product added successfully",
        });

      }
    });

  }

  function handleDelete(getCurrentProductId){
    //console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid(){
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(()=>{
    dispatch(fetchAllProducts())
  }, [dispatch])

  //console.log(formData, "productList");

  const filteredProducts = selectedCategory
  ? productList.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
  : productList;


  return <Fragment>

    {/* Category Selection Section */}
    <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
    <div className="flex gap-4 overflow-x-auto pb-2">
      {categories.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setSelectedCategory(value)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all
            ${
              selectedCategory === value
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
        >
          {label}
        </button>
      ))}
      <button
        onClick={() => setSelectedCategory(null)}
        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all
          ${
            selectedCategory === null
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-blue-100"
          }`}
      >
        All Products
      </button>
    </div>
  </div>




    <div className="mb-5 w-full flex justify-end">
      <Button onClick={()=>setOpenCreateProductsDialog(true)}>
        Add new Product
      </Button>
    </div>
    {/* Product List */}
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No products available for this category.</p>
        )}
      </div>
    <Sheet 
      open={openCreateProductsDialog} 
      onOpenChange={() => {
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
        setFormData(initialFormData);
      }}
    >
      <SheetContent side="right" className="overflow-auto">
        <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ? "Edit Product" : "Add New Product"
              }
            </SheetTitle>
        </SheetHeader>
        
    
        <ProductImageUpload 
          imageFile={imageFile} 
          setImageFile={setImageFile} 
          uploadedImageUrl={uploadedImageUrl} 
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isEditMode={currentEditedId !== null}
        />
        <div className="py-6">
          
          <CommonForm 
          onSubmit={onSubmit} 
          formData={formData} 
          setFormData={setFormData} 
          buttonText={currentEditedId !== null ? "Edit" : "Add"} 
          formControls={addProductFormElements}
          isBtnDisabled={!isFormValid()}
          />
  
        </div> 
      </SheetContent>
    </Sheet>
  </Fragment>
  
}

export default AdminProducts;
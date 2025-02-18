import { categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";



function ShoppingProductTile({product, handleGetProductDetails, handleAddtoCart}){
    return (
        <Card className="w-full max-w-sm mx-auto">
            <div onClick={() => handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[250px] object-cover rounded-t-lg"
                    />
                    {
                        product?.totalStock === 0 ? (<Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Out of Stock</Badge>) :
                        product?.totalStock < 10 ? (<Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">{`Only ${product?.totalStock} SeaFoods left`}</Badge>) :
                        product?.salePrice > 0 ? (<Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">Sale</Badge>) : null
                    }
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-1">{product?.title} 1kg</h2>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[16px] text-muted-foreground">{categoryOptionsMap[product?.category]}</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                        <span className={`${product?.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-primary`}>Rs {product?.price}.00</span>
                        {
                            product?.salePrice > 0 ? (<span className="text-lg font-semibold text-primary">Rs {product?.salePrice}</span>) : null
                        }
                        
                    </div>
                </CardContent>
                
            </div>
            <CardFooter>
                {
                    product?.totalStock === 0 ? 
                    (<Button className="w-full opacity-60 cursor-not-allowed">
                        Out of Stock
                    </Button>) :

                    (<Button onClick={()=>handleAddtoCart(product?._id, product?.totalStock)} className="w-full">
                        Add to cart
                    </Button>)
                }
                    
                </CardFooter>
        </Card>
    );
}

export default ShoppingProductTile;

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId}) {
    return (
        <Card 
            onClick={setCurrentSelectedAddress ? ()=>setCurrentSelectedAddress(addressInfo) : null}
            className={`cursor-pointer border-green-600 ${selectedId?._id === addressInfo?._id ? "border-green-700 border-[4px]" : "border-black"}`}
        >
            <CardContent className={` ${selectedId===addressInfo?._id ? "border-black" : ""} grid p-4 gap-4`}>
                <Label>Address: {addressInfo?.address}</Label>
                <Label>City: {addressInfo?.city}</Label>
                <Label>Postal Code: {addressInfo?.postalcode}</Label>
                <Label>Phone: {addressInfo?.phone}</Label>
                <Label>Notes: {addressInfo?.notes}</Label>
            </CardContent>
            <CardFooter className="p-3 flex justify-between">
              <Button onClick={()=>handleEditAddress(addressInfo)}>Edit</Button>
              <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>  
            </CardFooter>
        </Card>
    );
}

export default AddressCard;
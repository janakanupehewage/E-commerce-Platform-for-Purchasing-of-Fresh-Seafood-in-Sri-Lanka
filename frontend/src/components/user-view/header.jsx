import { CircleUser, Fish, House, HousePlug, LogOut, Menu, MenuIcon, ShoppingCart, FileUser } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/authentication-slice'
import UserCartWrapper from './cart-wrapper'
import { fetchCartItems } from '@/store/shop/cart-slice'
import fishLogo from "../../assets/fishlogo.png";
import { Label } from '../ui/label'

const logoWithIcon = [
  { id: "fishlogo",  icon: fishLogo, isImage: true },
];

function MenuItems(){

  const navigate = useNavigate();

  function handleNavigate(getCurrentMenuItem){
    sessionStorage.removeItem("filters");
    const currentFilter = 
    getCurrentMenuItem.id !== "home" &&
    getCurrentMenuItem.id !== "aboutUs" &&
    getCurrentMenuItem.id !== "seaFoodProducts" &&
    getCurrentMenuItem.id !== "contact" &&
    getCurrentMenuItem.id !== "search"
    
    ? 
    {
      category : [getCurrentMenuItem.id]
    } : null

    sessionStorage.setItem("filters", JSON.stringify(currentFilter))
    navigate(getCurrentMenuItem.path);
  }

  return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
    {
      shoppingViewHeaderMenuItems.map((menuItem) => (
      <Label
        onClick={()=>handleNavigate(menuItem)}
        className="text-sm font-medium cursor-pointer" 
        key={menuItem.id} 
        >
        {menuItem.label}
      </Label>))
      
    }
  </nav>
}

function HeaderRightContent(){

  const {user} = useSelector((state)=>state.auth);
  const {cartItems} = useSelector(state=>state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout(){
    dispatch(logoutUser());
    //console.log(cartItems, "cartItems")
    //console.log(user, "user")
    
  }


  if(user?.id){
  useEffect(()=>{
    dispatch(fetchCartItems(user?.id));
  },[dispatch]);}

  //console.log(cartItems, "test");

  return (<div className="flex lg:items-center lg:flex-row flex-col gap-4">
    
    { user ? 
    <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
      <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon" className="relative">
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute top-[-4px] right-[2px] font-bold text-sm">{cartItems?.items?.length || 0}</span>
        <span className="sr-only">User cart</span>
      </Button>
      <UserCartWrapper
        setOpenCartSheet={setOpenCartSheet} 
        cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}
      />
    </Sheet>
 : 
 
 (
  <Button 
    disabled 
    variant="outline" 
    size="icon" 
    className="relative"
  >
    <ShoppingCart className="w-6 h-6" />
    <span className="absolute top-[-4px] right-[2px] font-bold text-sm">0</span>
    <span className="sr-only">User cart</span>
  </Button>
)
 
 }
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="bg-black">
          <AvatarFallback className="bg-red-400 text-white font-extrabold cursor-pointer">
            { user?.userName ? 
            user?.userName[0].toUpperCase() : <CircleUser/>
            }
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent side="right" className="w-56">
        
        <DropdownMenuLabel>

          {!user?.userName ? "Please Login or Register First" : `Logged in as ${user?.userName}`}
          
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        {user?.userName ?  
        
          <>
        <DropdownMenuItem onClick={()=>navigate("/shop/account")}>
          <CircleUser className="mr-2 h-4 w-4"/>
          My Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4"/>
          Log Out
        </DropdownMenuItem>
        </>
        
        : 
        
        <>
        <DropdownMenuItem onClick={()=>navigate("/auth/login")}>
          <CircleUser className="mr-2 h-4 w-4"/>
          Log in
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>navigate("/auth/register")}>
          <FileUser className="mr-2 h-4 w-4"/>
          Register
        </DropdownMenuItem>
        </>

        }
        
      </DropdownMenuContent>
    </DropdownMenu>
      

  </div>
  );
}


function ShoppingHeader() {

  const {isAuthenticated} = useSelector((state)=>state.auth);

  //console.log(user, 'user');


  return (
    <header className="fixed top-0 z-40 w-full border-b bg-blue-400">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          {
            logoWithIcon.map((logo)=>
              logo.isImage ? (
                <img src={logo.icon} alt="Fish Logo" className="w-12 h-12 mb-0" />
              ) : (
                <logoWithIcon.icon className="w-12 h-12 mb-0 text-primary" />
              )
            )
          }
          <span className="font-bold">OceanFishMarket.lk</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems/>
            <HeaderRightContent/>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems/>
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent/>
        </div>  
      </div>
    </header>
  )
}

export default ShoppingHeader
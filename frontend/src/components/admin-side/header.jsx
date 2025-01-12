import React from 'react'
import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from '@/store/authentication-slice';
//import { logoutUser } from "@/store/authentication-slice/index";


function AdminHeader({setOpen}) {
  //const dispatch = useDispatch();

  const dispatch = useDispatch();

  function handleLogout(){
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button onClick={handleLogout}>
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader
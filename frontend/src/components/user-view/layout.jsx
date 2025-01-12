import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'
import Footer from './footer'

function ShoppingLayout() {
  return (
    <div>
      <div className="flex flex-col min-h-screen bg-white overflow-hidden">
        {/* common header */}
        
        <ShoppingHeader />
        
        <main className="flex flex-col w-full pt-12 flex-grow">
          <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
  )
}

export default ShoppingLayout

import React from 'react'
import accImg from "../../assets/accountBanner.png"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Address from '@/components/user-view/address'
import ShoppingOrders from '@/components/user-view/orders'

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[250px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders"><ShoppingOrders/></TabsContent>
            <TabsContent value="address"><Address /></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount
import { useContext, useEffect } from "react";
import { BungieMembershipDataContext } from "../../../App";
import { BungieNetUser } from "../../../type-definitions/additons";



const MainContentComponent = () => {
const membershipData: any = useContext(BungieMembershipDataContext);

  const user: BungieNetUser = membershipData && {
    ...membershipData.bungieMembershipData.Response.bungieNetUser
  }


  // const userCharacterEquipment = membershipData && {

  //   ...membershipData.userCharacterEquipment.Response.displayProperties

  // }
 

  useEffect(() => {
    console.log(user);
  }
  ,[user])


  return (

    <div className="flex flex-col size-full">

   
      <div className="flex flex-1">
       <div className="mx-auto">
        
        <a href="#" className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
  <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

  <div className="sm:flex sm:justify-between sm:gap-4">
    <div>
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
        {user && user.uniqueName}
      </h3>

      <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
    </div>

    <div className="hidden sm:block sm:shrink-0">
       {/* <img alt="" src={user && `https://www.bungie.net/${user.profilePicturePath}`}/> */}
    </div>
  </div>

  <div className="mt-4">
    <p className="text-sm text-pretty text-gray-500">
     {/* {userCharacterEquipment.name} */}
      
    </p>
  </div>

  <dl className="mt-6 flex gap-4 sm:gap-6">
    <div className="flex flex-col-reverse">
      <dt className="text-sm font-medium text-gray-600">Published</dt>
      <dd className="text-xs text-gray-500">31st June, 2021</dd>
    </div>

    <div className="flex flex-col-reverse">
      <dt className="text-sm font-medium text-gray-600">Reading time</dt>
      <dd className="text-xs text-gray-500">3 minute</dd>
    </div>
  </dl>
</a>


      </div> 
      </div>


    </div>
  )

};


export default MainContentComponent;
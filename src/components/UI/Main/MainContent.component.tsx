import { useContext, useEffect, useState} from "react";
import { BungieMembershipDataContext, contextType } from "../../../App";
import { DestinyInventoryItemDefinition } from "../../../type-definitions/destiny2/interfaces";
import { ServerResponse } from "../../../type-definitions/common";


const MainContentComponent = () => {
  const membershipData = useContext(BungieMembershipDataContext);

  const user: contextType = {
    ...membershipData as contextType
  }

  // const equipmentArray: ServerResponse<DestinyInventoryItemDefinition> [] = [];
  const [equipment, setEquipment] = useState<ServerResponse<DestinyInventoryItemDefinition>[]>([]);

  useEffect(() => {
      setEquipment(prev => [...prev, user.userEquipmentItems])
  }
    , [user.userEquipmentItems])

  
    return (

    <div className="flex flex-col size-full">


      <div className="flex flex-1">
        <div className="mx-auto">

          <a href="#" className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  {user.bungieMembershipData && user.bungieMembershipData.Response.bungieNetUser.uniqueName}
                </h3>
              </div>

              
            </div>

            <div className="mt-4">

              {equipment[1] && <p className="text-sm text-pretty text-gray-500">
                {equipment[1].Response.displayProperties.name}
                
                {/* <img src={`https://www.bungie.net/${equipment[1].Response.displayProperties.icon}`} alt="weapon icon" /> */}
              </p>}
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
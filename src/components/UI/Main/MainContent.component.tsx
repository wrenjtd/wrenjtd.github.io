import { useContext, useEffect, useState } from "react";
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
    <article className=" bg-gray-800 p-4">
      {user.bungieMembershipData &&

        <div className="flex items-center gap-4">

          <div>
            <div className="flex items-center gap-2">
              <img src={`https://www.bungie.net/${user.bungieMembershipData.Response.bungieNetUser.profilePicturePath}`} alt="avatar" className="w-12 h-12 rounded-full" />
              <h3 className="text-lg font-medium text-white">{user.bungieMembershipData && user.bungieMembershipData.Response.bungieNetUser.uniqueName}</h3>
            </div>

            <div className="flow-root">
              <ul className="-m-1 flex flex-wrap">
                <li className="p-1 leading-none">
                  <a href="#" className="text-xs font-medium text-gray-300"> Twitter </a>
                </li>

                <li className="p-1 leading-none">
                  <a href="#" className="text-xs font-medium text-gray-300"> GitHub </a>
                </li>

                <li className="p-1 leading-none">
                  <a href="#" className="text-xs font-medium text-gray-300">Website</a>
                </li>
              </ul>
            </div>
          </div>

        </div>
        }
      <div className="flex">
        <ul className="mt-4 space-y-2">

       {equipment[1] && equipment.map((item, index) => (
          <li className="flex" key={index}>
            <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
              <img src={`https://www.bungie.net/${item?.Response.displayProperties.icon}`} alt="weapon icon" />
              <img src={`https://www.bungie.net/${item?.Response.secondarySpecial}`} alt="weapon icon" />
              <strong className="font-medium text-white">{item?.Response.displayProperties.name}</strong>

              <p className="mt-1 text-xs font-medium text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime consequuntur deleniti,
                unde ab ut in!
              </p>
            </a>
          </li>
        ))}


        </ul>
      </div>
    </article>

  )

};


export default MainContentComponent;
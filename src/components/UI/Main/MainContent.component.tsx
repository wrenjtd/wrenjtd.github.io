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
      <div className="flex items-center gap-4">



        { user.bungieMembershipData &&<div>
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
        </div>}

      </div>
      <div>
      <ul className="mt-4 space-y-2">
        {equipment[1] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[1].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[1]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime consequuntur deleniti,
              unde ab ut in!
            </p>
          </a>
        </li>}

        {equipment[2] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[2].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[2]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}

        {equipment[3] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[3].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[3]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}

        {equipment[4] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[4].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[4]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}

        {equipment[5] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[5].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[5]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}


        {equipment[6] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[6].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[6]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}


        {equipment[7] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[7].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[7]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}


        {equipment[8] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[8].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[8]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}


        {equipment[9] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[9].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[9]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}

        {equipment[10] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[10].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[10]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}


        {equipment[11] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[11].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[11]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}

        {equipment[12] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[12].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[12]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}

        {equipment[13] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[13].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[13]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}

        {equipment[14] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[14].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[14]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}

        {equipment[15] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[15].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[15]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}


        {equipment[16] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[16].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[16]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}

        {equipment[17] && <li>

          <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
            <img src={`https://www.bungie.net/${equipment[17].Response.displayProperties.icon}`} alt="weapon icon" />
            <strong className="font-medium text-white">{equipment[17]?.Response.displayProperties.name}</strong>

            <p className="mt-1 text-xs font-medium text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cumque saepe sit.
            </p>
          </a>
        </li>}

      </ul>
      </div>
    </article>

  )

};


export default MainContentComponent;
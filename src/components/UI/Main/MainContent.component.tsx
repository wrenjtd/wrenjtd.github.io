import { useContext, useEffect, useState } from "react";
import { BungieMembershipDataContext, contextType } from "../../../App";
import { DestinyInventoryItemDefinition } from "../../../type-definitions/destiny2/interfaces";
import { ServerResponse } from "../../../type-definitions/common";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'


const dungeons = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]


const MainContentComponent = () => {
  const membershipData = useContext(BungieMembershipDataContext);
  const user: contextType = {
    ...membershipData as contextType
  }
  const [equipment, setEquipment] = useState<ServerResponse<DestinyInventoryItemDefinition>[]>([]);
  const [selectedDungeon, setSelectedDungeon] = useState(dungeons[0])

  useEffect(() => {
    setEquipment(prev => [...prev, user.userEquipmentItems])
  }
    , [user.userEquipmentItems])


  return (


    <article className=" bg-gray-800 p-4">

<Listbox value={selectedDungeon} onChange={setSelectedDungeon}>
      <Label className="block text-sm/6 font-medium text-gray-900">Assigned to</Label>
      <div className="relative mt-2">
        <ListboxButton className="grid w-lg cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">{selectedDungeon.name}</span>
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {dungeons.map((dungeon) => (
            <ListboxOption
              key={dungeon.id}
              value={dungeon}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{dungeon.name}</span>
              </div>

            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>

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
      <div>
        <ul className="flex flex-wrap mt-4 space-y-2 mx-auto">

          {equipment[1] && equipment.map((item, index) => (
            <li className="flex" key={index}>
              <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                <img src={`https://www.bungie.net${item?.Response.displayProperties.icon}`} alt="weapon icon" />
                <img src={`https://www.bungie.net/${item?.Response.iconWatermark}`} alt="weapon icon" />
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
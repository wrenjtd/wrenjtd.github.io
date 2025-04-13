import { Listbox, Label, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const dungeons = [
  { id: 1, name: 'Dungeon 1', unavailable: false },
  { id: 2, name: 'Dungeon 2', unavailable: false },
  { id: 3, name: 'Dungeon 3', unavailable: false },
  { id: 4, name: 'Dungeon 4', unavailable: true },
  { id: 5, name: 'Dungeon 5', unavailable: false },
]

const PickerComponent: React.FC = () => {

  const [selectedDungeon, setSelectedDungeon] = useState(dungeons[0]);
  return (
    <div className=" bg-gray-800 text-gray-200 flex flex-1">

      <div className="size-full">
        <Listbox value={selectedDungeon} onChange={setSelectedDungeon}>
          <Label className="block text-sm/6 font-medium text-white">Dungeons</Label>
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
              className="absolute z-10 mt-1 max-h-56 w-lg overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
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
      </div>

    </div>)

};

export default PickerComponent;
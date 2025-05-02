import { useContext } from "react";
import { BungieMembershipDataContext, contextType } from "../../../App";


const MainContentComponent = () => {
  const membershipData = useContext(BungieMembershipDataContext);
  const user: contextType = {
    ...membershipData as contextType
  }



  return (

    <article className="bg-gray-800">

      {/* Profile information */}
      {user.bungieMembershipData &&
        <div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <img src={`https://www.bungie.net/${user.bungieMembershipData.Response.bungieNetUser.profilePicturePath}`} alt="avatar" className="w-12 h-12 rounded-full" />
                <h3 className="text-lg font-medium text-white">{user.bungieMembershipData && user.bungieMembershipData.Response.bungieNetUser.uniqueName}</h3>
              </div>

              {/* Social Media stuff */}
              <div className="flow-root">
                <ul className="-m-1 flex flex-wrap mb-2.5">
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

          <div>

            {/* Character emblem + overlays */}
            <div className="grid grid-cols-3">

              {/* <div style={{ backgroundImage: `url('https://bungie.net${user.userCharacterProfiles?.Response.characters.data[Object.keys(user.userCharacterProfiles.Response.characters.data)[0]].emblemBackgroundPath}')` }} className="grid grid-cols-3 rounded-lg h-12 max-w-3xs" >
              </div>

              <div style={{ backgroundImage: `url('https://bungie.net${user.userCharacterProfiles?.Response.characters.data[Object.keys(user.userCharacterProfiles.Response.characters.data)[1]].emblemBackgroundPath}')` }} className=" grid grid-cols-3 rounded-lg h-12 max-w-3xs">
              </div>
              <div style={{ backgroundImage: `url('https://bungie.net${user.userCharacterProfiles?.Response.characters.data[Object.keys(user.userCharacterProfiles.Response.characters.data)[2]].emblemBackgroundPath}')` }} className=" grid grid-cols-3 rounded-lg h-12 max-w-3xs" >
              </div> */}
            </div>

            <div>
              <div className="grid grid-cols-3">

                {/* Character 1 equipped items */}
                {/* <div className="flex mx-auto">
                  <div className="border-black rounded-none">
                    <ul className="flex flex-col space-y-9 mr-10">

                      {user?.userWeapons[0]?.map((item, index) => (

                        <li className="flex" key={index}>
                          <a href="#" className="group relative rounded-none border border-gray-700 hover:border-white w-auto transition-colors duration-150">
                            <div className="relative border-black rounded-none border-1 size-full overflow-hidden">
                              <div className="relative">
                                {item?.displayProperties.icon && <img className="h-[50px] w-[50px] rounded-none" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon icon" />}
                                {item?.iconWatermark && <img className="h-[50px] w-[50px] absolute top-0 left-0" src={`https://www.bungie.net/${item?.iconWatermark}`} alt="icon watermark" />}
                              </div>
                              <div className="flex flex-inital w-full h-5 bg-black">
                                <div className="my-auto mr-0.5">
                                  {item?.displayProperties.icon && <img className="size-2 items-center " src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="misc img" />}
                                </div>
                                <div className="my-auto justify-end">
                                  {item?.displayProperties.icon && <img className="size-2" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon damage type" />}
                                </div>
                                <div className="mx-auto">
                                  <p className="text-white text-[10px] items-center ">2031</p>
                                </div>
                              </div>

                            </div>
                            <span className="absolute bottom-1 left-1 z-10 hidden group-hover:block w-max max-w-xs bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-none shadow-lg whitespace-nowrap">
                              {item?.displayProperties?.name || "Weapon Details"}<br />
                              {item?.itemTypeDisplayName || "Weapon Type"}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-black rounded-none">
                    <ul className="flex flex-col space-y-9 ml-10">

                      {user?.userArmor[0]?.map((item, index) => (

                        <li className="flex" key={index}>
                          <a href="#" className="group relative rounded-none border border-gray-700 hover:border-white w-auto transition-colors duration-150">
                            <div className="relative border-black rounded-none border-1 size-full overflow-hidden">
                              <div className="relative">
                                {item?.displayProperties.icon && <img className="h-[50px] w-[50px] rounded-none" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon icon" />}
                                {item?.iconWatermark && <img className="h-[50px] w-[50px] absolute top-0 left-0" src={`https://www.bungie.net/${item?.iconWatermark}`} alt="icon watermark" />}
                              </div>

                              <div className="flex flex-inital w-full h-[20px] bg-black">
                                <div className="my-auto mr-0.5">
                                  {item?.displayProperties.icon && <img className="size-[8px] " src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="misc img" />}
                                </div>
                                <div className="my-auto justify-end">
                                  {item?.displayProperties.icon && <img className="size-[8px] " src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon damage type" />}
                                </div>
                                <div className="mx-auto">
                                  <p className="text-white text-[10px] items-center ">2031</p>
                                </div>
                              </div>
                            </div>
                            <span className="absolute bottom-1 left-1 z-10 hidden group-hover:block w-max max-w-xs bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-none shadow-lg whitespace-nowrap">
                              {item?.displayProperties?.name || "Armor Details"}<br />
                              {item?.itemTypeDisplayName || "Armor Type"}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}

                {/* Character 2 equipped items */}
                {/* <div className="flex mx-auto">
                  <div className="border-black rounded-none">
                    <ul className="flex flex-col space-y-9 mr-10">

                      {user?.userWeapons[1]?.map((item, index) => (

                        <li className="flex" key={index}>
                          <a href="#" className="group relative rounded-none border border-gray-700 hover:border-white w-auto transition-colors duration-150">
                            <div className="relative border-black rounded-none border-1 size-full overflow-hidden">
                              <div className="relative">
                                {item?.displayProperties.icon && <img className="h-[50px] w-[50px] rounded-none" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon icon" />}
                                {item?.iconWatermark && <img className="h-[50px] w-[50px] absolute top-0 left-0" src={`https://www.bungie.net/${item?.iconWatermark}`} alt="icon watermark" />}
                              </div>
                              <div className="flex flex-inital w-full h-5 bg-black">
                                <div className="my-auto mr-0.5">
                                  {item?.displayProperties.icon && <img className="size-2 items-center " src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="misc img" />}
                                </div>
                                <div className="my-auto justify-end">
                                  {item?.displayProperties.icon && <img className="size-2" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon damage type" />}
                                </div>
                                <div className="mx-auto">
                                  <p className="text-white text-[10px] items-center ">2031</p>
                                </div>
                              </div>

                            </div>
                            <span className="absolute bottom-1 left-1 z-10 hidden group-hover:block w-max max-w-xs bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-none shadow-lg whitespace-nowrap">
                              {item?.displayProperties?.name || "Weapon Details"}<br />
                              {item?.itemTypeDisplayName || "Weapon Type"}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-black rounded-none">
                    <ul className="flex flex-col space-y-9 ml-10">

                      {user?.userArmor[1]?.map((item, index) => (

                        <li className="flex" key={index}>
                          <a href="#" className="group relative rounded-none border border-gray-700 hover:border-white w-auto transition-colors duration-150">
                            <div className="relative border-black rounded-none border-1 size-full overflow-hidden">
                              <div className="relative">
                                {item?.displayProperties.icon && <img className="h-[50px] w-[50px] rounded-none" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon icon" />}
                                {item?.iconWatermark && <img className="h-[50px] w-[50px] absolute top-0 left-0" src={`https://www.bungie.net/${item?.iconWatermark}`} alt="icon watermark" />}
                              </div>

                              <div className="flex flex-inital w-full h-[20px] bg-black">
                                <div className="my-auto mr-0.5">
                                  {item?.displayProperties.icon && <img className="size-[8px] " src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="misc img" />}
                                </div>
                                <div className="my-auto justify-end">
                                  {item?.displayProperties.icon && <img className="size-[8px] " src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon damage type" />}
                                </div>
                                <div className="mx-auto">
                                  <p className="text-white text-[10px] items-center ">2031</p>
                                </div>
                              </div>
                            </div>
                            <span className="absolute bottom-1 left-1 z-10 hidden group-hover:block w-max max-w-xs bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-none shadow-lg whitespace-nowrap">
                              {item?.displayProperties?.name || "Armor Details"}<br />
                              {item?.itemTypeDisplayName || "Armor Type"}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}

                {/* Character 3 equipped items */}
               {/* <div className="flex mx-auto">
                  <div className="border-black rounded-none">
                    <ul className="flex flex-col space-y-9 mr-10">
                      {user?.userWeapons[2]?.map((item, index) => (

                        <li className="flex" key={index}>
                          <a href="#" className="group relative rounded-none border border-gray-700 hover:border-white w-auto transition-colors duration-150">
                            <div className="relative border-black rounded-none border-1 size-full overflow-hidden">
                              <div className="relative">
                                {item?.displayProperties.icon && <img className="h-[50px] w-[50px] rounded-none" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon icon" />}
                                {item?.iconWatermark && <img className="h-[50px] w-[50px] absolute top-0 left-0" src={`https://www.bungie.net/${item?.iconWatermark}`} alt="icon watermark" />}
                              </div>
                              <div className="flex flex-inital w-full h-5 bg-black">
                                <div className="my-auto mr-0.5">
                                  {item?.displayProperties.icon && <img className="size-2 items-center " src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="misc img" />}
                                </div>
                                <div className="my-auto justify-end">
                                  {item?.displayProperties.icon && <img className="size-2" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon damage type" />}
                                </div>
                                <div className="mx-auto">
                                  <p className="text-white text-[10px] items-center ">2031</p>
                                </div>
                              </div>

                            </div>

                           
                            <span className="absolute bottom-1 left-1 z-10 hidden group-hover:block w-max max-w-xs bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-none shadow-lg whitespace-nowrap">
                              {item?.displayProperties?.name || "Weapon Details"}<br />
                              {item?.itemTypeDisplayName || "Weapon Type"}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-black rounded-none ml-10">
                    <ul className="flex flex-col space-y-9">

                      {user?.userArmor[2]?.map((item, index) => (

                        <li className="flex" key={index}>
                          <a href="#" className="group relative rounded-none border-gray-700 hover:border-white w-auto transition-colors duration-150">
                            <div className="relative border-black rounded-none border-1 size-full overflow-hidden">
                              <div className="relative">
                                {item?.displayProperties.icon && <img className="h-[50px] w-[50px] rounded-none" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon icon" />}
                                {item?.iconWatermark && <img className="h-[50px] w-[50px] absolute top-0 left-0" src={`https://www.bungie.net/${item?.iconWatermark}`} alt="icon watermark" />}
                              </div>

                              <div className="flex flex-inital w-full h-[20px] bg-black">
                                <div className="my-auto mr-0.5">
                                  {item?.displayProperties.icon && <img className="size-[8px] " src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="misc img" />}
                                </div>
                                <div className="my-auto justify-end">
                                  {item?.displayProperties.icon && <img className="size-[8px] " src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon damage type" />}
                                </div>
                                <div className="mx-auto">
                                  <p className="text-white text-[10px] items-center ">2031</p>
                                </div>
                              </div>
                            </div>

                           
                            <span className="absolute bottom-1 left-1 z-10 hidden group-hover:block w-max max-w-xs bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-none shadow-lg whitespace-nowrap">
                              {item?.displayProperties?.name || "Armor Details"}<br />
                              {item?.itemTypeDisplayName || "Armor Type"}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>  */}


              </div>
            </div>

          </div>
        </div>}


    </article>

  )

};


export default MainContentComponent;
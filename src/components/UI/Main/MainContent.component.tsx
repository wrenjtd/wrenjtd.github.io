import { useContext } from "react";
import { BungieMembershipDataContext, contextType } from "../../../App";


const MainContentComponent = () => {
  const membershipData = useContext(BungieMembershipDataContext);
  const user: contextType = {
    ...membershipData as contextType
  }

  // const [hoverBool, setHoverBool] = useState(false);

  // const myFunction = ()=>{
  //   setHoverBool(true);
  //   return ""
  // }

  return (
    <div className="flex flex-1">
      {user.bungieMembershipData &&
        <article className=" bg-gray-800 p-4 size-full">



          <div className="flex flex-col gap-4">
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

          <div className="flex justify-between w-[50%] mx-auto">
            <div>
              <ul className="flex flex-col space-y-9">

                {user?.userWeapons.map((item, index) => (

                  <li className="flex" key={index}>
                    <a href="#" className=" rounded-lg border border-gray-700 hover:border-white w-auto">
                      <div className="relative border-black rounded-lg border-1 size-full">
                        <div className="relative">
                          {item?.displayProperties.icon && <img className="h-[50px] w-[50px] rounded-t-lg" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon icon" />}
                          {item?.iconWatermark && <img className="h-[50px] w-[50px] absolute top-0 left-0" src={`https://www.bungie.net/${item?.iconWatermark}`} alt="icon watermark" />}
                        </div>
                        <div className="flex flex-inital w-full h-[20px] bg-black">
                          <div>
                            {item?.displayProperties.icon && <img className="size-[8px] items-center " src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="misc img" />}
                          </div>
                          <div>
                            {item?.displayProperties.icon && <img className="size-[8px] items-center" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon damage type" />}
                          </div>
                          <div>
                            <p className="text-white text-xs text-center items-center ">2031</p>
                          </div>
                        </div>

                      </div>
                      {/* {hoverBool && <span className="absolute bg-gray-500 text-white w-auto h-auto rounded-lg ">Stuff</span>} */}
                    </a>


                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="flex flex-col space-y-9">

                {user?.userArmor.map((item, index) => (

                  <li className="flex" key={index}>
                    <a href="#" className=" rounded-lg border border-gray-700 hover:border-pink-600 w-auto">
                      <div className="relative border-black rounded-lg border-1 size-full">
                        <div className="relative">
                          {item?.displayProperties.icon && <img className="h-[50px] w-[50px] rounded-t-lg" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon icon" />}
                          {item?.iconWatermark && <img className="h-[50px] w-[50px] absolute top-0 left-0" src={`https://www.bungie.net/${item?.iconWatermark}`} alt="icon watermark" />}
                        </div>

                        <div className="flex flex-inital w-full h-[20px] bg-black">
                          <div>
                            {item?.displayProperties.icon && <img className="size-[8px] items-center" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="misc img" />}
                          </div>
                          <div>
                            {item?.displayProperties.icon && <img className="size-[8px] items-center" src={`https://www.bungie.net/${item?.displayProperties.icon}`} alt="weapon damage type" />}
                          </div>
                          <div>
                            <p className="text-white text-xs text-center items-center ">2031</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      }
    </div>
  )

};


export default MainContentComponent;
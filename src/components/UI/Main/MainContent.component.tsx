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

                  <li key={index}>
                   
                    
                    <a href="#" className=" rounded-lg border-2 border-black hover:white w-auto">
                      
                      <div className="relative border-black rounded-lg border-1 size-full">
                        <div className="">
                        {item?.Response.displayProperties.icon && <img className="h-[50px] w-[50px]" src={`https://www.bungie.net/${item?.Response.displayProperties.icon}`} alt="weapon icon" />}
                        {item?.Response.iconWatermark && <img className="h-[50px] w-[50px] absolute top-0 left-0" src={`https://www.bungie.net/${item?.Response.iconWatermark}`} alt="icon watermark" />}
                        </div>
                      

                        <div className="flex flex-1 size-[20px]">
                        {item?.Response.displayProperties.icon && <img className="" src={`https://www.bungie.net/${item?.Response.displayProperties.icon}`} alt="misc img" />}
                        {item?.Response.displayProperties.icon && <img className="" src={`https://www.bungie.net/${item?.Response.displayProperties.icon}`} alt="weapon damage type" />}
                        <p className="text-white ">2031</p>
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
                      <div className="relative">
                        {item?.Response.displayProperties.icon && <img className="h-[50px] w-[50px]" src={`https://www.bungie.net/${item?.Response.displayProperties.icon}`} alt="weapon icon" />}
                        {item?.Response.iconWatermark && <img className="h-[50px] w-[50px] absolute top-0 left-0" src={`https://www.bungie.net/${item?.Response.iconWatermark}`} alt="icon watermark" />}
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
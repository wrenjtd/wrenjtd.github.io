import { ApiResponse, BungieNetUser } from "../../../type-definitions/additons";
import { ServerResponse } from "../../../type-definitions/common";


const MainContentComponent = ({ membershipData }: { membershipData: ServerResponse<ApiResponse> }) => {


  const user: BungieNetUser = membershipData && {
    ...membershipData.Response.bungieNetUser

  }

  return (

    <div className="min-h-screen flex-grow">

      <header className="shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-100">Dashboard</h1>
        </div>

      </header>
      {user && <>
        <p className="text-gray-100">{user.displayName}</p>
        <img
          alt="Your Company"
          src={`https://www.bungie.net/${user.profilePicturePath}`}
          className="size-8 rounded-full"
        />
       <p>{user.membershipId}</p>
        {/* {user.psnDisplayName && <p>{user.psnDisplayName}</p>}
        {user.xboxDisplayName && <p>{user.xboxDisplayName}</p>} */}

      </>}


    </div>
  )

};


export default MainContentComponent;
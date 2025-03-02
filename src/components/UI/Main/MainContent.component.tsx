

const MainContentComponent = ({membershipData}: {membershipData: any}) => {

  //const membershipData = useContext(BungieMembershipDataContext); 
  //const auth_endpoint = useContext(OAuthURLEndpointContext);




  

  return (

    <div>

<header className="shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-100">Dashboard</h1>
          </div>
        
</header>

{membershipData?.Response?.bungieNetUser && <p className="text-gray-100">{membershipData?.Response?.bungieNetUser?.displayName}</p>
}

    </div>
  )

};


export default MainContentComponent;
import HeaderContentComponent from "../Header/HeaderContent.component";
import LeftbarBoxComponent from "../Leftbar/LeftbarBox.component";

export default function Dashboard() {




  return (
    <>
      <div className="min-h-full">


     
        <HeaderContentComponent></HeaderContentComponent>
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
        { /* mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 */}
          <div className="">
            <LeftbarBoxComponent/>
          </div>
        </main>
      </div>
    </>
  )
}

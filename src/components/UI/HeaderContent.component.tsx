import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/static/app_logo.png';
import { OAuthURLEndpointContext } from '../../App';
import { Disclosure, Menu, MenuButton, MenuItems, MenuItem, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ServerResponse } from '../../type-definitions/user';
import { ApiResponse } from '../../type-definitions/additons';



const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
]


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}



const HeaderContentComponent = ({membershipData}:{membershipData:ServerResponse<ApiResponse>}) => {

    
  
    const auth_endpoint = useContext(OAuthURLEndpointContext);

    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_self', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const userNavigation = [
        { name: 'Bungie.net', href: '', onClick: () => openInNewTab(auth_endpoint) },
        { name: 'Settings', href: '#', onClick: () => { } },
        { name: 'Sign out', href: '#', onClick: () => { } },
    ]




    

    return (

        // <div id="header_div" className="flex justify-between p-3 border-b border-gray-700">
        //     <div id="logo_div" className="ml-2">
        //         <Link to="/"><img src={logo} id="logo_pic" className="w-24 h-24"  /></Link>
        //     </div>
        //     <br></br>

        //     <h2 className="w-24 h-24" >{membershipData?.Response?.bungieNetUser?.displayName}</h2>
        //     <div id="membership_pic_div">
        //        {membershipData?.Response?.bungieNetUser?.profilePicturePath && <img src={`https://www.bungie.net/${membershipData?.Response?.bungieNetUser?.profilePicturePath}`} /> }
        //     </div>




        // </div>
        


        <Disclosure as="nav" className="bg-gray-800">
            <div className="mx-auto max-w-7xl ">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="shrink-0">
                            {/* This is the site logo */}
                            <Link to="/">
                                <img
                                    alt="Your Company"
                                    src={logo}
                                    className="size-8"
                                />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-gray-100' : 'text-gray-700 hover:bg-gray-300 hover:text-gray-100',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button
                                type="button"
                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="size-6" />
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-900 py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                    {userNavigation.map((item) => (
                                        <MenuItem key={item.name}>
                                            <button
                                                onClick={item.onClick}
                                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                            >
                                                {item.name}
                                            </button>
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-200 p-2 text-gray-600 hover:bg-gray-300 hover:text-gray-100 focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 focus:ring-offset-gray-200 focus:outline-hidden">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-100 text-gray-100' : 'text-gray-700 hover:bg-gray-300 hover:text-gray-100',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                        <div className="shrink-0">
                            {membershipData?.Response?.bungieNetUser &&
                                <img
                                    alt="Your Company"
                                    src={`https://www.bungie.net/${membershipData.Response.bungieNetUser.profilePicturePath}`}
                                    className="size-8 rounded-full"
                                />}
                        </div>
                        <div className="ml-3">
                            <div className="text-base/5 font-medium text-white">{user.name}</div>
                            <div className="text-sm font-medium text-gray-400">{user.email}</div>
                        </div>
                        <button
                            type="button"
                            className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                </div>
            </DisclosurePanel>
            
        </Disclosure>


    )
};


export default HeaderContentComponent;
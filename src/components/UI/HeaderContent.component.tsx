import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/static/app_logo.png';

import { BungieMembershipDataContext, contextType, OAuthURLEndpointContext } from '../../App';
import { Disclosure, Menu, MenuButton, MenuItems, MenuItem, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { BellIcon, Bars3Icon, XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}



const HeaderContentComponent = () => {

    const membershipData = useContext(BungieMembershipDataContext);

    const user: contextType = {
        ...membershipData as contextType
    }



    const auth_endpoint = useContext(OAuthURLEndpointContext);

    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_self', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    const topNavigation = [
    { name: 'Dashboard', href: '#', current: false },
    { name: 'Team', href: '/Picker', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
    { name: 'Reports', href: '#', current: false },
]


    const settingsNavigation = [
        { name: 'Bungie.net', href: '', onClick: () => openInNewTab(auth_endpoint) },
        { name: 'Settings', href: '#', onClick: () => { } },
        { name: 'Sign out', href: '#', onClick: () => { } },
    ]

    const leftNavigation2 = [
        { name: 'Inventory', href: '#', onClick: () => { } },
        { name: 'Progress', href: '#', onClick: () => { } },
        { name: 'Vendors', href: '#', onClick: () => { } },
        { name: 'Records', href: '#', onClick: () => { } },
        { name: 'Loadouts', href: '#', onClick: () => { } },
        { name: 'Organizers', href: '#', onClick: () => { } }
    ]


    return (

        <Disclosure as="nav" className="bg-transparent">
            {/* Visible Header Parent */}
            <div className="flex h-16 items-center mr-5 ml-5">
                <Menu as="div" className="relative ml-3">
                    <div>
                        <MenuButton className="group relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-white  hover:text-orange-600 focus:text-orange-600 focus:outline-hidden">
                            <span className="absolute inset-1.5" />
                            <span className="sr-only">Open user menu</span>

                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                        </MenuButton>
                    </div>
                    <MenuItems
                        transition
                        className="fixed top-16 bottom-0 left-0 z-50 w-64 origin-top-left rounded-r-md border bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 overflow-y-auto transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"

                    >
                        {leftNavigation2.map((item) => (
                            <MenuItem key={item.name}>
                                <button
                                    onClick={item.onClick}
                                    className="block px-4 py-2 w-full text-sm text-white text-left data-focus:bg-orange-600 data-focus:outline-hidden"
                                >
                                    {item.name}
                                </button>
                            </MenuItem>
                        ))}
                    </MenuItems>
                </Menu>
                {/* Logo and Header Links */}
                <div className="flex-1 flex justify-between items-center pl-9">
                    <div className="flex items-center">
                        {/* Site Logo */}
                        <div className="shrink-0">
                            <Link to="/">
                                <img
                                    alt="Your Company"
                                    src={logo}
                                    className="size-15"
                                />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {/* Header Links */}
                                {topNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={item.current ? 'page' : undefined}
                                        className={classNames(
                                            item.current ? 'bg-transparent text-white' : 'text-white hover:text-orange-600 ',
                                            'rounded-md px-3 py-2 text-sm font-medium',
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-4 flex justify-end items-center md:ml-6">
                            <button
                                type="button"
                                className="relative rounded-full bg-transparent p-1 text-white focus:text-orange-600 hover:text-orange-600  focus:outline-hidden"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="size-6 hover:text-orange-600 focus:text-orange-600 " />
                            </button>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-transparent   hover:text-orange-600 focus:text-orange-600  focus:outline-hidden">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <Cog6ToothIcon aria-hidden="true" className="size-6 hover:text-orange-600 focus:text-orange-600 text-white " />
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-transparent py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                    {settingsNavigation.map((item) => (
                                        <MenuItem key={item.name}>
                                            <button
                                                onClick={item.onClick}
                                                className="block px-4 py-2 w-full text-left text-sm text-white data-focus:bg-orange-600 data-focus:outline-hidden"
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
                    {topNavigation.map((item) => (
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
                    <Cog6ToothIcon aria-hidden="true" className="size-6 hover:text-orange-600 focus:text-orange-600 text-white" />
                        <div className="ml-3">

                            {user.bungieMembershipData && <img alt="user Bungie icon" src={`https://www.bungie.net/${user.bungieMembershipData.Response.bungieNetUser.profilePicturePath}`} />}
                        </div>
                        <button
                            type="button"
                            className="relative ml-auto shrink-0 rounded-full bg-transparent p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="size-6 hover:text-orange-600 focus:text-orange-600 text-white" />
                        </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                        {settingsNavigation.map((item) => (
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
import * as React from 'react'
import Footer from './Footer';
import { useRouter } from 'next/router';
import { signout } from '../../helpers/authUser';

interface WrapperProps {
    children: React.ReactNode;
}

const removeLocalStorage = () => {

    signout()
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const router = useRouter()
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col justify-between">
                {/* <!-- Navbar --> */}
                <div>
                    <div className="w-full navbar bg-black text-white">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2">Title</div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                {/* <!-- Navbar menu content here --> */}
                                {/* <li><a>Navbar Item 1</a></li> */}
                                <li onClick={()=> router.push("/messages")}><a>Messages</a></li>
                                <li onClick={removeLocalStorage}><a>Log out</a></li>

                            </ul>
                        </div>
                    </div>
                    {/* <!-- Page content here --> */}
                    {children}
                </div>
                <div>
                    <Footer />
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100">
                    {/* <!-- Sidebar content here --> */}
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>

                </ul>

            </div>
        </div>
    )
}

export default Wrapper
import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios";
import { Rightbar } from "./RightBar";
import { Sidebar } from "./Sidebar";



export const Header = () => {
    const navigate = useNavigate()
    const [display, setDisplay] = useState('none')

    const Home = () => {
        window.location.pathname = "/"
    }

    const handleClick = () => {
        setDisplay('none')
        const nav = document.getElementsByClassName('nav')
        Array.from(nav).forEach((elem) => {
            if (elem.id === window.location.pathname) {
                elem.classList.add('Active')
            }
            else {
                elem.classList.remove('Active')
            }
        })
    }

    const logout = async () => {
        setDisplay("none")
        localStorage.removeItem('userId')
        try {
            const res = await axios('http://localhost:5000/api/v1/user/logout', {
                method: "get",
                withCredentials: true
            });

            navigate('/login')
        } catch (error) {
            console.log(error.message)
        }

    }
    return (
        <>
            <header className="border-b-2 border-b-gray-300    ">
                <div className="wrapper flex justify-between items-center  ">
                    <div className="py-4 text-xl sm:text-2xl md:text-3xl font-semibold" onClick={Home}>Social Media</div>
                    <div className="flex">
                        {localStorage.getItem('userId') === null && window.innerWidth > 640 ? <NavLink to='/signin' className="my-4 mr-5 text-sm sm:text-xl border border-blue-500 rounded-full p-1 w-[70px] sm:w-[85px] text-center text-white bg-blue-500 cursor-pointer hover:bg-white hover:text-blue-500" >SignIn</NavLink> : ""}
                        {localStorage.getItem('userId') === null && window.innerWidth > 640 ? <NavLink to='login' className="my-4 text-sm sm:text-xl border border-sky-500 rounded-full p-1 w-[70px] sm:w-[85px] text-center cursor-pointer text-white bg-sky-500 hover:bg-white hover:text-sky-600" >LogIn</NavLink> : ""}
                        {localStorage.getItem('userId') === null || window.innerWidth < 640 ? "" : <div className="my-4 mr-3 text-sm sm:text-xl border text-white bg-blue-500 border-blue-500 rounded-full p-1 w-[70px] sm:w-[85px] text-center cursor-pointer hover:bg-white hover:text-blue-500" onClick={logout}>Logout</div>}
                        <div className="my-4 inline sm:hidden" onClick={() => setDisplay('flex')}>
                            <i class="fa-solid fa-bars fa-2x"></i>
                        </div>
                    </div>

                </div>
            </header>

            <aside id='sidebar' className="text-xl fixed right-0 top-0 w-[240px] z-20 bg-white sm:static sm:w-[7%] md:w-[20%] border-r-2 border-gray-300 h-screen sm:min-h-[89vh] flex flex-col items-start sm:items-center md:items-start p-3 sm:p-0  " style={{ display: display }}
            >
                <div onClick={handleClick} id="/" className="nav flex mt-3 items-center cursor-pointer Active">
                    <NavLink to="/"><i class="fa-solid fa-house"></i>&nbsp;&nbsp;<span className="inline md:inline sm:hidden">Home</span></NavLink>
                </div>
                <div onClick={handleClick} id="/userprofile" className="nav flex mt-10 items-center cursor-pointer">
                    <NavLink to="/userprofile"><i class="fa-solid fa-user"></i> &nbsp;&nbsp;<span className="inline md:inline sm:hidden">Profile</span></NavLink>
                </div>
                <div onClick={handleClick} id="/createpost" className="nav flex mt-10 items-center cursor-pointer">
                    <NavLink to='createpost'><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;&nbsp;<span className="inline md:inline sm:hidden">Post</span></NavLink>
                </div>
                <div onClick={handleClick} id='/friends' className="nav flex mt-10 items-center cursor-pointer">
                    <NavLink to='friends'><i class="fa-solid fa-user-group"></i> &nbsp;<span className="inline md:inline sm:hidden">Friends</span></NavLink>
                </div>
                <div onClick={handleClick} id='/search' className="nav flex mt-10 items-center cursor-pointer">
                    <NavLink to='search'><i class="fa-solid fa-magnifying-glass"></i>&nbsp;&nbsp;&nbsp;<span className="inline md:inline sm:hidden">Search</span></NavLink>
                </div>
                {window.innerWidth < 640 && <div onClick={handleClick} id='/alluser' className="nav flex mt-10 items-center cursor-pointer">
                    <NavLink to='alluser'><i class="fa-solid fa-users"></i>&nbsp;&nbsp;&nbsp;<span className="inline md:inline sm:hidden">All User</span></NavLink>
                </div>}

                {localStorage.getItem('userId') === null ? <NavLink to='/signin' onClick={() => setDisplay("none")} className="my-4 mr-5 text-sm sm:text-xl border border-blue-500 rounded-full p-1 w-[70px] sm:w-[85px] text-center text-white bg-blue-500 cursor-pointer hover:bg-white hover:text-blue-500" >SignIn</NavLink> : ""}
                {localStorage.getItem('userId') === null ? <NavLink to='login' onClick={() => setDisplay("none")} className="my-4 text-sm sm:text-xl border border-sky-500 rounded-full p-1 w-[70px] sm:w-[85px] text-center cursor-pointer text-white bg-sky-500 hover:bg-white hover:text-sky-600" >LogIn</NavLink> : ""}
                {localStorage.getItem('userId') === null ? "" : <div className="my-4 mr-3 text-sm sm:text-xl border text-white bg-blue-500 border-blue-500 rounded-full p-1 w-[70px] sm:w-[85px] text-center cursor-pointer hover:bg-white hover:text-blue-500" onClick={logout}>Logout</div>}
            </aside >

            <div className='fixed w-screen h-screen top-0  left-0 right-0 bottom-0 backdrop-blur-sm z-10' onClick={() => setDisplay("none")} style={{ display: display }}></div>
        </>
    );
}
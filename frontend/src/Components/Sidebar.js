import { NavLink } from "react-router-dom";

export const Sidebar = ({ value }) => {

    const handleClick = () => {
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

    return (
        <>
            <aside id='sidebar' className="text-xl  w-[240px]  bg-white  sm:w-[7%] md:w-[20%] border-r-2 border-gray-300 h-[89vh] sm:min-h-[89vh] flex flex-col items-start sm:items-center md:items-start p-3 sm:p-0 overflow-y-scroll "
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
                    <NavLink to='alluser'><i class="fa-solid fa-code-pull-request"></i>&nbsp;&nbsp;&nbsp;<span className="inline md:inline sm:hidden">All User</span></NavLink>
                </div>}
            </aside >

        </>
    );
}


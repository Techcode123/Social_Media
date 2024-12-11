import { NavLink, useNavigate } from "react-router-dom";
import { UserCard } from "./UserCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProfileSkeleton } from "./ProfileSkeleton";



export const Rightbar = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const fetchData = () => {
        axios.get('https://social-media-backend-d6ek.onrender.com/api/v1/user/getalluser', {
            withCredentials: true
        }).then((res) => {
            if (res.data.message === "Please Login...!") {
                navigate('/login')
            }
            setUser(res.data.user)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        setLoading(true)
        fetchData()
    }, [])
    return (
        <>
            <aside id='sidebar' className="text-xl sm:pl-2 w-full sm:w-[43%] md:w-[35%]  lg:w-[30%] sm:border-l-2 sm:border-gray-300 min-h-[89vh] overflow-y-scroll  "
            >
                <h1 className="text-xl text-left font-semibold mt-2">All Users</h1>
                <div className="w-full">
                    {loading ? [1, 2, 3].map(() => <ProfileSkeleton />) : user?.map((item) => {
                        return <UserCard
                            id={item._id}
                            name={item.name}
                            pic={item.image.url}
                            location={item.location}
                            requestarrive={item.requestarrive}
                            friends={item.friends}
                            fetchData={fetchData}
                        />
                    })

                    }
                </div>
            </aside >



        </>
    );
}

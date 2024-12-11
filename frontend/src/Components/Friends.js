import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { RequestCard } from './RequestCard';
import { MyFriend } from './MyFriend';
import { ProfileSkeleton } from './ProfileSkeleton';
import { useNavigate } from 'react-router-dom';



export const Friends = () => {
    const [user, setUser] = useState([]);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const fetchData = () => {
        axios.get(`https://social-media-backend-d6ek.onrender.com/api/v1/user/userprofile/${id}`, {
            withCredentials: true
        }).then((res) => {
            if (res.data.message === "Please Login...!") {
                navigate('/login')
            }

            setFriends(res.data.user.friends)
            setUser(res.data.user.requestarrive)
            setLoading(false)
        }).
            catch((error) => {
                console.log(error)
            })
    }


    const id = localStorage.getItem('userId')
    useEffect(() => {
        setLoading(true)
        fetchData()
    }, [])


    return (
        <>
            <main className='w-full sm:w-[50%] md:w-[45%] lg:w-[50%] flex flex-col p-2  items-center   overflow-y-scroll h-[89vh]'>
                {loading ? [1].map(() => <ProfileSkeleton />) : user.map((item) => {
                    return <RequestCard
                        name={item.name}
                        location={item.location}
                        pic={item.image.url}
                        id={item._id}
                        fetchData={fetchData}
                    />
                })}
                <h1 className='font-semibold'>All Friends</h1>
                {loading ? [1].map(() => <ProfileSkeleton />) : friends.map((item) => {
                    return < MyFriend
                        name={item.name}
                        location={item.location}
                        pic={item.image.url}
                        id={item._id}
                        fetchData={fetchData}
                    />
                })}
            </main>
        </>
    )
}

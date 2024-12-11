import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Skeleton } from "./Skeleton";

export const OtherProfile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const fetchData = () => {
        axios.get(`https://social-media-backend-d6ek.onrender.com/api/v1/user/userprofile/${id}`, {
            withCredentials: true
        }).then((res) => {
            setUser(res.data.user)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        setLoading(true)
        fetchData();
    }, [window.location.pathname])
    return (
        <>
             <main className="w-full sm:w-[50%] md:w-[45%] lg:w-[50%] p-2 flex flex-col items-center  overflow-y-scroll h-[89vh] ">
                <div className="flex justify-between w-full items-center">
                    <div className="w-[100px] h-[95px] border border-gray-400 rounded-full"><img src={user?.image?.url} className="w-[100px] h-[95px] rounded-full " /></div>
                    <div className="flex">
                        <div className="mr-8 flex flex-col items-center">
                            <div className="text-xl font-bold">{user?.create?.length}</div>
                            <div className="text-lg">Posts</div>
                        </div>
                        <div className="mr-8 flex flex-col items-center">
                            <div className="text-xl font-bold">{user?.friends?.length}</div>
                            <div className="text-lg">Friends</div>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-8">
                    <div className="font-semibold text-2xl">{user?.name}</div>
                    <div className="border-gray-400">{user?.location}</div>
                    <div className="border-gray-400">{user?.description}</div>
                </div>
               
                <div className=" text-xl mt-8 font-semibold">
                    All Posts
                </div>
                <div className="w-full flex flex-col items-center mt-2">
                    {loading ? [1, 2, 3].map((elem) => <Skeleton />) : user?.create?.map((item) => {
                        return <Card
                            name={user?.name}
                            profilepic={user?.image?.url}
                            content={item.content}
                            image={item?.image?.url}
                            like={item.likes}
                            date={item.createdAt}
                            id={item._id}
                            comment={item.comment}
                            fetchData={fetchData}
                        />
                    })}
                    {
                        user?.create?.length === 0 && <div
                            className="text-3xl text-gray-300 mt-[100px]"
                        >
                            No Posts
                        </div>
                    }
                </div>
            </main>

        </>
    )

}

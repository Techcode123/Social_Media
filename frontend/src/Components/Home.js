import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Card } from "./Card";
import { Skeleton } from "./Skeleton";
import { useNavigate } from "react-router-dom";


export const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const fetchData = () => {
        axios.get('https://social-media-backend-d6ek.onrender.com/api/v1/post/getallpost', {
            withCredentials: true
        }).then((res) => {
            if (res.data.message === "Please Login...!") {
                navigate('/login')
            }
            console.log(res.data.post)
            setData(res.data.post)
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
            <main className="w-full sm:w-[50%] md:w-[45%] lg:w-[50%] flex flex-col p-2  items-center   overflow-y-scroll h-[89vh] ">

                <div className="text-lg font-semibold">All Posts</div>
                {loading ? [1, 2, 3].map((elem) => <Skeleton />) :

                    data?.map((item) => {
                        return <Card
                            name={item.createdby.name}
                            profilepic={item.createdby.image.url}
                            content={item.content}
                            image={item.image.url}
                            like={item.likes}
                            id={item._id}
                            date={item.createdAt}
                            userId={item.createdby._id}
                            comment={item.comment}
                            fetchData={fetchData}
                        />
                    })



                }

            </main>



        </>
    )
}


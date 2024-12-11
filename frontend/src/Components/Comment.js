import axios from 'axios';
import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import ReactTimeAgo from 'react-time-ago'
const admin = localStorage.getItem('admin')


export const Comment = (prop) => {
    const [val2, setVal2] = useState('none')

    const handleDelete = async () => {
        console.log(prop.value._id)
        setVal2('none')
        const res = await axios.delete(`https://social-media-backend-d6ek.onrender.com/api/v1/post/deletecomment/${prop.value._id}/${prop.postid}`, {
            withCredentials: true
        })
        prop.fetchData();
    }

    return (
        <>
            <div className='flex relative justify-between items-start mt-3'>
                <div className='absolute p-2 flex flex-col flex-start right-0 top-0 w-[100px]  bg-white text-black flex justify-center items-center shadow-lg cursor-pointer z-40' style={{ display: val2 }} >
                    <div className='w-full hover:text-red-600' onClick={handleDelete}>Delete</div>
                </div>
                <div className="flex ">
                    <div className="border border-black w-[50px] h-[50px] rounded-full mr-2"><img className="w-full h-full rounded-full" src={prop.value.commentby.image.url} /></div>
                    <div className="flex flex-col w-[90%]">
                        <div className="text-sm text-gray-400">{prop.value.commentby.name}&nbsp;&nbsp;<ReactTimeAgo date={prop.value.date} locale="en-US" /></div>
                        <div className="text-sm ">{prop.value.text}</div>
                    </div>
                </div>
                <div className='cursor-pointer'>

                    {prop.value.commentby._post === localStorage.getItem('userpost') || prop.userId === localStorage.getItem('userId') || admin === "true" ? <div className='cursor-pointer' onClick={() => setVal2("block")}><i class="fa-solid fa-ellipsis-vertical"></i></div> : ""}
                </div>
            </div>

            <div className='fixed w-screen h-screen top-0  left-0 right-0 bottom-0 z-30' onClick={() => setVal2('none')} style={{ display: val2 }}>

            </div>

            <ToastContainer
                position="top-center"
                autoClose={1000}
            />


        </>
    )
}

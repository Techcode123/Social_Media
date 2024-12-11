import React from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export const RequestCard = (prop) => {
    const navigate = useNavigate()


    const handleUser = () => {
        navigate(`/singleuser/${prop.id}`)
    }

    const handleAccept = async () => {
        try {
            const res = await axios.patch(`https://social-media-backend-d6ek.onrender.com/api/v1/user/acceptrequest/${prop.id}`, null, {
                withCredentials: true
            })
            toast.success(res?.data?.message, {
                autoClose: true,
                toastId: "accept"
            })
            prop.fetchData();
        } catch (error) {
            console.log(error)
        }
    }

    const handleReject = async () => {
        try {
            const res = await axios.patch(`https://social-media-backend-d6ek.onrender.com/api/v1/user/cancelrequest/${prop.id}`, null, {
                withCredentials: true
            })
            toast.success(res?.data?.message, {
                autoClose: true,
                toastId: "reject"
            })
            prop.fetchData();
        } catch (error) {
            console.log(error)
        }
    }

    return (<>
        <div className="flex w-full  border border-gray-400 p-2 rounded-md justify-between mt-2 items-center ">
            <div className="flex">
                <div className="w-[50px] h-[50px] rounded-full border border-gray-400 mr-2 cursor-pointer " onClick={handleUser} >
                    <img src={prop.pic} className="w-[50px] h-[50px] rounded-full" />
                </div>
                <div>
                    <div className="text-sm lg:text-lg font-semibold">{prop?.name}</div>
                    <div className="text-sm">{prop?.location}</div>
                </div>
            </div>

            <div className="cursor-pointer flex">
                <i class="fa-solid fa-2x fa-check mr-4" title='Accept' style={{ color: '#3cbe97' }} onClick={handleAccept}></i>
                <i class="fa-solid fa-2x fa-xmark" title='Reject' style={{ color: "#d70f0f" }} onClick={handleReject}></i>
            </div>
        </div>


    </>)
}


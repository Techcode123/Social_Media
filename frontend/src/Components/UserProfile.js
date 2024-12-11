import React, { useEffect, useState } from "react";
import axios from "axios"
import { Card } from "./Card";
import { ToastContainer, toast } from 'react-toastify';
import { Skeleton } from "./Skeleton";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
    const [user, setUser] = useState({});
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState(null)
    const [value, setValue] = useState('none')
    const navigate = useNavigate()
    const id = localStorage.getItem('userId')
    const [changeimg, setChangeImg] = useState(false)

    const fetchData = () => {
        axios.get(`https://social-media-backend-d6ek.onrender.com/api/v1/user/userprofile/${id}`, {
            withCredentials: true
        }).then((res) => {
            if (res.data.message === "Please Login...!") {
                navigate('/login')
            }
            console.log(res.data.user)
            setLoading(false)

            setUser(res.data.user)
        }).
            catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }

    useEffect(() => {
        setLoading(true)
        fetchData()
    }, [])



    const handlepics = (e) => {
        setChangeImg(true)
        const file = e.target.files[0]
        setImg(URL.createObjectURL(file))
        setFile(file)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target[0])
        const formData = new FormData();
        formData.append('name', e.target[1].value);
        formData.append('location', e.target[3].value);
        formData.append('description', e.target[2].value);
        formData.append('bool', changeimg)
        formData.append('file', file);

        setLoading(true)
        try {
            axios.patch('https://social-media-backend-d6ek.onrender.com/api/v1/user/editprofile', formData, {
                withCredentials: true
            }).then((res) => {
                setLoading(false)
                fetchData();
                setValue('none')
            }).catch((err) => {
                console.log(err)
            })

        } catch (error) {
            console.log(error)
        }

    }

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
                <div>
                    <button className="text-white bg-blue-500 w-[80px] rounded-md p-1 text-md" onClick={() => setValue('flex')}>Edit</button>
                </div>
                <div className=" text-xl mt-8 font-semibold">
                    All Posts
                </div>
                <div className="w-full flex flex-col items-center mt-2">


                    {loading ? [1, 2, 3].map((elem) => <Skeleton />) :

                        user?.create?.map((item) => {
                            return <Card
                                name={user?.name}
                                profilepic={user?.image?.url}
                                content={item.content}
                                image={item?.image?.url}
                                like={item.likes}
                                id={item._id}
                                date={item.createdAt}
                                userId={item.createdby}
                                comment={item.comment}
                                fetchData={fetchData}
                            />
                        })



                    }
                    {
                        user?.create?.length === 0 && <div
                            className="text-3xl text-gray-300 mt-[100px]"
                        >
                            No Posts
                        </div>
                    }
                </div>
            </main>


            <div style={{ display: value }} onClick={() => setValue('none')} className=" fixed w-screen h-screen top-0 left-0 z-10 backdrop-blur-sm">

            </div>
            <form className="w-full sm:w-[400px] md:w-[500px] flex flex-col   rounded-lg items-center bg-white  fixed z-20 left-0 right-0  mx-auto  top-0 bottom-0    my-auto  max-h-[450px]" enctype="multipart/form-data" style={{ display: value }} onSubmit={handleSubmit} >
                <h1 className="text-2xl font-semibold mt-5">Edit Account</h1>
                <img src={img === null ? user?.image?.url : img} className=" mt-5  w-[100px] h-[100px] rounded-full border border-gray-400" />
                <label for="file" className="mt-1 bg-blue-500 text-white p-1 rounded-sm cursor-pointer" ><i class="fa-solid fa-upload"></i>&nbsp;Upload Photo</label>
                <input type="file" id="file" name="file" className="hidden" placeholder="Imageurl" onChange={handlepics} />
                <input type="text" className="w-[80%] border-b-2 border-gray-300 outline-none text-lg  mt-5 " name="name" placeholder="Name" defaultValue={user?.name} />
                <input type="text" className="w-[80%] border-b-2 border-gray-300 outline-none text-lg  mt-5 " name="description" placeholder="Description" defaultValue={user?.description} />
                <input type="text" className="w-[80%] border-b-2 border-gray-300 outline-none text-lg  mt-5  " name="location" placeholder="Location" defaultValue={user?.location} />
                {loading ? <button type="button" className="w-[80%] p-1 mt-5 text-xl bg-blue-500 text-white rounded-md mb-5 flex justify-center ">

                    <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>


                </button> : <button type="submit" className="w-[80%] p-1 mt-5 text-xl bg-blue-500 text-white rounded-md mb-5 ">Edit</button>}
            </form>
            <ToastContainer
                position="top-center"
                autoClose={1000}
            />
        </>
    )
}

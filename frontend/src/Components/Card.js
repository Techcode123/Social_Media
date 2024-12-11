import axios from 'axios';
import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Comment } from './Comment';
import { useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'

export function Card(prop) {
    const navigate = useNavigate()
    const [value, setValue] = useState('none')
    const [loading, setLoading] = useState(false);
    const [val, setVal] = useState('none')
    const [val2, setVal2] = useState('none')
    const [filed, setFiled] = useState(null);
    const [image, setImage] = useState(null);
    const [display, setDisplay] = useState('none')
    const [comment, setComment] = useState("");
    const [changeimg, setChangeImg] = useState(false)
    const userId = localStorage.getItem('userId')
    const admin = localStorage.getItem('admin')




    const handleLike = async () => {
        try {
            const res = await axios.patch(`http://localhost:5000/api/v1/post/like/${prop.id}`, null, {
                withCredentials: true
            })
        } catch (error) {
            console.log(error)
        }
        prop.fetchData();
    }

    const handleDelete = async () => {
        setValue('none')
        try {
            const res = await axios.delete(`http://localhost:5000/api/v1/post/delete/${prop.id}`, {
                withCredentials: true
            })
            toast.success(res?.data?.message, {
                closeOnClick: true,
            })
        } catch (error) {
            console.log(error)
        }
        prop.fetchData();

    }

    const handleEdit = () => {
        setValue('none')
        setVal('flex')
    }


    const handlepic = (e) => {
        setChangeImg(true)
        const filed = e.target.files[0]
        setFiled(filed)
        setImage(URL.createObjectURL(filed))
    }

    const handleComment = (e) => {
        setComment(e.target.value)
    }

    const handleForm = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await axios.patch(`http://localhost:5000/api/v1/post/comment`, {
                text: comment,
                id: prop.id
            }, {
                withCredentials: true
            })
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
        prop.fetchData();
    }

    const handleUser = () => {
        navigate(`/singleuser/${prop.userId}`)
    }

    const handleDisplay = () => {
        setDisplay('block')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target[0].value)
        const formData = new FormData();
        formData.append('file', filed);
        formData.append('content', e.target[1].value);
        formData.append('bool', changeimg)

        setLoading(true)

        try {
            const res = await axios.patch(`http://localhost:5000/api/v1/post/update/${prop.id}`, formData, {
                withCredentials: true
            });
            setLoading(false)
            setVal("none")
        } catch (error) {
            console.log(error.message)
        }
        prop.fetchData();
    }


    return (
        <>
            <div className="border relative  border-gray-400 rounded-md w-[280px]  md:w-[280px] lg:w-[310px] p-3 mb-4">
                <div className='absolute p-2 flex flex-col flex-start right-0 top-0 w-[100px]  bg-white text-black flex justify-center items-center shadow-lg cursor-pointer z-30' style={{ display: value }} >
                    <div className='w-full hover:text-red-600' onClick={handleDelete}>Delete</div>
                    <div className='w-full hover:text-blue-600' onClick={handleEdit}>Edit</div>
                </div>
                <div className="flex mb-3 w-full justify-between ">
                    <div className='flex '>
                        <div className="border border-black w-[60px] h-[60px] rounded-full mr-2 cursor-pointer" onClick={handleUser}><img className="w-[60px] h-[60px] rounded-full" src={prop.profilepic} /></div>
                        <div className="flex flex-col">
                            <div className="font-semibold">{prop.name}</div>
                            <div className="text-gray-500"><ReactTimeAgo date={prop.date} locale="en-US" /></div>
                        </div>
                    </div>
                    {prop.userId === localStorage.getItem('userId') || admin === "true" ? <div className='cursor-pointer' onClick={() => setValue("flex")}><i class="fa-solid fa-ellipsis-vertical"></i></div> : ""}
                </div>
                <div className=" mb-3">
                    <p>{prop.content}</p>
                </div>
                <div className="w-80% h-[200px] mb-3">
                    <img src={prop.image} className="w-full h-full" />
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center cursor-pointer  ">

                        {prop.like.includes(userId) ? <i class="fa-solid fa-heart" onClick={handleLike} style={{ color: "#ed0707" }}></i> : <i class="fa-regular fa-heart" onClick={handleLike}></i>}

                        &nbsp;
                        <div >{prop.like.length}</div>
                    </div>
                    <div className="flex items-center cursor-pointer" onClick={handleDisplay}>
                        <i class="fa-regular fa-comment"></i>
                        &nbsp;
                        <div>{prop.comment.length}</div>
                    </div>
                </div>
            </div>

            <div className='fixed w-screen h-screen top-0 left-0 right-0 bottom-0 z-20' onClick={() => setValue("none")} style={{ display: value }}>

            </div>

            <form className="w-full sm:w-[400px] md:w-[500px] bg-white flex flex-col fixed top-0 z-30 left-0 right-0 mx-auto top-0 bottom-0 max-h-[450px] my-auto  rounded-lg items-center border border-gray-400" enctype="multipart/form-data" style={{ display: val }} onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold mt-5">Edit a Post</h1>
                <img src={image || prop.image} className=" mt-5  w-[100px] h-[100px] rounded-full border border-gray-400" />
                <label for={prop.id} className="mt-1 bg-blue-500 text-white p-1 rounded-sm cursor-pointer" ><i class="fa-solid fa-upload"></i>&nbsp;Upload Photo</label>
                <input type="file" id={prop.id} name="file" onChange={handlepic} className="hidden" placeholder="Imageurl" />
                <textarea className="w-[80%] p-1 border border-gray-300  text-lg  mt-5 h-[150px]" placeholder="Description" name="content" defaultValue={prop.content} required />
                {loading ? <button type="button" className="w-[80%] p-1 mt-5 text-xl bg-blue-500 text-white rounded-md mb-5 flex justify-center">

                    <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>


                </button> : <button type="submit" className="w-[80%] p-1 mt-5 text-xl bg-blue-500 text-white rounded-md mb-5 ">Edit</button>}
            </form>


            <div className='fixed w-screen h-screen top-0 backdrop-blur-sm left-0 right-0 bottom-0 z-20' onClick={() => setVal("none")} style={{ display: val }}>

            </div>

            <div className='fixed p-2 w-400px sm:w-[500px] top-0 bottom-0 my-auto  max-h-[500px]  bg-white border border-gray-400 rounded-md left-0  right-0 overflow-y-scroll mx-auto z-20' style={{ display: display }}>

                <form className='flex' onSubmit={handleForm} style={{ boxShadow: "none" }}>

                    <input type="text" className="w-[80%] rounded-lg h-[30px] border border-gray-400 p-1 mr-[2%]" placeholder="Add Comment..." onChange={handleComment} required />


                    {loading ? <button type="button" className="bg-blue-500 h-[30px] text-white p-1 w-[18%] rounded-lg flex justify-center  ">


                        <div role="status">
                            <svg aria-hidden="true" class="w-8 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>


                    </button> : <button className="bg-blue-500 h-[30px] text-white p-1 w-[18%] rounded-lg" > Add</button>}

                </form>




                <div className="mt-4">

                    {prop.comment.map((item) =>
                        <Comment
                            value={item}
                            postid={prop.id}
                            userId={prop.userId}
                            fetchData={prop.fetchData}
                        />
                    )}

                </div>
            </div>

            <div className='fixed w-screen h-screen top-0  backdrop-blur-sm left-0 top-0 right-0 bottom-0 z-10' onClick={() => setDisplay('none')} style={{ display: display }}>

            </div>

            <ToastContainer
                position="top-center"
                autoClose={1000}
            />
        </>
    );
}

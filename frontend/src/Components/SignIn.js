import React, { useState } from "react"
import { NavLink } from "react-router-dom";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


export const SignIn = () => {

    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [data, setData] = useState({ name: "", email: "", password: "", description: "", location: "" })

    const handlepic = (e) => {
        const file = e.target.files[0]
        setImg(URL.createObjectURL(file))
        setFile(file)
    }
    const handleChange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(file, data)
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('location', data.location);
        formData.append('description', data.description);
        formData.append('file', file);

        try {
            setLoading(true)
            const res = await axios.post('http://localhost:5000/api/v1/user/register', formData);
            console.log(res.data)
            setLoading(false)
            toast.success(res.data.message, {
                closeOnClick: true,
            })
        } catch (error) {
            console.log(error.message)
        }

    }


    return (
        <>
            <div className="wrapper flex justify-center min-h-[80vh] items-center">
                <form className="w-[500px] flex flex-col  rounded-lg items-center mt-4" enctype="multipart/form-data" onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-semibold mt-5">Create a new account</h1>
                    <img src={img} className=" mt-5  w-[100px] h-[100px] rounded-full border border-gray-400" />
                    <label for="file" className="mt-1 bg-blue-500 text-white p-1 rounded-sm cursor-pointer" ><i class="fa-solid fa-upload"></i>&nbsp;Upload Photo</label>
                    <input type="file" id="file" name="file" className="hidden" placeholder="Imageurl" onChange={handlepic} />
                    <input type="text" className="w-[80%] border-b-2 border-gray-300 outline-none text-lg  mt-5 " name="name" onChange={handleChange} placeholder="Name" required />
                    <input type="text" className="w-[80%] border-b-2 border-gray-300 outline-none text-lg  mt-5 " name="email" onChange={handleChange} placeholder="Email" required />
                    <input type="text" className="w-[80%] border-b-2 border-gray-300 outline-none text-lg  mt-5 " name="password" onChange={handleChange} placeholder="Password" required />
                    <input type="text" className="w-[80%] border-b-2 border-gray-300 outline-none text-lg  mt-5 " name="description" onChange={handleChange} placeholder="Description" required />
                    <input type="text" className="w-[80%] border-b-2 border-gray-300 outline-none text-lg  mt-5  " name="location" onChange={handleChange} placeholder="Location" />
                    {loading ? <button type="button" className="w-[80%] p-1 mt-5 text-xl bg-blue-500 text-white rounded-md mb-5 flex justify-center ">

                        <div role="status">
                            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>


                    </button> : <button type="submit" className="w-[80%] p-1 mt-5 text-xl bg-blue-500 text-white rounded-md mb-1 ">SignIn</button>}
                    <NavLink to="/login" className="text-blue-500 mt-5 mb-5 hover:underline"> Already have an account?</NavLink>
                </form>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={1000}
            />
        </>
    );
}
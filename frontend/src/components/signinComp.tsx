import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

export function     SigninComp() {
    const [postInputs, setPostInputs] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate()

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/user/signin`, postInputs)
            const token = response.data
            localStorage.setItem("token", token)
            navigate("/")

        } catch (error) {
            console.log(error)
            alert("unable to signin!!!")
        }
    }

    return <div className="h-screen pt-20">
        <div className="flex justify-self-center flex-col  border w-96 p-6 rounded-lg text-2xl shadow-lg shadow-blue-800 bg-white">
            <div className="flex justify-center">
                <div className="relative">
                    <div className="absolute top-0 right-0">
                        <Link to={"/"}>
                        <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        </Link>
                    </div>
                    <div className="justify-center flex font-serif text-blue-800 text-5xl font-extrabold pb-2">
                        <h1>Signin</h1>
                    </div>
                    <div className=" p-3">
                        <input className="border-b p-1 focus:outline-none" type="text" placeholder="Name" onChange={(c) => {
                            setPostInputs({
                                ...postInputs,
                                username: c.target.value
                            })
                        }} />
                    </div>
                    <div className=" p-3">
                        <input className="border-b p-1 focus:outline-none" type="password" placeholder="Password" onChange={(c) => {
                            setPostInputs({
                                ...postInputs,
                                password: c.target.value
                            })
                        }} />
                    </div>
                    <div className="p-3">
                        <button type="submit" className=" border-blue-900 p-2 px-5 font-semibold rounded-3xl bg-blue-500 text-white cursor-pointer" onClick={sendRequest} >Signin</button>
                    </div>
                    <div className="flex">
                        <p className="text-sm">You already have an account?</p>
                        <Link to={"/signup"} className="text-sm underline pl-2">Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
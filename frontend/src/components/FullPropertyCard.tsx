import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

export function FullPropertyCard({ id, description, price, location, buildup_area, image, kitchen, bedrooms, toilets, amenities, parking, selection }: any) {

    useEffect(()=>{
        window.scrollTo({top:0,behavior: "smooth"})
    },[])

    const [ownerdetails, setOwnerdetails] = useState<any>(null)
    const navigate = useNavigate()

    async function ownerDetails() {
        try {
            const res = await axios.post(`${BACKEND_URL}/property/sell/owner`, { id }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            })
            setOwnerdetails(res.data)
        } catch (error) {
            navigate("/signin")
            console.log("Error fetching owner details", error)
        }
    }

    return <div className="flex justify-center ">

        <div className=" max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 ">
            <img className="h-100 w-full mb-6" src={image} alt="" />
            <h5 className="mb-2 text-4xl font-lg tracking-tight text-gray-900 ">For {`${selection === "buy" ? "Sale" : selection}`} in {location}</h5>

            <div className="grid md:grid-cols-2 my-6">
                <div className=" text-center border border-slate-300 flex">
                    <div className="border-r border-slate-300 p-4">
                        <img src="/bedroom.svg" alt="" className="w-10 " />
                    </div>
                    <div className="p-5">
                        <div className="ml-4 text-xl">{bedrooms} Bedroom(s)</div>
                    </div>
                </div>
                <div className=" text-center border border-slate-300 flex">
                    <div className="border-r border-slate-300 p-4">
                        <img src="/bathroom.svg" alt="" className="w-10 " />
                    </div>
                    <div className="p-5">
                        <div className="ml-4 text-xl">{toilets} Toilet(s)</div>
                    </div>
                </div>
                <div className=" text-center border border-slate-300 flex">
                    <div className="border-r border-slate-300 p-4">
                        <img src="/kitchen.svg" alt="" className="w-10" />
                    </div>
                    <div className="p-5">
                        <div className="ml-4 text-xl">{kitchen} Kitchen(s)</div>
                    </div>
                </div>
                <div className=" text-center border border-slate-300 flex">
                    <div className="border-r border-slate-300 p-4">
                        <img src="/car.svg" alt="" className="w-10" />
                    </div>
                    <div className="p-5">
                        <div className="ml-4 text-xl">
                            {parking ? <p>Car Parking Available</p> : <p>No Car Parking</p>}
                        </div>
                    </div>
                </div>
                <div className=" text-center border border-slate-300 flex">
                    <div className="border-r border-slate-300 p-4">
                        <img src="/area.svg" alt="" className="w-10" />
                    </div>
                    <div className="p-5">
                        <div className="ml-4 text-xl">{buildup_area} Sq Fts</div>
                    </div>
                </div>
                <div className=" text-center border border-slate-300 flex">
                    <div className="border-r border-slate-300 p-4">
                        <img src="/key.svg" alt="" className="w-10" />
                    </div>
                    <div className="p-5">
                        <div className="ml-4 text-xl">Possesion immediately</div>
                    </div>
                </div>
            </div>
            <p className="font-normal text-gray-700 text-3xl ">Price: ₹ {`${price > 1000 ? `${price}/month` : `${price}crores`}`}</p>
            <div className="mt-6">
                <h2 className="text-3xl mb-3">Description:</h2>
                <div className="space-y-4 px-4 text-lg ">
                    {description.split(/(?<=\.)\s+/).reduce((acc: (string[])[], sentence: string, index: number) => {
                        if (index % 3 === 0) acc.push([]);
                        acc[acc.length - 1].push(sentence);
                        return acc;
                    }, []).map((group: string[], index: number) => (
                        <p key={index} className="text-gray-800">{group.join(" ")}</p>
                    ))}
                </div>
            </div>
            <div className="my-6">
                <div className="text-3xl ">Amenities:
                    <div className="text-lg px-4">
                        {amenities}
                    </div>
                </div>
            </div>

            <button className="border bg-blue-300 rounded p-2 cursor-pointer" onClick={ownerDetails}>Get Owner Details</button>
            {ownerdetails ? (<div>
                <p>Owner: {ownerdetails.username}</p>
                <p>Mobile Number: {ownerdetails.mobileNumber}</p>
                <p>Email: {ownerdetails.email}</p>
            </div>) : <div className="text-red-400">Please login to get owner details</div>
            }

        </div>

    </div>
}
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function FullPropertyCard({ id, description, price, location, buildup_area, image, kitchen, bedrooms, toilets, amenities, parking, selection }: any) {

    const [ownerdetails, setOwnerdetails] = useState<any>(null)
    const navigate = useNavigate()

    async function ownerDetails() {
        try {
            const res = await axios.post("http://127.0.0.1:8787/property/sell/owner", { id }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    "Content-Type": "application/json"
                }
            })
            setOwnerdetails(res.data)
        } catch (error) {
            navigate("/signin")
            console.log("Error fetching owner details",error)
        }
    }

    return <div className="flex justify-center ">

        <div className=" max-w-3xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 ">
            <img className="h-100" src={image} alt="" />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">For {selection} in {location}</h5>
            <p className="font-normal text-gray-700 ">Price: {price}</p>
            <p className="font-normal text-gray-700 ">No of bedrooms: {bedrooms}</p>
            <p className="font-normal text-gray-700 ">Area: {buildup_area}</p>
            <p className="font-normal text-gray-700 ">No of toilets: {toilets}</p>
            <p className="font-normal text-gray-700 ">No of kitchen: {kitchen}</p>
            <p>{parking}</p>
            {parking && <p className="font-normal text-gray-700 ">Parking Available</p>}
            <p className="font-normal text-gray-700 ">Description: {description}</p>
            <div>
                <p className="font-normal text-gray-700 ">Amenities: {amenities}</p>
            </div>

            <button className="border bg-blue-300 rounded p-2 cursor-pointer" onClick={ownerDetails}>Owner Details</button>
            {ownerdetails && (
                <div>
                    <p>{ownerdetails.username}</p>
                    <p>{ownerdetails.mobileNumber}</p>
                    <p>{ownerdetails.email}</p>
                </div>
            )}

        </div>

    </div>
}
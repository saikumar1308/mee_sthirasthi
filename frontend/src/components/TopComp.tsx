import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function TopComp() {
    const [selection, setSelection] = useState("rent")
    const navigate = useNavigate()

    return <div>
        <div className=" rounded-xl p-3 ">
            <ul className="flex flex-wrap text-lg font-medium text-center text-gray-900 justify-between border-b ">
                <li className="me-2 ml-3">
                    <button className="inline-block px-4 py-2 rounded-xl hover:text-white hover:bg-blue-600 cursor-pointer" onClick={() => {
                        setSelection("rent")
                    }}>Rent</button>
                </li>
                <li className="me-2">
                    <button className="inline-block px-4 py-2 rounded-xl hover:text-white hover:bg-blue-600 cursor-pointer" onClick={() => {
                        setSelection("buy")
                    }}>Buy</button>
                </li>
                <li className="me-2 mr-3">
                    <button className="inline-block px-4 py-2 rounded-xl hover:text-white hover:bg-blue-600 cursor-pointer" onClick={() => {
                        setSelection("lease")
                    }}>Lease</button>
                </li>
            </ul>
            <div>
                <button type="submit" className="rounded-3xl bg-blue-500 p-3 px-6 text-white font-bold mt-2 cursor-pointer" onClick={() => {
                    navigate(`/properties/${selection}`)
                }}>Search</button>
            </div>

        </div>
    </div>
}
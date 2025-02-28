import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function TopComp() {
    const [selection, setSelection] = useState("rent")
    const navigate = useNavigate()

    return <div>
        <div className=" rounded-xl p-3 ">
            <ul className="flex flex-wrap text-lg font-medium text-center text-gray-900 justify-between border-b ">
                {["rent", "buy", "lease"].map((option) => (
                    <li key={option} className="me-2 ml-3">
                        <button className={`inline-block px-4 py-2 cursor-pointer transition-all ${selection === option ? "border-b-4 border-blue-600 pb-1" : " hover:underline border-b border-transparent"}`} 
                        onClick={() => {setSelection(option)}}
                        >{option.charAt(0).toUpperCase() + option.slice(1)}</button>
                    </li>
                ))}
            </ul>
            <div>
                <button type="submit"
                    className="rounded-3xl bg-blue-500 p-3 px-6 text-white font-bold mt-2 cursor-pointer"
                    onClick={() => { navigate(`/properties/${selection}`) }}
                    disabled={!selection}
                >Search</button>
            </div>

        </div>
    </div>
}
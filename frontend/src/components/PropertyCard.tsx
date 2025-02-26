import { Link } from "react-router-dom";

export function PropertyCard({ description, price, location, buildup_area, id, selection, image}: any) {
    return <div>
        <Link to={`/properties/${selection}/${id}`}>
            <a href="#" className="mb-5 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 p-2">
                <img className="object-fill w-full h-80 rounded-t-lg md:h-40 md:w-60  md:rounded-lg" src={image} alt="Image" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">For {selection} in {location}</h5>
                    <p className="mb-3 font-normal text-gray-700 ">Price: {price}</p>
                    <p className="mb-3 font-normal text-gray-700 ">Buildup Area: {buildup_area}</p>
                    <p className="mb-3 font-normal text-gray-700 ">{description.slice(0,200)+"..."}</p>
                </div>
            </a>
        </Link>
    </div>
}
import { useParams } from "react-router-dom";
import { useProperty } from "../hooks";
import { FullPropertyCard } from "../components/FullPropertyCard";
import { AppBar } from "../components/AppBar";
import { Footer } from "../components/footer";

export function Property() {
    const { id } = useParams()
    const { property, loading } = useProperty({ id: id })

    if (loading) {
        return <div>
            <AppBar />
            <div className="max-w-screen-xl mx-auto p-4">
                <div className=" h-screen flex items-center justify-center">
                    <div className="flex items-center justify-center">
                        <div className="px-5 py-1 text-3xl font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse ">loading...</div>
                    </div>
                </div>
            </div>
        </div>
    }
    return <div>
        <AppBar />
        <div className="max-w-screen-xl mx-auto p-4 ">
            <div className="mix-w-3xl mx-auto p-4 ">
                <FullPropertyCard description={property?.description}
                    price={property?.price}
                    location={property?.location}
                    buildup_area={property?.buildup_area}
                    image={property?.image}
                    kitchen={property?.no_kitchens}
                    bedrooms={property?.no_bedroooms}
                    toilets={property?.no_toilets}
                    amenities={property?.amenities}
                    parking={property?.car_parking}
                    selection={property?.selection}
                    id={property?.owner.id}
                    ownerName={property?.owner.username}
                    ownerNumber={property?.owner.mobileNumber}
                    ownerEmail={property?.owner.email}
                />
            </div>
        </div>
        
        <Footer />
    </div>
}
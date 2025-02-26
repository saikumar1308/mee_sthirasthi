import { useParams } from "react-router-dom";
import { useProperties } from "../hooks"
import { PropertyCard } from "../components/PropertyCard";
import { AppBar } from "../components/AppBar";
import { Footer } from "../components/footer";

export function AllProperties() {
    const { selection } = useParams()
    const { properties, loading } = useProperties({ selection: selection || "rent" });

    if (loading) {
        return <div>
            <AppBar />
            <div className="max-w-screen-xl mx-auto p-4">
                <div className=" h-screen flex items-center justify-center">
                    {/* <div className="flex items-center justify-center"> */}
                        <div className="px-5 py-1 text-3xl font-medium leading-none text-center text-red-800  rounded-full animate-pulse ">loading...</div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    }

    return <div>
        <AppBar />
        <div className="max-w-screen-xl mx-auto p-4">
            <div className="max-w-xl mx-auto p-4">
                {properties.map(property => (<PropertyCard description={property?.description}
                    price={property?.price}
                    location={property?.location}
                    buildup_area={property?.buildup_area}
                    id={property?.id}
                    selection={property?.selection}
                    image={property?.image}
                />))}
            </div>
        </div>
        <Footer />
    </div>
}
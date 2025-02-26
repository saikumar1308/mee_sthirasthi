import { AppBar } from "../components/AppBar";
import { Footer } from "../components/footer";
import { TopComp } from "../components/TopComp";
import { TopPicks } from "../components/TopPicks";
import { useAllProperties } from "../hooks";

export function Home() {
    const { AllProperties } = useAllProperties();
    console.log("hello")
    
    return <div>
        <AppBar />
        <div className="max-w-screen-xl mx-auto p-4">
            <div className="bg-[url('https://content.r9cdn.net/rimg/dimg/a9/b2/ca54450a-city-7297-164a3add188.jpg?crop=true&width=1366&height=768&xhint=2449&yhint=1156')] bg-blend-multiply bg-center bg-no-repeat rounded-xl md:min-h-100 max-h-80">
                <div className="  mx-auto md:max-w-md max-w-sm text-center md:px-4 md:py-35 px-10 py-15">
                    <div className="backdrop-blur-xs  rounded-xl">
                        <TopComp />
                    </div>
                </div>
            </div>
            <div className="my-6 ">
                <h1 className="text-3xl mb-3">Top Picks</h1>
                <div className="flex overflow-auto snap-mandatory scroll-smooth">
                    {AllProperties.map((property) => (<TopPicks key={property.id} id={property.id} 
                    image={property.image} description={property.description} title={property.location} />))}
                </div>
            </div>
        </div>
        <Footer />
    </div>


}
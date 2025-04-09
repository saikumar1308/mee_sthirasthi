import { AppBar } from "../components/AppBar";
import { Footer } from "../components/footer";
import { TopComp } from "../components/TopComp";
import { TopPicks } from "../components/TopPicks";
import { useAllProperties } from "../hooks";

export function Home() {
    const { AllProperties, loading } = useAllProperties();

    if (loading) {
        return <div>
            <AppBar />
            <div className="max-w-screen-xl mx-auto p-4">
                <div className="bg-[url('/Sthirasthi-bg.jpg')] bg-blend-multiply bg-center bg-no-repeat rounded-xl md:min-h-100 max-h-80">
                    <div className="  mx-auto md:max-w-md max-w-sm text-center md:px-4 md:py-35 px-10 py-15">
                        <div className="backdrop-blur-xs rounded-xl">
                            <TopComp />
                        </div>
                    </div>
                </div>
                <div className="my-6 ">
                    <h1 className="text-3xl mb-3">Top Picks</h1>
                    <div className="flex overflow-x-auto snap-mandatory scrollbar-hide">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} role="status" className="min-w-xs bg-white border border-gray-200 rounded-lg mx-2 shadow-sm animate-pulse  ">
                                <div className="w-full object-cover h-50 mb-4 bg-gray-300 rounded-t-lg ">
                                    <svg className="w-full h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                    </svg>
                                </div>
                                <div className="p-5">
                                    <div className="h-5 bg-gray-200 rounded-full w-40 mb-4"></div>
                                    <div className="h-3 bg-gray-200 rounded-full mb-3"></div>
                                    <div className="h-3 bg-gray-200 rounded-full mb-3"></div>
                                    <div className="h-3 bg-gray-200 rounded-full mb-3"></div>
                                    <div className="flex items-center mt-4">

                                        <div>
                                            <div className="h-8 bg-gray-200 rounded-lg w-32 mb-2"></div>

                                        </div>
                                    </div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>
            <Footer />
        </div>
    }

    return <div>
        <AppBar />
        <div className="max-w-screen-xl mx-auto p-4">
            <div className="bg-[url('/Sthirasthi-bg.jpg')] bg-blend-multiply bg-center bg-no-repeat rounded-xl md:min-h-100 max-h-80">
                <div className="  mx-auto md:max-w-md max-w-sm text-center md:px-4 md:py-35 px-10 py-15">
                    <div className="backdrop-blur-xs  rounded-xl">
                        <TopComp />
                    </div>
                </div>
            </div>
            <div className="my-6 ">
                <h1 className="text-3xl mb-3">Top Picks</h1>
                <div className="flex overflow-auto snap-mandatory scroll-smooth scrollbar-hide">
                    {AllProperties.map((property) => (<TopPicks key={property.id} id={property.id}
                        image={property.image} description={property.description} title={property.location} selection={property.selection} />))}
                </div>
            </div>
        </div>
        <Footer />
    </div>


}
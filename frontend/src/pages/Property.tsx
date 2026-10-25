import { useParams, Link } from "react-router-dom"
import { useProperty, useProperties } from "../hooks"
import { FullPropertyCard } from "../components/FullPropertyCard"
import { TopPicks } from "../components/TopPicks"
import { AppBar } from "../components/AppBar"
import { Footer } from "../components/footer"

export function Property() {
    const { id, selection } = useParams<{ id: string; selection?: string }>()
    const { property, loading } = useProperty({ id: id })
    const activeSelection = property?.selection || selection || "rent"
    const { properties: similarList } = useProperties({ selection: activeSelection })

    // Filter out current property and grab top 3-4
    const similarProperties = (similarList || [])
        .filter((p) => p.id !== id)
        .slice(0, 4)

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
                <AppBar />
                <div className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
                    {/* Skeleton Loader */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
                        <div className="w-full h-80 sm:h-96 bg-slate-200" />
                        <div className="p-6 sm:p-8 space-y-6">
                            <div className="h-8 bg-slate-200 rounded-lg w-3/4" />
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="h-20 bg-slate-100 rounded-2xl" />
                                ))}
                            </div>
                            <div className="space-y-3">
                                <div className="h-4 bg-slate-200 rounded-md w-full" />
                                <div className="h-4 bg-slate-200 rounded-md w-5/6" />
                                <div className="h-4 bg-slate-200 rounded-md w-2/3" />
                            </div>
                            <div className="h-24 bg-slate-100 rounded-2xl" />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
                <AppBar />
                <div className="max-w-md mx-auto px-4 py-24 text-center flex-1">
                    <div className="text-5xl mb-4">🏠</div>
                    <h2 className="text-2xl font-bold text-slate-800">Property Not Found</h2>
                    <p className="text-slate-500 text-sm mt-2">
                        The property listing you are looking for may have been rented, sold, or removed.
                    </p>
                    <Link
                        to="/properties/rent"
                        className="inline-block mt-6 px-6 py-3 bg-[#1E3A5F] text-white rounded-xl text-sm font-semibold hover:bg-[#142844] transition-colors"
                    >
                        Browse Other Properties
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <AppBar />

            {/* ─── Breadcrumb Navigation ───────────────────────────────── */}
            <div className="bg-white border-b border-slate-200 py-3.5 px-4">
                <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs sm:text-sm text-slate-500 truncate">
                    <Link to="/" className="hover:text-[#1E3A5F] transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <Link
                        to={`/properties/${activeSelection}`}
                        className="hover:text-[#1E3A5F] capitalize transition-colors"
                    >
                        {activeSelection}
                    </Link>
                    <span>/</span>
                    <span className="text-slate-900 font-semibold truncate">
                        {property.location || "Details"}
                    </span>
                </div>
            </div>

            {/* ─── Main Property Card ──────────────────────────────────── */}
            <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
                <FullPropertyCard
                    description={property.description}
                    price={property.price}
                    location={property.location}
                    buildup_area={property.buildup_area}
                    image={property.image}
                    kitchen={property.no_kitchens}
                    bedrooms={property.no_bedroooms}
                    toilets={property.no_toilets}
                    amenities={property.amenities}
                    parking={property.car_parking}
                    selection={property.selection}
                    id={property.owner?.id}
                    ownerName={property.owner?.username}
                    ownerNumber={property.owner?.mobileNumber}
                    ownerEmail={property.owner?.email}
                />

                {/* ─── Similar Properties Section ──────────────────────── */}
                {similarProperties.length > 0 && (
                    <section className="mt-14 pt-10 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    Similar Properties You May Like
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                                    More {activeSelection} listings in Telugu states
                                </p>
                            </div>
                            <Link
                                to={`/properties/${activeSelection}`}
                                className="text-xs sm:text-sm font-bold text-[#1E3A5F] hover:text-amber-600 transition-colors"
                            >
                                View All →
                            </Link>
                        </div>

                        <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide -mx-2 px-2">
                            {similarProperties.map((p) => (
                                <TopPicks
                                    key={p.id}
                                    id={p.id}
                                    image={p.image}
                                    title={p.location}
                                    location={p.location}
                                    description={p.description}
                                    selection={p.selection}
                                    price={p.price}
                                    buildup_area={p.buildup_area}
                                    no_bedroooms={p.no_bedroooms}
                                    no_toilets={p.no_toilets}
                                    car_parking={p.car_parking}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    )
}
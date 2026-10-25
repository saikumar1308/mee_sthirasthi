import { useState, useMemo } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useProperties } from "../hooks"
import { PropertyCard } from "../components/PropertyCard"
import { AppBar } from "../components/AppBar"
import { Footer } from "../components/footer"

export function AllProperties() {
    const { selection } = useParams<{ selection: string }>()
    const activeSelection = selection || "rent"
    const { properties, loading } = useProperties({ selection: activeSelection })
    const navigate = useNavigate()

    // Filter and Sort states
    const [searchQuery, setSearchQuery] = useState("")
    const [bedroomFilter, setBedroomFilter] = useState<string>("all")
    const [sortBy, setSortBy] = useState<string>("default")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

    const categories = [
        { id: "rent", label: "For Rent", telugu: "బాడిగకు", icon: "🔑" },
        { id: "buy", label: "For Buy / Sale", telugu: "కొనుగోలు", icon: "🏠" },
        { id: "lease", label: "For Lease", telugu: "లీజుకు", icon: "📜" },
    ]

    // Filter and sort logic
    const filteredProperties = useMemo(() => {
        let result = [...(properties || [])]

        // Search query filter (location or description)
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim()
            result = result.filter(
                (p) =>
                    p.location?.toLowerCase().includes(q) ||
                    p.description?.toLowerCase().includes(q)
            )
        }

        // Bedroom filter
        if (bedroomFilter !== "all") {
            const bhk = parseInt(bedroomFilter)
            if (bhk === 4) {
                result = result.filter((p) => (p.no_bedroooms || 0) >= 4)
            } else {
                result = result.filter((p) => p.no_bedroooms === bhk)
            }
        }

        // Sort logic
        if (sortBy === "price_asc") {
            result.sort((a, b) => (a.price || 0) - (b.price || 0))
        } else if (sortBy === "price_desc") {
            result.sort((a, b) => (b.price || 0) - (a.price || 0))
        } else if (sortBy === "area_desc") {
            result.sort((a, b) => (b.buildup_area || 0) - (a.buildup_area || 0))
        }

        return result
    }, [properties, searchQuery, bedroomFilter, sortBy])

    const hasActiveFilters = searchQuery.trim() !== "" || bedroomFilter !== "all" || sortBy !== "default"

    const clearFilters = () => {
        setSearchQuery("")
        setBedroomFilter("all")
        setSortBy("default")
    }

    const getSelectionTitle = () => {
        switch (activeSelection.toLowerCase()) {
            case "rent":
                return "Properties for Rent"
            case "buy":
                return "Properties for Buy & Sale"
            case "lease":
                return "Properties for Commercial Lease"
            default:
                return "Explore Properties"
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <AppBar />

            {/* ─── Header & Breadcrumb ─────────────────────────────────── */}
            <div className="bg-[#142844] text-white py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mb-3">
                        <Link to="/" className="hover:text-amber-300 transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-slate-400">Properties</span>
                        <span>/</span>
                        <span className="text-amber-400 font-semibold capitalize">
                            {activeSelection}
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                                {getSelectionTitle()}
                            </h1>
                            <p className="text-slate-300 text-sm sm:text-base mt-1.5 max-w-2xl">
                                Verified listings across Hyderabad, Visakhapatnam, Vijayawada, and other top localities with zero brokerage fees.
                            </p>
                        </div>

                        {/* Category switcher pills */}
                        <div className="flex bg-[#1E3A5F]/80 p-1.5 rounded-xl border border-white/10 gap-1 overflow-x-auto">
                            {categories.map((cat) => {
                                const isActive = activeSelection.toLowerCase() === cat.id
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => navigate(`/properties/${cat.id}`)}
                                        className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                                            isActive
                                                ? "bg-amber-400 text-[#142844] shadow-md font-bold"
                                                : "text-slate-200 hover:text-white hover:bg-white/10"
                                        }`}
                                    >
                                        <span>{cat.icon}</span>
                                        <span>{cat.label}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Filter & Toolbar ────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 w-full -mt-4 z-10">
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-5">
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Filter by city, locality or area (e.g. Hyderabad, Gachibowli)"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Bedroom Filter Pills */}
                        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
                            <span className="text-xs font-semibold text-slate-500 mr-1 hidden sm:inline">
                                Bedrooms:
                            </span>
                            {[
                                { id: "all", label: "All" },
                                { id: "1", label: "1 BHK" },
                                { id: "2", label: "2 BHK" },
                                { id: "3", label: "3 BHK" },
                                { id: "4", label: "4+ BHK" },
                            ].map((bhk) => (
                                <button
                                    key={bhk.id}
                                    onClick={() => setBedroomFilter(bhk.id)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                                        bedroomFilter === bhk.id
                                            ? "bg-[#1E3A5F] text-white shadow-xs"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                                >
                                    {bhk.label}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] cursor-pointer"
                            >
                                <option value="default">Sort: Default</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="area_desc">Area: Largest First</option>
                            </select>

                            {/* View Mode Toggle */}
                            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    title="Grid view"
                                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                        viewMode === "grid"
                                            ? "bg-white text-[#1E3A5F] shadow-xs"
                                            : "text-slate-500 hover:text-slate-800"
                                    }`}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    title="List view"
                                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                        viewMode === "list"
                                            ? "bg-white text-[#1E3A5F] shadow-xs"
                                            : "text-slate-500 hover:text-slate-800"
                                    }`}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Active Filter Badges & Count */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                        <div>
                            Showing <span className="font-bold text-slate-800">{filteredProperties.length}</span> {filteredProperties.length === 1 ? "property" : "properties"}
                            {searchQuery && (
                                <span> for "<span className="font-medium text-slate-700">{searchQuery}</span>"</span>
                            )}
                        </div>

                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer"
                            >
                                ✕ Clear all filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ─── Main Content ────────────────────────────────────────── */}
            <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
                {loading ? (
                    /* Skeleton Loader Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs animate-pulse"
                            >
                                <div className="w-full h-52 bg-slate-200" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 bg-slate-200 rounded-md w-3/4" />
                                    <div className="flex gap-2">
                                        <div className="h-6 bg-slate-100 rounded-md w-16" />
                                        <div className="h-6 bg-slate-100 rounded-md w-16" />
                                        <div className="h-6 bg-slate-100 rounded-md w-20" />
                                    </div>
                                    <div className="h-4 bg-slate-200 rounded-md w-full" />
                                    <div className="h-4 bg-slate-100 rounded-md w-2/3" />
                                    <div className="pt-3 border-t border-slate-100 flex justify-between">
                                        <div className="h-4 bg-slate-100 rounded-md w-24" />
                                        <div className="h-4 bg-slate-200 rounded-md w-20" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredProperties.length > 0 ? (
                    /* Properties Display */
                    viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProperties.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    id={property.id}
                                    description={property.description}
                                    price={property.price}
                                    location={property.location}
                                    buildup_area={property.buildup_area}
                                    selection={property.selection}
                                    image={property.image}
                                    no_bedroooms={property.no_bedroooms}
                                    no_toilets={property.no_toilets}
                                    car_parking={property.car_parking}
                                    viewMode="grid"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {filteredProperties.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    id={property.id}
                                    description={property.description}
                                    price={property.price}
                                    location={property.location}
                                    buildup_area={property.buildup_area}
                                    selection={property.selection}
                                    image={property.image}
                                    no_bedroooms={property.no_bedroooms}
                                    no_toilets={property.no_toilets}
                                    car_parking={property.car_parking}
                                    viewMode="list"
                                />
                            ))}
                        </div>
                    )
                ) : (
                    /* Empty State */
                    <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
                        <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-500 text-4xl flex items-center justify-center mx-auto mb-4">
                            🔍
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                            No properties found
                        </h2>
                        <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto leading-relaxed">
                            {hasActiveFilters
                                ? "No listings matched your active filter criteria. Try clearing some filters or searching for another locality."
                                : `No listings are currently available under "${activeSelection}". Check back soon or list your own property!`}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            {hasActiveFilters ? (
                                <button
                                    onClick={clearFilters}
                                    className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] text-white text-sm font-semibold hover:bg-[#142844] transition-colors cursor-pointer"
                                >
                                    Reset Filters
                                </button>
                            ) : null}
                            <button
                                onClick={() => navigate("/properties/sell")}
                                className="px-5 py-2.5 rounded-xl bg-[#F59E0B] text-[#142844] text-sm font-bold hover:bg-[#D97706] transition-colors cursor-pointer"
                            >
                                List a Property Now
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
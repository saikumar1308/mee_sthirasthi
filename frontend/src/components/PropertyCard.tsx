import { useNavigate } from "react-router-dom"
import { formatPrice } from "../utils/formatPrice"

export interface PropertyCardProps {
    id: string
    description: string
    price: number
    location: string
    buildup_area: number
    selection: string
    image: string
    no_bedroooms?: number
    no_toilets?: number
    car_parking?: boolean
    viewMode?: "grid" | "list"
}

export function PropertyCard({
    id,
    description,
    price,
    location,
    buildup_area,
    selection,
    image,
    no_bedroooms,
    no_toilets,
    car_parking,
    viewMode = "grid",
}: PropertyCardProps) {
    const navigate = useNavigate()

    const getBadgeStyle = (sel: string) => {
        switch (sel?.toLowerCase()) {
            case "rent":
                return "bg-blue-100 text-[#1E3A5F] border-blue-200"
            case "buy":
                return "bg-amber-100 text-amber-900 border-amber-200"
            case "lease":
                return "bg-emerald-100 text-emerald-900 border-emerald-200"
            default:
                return "bg-slate-100 text-slate-800 border-slate-200"
        }
    }

    const getSelectionLabel = (sel: string) => {
        switch (sel?.toLowerCase()) {
            case "rent":
                return "For Rent"
            case "buy":
                return "For Sale"
            case "lease":
                return "For Lease"
            default:
                return sel ? `For ${sel}` : "Property"
        }
    }

    const handleCardClick = () => {
        navigate(`/properties/${selection}/${id}`)
    }

    // ─── LIST VIEW ──────────────────────────────────────────
    if (viewMode === "list") {
        return (
            <div
                onClick={handleCardClick}
                className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col md:flex-row mb-4"
            >
                {/* Image */}
                <div className="relative md:w-72 h-52 md:h-auto overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                        src={image || "/Sthirasthi-bg.jpg"}
                        alt={location}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border backdrop-blur-md shadow-xs ${getBadgeStyle(
                                selection
                            )}`}
                        >
                            {getSelectionLabel(selection)}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1.5 text-slate-900 group-hover:text-[#1E3A5F] transition-colors">
                                <svg
                                    className="w-4 h-4 text-amber-500 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <h3 className="text-lg sm:text-xl font-bold">
                                    {location}
                                </h3>
                            </div>
                            <div className="text-xl sm:text-2xl font-black text-[#1E3A5F]">
                                {formatPrice(price, selection)}
                            </div>
                        </div>

                        {/* Specs row */}
                        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs sm:text-sm text-slate-600">
                            {no_bedroooms !== undefined && no_bedroooms > 0 && (
                                <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                                    <span>🛏️</span> {no_bedroooms} BHK
                                </span>
                            )}
                            {no_toilets !== undefined && no_toilets > 0 && (
                                <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                                    <span>🚿</span> {no_toilets} Baths
                                </span>
                            )}
                            {buildup_area > 0 && (
                                <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                                    <span>📐</span> {buildup_area} sq ft
                                </span>
                            )}
                            {car_parking && (
                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-medium border border-emerald-200">
                                    <span>🚗</span> Car Parking
                                </span>
                            )}
                        </div>

                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                            {description || "Verified residential/commercial property with excellent road connectivity."}
                        </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">
                            Direct Owner Listing • No Brokerage
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-[#1E3A5F] group-hover:text-amber-600 transition-colors">
                            View Full Details
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    // ─── GRID VIEW ──────────────────────────────────────────
    return (
        <div
            onClick={handleCardClick}
            className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
        >
            {/* Image Container with Badges */}
            <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                    src={image || "/Sthirasthi-bg.jpg"}
                    alt={location}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Badge for Selection */}
                <div className="absolute top-3 left-3">
                    <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border backdrop-blur-md shadow-xs ${getBadgeStyle(
                            selection
                        )}`}
                    >
                        {getSelectionLabel(selection)}
                    </span>
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-3 left-3">
                    <span className="inline-block bg-[#142844]/90 backdrop-blur-md text-amber-400 font-extrabold text-base sm:text-lg px-3 py-1 rounded-lg shadow-md border border-amber-400/20">
                        {formatPrice(price, selection)}
                    </span>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                    {/* Location Title */}
                    <div className="flex items-start gap-1.5 mb-2">
                        <svg
                            className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors line-clamp-1">
                            {location}
                        </h3>
                    </div>

                    {/* Specs chips */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs text-slate-600">
                        {no_bedroooms !== undefined && no_bedroooms > 0 && (
                            <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md font-medium">
                                <span>🛏️</span> {no_bedroooms} BHK
                            </span>
                        )}
                        {no_toilets !== undefined && no_toilets > 0 && (
                            <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md font-medium">
                                <span>🚿</span> {no_toilets} Baths
                            </span>
                        )}
                        {buildup_area > 0 && (
                            <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md font-medium">
                                <span>📐</span> {buildup_area} sq ft
                            </span>
                        )}
                        {car_parking && (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md font-medium border border-emerald-200">
                                <span>🚗</span> Parking
                            </span>
                        )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {description || "Verified property with excellent road connectivity and amenities."}
                    </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                        Verified Listing
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#1E3A5F] group-hover:text-amber-600 transition-colors">
                        View Details
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    )
}
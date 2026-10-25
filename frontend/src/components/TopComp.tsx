import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface TopCompProps {
    onSearchLocation?: (loc: string) => void
}

export function TopComp({ onSearchLocation }: TopCompProps) {
    const [selection, setSelection] = useState("rent")
    const [locationQuery, setLocationQuery] = useState("")
    const navigate = useNavigate()

    const options = [
        { id: "rent", label: "Rent", telugu: "బాడిగకు", icon: "🔑" },
        { id: "buy", label: "Buy", telugu: "కొనుగోలు", icon: "🏠" },
        { id: "lease", label: "Lease", telugu: "లీజుకు", icon: "📜" },
    ]

    const popularLocations = [
        "Hyderabad",
        "Visakhapatnam",
        "Vijayawada",
        "Gachibowli",
        "Madhapur",
        "Tirupati"
    ]

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        if (locationQuery.trim() && onSearchLocation) {
            onSearchLocation(locationQuery.trim())
        }
        navigate(`/properties/${selection}`)
    }

    return (
        <div className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 sm:p-6 border border-white/40">
            {/* Tabs for Rent / Buy / Lease */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl mb-4 sm:mb-5">
                {options.map((opt) => {
                    const isActive = selection === opt.id
                    return (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelection(opt.id)}
                            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer ${
                                isActive
                                    ? "bg-[#1E3A5F] text-white shadow-md transform scale-[1.01]"
                                    : "text-slate-600 hover:text-[#1E3A5F] hover:bg-white/60"
                            }`}
                        >
                            <span className="text-base sm:text-lg">{opt.icon}</span>
                            <span>{opt.label}</span>
                            <span className={`text-[11px] sm:text-xs font-normal hidden sm:inline ${isActive ? "text-amber-300" : "text-slate-400"}`}>
                                ({opt.telugu})
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Search Input Bar */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        placeholder="Search city, locality or landmark (e.g. Hyderabad, Gachibowli)"
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent transition-all"
                    />
                    {locationQuery && (
                        <button
                            type="button"
                            onClick={() => setLocationQuery("")}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#142844] font-bold py-3.5 px-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer text-sm sm:text-base whitespace-nowrap active:scale-[0.98]"
                >
                    <svg className="w-5 h-5 text-[#142844]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search</span>
                </button>
            </form>

            {/* Quick Location Pills */}
            <div className="mt-3.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span className="font-semibold text-slate-700 mr-1 flex items-center gap-1">
                    <span className="text-amber-500">⚡</span> Popular:
                </span>
                {popularLocations.map((loc) => (
                    <button
                        key={loc}
                        type="button"
                        onClick={() => {
                            setLocationQuery(loc)
                            navigate(`/properties/${selection}`)
                        }}
                        className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-[#1E3A5F] hover:text-white transition-colors cursor-pointer font-medium"
                    >
                        {loc}
                    </button>
                ))}
            </div>
        </div>
    )
}
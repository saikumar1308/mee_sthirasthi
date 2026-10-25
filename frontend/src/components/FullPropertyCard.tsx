import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { formatPrice } from "../utils/formatPrice"
import { toast } from "./Toast"

export interface FullPropertyCardProps {
    id: string
    description?: string
    price?: number
    location?: string
    buildup_area?: number
    image?: string
    kitchen?: number
    bedrooms?: number
    toilets?: number
    amenities?: string
    parking?: boolean
    selection?: string
    ownerName?: string
    ownerNumber?: number
    ownerEmail?: string
}

export function FullPropertyCard({
    id,
    description = "",
    price = 0,
    location = "",
    buildup_area = 0,
    image,
    kitchen = 1,
    bedrooms = 1,
    toilets = 1,
    amenities = "",
    parking = false,
    selection = "rent",
}: FullPropertyCardProps) {
    const [ownerdetails, setOwnerdetails] = useState<any>(null)
    const [loadingOwner, setLoadingOwner] = useState(false)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    // Handle Escape key to close lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsLightboxOpen(false)
            }
        }
        if (isLightboxOpen) {
            window.addEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "hidden"
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "unset"
        }
    }, [isLightboxOpen])

    async function fetchOwnerDetails() {
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("Please sign in to contact the property owner")
            navigate(`/signin?redirect=${encodeURIComponent(window.location.pathname)}`)
            return
        }

        setLoadingOwner(true)
        try {
            const res = await axios.post(
                `${BACKEND_URL}/property/sell/owner`,
                { id },
                {
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                }
            )
            setOwnerdetails(res.data)
            toast.success("Owner details verified!")
        } catch (error) {
            toast.error("Session expired or invalid. Please sign in again.")
            navigate(`/signin?redirect=${encodeURIComponent(window.location.pathname)}`)
            console.error("Error fetching owner details", error)
        } finally {
            setLoadingOwner(false)
        }
    }

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href)
            toast.success("Property link copied to clipboard!")
        } else {
            toast.info("Share URL: " + window.location.href)
        }
    }

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

    // Split amenities by comma or semicolon
    const amenitiesList = amenities
        ? amenities
              .split(/[,;]+/)
              .map((a) => a.trim())
              .filter(Boolean)
        : []

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* ─── Hero Card ────────────────────────────────────────── */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                {/* Hero Image with Lightbox Trigger */}
                <div className="relative w-full h-[320px] sm:h-[440px] md:h-[480px] bg-slate-900 group overflow-hidden">
                    <img
                        src={image || "/Sthirasthi-bg.jpg"}
                        alt={location}
                        onClick={() => setIsLightboxOpen(true)}
                        className="w-full h-full object-cover cursor-zoom-in group-hover:scale-102 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                    {/* Top action badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-auto">
                        <span
                            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide border shadow-md backdrop-blur-md ${getBadgeStyle(
                                selection
                            )}`}
                        >
                            {getSelectionLabel(selection)}
                        </span>

                        <div className="flex items-center gap-2">
                            {/* Share button */}
                            <button
                                onClick={handleShare}
                                title="Share property"
                                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg backdrop-blur-md transition-all cursor-pointer hover:scale-105"
                            >
                                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </button>

                            {/* Expand image button */}
                            <button
                                onClick={() => setIsLightboxOpen(true)}
                                title="Open full-screen image"
                                className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg backdrop-blur-md transition-all cursor-pointer hover:scale-105"
                            >
                                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Bottom overlay info: Title & Price */}
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-1.5 text-amber-300 text-sm font-semibold mb-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Verified Property Location</span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
                                    {location}
                                </h1>
                            </div>

                            {/* Price Pill */}
                            <div className="bg-[#142844]/90 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-amber-400/30 shadow-xl pointer-events-auto">
                                <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold block">
                                    Expected Price
                                </span>
                                <span className="text-2xl sm:text-3xl font-black text-amber-400">
                                    {formatPrice(price, selection)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Details Body ────────────────────────────────────── */}
                <div className="p-6 sm:p-8 space-y-8">
                    {/* Key Specifications Grid */}
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="text-amber-500">📐</span> Property Specifications
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                            {/* Bedrooms */}
                            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 flex-shrink-0 shadow-xs">
                                    <img src="/bedroom.svg" alt="Bedrooms" className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Bedrooms</div>
                                    <div className="text-base font-bold text-slate-900">{bedrooms} BHK</div>
                                </div>
                            </div>

                            {/* Bathrooms */}
                            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 flex-shrink-0 shadow-xs">
                                    <img src="/bathroom.svg" alt="Bathrooms" className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Bathrooms</div>
                                    <div className="text-base font-bold text-slate-900">{toilets} Attached/Common</div>
                                </div>
                            </div>

                            {/* Kitchens */}
                            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 flex-shrink-0 shadow-xs">
                                    <img src="/kitchen.svg" alt="Kitchen" className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Kitchens</div>
                                    <div className="text-base font-bold text-slate-900">{kitchen} Kitchen(s)</div>
                                </div>
                            </div>

                            {/* Parking */}
                            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 flex-shrink-0 shadow-xs">
                                    <img src="/car.svg" alt="Parking" className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Parking</div>
                                    <div className="text-base font-bold text-slate-900">
                                        {parking ? "Car Parking Available" : "No Reserved Parking"}
                                    </div>
                                </div>
                            </div>

                            {/* Buildup Area */}
                            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 flex-shrink-0 shadow-xs">
                                    <img src="/area.svg" alt="Area" className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Buildup Area</div>
                                    <div className="text-base font-bold text-slate-900">{buildup_area} Sq. Ft.</div>
                                </div>
                            </div>

                            {/* Possession */}
                            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 flex-shrink-0 shadow-xs">
                                    <img src="/key.svg" alt="Possession" className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-medium">Possession Status</div>
                                    <div className="text-base font-bold text-emerald-700">Immediate Possession</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="pt-6 border-t border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <span className="text-amber-500">📝</span> About this Property
                        </h2>
                        <div className="space-y-3 text-slate-600 leading-relaxed text-sm sm:text-base bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
                            {description ? (
                                description
                                    .split(/(?<=\.)\s+/)
                                    .reduce((acc: string[][], sentence: string, index: number) => {
                                        if (index % 3 === 0) acc.push([])
                                        acc[acc.length - 1].push(sentence)
                                        return acc
                                    }, [])
                                    .map((group: string[], index: number) => (
                                        <p key={index}>{group.join(" ")}</p>
                                    ))
                            ) : (
                                <p>Prime property in a well-developed neighborhood with immediate accessibility to schools, hospitals, and transit hubs.</p>
                            )}
                        </div>
                    </div>

                    {/* Amenities Section */}
                    <div className="pt-6 border-t border-slate-100">
                        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <span className="text-amber-500">✨</span> Amenities & Features
                        </h2>
                        {amenitiesList.length > 0 ? (
                            <div className="flex flex-wrap gap-2.5">
                                {amenitiesList.map((amenity, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-medium text-xs sm:text-sm border border-slate-200"
                                    >
                                        <span className="text-emerald-500 font-bold">✓</span>
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400">
                                24/7 Water Supply, Power Backup, Security Guard, Gated Community.
                            </p>
                        )}
                    </div>

                    {/* ─── Owner Contact Card ────────────────────────────── */}
                    <div className="pt-6 border-t border-slate-100">
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl border border-blue-100 p-6 sm:p-7">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[#1E3A5F] text-white text-xl font-bold flex items-center justify-center shadow-md flex-shrink-0">
                                        {ownerdetails?.username
                                            ? ownerdetails.username.charAt(0).toUpperCase()
                                            : "👤"}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-bold text-slate-900">
                                                {ownerdetails?.username ? ownerdetails.username : "Property Owner"}
                                            </h3>
                                            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                                                Verified Owner
                                            </span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                                            Direct listing with zero brokerage fees.
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {!ownerdetails ? (
                                    <button
                                        onClick={fetchOwnerDetails}
                                        disabled={loadingOwner}
                                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#142844] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98 disabled:opacity-60"
                                    >
                                        {loadingOwner ? (
                                            <>
                                                <span className="spinner !w-4 !h-4" />
                                                <span>Verifying...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>📞</span>
                                                <span>Get Owner Details</span>
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2.5">
                                        {ownerdetails.mobileNumber && (
                                            <a
                                                href={`tel:${ownerdetails.mobileNumber}`}
                                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                                            >
                                                <span>📞 Call</span>
                                                <span>{ownerdetails.mobileNumber}</span>
                                            </a>
                                        )}
                                        {ownerdetails.email && (
                                            <a
                                                href={`mailto:${ownerdetails.email}`}
                                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm shadow-xs transition-all cursor-pointer"
                                            >
                                                <span>✉️ Email</span>
                                                <span className="truncate max-w-[160px]">{ownerdetails.email}</span>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>

                            {!ownerdetails && (
                                <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5">
                                    <span>🔒</span> Login required to contact property owners for privacy & spam prevention.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Image Lightbox Modal ──────────────────────────────── */}
            {isLightboxOpen && (
                <div
                    onClick={() => setIsLightboxOpen(false)}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity animate-fadeIn"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            aria-label="Close lightbox"
                            className="absolute -top-12 right-0 sm:right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer text-lg font-bold"
                        >
                            ✕
                        </button>

                        <img
                            src={image || "/Sthirasthi-bg.jpg"}
                            alt={location}
                            className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
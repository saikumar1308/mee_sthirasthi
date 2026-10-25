import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { AppBar } from "../components/AppBar"
import { Footer } from "../components/footer"
import { TopComp } from "../components/TopComp"
import { TopPicks } from "../components/TopPicks"
import { useAllProperties } from "../hooks"

export function Home() {
    const { AllProperties, loading } = useAllProperties()
    const [activeFilter, setActiveFilter] = useState<string>("all")
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" })
        }
    }

    // Filter properties based on active tab
    const filteredProperties = (AllProperties || []).filter((prop) => {
        if (activeFilter === "all") return true
        return prop.selection?.toLowerCase() === activeFilter.toLowerCase()
    })

    const categories = [
        {
            title: "Properties for Rent",
            subtitle: "Apartments, villas & independent houses",
            icon: "🔑",
            route: "/properties/rent",
            count: "500+ listings",
            bg: "hover:border-blue-400",
        },
        {
            title: "Properties to Buy",
            subtitle: "Ready-to-move homes & residential plots",
            icon: "🏠",
            route: "/properties/buy",
            count: "400+ listings",
            bg: "hover:border-amber-400",
        },
        {
            title: "Commercial & Lease",
            subtitle: "Offices, retail spaces & showrooms",
            icon: "🏢",
            route: "/properties/lease",
            count: "250+ listings",
            bg: "hover:border-emerald-400",
        },
        {
            title: "List Property Free",
            subtitle: "Reach verified buyers & zero commission",
            icon: "✨",
            route: "/properties/sell",
            count: "3-Step Wizard",
            bg: "hover:border-purple-400",
        },
    ]

    const stats = [
        { label: "Verified Listings", value: "1,500+", icon: "🏡" },
        { label: "Prime Cities & Towns", value: "15+", icon: "🏙️" },
        { label: "Happy Families", value: "5,000+", icon: "🤝" },
        { label: "Brokerage Commission", value: "0%", icon: "⚡" },
    ]

    const features = [
        {
            icon: "🛡️",
            title: "Zero Brokerage Hassle",
            desc: "Contact genuine property owners directly. No middleman, no hidden commission fees.",
        },
        {
            icon: "✅",
            title: "100% Verified Details",
            desc: "Authentic photos, accurate buildup dimensions, and transparent prices.",
        },
        {
            icon: "⚡",
            title: "Instant 3-Step Listing",
            desc: "Post your property in under 3 minutes with our intuitive listing wizard.",
        },
        {
            icon: "📍",
            title: "Telugu States Focused",
            desc: "Dedicated to Hyderabad, Visakhapatnam, Vijayawada, Guntur, and beyond.",
        },
    ]

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <AppBar />

            {/* ─── Hero Section ────────────────────────────────────────── */}
            <section className="relative w-full overflow-hidden">
                {/* Background Banner with Gradient Overlay */}
                <div
                    className="relative min-h-[560px] sm:min-h-[620px] flex items-center justify-center bg-cover bg-center px-4 py-16"
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(20, 40, 68, 0.78) 0%, rgba(30, 58, 95, 0.90) 100%), url('/Sthirasthi-bg.jpg')`,
                    }}
                >
                    <div className="max-w-4xl mx-auto text-center z-10 w-full">
                        {/* Trust Pill */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-amber-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            #1 Property Portal across Telangana & Andhra Pradesh
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
                            Find Your Dream Property in{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                                Telugu States
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
                            Discover verified flats, villas, plots, and commercial spaces with zero brokerage and direct owner contact.
                        </p>

                        {/* TopComp Search Widget */}
                        <TopComp />
                    </div>
                </div>
            </section>

            {/* ─── Stats Bar ───────────────────────────────────────────── */}
            <section className="relative z-20 -mt-8 max-w-6xl mx-auto px-4 w-full">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-3.5 p-2 sm:px-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-50 text-2xl flex items-center justify-center flex-shrink-0">
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl font-black text-[#1E3A5F]">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-slate-500 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Explore Categories ──────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-4 py-16 w-full">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                        Categories
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142844] mt-2">
                        Explore Properties by Need
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base mt-2">
                        Whether you are looking to rent your next home, buy forever, or find business spaces.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {categories.map((cat, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(cat.route)}
                            className={`group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between ${cat.bg}`}
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-[#1E3A5F] text-2xl flex items-center justify-center transition-colors mb-4">
                                    <span className="group-hover:scale-110 transition-transform">
                                        {cat.icon}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1E3A5F] transition-colors">
                                    {cat.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                                    {cat.subtitle}
                                </p>
                            </div>
                            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                                    {cat.count}
                                </span>
                                <span className="text-xs font-bold text-[#1E3A5F] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                    Explore →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Top Picks Section ───────────────────────────────────── */}
            <section className="bg-slate-100/70 py-16 border-y border-slate-200/60">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header with Title and Scroll Controls */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-amber-500 text-lg">⭐</span>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Handpicked For You
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#142844] mt-1">
                                Featured Top Picks
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">
                                High-demand verified properties ready for immediate inspection.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {/* Filter Pills */}
                            <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
                                {["all", "rent", "buy", "lease"].map((f) => (
                                    <button
                                        key={f}
                                        type="button"
                                        onClick={() => setActiveFilter(f)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all cursor-pointer ${
                                            activeFilter === f
                                                ? "bg-[#1E3A5F] text-white shadow-xs"
                                                : "text-slate-600 hover:text-slate-900"
                                        }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>

                            {/* Carousel Arrow Controls */}
                            <div className="hidden sm:flex items-center gap-1.5">
                                <button
                                    onClick={scrollLeft}
                                    aria-label="Scroll left"
                                    className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={scrollRight}
                                    aria-label="Scroll right"
                                    className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* View All link */}
                            <button
                                onClick={() => navigate(activeFilter === "all" ? "/properties/rent" : `/properties/${activeFilter}`)}
                                className="text-xs sm:text-sm font-bold text-[#1E3A5F] hover:text-amber-600 inline-flex items-center gap-1 cursor-pointer ml-1"
                            >
                                View All →
                            </button>
                        </div>
                    </div>

                    {/* Carousel Content */}
                    {loading ? (
                        /* Skeleton loader */
                        <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="min-w-[300px] bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-pulse flex-shrink-0"
                                >
                                    <div className="w-full h-48 bg-slate-200" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-5 bg-slate-200 rounded-md w-3/4" />
                                        <div className="flex gap-2">
                                            <div className="h-6 bg-slate-100 rounded-md w-16" />
                                            <div className="h-6 bg-slate-100 rounded-md w-16" />
                                        </div>
                                        <div className="h-4 bg-slate-200 rounded-md w-full" />
                                        <div className="h-4 bg-slate-100 rounded-md w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredProperties.length > 0 ? (
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-2.5 px-2.5"
                        >
                            {filteredProperties.map((property) => (
                                <TopPicks
                                    key={property.id}
                                    id={property.id}
                                    image={property.image}
                                    title={property.location}
                                    location={property.location}
                                    description={property.description}
                                    selection={property.selection}
                                    price={property.price}
                                    buildup_area={property.buildup_area}
                                    no_bedroooms={property.no_bedroooms}
                                    no_toilets={property.no_toilets}
                                    no_kitchens={property.no_kitchens}
                                    car_parking={property.car_parking}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
                            <div className="text-4xl mb-3">🏡</div>
                            <h3 className="text-lg font-bold text-slate-800">
                                No properties in this category yet
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Be the first to list a property under {activeFilter}!
                            </p>
                            <button
                                onClick={() => navigate("/properties/sell")}
                                className="mt-4 px-5 py-2.5 bg-[#1E3A5F] text-white rounded-xl text-sm font-semibold hover:bg-[#142844] transition-colors cursor-pointer"
                            >
                                List Property Now
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ─── Why Choose Us Section ───────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-4 py-20 w-full">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A5F] bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
                        The Mee Sthirasthi Advantage
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-[#142844] mt-3">
                        Why Thousands Choose Us
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base mt-2">
                        Designed ground up for buyers, renters, and landlords across Telangana and Andhra Pradesh.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feat, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
                        >
                            <div className="w-12 h-12 rounded-xl bg-amber-50 text-2xl flex items-center justify-center mb-4">
                                {feat.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                {feat.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Landlord / Seller CTA Banner ────────────────────────── */}
            <section className="max-w-6xl mx-auto px-4 pb-20 w-full">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#142844] via-[#1E3A5F] to-[#254673] text-white p-8 sm:p-12 shadow-2xl">
                    <div className="relative z-10 max-w-2xl">
                        <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-400/30">
                            For Property Owners & Landlords
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                            Post Your Property for Free & Find Tenants in Days
                        </h2>
                        <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                            Zero brokerage commission. Reach thousands of verified buyers and tenants across Hyderabad, Visakhapatnam, and Vijayawada.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <button
                                onClick={() => navigate("/properties/sell")}
                                className="px-7 py-3.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#142844] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-98"
                            >
                                List Your Property Now →
                            </button>
                            <span className="text-xs text-slate-300 flex items-center gap-1.5">
                                <span className="text-emerald-400 font-bold">✓</span> Takes under 3 minutes
                            </span>
                        </div>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-0 right-10 text-9xl opacity-10 select-none pointer-events-none">
                        🏡
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
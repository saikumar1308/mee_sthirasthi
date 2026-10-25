import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

export function AppBar() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Detect auth state
    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem("token"))
    }, [])

    function handleLogout() {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        navigate("/")
    }

    const navLinks = (
        <>
            <a
                onClick={() => { setIsOpen(false); navigate("/properties/rent") }}
                className="appbar-link"
            >
                Browse
            </a>
            <a
                onClick={() => { setIsOpen(false); navigate("/properties/sell") }}
                className="appbar-link"
            >
                Sell / Rent
            </a>
            <a href="#footer" onClick={() => setIsOpen(false)} className="appbar-link">
                Contact
            </a>
        </>
    )

    return (
        <div className="relative z-50">
            <nav
                style={{
                    background: "#fff",
                    borderBottom: "1px solid #E2E8F0",
                    boxShadow: "0 1px 8px rgba(30,58,95,0.06)",
                }}
            >
                <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">
                    {/* Logo - Telugu Name */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/logo.svg" alt="logo" className="w-9 h-9" />
                        <span
                            className="gurajada-regular text-2xl sm:text-3xl font-bold whitespace-nowrap"
                            style={{ color: "#1E3A5F" }}
                        >
                            మీ స్థిరాస్థి
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks}
                        <div className="w-px h-5 bg-[#E2E8F0] mx-2" />
                        {isLoggedIn ? (
                            <button className="appbar-btn-outline" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    className="appbar-btn-outline"
                                    onClick={() => {
                                        const cur = window.location.pathname + window.location.search
                                        navigate(cur !== "/signin" && cur !== "/signup" ? `/signin?redirect=${encodeURIComponent(cur)}` : "/signin")
                                    }}
                                >
                                    Login
                                </button>
                                <button
                                    className="appbar-btn"
                                    onClick={() => {
                                        const cur = window.location.pathname + window.location.search
                                        navigate(cur !== "/signin" && cur !== "/signup" ? `/signup?redirect=${encodeURIComponent(cur)}` : "/signup")
                                    }}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        type="button"
                        className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-[#64748B] rounded-lg md:hidden hover:bg-[#F1F5F9]"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                    style={{ borderTop: isOpen ? "1px solid #E2E8F0" : "none" }}
                >
                    <div className="flex flex-col gap-1 px-4 py-3">
                        <a
                            onClick={() => { setIsOpen(false); navigate("/properties/rent") }}
                            className="appbar-link py-2 block"
                        >
                            Browse
                        </a>
                        <a
                            onClick={() => { setIsOpen(false); navigate("/properties/sell") }}
                            className="appbar-link py-2 block"
                        >
                            Sell / Rent
                        </a>
                        <a href="#footer" onClick={() => setIsOpen(false)} className="appbar-link py-2 block">
                            Contact
                        </a>
                        <div className="h-px bg-[#E2E8F0] my-2" />
                        {isLoggedIn ? (
                            <button
                                className="appbar-btn-outline w-full mt-1"
                                onClick={() => { setIsOpen(false); handleLogout() }}
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex gap-2 mt-1">
                                <button
                                    className="appbar-btn-outline flex-1"
                                    onClick={() => {
                                        setIsOpen(false)
                                        const cur = window.location.pathname + window.location.search
                                        navigate(cur !== "/signin" && cur !== "/signup" ? `/signin?redirect=${encodeURIComponent(cur)}` : "/signin")
                                    }}
                                >
                                    Login
                                </button>
                                <button
                                    className="appbar-btn flex-1"
                                    onClick={() => {
                                        setIsOpen(false)
                                        const cur = window.location.pathname + window.location.search
                                        navigate(cur !== "/signin" && cur !== "/signup" ? `/signup?redirect=${encodeURIComponent(cur)}` : "/signup")
                                    }}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}
import { Link } from "react-router-dom"

export function Footer() {
    return (
        <footer
            id="footer"
            style={{
                background: "linear-gradient(135deg, #142844 0%, #1E3A5F 100%)",
                marginTop: 64,
                color: "#fff",
            }}
        >
            <div className="max-w-screen-xl mx-auto px-6 py-14">
                <div className="grid md:grid-cols-3 gap-10">
                    {/* Brand - English Name */}
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-4 text-white hover:opacity-90 transition-opacity">
                            <img src="/logo.svg" className="h-9 brightness-0 invert" alt="Mee Sthiraasthi Logo" />
                            <span
                                className="font-playfair text-2xl font-bold whitespace-nowrap"
                                style={{ color: "#FCD34D" }}
                            >
                                Mee Sthiraasthi
                            </span>
                        </Link>
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>
                            Your trusted partner for buying, selling, and renting properties across Telangana &amp; Andhra Pradesh.
                        </p>
                    </div>

                    {/* Quick Links with React Router Link */}
                    <div>
                        <h3 style={{ color: "#FCD34D", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {[
                                { label: "Browse for Rent", href: "/properties/rent" },
                                { label: "Properties for Sale", href: "/properties/buy" },
                                { label: "Properties for Lease", href: "/properties/lease" },
                                { label: "List Your Property", href: "/properties/sell" },
                            ].map((l) => (
                                <li key={l.label}>
                                    <Link
                                        to={l.href}
                                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                        style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "#FCD34D")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Developer / Contact */}
                    <div>
                        <h3 style={{ color: "#FCD34D", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>
                            Get in Touch
                        </h3>
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, marginBottom: 14 }}>
                            Built by <strong style={{ color: "#fff" }}>Sai Kumar</strong>
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { label: "Email", href: "mailto:saikumarpentala@gmail.com" },
                                { label: "GitHub", href: "https://github.com/saikumar1308" },
                                { label: "Discord", href: "http://discord.com/users/1015938234078998569" },
                                { label: "Instagram", href: "http://www.instagram.com/saikumar_7989/" },
                            ].map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-block",
                                        padding: "6px 14px",
                                        borderRadius: 20,
                                        border: "1px solid rgba(255,255,255,0.2)",
                                        color: "rgba(255,255,255,0.75)",
                                        fontSize: 13,
                                        textDecoration: "none",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "#FCD34D"
                                        e.currentTarget.style.color = "#FCD34D"
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"
                                        e.currentTarget.style.color = "rgba(255,255,255,0.75)"
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider + Copyright */}
                <div
                    style={{
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                        marginTop: 40,
                        paddingTop: 24,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 12,
                    }}
                >
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                        © 2025 Mee Sthiraasthi™. All Rights Reserved.
                    </span>
                    <a
                        href="https://github.com/saikumar1308/mee_sthirasthi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#FCD34D")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        </footer>
    )
}
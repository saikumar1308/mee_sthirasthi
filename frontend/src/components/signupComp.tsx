import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { toast } from "./Toast"

export function SignupComp() {
    const [postInputs, setPostInputs] = useState({
        username: "",
        password: "",
        number: 0,
        email: "",
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function sendRequest() {
        if (!postInputs.username.trim() || !postInputs.password.trim() || !postInputs.email.trim() || !postInputs.number) {
            toast.error("Please fill in all required fields.")
            return
        }
        if (postInputs.password.length < 6) {
            toast.error("Password must be at least 6 characters.")
            return
        }
        setLoading(true)
        try {
            const response = await axios.post(`${BACKEND_URL}/user/signup`, postInputs)
            const token = response.data
            if (token?.error) {
                toast.error("Sign up failed. Username or email may already be taken.")
            } else {
                localStorage.setItem("token", token)
                toast.success("Account created! Welcome to Mee Sthiraasthi 🎉")
                navigate("/")
            }
        } catch {
            toast.error("Unable to sign up. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ background: "linear-gradient(135deg, #F0F5FF 0%, #F8FAFD 100%)" }}
        >
            <div
                style={{
                    background: "#fff",
                    borderRadius: 20,
                    boxShadow: "0 8px 48px rgba(30,58,95,0.12)",
                    padding: "40px 36px",
                    width: "100%",
                    maxWidth: 420,
                    position: "relative",
                }}
            >
                {/* Close */}
                <Link
                    to="/"
                    style={{
                        position: "absolute", top: 16, right: 16,
                        width: 32, height: 32, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "#F1F5F9", color: "#64748B", textDecoration: "none",
                        transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#E2E8F0")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#F1F5F9")}
                >
                    ✕
                </Link>

                {/* Header */}
                <div className="mb-8 text-center">
                    <img src="/logo.svg" alt="logo" className="w-10 h-10 mx-auto mb-3" />
                    <h1
                        className="font-playfair"
                        style={{ fontSize: 28, fontWeight: 700, color: "#1E3A5F" }}
                    >
                        Create an account
                    </h1>
                    <p style={{ color: "#64748B", fontSize: 14, marginTop: 6 }}>
                        Join thousands of property buyers &amp; sellers
                    </p>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-4">
                    <div>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1E3A5F", marginBottom: 6 }}>
                            Username <span style={{ color: "#EF4444" }}>*</span>
                        </label>
                        <input
                            className="ms-input"
                            type="text"
                            placeholder="Choose a username"
                            value={postInputs.username}
                            onChange={(e) => setPostInputs({ ...postInputs, username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1E3A5F", marginBottom: 6 }}>
                            Email <span style={{ color: "#EF4444" }}>*</span>
                        </label>
                        <input
                            className="ms-input"
                            type="email"
                            placeholder="you@example.com"
                            value={postInputs.email}
                            onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1E3A5F", marginBottom: 6 }}>
                            Mobile Number <span style={{ color: "#EF4444" }}>*</span>
                        </label>
                        <input
                            className="ms-input"
                            type="tel"
                            placeholder="10-digit mobile number"
                            onChange={(e) => setPostInputs({ ...postInputs, number: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1E3A5F", marginBottom: 6 }}>
                            Password <span style={{ color: "#EF4444" }}>*</span>
                        </label>
                        <input
                            className="ms-input"
                            type="password"
                            placeholder="At least 6 characters"
                            value={postInputs.password}
                            onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
                        />
                    </div>

                    <button
                        className="btn-primary w-full justify-center mt-2"
                        onClick={sendRequest}
                        disabled={loading}
                    >
                        {loading ? <><div className="spinner" /> Creating account...</> : "Create Account"}
                    </button>
                </div>

                {/* Footer link */}
                <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "#64748B" }}>
                    Already have an account?{" "}
                    <Link to="/signin" style={{ color: "#1E3A5F", fontWeight: 600, textDecoration: "underline" }}>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}
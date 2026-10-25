import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { toast } from "./Toast"

export function SigninComp() {
    const [postInputs, setPostInputs] = useState({ username: "", password: "" })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function sendRequest() {
        if (!postInputs.username.trim() || !postInputs.password.trim()) {
            toast.error("Please fill in all fields.")
            return
        }
        setLoading(true)
        try {
            const response = await axios.post(`${BACKEND_URL}/user/signin`, postInputs)
            const token = response.data
            localStorage.setItem("token", token)
            toast.success("Signed in successfully! Welcome back.")
            navigate("/")
        } catch {
            toast.error("Incorrect username or password. Please try again.")
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
                    maxWidth: 400,
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
                        Welcome back
                    </h1>
                    <p style={{ color: "#64748B", fontSize: 14, marginTop: 6 }}>
                        Sign in to manage your listings
                    </p>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-4">
                    <div>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1E3A5F", marginBottom: 6 }}>
                            Username
                        </label>
                        <input
                            className="ms-input"
                            type="text"
                            placeholder="Your username"
                            value={postInputs.username}
                            onChange={(e) => setPostInputs({ ...postInputs, username: e.target.value })}
                            onKeyDown={(e) => e.key === "Enter" && sendRequest()}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1E3A5F", marginBottom: 6 }}>
                            Password
                        </label>
                        <input
                            className="ms-input"
                            type="password"
                            placeholder="••••••••"
                            value={postInputs.password}
                            onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
                            onKeyDown={(e) => e.key === "Enter" && sendRequest()}
                        />
                    </div>

                    <button
                        className="btn-primary w-full justify-center mt-2"
                        onClick={sendRequest}
                        disabled={loading}
                    >
                        {loading ? <><div className="spinner" /> Signing in...</> : "Sign In"}
                    </button>
                </div>

                {/* Footer link */}
                <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "#64748B" }}>
                    Don't have an account?{" "}
                    <Link to="/signup" style={{ color: "#1E3A5F", fontWeight: 600, textDecoration: "underline" }}>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}
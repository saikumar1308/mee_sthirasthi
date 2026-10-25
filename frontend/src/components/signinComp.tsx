import axios from "axios"
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { toast } from "./Toast"

export function SigninComp() {
    const [searchParams] = useSearchParams()
    const redirectUrl = searchParams.get("redirect") || "/"

    const [postInputs, setPostInputs] = useState({ username: "", password: "" })
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({})
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function validate(): boolean {
        const errs: { username?: string; password?: string } = {}
        if (!postInputs.username.trim()) {
            errs.username = "Username is required"
        }
        if (!postInputs.password.trim()) {
            errs.password = "Password is required"
        }
        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!validate()) return

        setLoading(true)
        try {
            const response = await axios.post(`${BACKEND_URL}/user/signin`, {
                username: postInputs.username.trim(),
                password: postInputs.password,
            })
            const token = response.data
            if (token?.error || typeof token !== "string") {
                toast.error("Incorrect username or password. Please try again.")
                setErrors({ password: "Invalid username or password" })
            } else {
                localStorage.setItem("token", token)
                if (rememberMe) {
                    localStorage.setItem("mee_username", postInputs.username.trim())
                }
                toast.success("Signed in successfully! Welcome back.")
                navigate(redirectUrl)
            }
        } catch {
            toast.error("Incorrect username or password. Please try again.")
            setErrors({ password: "Invalid username or password" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 bg-slate-50"
            style={{
                background: "radial-gradient(ellipse at top, #EFF6FF 0%, #F8FAFC 70%)",
            }}
        >
            <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 relative">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={() => navigate(redirectUrl !== "/" ? redirectUrl : "/")}
                    className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer text-sm"
                    aria-label="Close"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="text-center mb-7">
                    <Link to="/" className="inline-block mb-3">
                        <img src="/logo.svg" alt="logo" className="w-12 h-12 mx-auto drop-shadow-sm" />
                    </Link>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50">
                        స్వాగతం • Welcome Back
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142844] mt-2 font-serif">
                        Sign In to Mee Sthiraasthi
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                        Access verified owner details & manage your listings
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Username */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            autoFocus
                            placeholder="Enter your username"
                            value={postInputs.username}
                            onChange={(e) => {
                                setPostInputs({ ...postInputs, username: e.target.value })
                                setErrors({ ...errors, username: undefined })
                            }}
                            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] transition-all ${
                                errors.username ? "border-red-500 bg-red-50/30" : "border-slate-200"
                            }`}
                        />
                        {errors.username && (
                            <p className="text-xs text-red-500 mt-1 font-medium">{errors.username}</p>
                        )}
                    </div>

                    {/* Password with Show/Hide toggle */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={postInputs.password}
                                onChange={(e) => {
                                    setPostInputs({ ...postInputs, password: e.target.value })
                                    setErrors({ ...errors, password: undefined })
                                }}
                                className={`w-full pl-4 pr-11 py-3 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] transition-all ${
                                    errors.password ? "border-red-500 bg-red-50/30" : "border-slate-200"
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1 font-medium">{errors.password}</p>
                        )}
                    </div>

                    {/* Remember me & Helper */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="rounded text-[#1E3A5F] focus:ring-0 cursor-pointer"
                            />
                            <span>Remember me</span>
                        </label>
                        <span className="text-slate-400">Zero Spam Guaranteed</span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full py-3.5 px-4 rounded-xl bg-[#1E3A5F] hover:bg-[#142844] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 active:scale-98"
                    >
                        {loading ? (
                            <>
                                <span className="spinner !w-4 !h-4" />
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <span>Sign In →</span>
                        )}
                    </button>
                </form>

                {/* Footer Switcher */}
                <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link
                        to={`/signup${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(searchParams.get("redirect")!)}` : ""}`}
                        className="font-bold text-[#1E3A5F] hover:text-amber-600 underline transition-colors"
                    >
                        Create an Account
                    </Link>
                </div>
            </div>
        </div>
    )
}
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { toast } from "./Toast"

export function SignupComp() {
    const [searchParams] = useSearchParams()
    const redirectUrl = searchParams.get("redirect") || "/"

    const [postInputs, setPostInputs] = useState({
        username: "",
        password: "",
        number: "",
        email: "",
    })

    const [errors, setErrors] = useState<{
        username?: string
        email?: string
        number?: string
        password?: string
    }>({})

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Real-time password strength calculation
    const getPasswordStrength = (pass: string) => {
        if (!pass) return { score: 0, label: "", color: "" }
        let score = 0
        if (pass.length >= 6) score += 1
        if (pass.length >= 8) score += 1
        if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score += 1
        if (/[^A-Za-z0-9]/.test(pass)) score += 1

        if (score <= 1) return { score: 1, label: "Weak", color: "bg-red-500" }
        if (score <= 3) return { score: 2, label: "Medium", color: "bg-amber-500" }
        return { score: 3, label: "Strong", color: "bg-emerald-500" }
    }

    const strength = getPasswordStrength(postInputs.password)

    function validate(): boolean {
        const errs: typeof errors = {}

        // Username validation
        if (!postInputs.username.trim()) {
            errs.username = "Username is required"
        } else if (postInputs.username.trim().length < 3) {
            errs.username = "Username must be at least 3 characters"
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!postInputs.email.trim()) {
            errs.email = "Email address is required"
        } else if (!emailRegex.test(postInputs.email.trim())) {
            errs.email = "Please enter a valid email address"
        }

        // Mobile validation (10 digit Indian number)
        const mobileClean = postInputs.number.replace(/\D/g, "")
        if (!mobileClean) {
            errs.number = "Mobile number is required"
        } else if (mobileClean.length !== 10) {
            errs.number = "Please enter a valid 10-digit mobile number"
        }

        // Password validation
        if (!postInputs.password) {
            errs.password = "Password is required"
        } else if (postInputs.password.length < 6) {
            errs.password = "Password must be at least 6 characters"
        }

        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!validate()) return

        setLoading(true)
        try {
            const payload = {
                username: postInputs.username.trim(),
                email: postInputs.email.trim(),
                password: postInputs.password,
                number: Number(postInputs.number.replace(/\D/g, "")),
            }

            const response = await axios.post(`${BACKEND_URL}/user/signup`, payload)
            const token = response.data

            if (token?.error || typeof token !== "string") {
                toast.error("Sign up failed. Username or email may already be taken.")
                setErrors({ username: "Username or email already exists" })
            } else {
                localStorage.setItem("token", token)
                toast.success("Account created! Welcome to Mee Sthiraasthi 🎉")
                navigate(redirectUrl)
            }
        } catch {
            toast.error("Unable to create account. Please check details or try again.")
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
            <div className="w-full max-w-[440px] bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 relative">
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
                <div className="text-center mb-6">
                    <Link to="/" className="inline-block mb-3">
                        <img src="/logo.svg" alt="logo" className="w-12 h-12 mx-auto drop-shadow-sm" />
                    </Link>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50">
                        ఖాతా సృష్టించండి • Free Registration
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142844] mt-2 font-serif">
                        Join Mee Sthiraasthi
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Connect directly with verified buyers & landlords
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                    {/* Username */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            autoFocus
                            placeholder="Choose a unique username"
                            value={postInputs.username}
                            onChange={(e) => {
                                setPostInputs({ ...postInputs, username: e.target.value })
                                setErrors({ ...errors, username: undefined })
                            }}
                            className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] transition-all ${
                                errors.username ? "border-red-500 bg-red-50/30" : "border-slate-200"
                            }`}
                        />
                        {errors.username && (
                            <p className="text-xs text-red-500 mt-1 font-medium">{errors.username}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={postInputs.email}
                            onChange={(e) => {
                                setPostInputs({ ...postInputs, email: e.target.value })
                                setErrors({ ...errors, email: undefined })
                            }}
                            className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] transition-all ${
                                errors.email ? "border-red-500 bg-red-50/30" : "border-slate-200"
                            }`}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>
                        )}
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-bold text-slate-500 pointer-events-none">
                                +91
                            </span>
                            <input
                                type="tel"
                                maxLength={10}
                                placeholder="10-digit mobile number"
                                value={postInputs.number}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "")
                                    setPostInputs({ ...postInputs, number: val })
                                    setErrors({ ...errors, number: undefined })
                                }}
                                className={`w-full pl-12 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] transition-all ${
                                    errors.number ? "border-red-500 bg-red-50/30" : "border-slate-200"
                                }`}
                            />
                        </div>
                        {errors.number && (
                            <p className="text-xs text-red-500 mt-1 font-medium">{errors.number}</p>
                        )}
                    </div>

                    {/* Password with Show/Hide toggle & strength meter */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="At least 6 characters"
                                value={postInputs.password}
                                onChange={(e) => {
                                    setPostInputs({ ...postInputs, password: e.target.value })
                                    setErrors({ ...errors, password: undefined })
                                }}
                                className={`w-full pl-4 pr-11 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] transition-all ${
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

                        {/* Password strength indicator bar */}
                        {postInputs.password && (
                            <div className="mt-1.5 flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden flex gap-1">
                                    <div className={`h-full flex-1 ${strength.score >= 1 ? strength.color : "bg-transparent"}`} />
                                    <div className={`h-full flex-1 ${strength.score >= 2 ? strength.color : "bg-transparent"}`} />
                                    <div className={`h-full flex-1 ${strength.score >= 3 ? strength.color : "bg-transparent"}`} />
                                </div>
                                <span className="text-[11px] font-semibold text-slate-500">{strength.label}</span>
                            </div>
                        )}

                        {errors.password && (
                            <p className="text-xs text-red-500 mt-1 font-medium">{errors.password}</p>
                        )}
                    </div>

                    {/* Terms consent */}
                    <p className="text-[11px] text-slate-400 leading-tight pt-1">
                        By signing up, you agree to receive property updates & verified inquiries. Zero spam.
                    </p>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full py-3.5 px-4 rounded-xl bg-[#1E3A5F] hover:bg-[#142844] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 active:scale-98"
                    >
                        {loading ? (
                            <>
                                <span className="spinner !w-4 !h-4" />
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <span>Create Free Account →</span>
                        )}
                    </button>
                </form>

                {/* Footer Switcher */}
                <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link
                        to={`/signin${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(searchParams.get("redirect")!)}` : ""}`}
                        className="font-bold text-[#1E3A5F] hover:text-amber-600 underline transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}
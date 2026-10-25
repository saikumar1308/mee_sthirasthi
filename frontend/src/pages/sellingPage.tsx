import { useState, useRef } from "react";
import { AppBar } from "../components/AppBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/footer";
import { BACKEND_URL } from "../config";
import { toast } from "../components/Toast";

// ─── Types ────────────────────────────────────────────────────────
type PostInputs = {
    price: number;
    location: string;
    description: string;
    selection: string;
    image: string;
    no_bedroooms: number;
    no_kitchens: number;
    no_toilets: number;
    car_parking: boolean;
    amenities: string;
    buildup_area: number;
    ownerId: string;
};

type Errors = Partial<Record<keyof PostInputs | "image_file", string>>;

// ─── Step definitions ─────────────────────────────────────────────
const STEPS = [
    { label: "Basic Info" },
    { label: "Room Details" },
    { label: "Media & Description" },
];

// ─── Small UI Helpers ─────────────────────────────────────────────
function StepCircle({ index, current }: { index: number; current: number }) {
    const state =
        index < current ? "done" : index === current ? "active" : "pending";
    return (
        <div className={`wizard-step-circle ${state}`}>
            {state === "done" ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M3 8l4 4 6-7"
                        stroke="white"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                index + 1
            )}
        </div>
    );
}

function CounterField({
    label,
    icon,
    value,
    onChange,
    min = 0,
    max = 20,
}: {
    label: string;
    icon: string;
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
}) {
    return (
        <div className="flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-xl">
            <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <span className="font-semibold text-[#1A202C] text-[15px]">
                    {label}
                </span>
            </div>
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="counter-btn"
                    onClick={() => onChange(Math.max(min, value - 1))}
                    disabled={value <= min}
                >
                    −
                </button>
                <span className="w-8 text-center font-bold text-lg text-[#1E3A5F]">
                    {value}
                </span>
                <button
                    type="button"
                    className="counter-btn"
                    onClick={() => onChange(Math.min(max, value + 1))}
                    disabled={value >= max}
                >
                    +
                </button>
            </div>
        </div>
    );
}

function Toggle({
    value,
    onChange,
}: {
    value: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <div
            className={`toggle-track ${value ? "on" : "off"}`}
            onClick={() => onChange(!value)}
            role="switch"
            aria-checked={value}
        >
            <div className="toggle-thumb" />
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────
export function SellingPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [postinputs, setPostinputs] = useState<PostInputs>({
        price: 0,
        location: "",
        description: "",
        selection: "",
        image: "",
        no_bedroooms: 1,
        no_kitchens: 1,
        no_toilets: 1,
        car_parking: false,
        amenities: "",
        buildup_area: 0,
        ownerId: "",
    });
    const [imageSelected, setImageSelected] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<Errors>({});
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // ── Helpers ──────────────────────────────────────────────────
    function set<K extends keyof PostInputs>(key: K, value: PostInputs[K]) {
        setPostinputs((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setImageSelected(file);
        setErrors((prev) => ({ ...prev, image_file: undefined }));
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        } else {
            setImagePreview(null);
        }
    }

    async function uploadImage(file: File): Promise<string | null> {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "mee_sthiraasthi");
        data.append("cloud_name", "ddijvm8a4");
        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/ddijvm8a4/image/upload",
                { method: "POST", body: data }
            );
            const json = await res.json();
            return json.url ?? null;
        } catch {
            return null;
        }
    }

    // ── Validation ───────────────────────────────────────────────
    function validateStep(step: number): boolean {
        const errs: Errors = {};
        if (step === 0) {
            if (!postinputs.price || postinputs.price <= 0)
                errs.price = "Enter a valid price";
            if (!postinputs.location.trim())
                errs.location = "Location is required";
            if (!postinputs.selection)
                errs.selection = "Select a listing type";
            if (!postinputs.buildup_area || postinputs.buildup_area <= 0)
                errs.buildup_area = "Enter a valid area";
        }
        if (step === 2) {
            if (!postinputs.description.trim())
                errs.description = "Description is required";
            if (!imageSelected)
                errs.image_file = "Please upload at least one photo";
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    }

    function handleNext() {
        if (validateStep(currentStep)) setCurrentStep((s) => s + 1);
    }
    function handleBack() {
        setCurrentStep((s) => s - 1);
        setErrors({});
    }

    // ── Submit ───────────────────────────────────────────────────
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validateStep(currentStep)) return;

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login before listing a property.");
            navigate("/signin?redirect=/properties/sell");
            return;
        }

        setSubmitting(true);
        try {
            const imageUrl = await uploadImage(imageSelected!);
            if (!imageUrl) {
                toast.error("Image upload failed. Please try again.");
                setSubmitting(false);
                return;
            }
            const payload = { ...postinputs, image: imageUrl };
            await axios.post(`${BACKEND_URL}/property/sell`, payload, {
                headers: { Authorization: token },
            });
            toast.success("Your property has been listed successfully! 🎉");
            navigate("/");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    // ─── Step 1: Basic Info ───────────────────────────────────────
    const Step1 = (
        <div className="wizard-card flex flex-col gap-5">
            {/* Listing Type */}
            <div>
                <label className="block text-sm font-semibold text-[#1E3A5F] mb-3">
                    Listing Type
                </label>
                <div className="flex gap-3">
                    {(["rent", "buy", "lease"] as const).map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            className={`listing-pill ${postinputs.selection === opt ? "active" : ""}`}
                            onClick={() => set("selection", opt)}
                        >
                            {opt === "buy" ? "Sell" : opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </button>
                    ))}
                </div>
                {errors.selection && (
                    <p className="field-error">{errors.selection}</p>
                )}
            </div>

            {/* Price */}
            <div>
                <label className="block text-sm font-semibold text-[#1E3A5F] mb-2">
                    Price
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] font-semibold text-base">
                        ₹
                    </span>
                    <input
                        type="number"
                        placeholder="e.g. 45,00,000"
                        className={`ms-input pl-8 ${errors.price ? "error" : ""}`}
                        value={postinputs.price || ""}
                        onChange={(e) => set("price", Number(e.target.value))}
                    />
                </div>
                <p className="text-xs text-[#94A3B8] mt-1.5">
                    For rent/lease enter monthly amount. For sale enter total price in ₹.
                </p>
                {errors.price && <p className="field-error">{errors.price}</p>}
            </div>

            {/* Location */}
            <div>
                <label className="block text-sm font-semibold text-[#1E3A5F] mb-2">
                    Location / Address
                </label>
                <input
                    type="text"
                    placeholder="e.g. 4-15/A, Gachibowli, Hyderabad"
                    className={`ms-input ${errors.location ? "error" : ""}`}
                    value={postinputs.location}
                    onChange={(e) => set("location", e.target.value)}
                />
                {errors.location && (
                    <p className="field-error">{errors.location}</p>
                )}
            </div>

            {/* Buildup Area */}
            <div>
                <label className="block text-sm font-semibold text-[#1E3A5F] mb-2">
                    Buildup Area (sq ft)
                </label>
                <input
                    type="number"
                    placeholder="e.g. 1200"
                    className={`ms-input ${errors.buildup_area ? "error" : ""}`}
                    value={postinputs.buildup_area || ""}
                    onChange={(e) => set("buildup_area", Number(e.target.value))}
                />
                {errors.buildup_area && (
                    <p className="field-error">{errors.buildup_area}</p>
                )}
            </div>
        </div>
    );

    // ─── Step 2: Room Details ─────────────────────────────────────
    const Step2 = (
        <div className="wizard-card flex flex-col gap-4">
            <CounterField
                label="Bedrooms"
                icon="🛏️"
                value={postinputs.no_bedroooms}
                onChange={(v) => set("no_bedroooms", v)}
                min={1}
            />
            <CounterField
                label="Kitchens"
                icon="🍳"
                value={postinputs.no_kitchens}
                onChange={(v) => set("no_kitchens", v)}
                min={0}
            />
            <CounterField
                label="Bathrooms / Toilets"
                icon="🚿"
                value={postinputs.no_toilets}
                onChange={(v) => set("no_toilets", v)}
                min={1}
            />

            {/* Car Parking Toggle */}
            <div className="flex items-center justify-between p-4 bg-white border border-[#E2E8F0] rounded-xl">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🚗</span>
                    <div>
                        <p className="font-semibold text-[#1A202C] text-[15px]">
                            Car Parking
                        </p>
                        <p className="text-xs text-[#94A3B8]">
                            {postinputs.car_parking ? "Available" : "Not available"}
                        </p>
                    </div>
                </div>
                <Toggle
                    value={postinputs.car_parking}
                    onChange={(v) => set("car_parking", v)}
                />
            </div>

            {/* Summary card */}
            <div className="rounded-xl bg-[#F0F5FF] border border-[#C7D9F5] p-4 mt-2">
                <p className="text-xs font-semibold text-[#1E3A5F] uppercase tracking-wider mb-2">
                    Summary so far
                </p>
                <div className="grid grid-cols-2 gap-y-1 text-sm text-[#334155]">
                    <span className="text-[#64748B]">Type:</span>
                    <span className="font-medium capitalize">
                        {postinputs.selection === "buy"
                            ? "For Sale"
                            : postinputs.selection
                                ? "For " + postinputs.selection.charAt(0).toUpperCase() + postinputs.selection.slice(1)
                                : "—"}
                    </span>
                    <span className="text-[#64748B]">Location:</span>
                    <span className="font-medium truncate">
                        {postinputs.location || "—"}
                    </span>
                    <span className="text-[#64748B]">Price:</span>
                    <span className="font-medium">
                        {postinputs.price
                            ? `₹ ${postinputs.price.toLocaleString("en-IN")}`
                            : "—"}
                    </span>
                    <span className="text-[#64748B]">Area:</span>
                    <span className="font-medium">
                        {postinputs.buildup_area
                            ? `${postinputs.buildup_area} sq ft`
                            : "—"}
                    </span>
                </div>
            </div>
        </div>
    );

    // ─── Step 3: Media & Description ──────────────────────────────
    const Step3 = (
        <div className="wizard-card flex flex-col gap-5">
            {/* Image upload */}
            <div>
                <label className="block text-sm font-semibold text-[#1E3A5F] mb-2">
                    Property Photo
                </label>
                <div
                    className={`upload-zone ${imageSelected ? "has-file" : ""}`}
                    onClick={() => fileInputRef.current?.click()}
                >
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full max-h-52 object-cover rounded-lg"
                        />
                    ) : (
                        <>
                            <svg
                                className="w-10 h-10 text-[#94A3B8]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 12V7.5A2.25 2.25 0 015.25 5.25h13.5A2.25 2.25 0 0121 7.5v9a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 16.5V12z"
                                />
                            </svg>
                            <p className="text-[#64748B] font-semibold">
                                Click to upload a photo
                            </p>
                            <p className="text-xs text-[#94A3B8]">
                                JPG, PNG, WEBP — Max 10 MB
                            </p>
                        </>
                    )}
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
                {imageSelected && (
                    <button
                        type="button"
                        className="mt-2 text-xs text-[#EF4444] underline cursor-pointer"
                        onClick={() => {
                            setImageSelected(null);
                            setImagePreview(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                    >
                        Remove photo
                    </button>
                )}
                {errors.image_file && (
                    <p className="field-error">{errors.image_file}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-semibold text-[#1E3A5F] mb-2">
                    Description
                </label>
                <textarea
                    rows={5}
                    placeholder="Describe the property — neighbourhood, age of construction, notable features..."
                    className={`ms-input resize-none ${errors.description ? "error" : ""}`}
                    value={postinputs.description}
                    onChange={(e) => set("description", e.target.value)}
                />
                <p className="text-xs text-[#94A3B8] mt-1">
                    {postinputs.description.length} characters
                </p>
                {errors.description && (
                    <p className="field-error">{errors.description}</p>
                )}
            </div>

            {/* Amenities */}
            <div>
                <label className="block text-sm font-semibold text-[#1E3A5F] mb-2">
                    Amenities{" "}
                    <span className="text-[#94A3B8] font-normal">(optional)</span>
                </label>
                <textarea
                    rows={3}
                    placeholder="e.g. 24/7 security, gym, swimming pool, power backup..."
                    className="ms-input resize-none"
                    value={postinputs.amenities}
                    onChange={(e) => set("amenities", e.target.value)}
                />
            </div>
        </div>
    );

    const steps = [Step1, Step2, Step3];

    // ─── Render ───────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[#F8FAFD]">
            <AppBar />

            {/* Hero Header */}
            <div
                style={{
                    background: "linear-gradient(135deg, #1E3A5F 0%, #2a507f 60%, #1a3353 100%)",
                    padding: "52px 24px 40px",
                    textAlign: "center",
                }}
            >
                <div className="max-w-xl mx-auto">
                    <span
                        style={{
                            display: "inline-block",
                            background: "rgba(245,158,11,0.18)",
                            color: "#FCD34D",
                            border: "1px solid rgba(245,158,11,0.35)",
                            borderRadius: 20,
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            padding: "4px 14px",
                            marginBottom: 16,
                        }}
                    >
                        List Your Property
                    </span>
                    <h1
                        className="font-playfair"
                        style={{ color: "#fff", fontSize: 32, fontWeight: 700, marginBottom: 10, lineHeight: 1.25 }}
                    >
                        Reach thousands of buyers &amp; renters
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, maxWidth: 420, margin: "0 auto" }}>
                        Fill in the details below and your property will be live in minutes.
                    </p>
                </div>
            </div>

            {/* Wizard Container */}
            <div className="max-w-xl mx-auto px-4 py-10">
                {/* Step Progress */}
                <div className="wizard-step-bar mb-10">
                    {STEPS.map((step, i) => (
                        <>
                            <div className="wizard-step" key={step.label}>
                                <StepCircle index={i} current={currentStep} />
                                <span
                                    className={`wizard-step-label ${
                                        i < currentStep
                                            ? "done"
                                            : i === currentStep
                                            ? "active"
                                            : "pending"
                                    }`}
                                >
                                    {step.label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div
                                    key={`conn-${i}`}
                                    className={`wizard-connector ${i < currentStep ? "done" : "pending"}`}
                                />
                            )}
                        </>
                    ))}
                </div>

                {/* Card */}
                <div
                    style={{
                        background: "#fff",
                        borderRadius: 20,
                        boxShadow: "0 4px 32px rgba(30,58,95,0.10)",
                        padding: "32px 32px 28px",
                    }}
                >
                    {/* Step heading */}
                    <div className="mb-6">
                        <h2
                            style={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: "#1E3A5F",
                                marginBottom: 4,
                            }}
                        >
                            Step {currentStep + 1} — {STEPS[currentStep].label}
                        </h2>
                        <div
                            style={{
                                height: 3,
                                width: `${((currentStep + 1) / STEPS.length) * 100}%`,
                                background: "linear-gradient(90deg, #1E3A5F, #2a507f)",
                                borderRadius: 4,
                                transition: "width 0.4s ease",
                            }}
                        />
                    </div>

                    <form onSubmit={handleSubmit}>
                        {steps[currentStep]}

                        {/* Navigation */}
                        <div className="flex justify-between items-center mt-8">
                            {currentStep > 0 ? (
                                <button
                                    type="button"
                                    className="btn-outline"
                                    onClick={handleBack}
                                >
                                    ← Back
                                </button>
                            ) : (
                                <div />
                            )}

                            {currentStep < STEPS.length - 1 ? (
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={handleNext}
                                >
                                    Continue →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="btn-primary"
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <>
                                            <div className="spinner" />
                                            Uploading...
                                        </>
                                    ) : (
                                        "List Property 🚀"
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Step indicator text */}
                <p
                    style={{
                        textAlign: "center",
                        marginTop: 16,
                        fontSize: 13,
                        color: "#94A3B8",
                    }}
                >
                    Step {currentStep + 1} of {STEPS.length}
                </p>
            </div>

            <Footer />
        </div>
    );
}

import { Component, ErrorInfo, ReactNode } from "react"

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo)
    }

    public handleReset = () => {
        this.setState({ hasError: false, error: null })
        window.location.href = "/"
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 font-sans">
                    <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 text-3xl flex items-center justify-center mx-auto mb-4">
                            ⚠️
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50">
                            System Notice
                        </span>
                        <h1 className="text-2xl font-extrabold text-[#142844] mt-3">
                            Something went wrong
                        </h1>
                        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                            An unexpected error occurred while loading this section. Our team has been notified.
                        </p>

                        {this.state.error && (
                            <div className="mt-4 p-3 bg-slate-50 rounded-xl text-left border border-slate-200 overflow-x-auto text-xs text-red-600 font-mono">
                                {this.state.error.message}
                            </div>
                        )}

                        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
                            >
                                Reload Page
                            </button>
                            <button
                                onClick={this.handleReset}
                                className="px-5 py-2.5 rounded-xl bg-[#1E3A5F] hover:bg-[#142844] text-white text-sm font-bold shadow-md transition-colors cursor-pointer"
                            >
                                Return to Home
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

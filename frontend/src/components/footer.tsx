export function Footer() {

    return <div className="max-w-screen-xl mx-auto  ">
        <footer id="footer" className="bg-blue-50 rounded-lg shadow-sm bg-white ">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <a href="/" className="flex items-center">
                            <img src="/logo.svg" className="h-8 me-3 text-red" alt="FlowBite Logo" />
                            <span className="self-center text-blue-700 text-4xl font-semibold whitespace-nowrap gurajada-regular ">మీ &nbsp;స్థిరాస్థి</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-8 ">
                        <span className="text-sm text-gray-500 sm:text-center ">© 2025 <a href="/" className="hover:underline">Mee Sthiraasthi™</a>. All Rights Reserved.
                        </span>
                        <div className="flex mt-4 sm:justify-center sm:mt-0">


                            <a href="https://github.com/saikumar1308/mee_sthirasthi/" className="text-gray-500 hover:text-gray-900  ms-5">
                                <div className="flex justify-center items-center">
                                    <svg className="w-4 h-4 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd" />
                                    </svg>
                                    <p>Git Hub</p>
                                </div>
                                <span className="sr-only">GitHub account</span>
                            </a>

                        </div>
                    </div>
                </div>

            </div>


            <div className="w-full mx-auto max-w-screen-xl text-gray-500 p-4 md:flex md:items-center md:justify-between">
                <h2>Developer Details</h2>
                <span className="text-sm text-gray-500 sm:text-center ">Done by Sai Kumar
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="mailto:saikumarpentala@gmail.com" className="hover:underline hover:text-grey-900 me-4 md:me-6">Email</a>
                    </li>
                    <li>
                        <a href="https://github.com/saikumar1308" className="hover:underline me-4 md:me-6">Git Hub</a>
                    </li>
                    <li>
                        <a href="http://discord.com/users/1015938234078998569" className="hover:underline me-4 md:me-6">Discord</a>
                    </li>
                    <li>
                        <a href="http://www.instagram.com/saikumar_7989/" className="hover:underline">Instagram</a>
                    </li>
                </ul>
            </div>

        </footer>



    </div>
}
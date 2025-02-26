import { useState } from "react";
import { AppBar } from "../components/AppBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/footer";

export function SellingPage() {
    const [postinputs, setPostinputs] = useState({
        price: 1,
        location: "",
        description: "",
        selection: "",
        image: "",
        no_bedroooms: 1,
        no_kitchens: 1,
        no_toilets: 1,
        car_parking: true,
        amenities: "",
        buildup_area: 1,
        ownerId: "",
    });

    const [imageSelected, setImageSelected] = useState<File | null>(null);

    function fileChange(c: React.ChangeEvent<HTMLInputElement>) {
        if (c.target.files && c.target.files[0]) {
            setImageSelected(c.target.files[0]);
        }
    }

    async function uploadImage(file: File) {
        if (!file) {
          alert("Please select the image!!!");
          return null;
        }
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "mee_sthiraasthi");
        data.append("cloud_name", "ddijvm8a4");
    
        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/ddijvm8a4/image/upload",
            {
              method: "POST",
              body: data,
            }
          );
      
          const imageUrl = await response.json();
          console.log(imageUrl.url);
          
          return imageUrl.url;
        } catch (error) {
          console.log("Error uploading image: ",error)
          return null;
        }
        
      }

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const login = localStorage.getItem("token");
        if (login) {
            if (!imageSelected) {
                alert("no image is selected");
                return;
            }
            const imageUrl = await uploadImage(imageSelected);
            
            const updatedFormData = { ...postinputs, image: imageUrl };

            try {
                await axios.post(
                    `http://127.0.0.1:8787/property/sell`,
                    updatedFormData,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                );
                alert("your upload is successfull ");
                navigate("/home");
            } catch (error) {
                alert("error while uploading" + error);
            }
        } else {
            alert("Please login before uploading!!!");
        }
    }

    return (
        <div>
            <AppBar />
            <div className="max-w-screen-xl mx-auto p-4 ">
                {/* <ImageUploader onUploadTrigger={setUploadFunction} /> */}
                <input type="file" name="" id="" onChange={fileChange} />

                <div className="max-w-xl mx-auto p-4 rounded-xl  bg-slate-300">
                    <form onSubmit={handleSubmit}>
                        <ul className="grid gap-6 grid-cols-2">
                            <li>
                                <label className="block font-bold ">
                                    Price:
                                </label>
                                <input type="text" placeholder="₹" className="rounded p-1 border mb-3" onChange={(c) => {
                                    setPostinputs({
                                        ...postinputs,
                                        price: Number(c.target.value),
                                    });
                                }}
                                />
                            </li>
                            <li>
                                <label className=" block font-bold ">
                                    Location:
                                </label>
                                <input type="text" placeholder="ex: 4-15/A" className="rounded p-1 border mb-3" onChange={(c) => {
                                    setPostinputs({
                                        ...postinputs,
                                        location: c.target.value,
                                    });
                                }}
                                />
                            </li>
                            <li>
                                <label className="block font-bold ">
                                    No of Bedrooms:
                                </label>
                                <input type="text" placeholder="ex: 2" className="rounded p-1 border mb-3" onChange={(c) => {
                                    setPostinputs({
                                        ...postinputs,
                                        no_bedroooms: Number(c.target.value),
                                    });
                                }}
                                />
                            </li>
                            <li>
                                <label className="block font-bold ">
                                    No of Kitchens:
                                </label>
                                <input type="text" placeholder="" className="rounded p-1 border mb-3" onChange={(c) => {
                                    setPostinputs({
                                        ...postinputs,
                                        no_kitchens: Number(c.target.value),
                                    });
                                }}
                                />
                            </li>
                            <li>
                                <label className="block font-bold ">No of Toilets:</label>
                                <input
                                    type="text"
                                    placeholder="ex: 2"
                                    className="rounded p-1 border mb-3"
                                    onChange={(c) => {
                                        setPostinputs({
                                            ...postinputs,
                                            no_toilets: Number(c.target.value),
                                        });
                                    }}
                                />
                            </li>
                            <li>
                                <label className="block font-bold ">
                                    Buildup Area:
                                </label>
                                <input
                                    type="text"
                                    placeholder="ex: rent"
                                    className="rounded p-1 border mb-3"
                                    onChange={(c) => {
                                        setPostinputs({
                                            ...postinputs,
                                            buildup_area: Number(c.target.value),
                                        });
                                    }}
                                />
                            </li>
                        </ul>
                        <div className="flex my-6">
                            <label className="block font-bold mr-2">
                                Car Parking:
                            </label>
                            <div className="flex items-center mr-3">
                                <input
                                    id="default-radio-1"
                                    type="radio"
                                    value=""
                                    name="default-radio"
                                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  "
                                    onChange={() => {
                                        setPostinputs({
                                            ...postinputs,
                                            car_parking: true,
                                        });
                                    }}
                                />
                                <label
                                    htmlFor="default-radio-1"
                                    className="ms-2 text-sm font-medium text-gray-900 "
                                >
                                    Available
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    checked
                                    id="default-radio-2"
                                    type="radio"
                                    value=""
                                    name="default-radio"
                                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                    onChange={() => {
                                        setPostinputs({
                                            ...postinputs,
                                            car_parking: false,
                                        });
                                    }}
                                />
                                <label
                                    htmlFor="default-radio-2"
                                    className="ms-2 text-sm font-medium text-gray-900 "
                                >
                                    Not Available
                                </label>
                            </div>
                        </div>
                        <div className="flex my-6">
                            <label className="block font-bold mr-2">
                                Selection:
                            </label>
                            <div className="flex items-center mr-3">
                                <input
                                    id="radio-1"
                                    type="radio"
                                    value=""
                                    name="radio"
                                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  "
                                    onChange={() => {
                                        setPostinputs({
                                            ...postinputs,
                                            selection: "rent",
                                        });
                                    }}
                                />
                                <label
                                    htmlFor="radio-1"
                                    className="ms-2 text-sm font-medium text-gray-900 "
                                >
                                    Rent
                                </label>
                            </div>
                            <div className="flex items-center mr-3">
                                <input
                                    checked
                                    id="radio-2"
                                    type="radio"
                                    value=""
                                    name="radio"
                                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                    onChange={() => {
                                        setPostinputs({
                                            ...postinputs,
                                            selection: "buy",
                                        });
                                    }}
                                />
                                <label
                                    htmlFor="radio-2"
                                    className="ms-2 text-sm font-medium text-gray-900 "
                                >
                                    Buy
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    checked
                                    id="radio-3"
                                    type="radio"
                                    value=""
                                    name="radio"
                                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                                    onChange={() => {
                                        setPostinputs({
                                            ...postinputs,
                                            selection: "lease",
                                        });
                                    }}
                                />
                                <label
                                    htmlFor="radio-3"
                                    className="ms-2 text-sm font-medium text-gray-900 "
                                >
                                    Lease
                                </label>
                            </div>
                        </div>
                        <div className="my-6">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Description:
                            </label>
                            <textarea
                                onChange={(c) => {
                                    setPostinputs({
                                        ...postinputs,
                                        description: c.target.value,
                                    });
                                }}
                                id="description"
                                rows={3}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Write a detailed description of the property..."
                            ></textarea>
                        </div>
                        <div className="my-6">
                            <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Amenities:
                            </label>
                            <textarea
                                onChange={(c) => {
                                    setPostinputs({
                                        ...postinputs,
                                        amenities: c.target.value,
                                    });
                                }}
                                id="message"
                                rows={3}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                placeholder="Mention all the amenities available..."
                            ></textarea>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="cursor-pointer text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none "
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div >
            <Footer />
        </div >
    );
}

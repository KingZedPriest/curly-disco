"use client"
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import logo from "../../public/covenantLogo.png";
export default function Home() {
const [imagePreview, setImagePreview] = useState<string | undefined>();
const fileInputRef = useRef<HTMLInputElement | null>(null);
const [name, setName] = useState<string>("");

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  } else {
    setImagePreview("");
  }
};

const saveToLocalStorage = (imageData: string, name:string) => {
  localStorage.setItem("image", imageData);
  console.log("Image saved to local storage!");

  localStorage.setItem("name", name);
  console.log("Name saved to local storage!");
};

const handleButtonClick = () => {
  fileInputRef.current?.click();
};

  return (
    <main className="">
      <Image src={logo} alt="TLGCI Logo" className="w-60" />
      <div className="mt-20 flex flex-col justify-between lg:flex-row lg:items-center">
        <div className="w-full text-sm sm:text-base lg:w-1/2 lg:text-lg">
          <p>
            Invite your friends for the
             <span className="font-bold text-red-500"> September Youth Summit </span> with your personalized DP!!!
          </p>
          <p className="mt-4 lg:mt-10">
            It is super easy, and can be completed in under two minutes.
          </p>
          <p className="mt-4 lg:mt-10">
            <span className="font-bold text-red-500">
              1<sup>st</sup> Corinthians 15:58:
            </span>
            Therefore, my dear brothers and sisters, stand firm. Let nothing
            move you. Always give yourselves fully to the work of the Lord,
            because you know that your labor in the Lord is not in vain.
          </p>
        </div>
        <div className="my-10 flex lg:justify-end lg:my-0 lg:w-1/2">
          <div className="rounded-lg bg-white px-10 sm:px-16 py-10 w-full lg:w-[60%]">
            <input
              placeholder="Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="mb-5 w-full rounded-md border-2 border-black px-3 py-1 text-black duration-500 placeholder:text-sm focus:border-red-500 focus:bg-slate-100 focus:outline-none lg:mb-0"
            />
            <div className="my-5 flex justify-center">
              <button
                onClick={handleButtonClick}
                className="text-semibold rounded-lg border-2 border-red-500 bg-red-500 px-3 py-2 text-white duration-500 hover:bg-white hover:text-red-500"
              >
                Select Image
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div
            className="border-dashed border-2 flex justify-center items-center border-black"
            placeholder="Name"
          >
            {imagePreview ? (
              <div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </div>
            ) : (
              <div className="py-20 px-24">Image</div>
            )}
          </div>

            <div className="my-5 flex justify-center">
              <Link
                href="banner"
                onClick={() => saveToLocalStorage}
                className="rounded-lg border-2 border-purple-700 bg-purple-700 px-3 py-2 font-semibold text-white duration-500 hover:bg-white hover:text-purple-700"
              >
                Generate Banner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

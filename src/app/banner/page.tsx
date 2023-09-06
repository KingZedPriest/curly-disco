"use client";
import Image from "next/image";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import bannerpic from "../../../public/copy.png";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

export default function Banner() {
  const [name, setName] = useState<any>();
  const [image, setImage] = useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(15);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  useEffect(() => {
    let timer:NodeJS.Timeout | undefined;

    if (isVisible && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setIsButtonEnabled(true); // Enable the button when the countdown completes
    }

    return () => clearInterval(timer);
  }, [isVisible, countdown]);

  const handleDownload = () => {
    htmlToImage
      .toBlob(document.getElementById("content") as HTMLElement)
      .then((blob) => {
        if (blob) {
          const name = (localStorage.getItem("name") || "").replace(/\s+/g, "_");
          saveAs(blob, `${name}-fastfood-banner.png`);
          
          // Remove name and image from local storage
          localStorage.removeItem("name");
          localStorage.removeItem("image");
        } else {
          // Handle the case when blob is null
          console.error("Blob is null.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setImage(localStorage.getItem("image"));
  }, []);

  return (
    <>{isVisible && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 text-black font-semibold">
        <div className="w-80 rounded bg-slate-200 py-8 text-center shadow-md">
          <p className="mb-4 text-xs">
            Does {name} Need a Professional Website?
            <br /> Contact <span className="text-sm font-bold text-green-600"> Priest on 09067789223</span>
            .
          </p>
          {countdown > 0 ? (
            <p>Time remaining: {countdown} seconds</p>
          ) : (
            <Link href="/">
              <button
                onClick={handleDownload}
                className={`rounded ${
                  isButtonEnabled ? "bg-blue-500" : "bg-gray-400"
                } px-4 py-2 text-white ${
                  isButtonEnabled ? "hover:bg-blue-600" : ""
                }`}
                disabled={!isButtonEnabled}
              >
                Download Image
              </button>
            </Link>
          )}
        </div>
      </div>
    )}
    <main className="mx-auto pt-10 lg:w-5/6 lg:pt-16">
      <Link
        href="/"
        className="mb-5 ml-5 flex w-fit items-center gap-2 rounded-md border border-purple-700 px-4 py-2 duration-500 hover:bg-purple-700"
      >
        <BiArrowBack />
        Back
      </Link>
      <div
        className={`${
          isVisible ? "hidden" : "flex"
        } mx-auto flex h-[500px] w-[500px] justify-center`}
      >
        <div className="relative">
          <Image src={bannerpic} alt="Picture of Church Dp banner" priority />

          <div className="absolute right-[110px] top-[180px] bg-white p-1">
            <Image
              src={image}
              alt="User's Photo"
              width="185"
              height="50"
              className="h-[120px] w-[120px]"
              priority
            />
          </div>
        </div>
      </div>
      <p className="text-xs lg:text-sm mx-auto w-64 lg:w-96 my-2 text-center">This is just a Preview, the downloadable version looks <span className="font-semibold text-red-600">BETTER.</span> </p>
      <div className={`${isVisible ? "flex" : "hidden"} justify-center`}>
        <div
          id="content"
          className="relative h-[1080px] min-w-[1080px]"
        >
          <Image src={bannerpic} alt="Picture of Church Dp banner" priority />

      <div className="absolute right-[225px] top-[360px] bg-white p-1">
            <Image
              src={image}
              alt="User's Photo"
              width="185"
              height="50"
              className="h-[300px] w-[300px]"
              priority
            />
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          className="rounded-lg border-2 border-violet-600 bg-violet-600 px-3 py-2 font-semibold text-white duration-500 hover:bg-white hover:text-violet-600"
          onClick={toggleVisibility}
        >
          Continue
        </button>
      </div>
    </main>
    </>
  );
}

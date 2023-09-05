"use client";
import Image from "next/image";
import html2canvas from "html2canvas";
import bannerpic from "../../../public/2.png";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

export default function Banner() {
  const [name, setName] = useState<any>();
  const [image, setImage] = useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleDownload = () => {
    const divToCapture = document.getElementById("content");
    if (!divToCapture) return;

    html2canvas(divToCapture).then((canvas) => {
      const imageDataURL = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = imageDataURL;
      a.download = `${name}-fastfood.png`;
      a.click();
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
    <main className="mx-auto pt-10 lg:w-5/6 lg:pt-16">
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-400">
          <div className="w-80 rounded bg-black py-8 text-center shadow-md">
            <p className="mb-4 text-xs">
              Want a Professional Website?
              <br /> Contact <span className="text-sm font-semibold text-[#AB2B2B]"> Priest 09067789223</span>
              .
            </p>
            <Link href="/">
              <button
                onClick={handleDownload}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Download Image
              </button>
            </Link>
          </div>
        </div>
      )}
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

          <div className="absolute right-[110px] top-[60px] rounded-[50%] border-2 border-[#AB2B2B] p-1">
            <Image
              src={image}
              alt="User's Photo"
              width="185"
              height="50"
              className="h-[70px] w-[70px] rounded-[50%]"
              priority
            />
          </div>
        </div>
      </div>
      <div className={`${isVisible ? "flex" : "hidden"} justify-center`}>
        <div
          id="content"
          className="relative h-[1080px] min-w-[1080px] overflow-x-auto"
        >
          <Image src={bannerpic} alt="Picture of Church Dp banner" priority />

          <div className="absolute right-[260px] top-[170px] rounded-[50%] border-2 border-[#AB2B2B] p-1">
            <Image
              src={image}
              alt="User's Photo"
              width="185"
              height="50"
              className="h-[120px] w-[120px] rounded-[50%]"
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
  );
}

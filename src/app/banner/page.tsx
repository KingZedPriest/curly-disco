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
  const [isVisible, setIsVisible] = useState<boolean>(false)

const handleDownload = () => {
  const divToCapture = document.getElementById('content');
  if (!divToCapture) return;

  html2canvas(divToCapture).then((canvas) => {
    const imageDataURL = canvas.toDataURL('image/png'); 

    const a = document.createElement('a');
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
    <main className="lg:w-5/6 mx-auto lg:pt-16 pt-10">
 {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-400">
          <div className="bg-black p-8 rounded shadow-md">
            <p className="text-lg mb-4">This is your popup content.</p>
            <Link href="/"><button
              onClick={handleDownload}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Download Image
            </button></Link>
          </div>
        </div>
         )}
      <Link
        href="/"
        className="flex items-center gap-2 mb-5 ml-5 w-fit border border-purple-700 px-4 py-2 rounded-md hover:bg-purple-700 duration-500"
      >
        <BiArrowBack />
        Back
      </Link>
      <div className={`${isVisible ? 'hidden' : 'flex'} flex mx-auto justify-center w-[500px] h-[500px]`}>
        <div className="relative">
          <Image
            src={bannerpic}
            alt="Picture of Church Dp banner"
            priority
          />

          <div className="absolute top-[60px] right-[110px] border-2 border-[#AB2B2B] rounded-[50%] p-1">
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
      <div className={`${isVisible ? 'flex' : 'hidden'} justify-center`}>
        <div id="content" className="min-w-[1080px] relative h-[1080px] overflow-x-auto">
          <Image
            src={bannerpic}
            alt="Picture of Church Dp banner"
            priority
          />

          <div className="absolute top-[170px] right-[260px] border-2 border-[#AB2B2B] rounded-[50%] p-1">
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
      <div className="flex justify-center mt-8">
        <button
          className="bg-violet-600 border-2 border-violet-600 duration-500 font-semibold rounded-lg px-3 py-2 text-white hover:bg-white hover:text-violet-600"
          onClick={toggleVisibility}
        >
          Continue
        </button>
      </div>
    </main>
  );
}

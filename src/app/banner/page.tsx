"use client";
import Image from "next/image";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import bannerpic from "../../../public/1.png";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

export default function Banner() {
  const [name, setName] = useState<any>();
  const [image, setImage] = useState<any>();

  const handleDownload = () => {
    htmlToImage
    .toBlob(document.getElementById("content") as HTMLElement)
    .then((blob) => {
      if (blob) {
        const name = (localStorage.getItem("name") || "").replace(/\s+/g, "_");
        saveAs(blob, `${name}-YW23-banner.png`);
      } else {
        // Handle the case when blob is null
        console.error("Blob is null.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};


  useEffect(() => {
    setName(localStorage.getItem("name"));
    setImage(localStorage.getItem("image"));
  }, []);

  return (
    <main className="lg:w-5/6 mx-auto lg:pt-16 pt-10">
      <Link
        href="/"
        className="flex items-center gap-2 mb-5 ml-5 w-fit border border-purple-700 px-4 py-2 rounded-md"
      >
        <BiArrowBack />
        Back
      </Link>
      <div className="flex justify-center">
        <div id="content" className="min-w-[500px] relative h-[500px]">
        
          <div className="absolute top-[120px] left-[172px]">
            {bannerpic && (
              <Image
                src={image}
                alt="User's Photo"
                width="185"
                height="50"
                className="h-[133px] w-[133px]"
                priority
              />
            )}
            <p className="text-center text-white mt-4 font-semibold">{name}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="bg-violet-600 rounded-lg px-3 py-2 text-white hover:bg-violet-900"
          onClick={handleDownload}
        >
          Download Image
        </button>
      </div>
    </main>
  );
}

"use client";

import Image from "next/image";

export default function ProjectHeroImage({ src, alt }) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        aria-hidden
        sizes="100vw"
        className="object-cover scale-110 blur-2xl brightness-[0.45]"
      />
      <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </>
  );
}

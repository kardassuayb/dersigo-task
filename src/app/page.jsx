"use client";

import Image from "next/image";
import dersigo from "../asset/images/dersigo.png";

const HomePage = () => {
  return (
    <div className="flex items-center h-full">
      <Image
        src={dersigo}
        className="mx-auto rounded-sm"
        alt="User's Picture"
      />
    </div>
  );
};

export default HomePage;

"use client";

import Image from "next/image";
import dersigo from "../asset/images/dersigo.png";

const HomePage = () => {
  return (
    <div className="flex my-auto shadow-xl rounded-xl p-10 mx-2 xs:mt-40 md:mt-0">
      <Image
        src={dersigo}
        className="my-auto mx-auto rounded-sm"
        alt="User's Picture"
      />
    </div>
  );
};

export default HomePage;

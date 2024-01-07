"use client";

// ICONS
import { IconSquareRoundedLetterX } from "@tabler/icons-react";
import { IconUserEdit } from "@tabler/icons-react";
import { IconExternalLink } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { useFetchUsersQuery } from "@/redux/store";

const HomePage = () => {
  const { data, error, isFetching } = useFetchUsersQuery();
  console.log(data);

  const transformedData = data
    ? data.data.map((item) => {
        const id = item.id;
        const image = item.picture;
        const title = `(${item.title})`;
        const name = `${item.lastName.toUpperCase()}, ${item.firstName}`;

        return {
          id,
          image,
          title,
          name,
        };
      })
    : [];

  const { searchTerm, setSearchTerm } = useState("");

  return (
    <div>
      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-span-12">
          <div className="box">
            <div className="box-body">
              <div className="relative">
                <label htmlFor="user-search" className="label">
                  Search
                </label>
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="h-3.5 w-3.5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="user-search"
                  id="user-search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-3 pr-10 search-input"
                  placeholder="Search for users"
                />
              </div>
              <div className="">
                <Link href="./page.jsx" className="btn btn-primary float-right">
                  <IconPlus />
                  Add User
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-6">
            {transformedData.map((user) => (
              <div
                className="xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 "
                key={user.id}
              >
                <div className="box user-box">
                  <div className="box-body space-y-3">
                    <div className="user-image">
                      <Link href="./page.jsx">
                        <Image
                          src={user.image}
                          width={160}
                          height={160}
                          className="mx-auto rounded-sm"
                          alt="User's Picture"
                        />
                      </Link>
                      <div className="user-icons">
                        <Link
                          href="./page.jsx"
                          className="z-40 absolute top-2 right-2 block bg-white p-2 leading-none rounded-full text-gray-500 text-base"
                        >
                          <i>
                            <IconSquareRoundedLetterX
                              size={20}
                              color="orange"
                            />
                          </i>
                        </Link>
                        <Link
                          href="./page.jsx"
                          className="z-40 absolute top-12 right-2 block bg-white p-2 leading-none rounded-full text-gray-500 text-base"
                        >
                          <i>
                            <IconExternalLink size={16} />
                          </i>
                        </Link>
                        <Link
                          href="./page.jsx"
                          className="z-40 absolute top-[5.5rem] right-2 block bg-white p-2 leading-none rounded-full text-gray-500 text-base"
                        >
                          <i>
                            <IconUserEdit size={16} />
                          </i>
                        </Link>
                      </div>
                    </div>
                    <div className="user-details">
                      <p>{user.title}</p>
                      <h5 className="text-lg font-semibold">{user.name}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

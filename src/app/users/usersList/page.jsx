"use client";

// ICONS
import { IconSquareRoundedLetterX } from "@tabler/icons-react";
import { IconUserEdit } from "@tabler/icons-react";
import { IconExternalLink } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";
// NEXT
import Image from "next/image";
import Link from "next/link";
// REACT
import { useState } from "react";
// RTK
import { useFetchUsersQuery } from "@/redux/store";
import { useRemoveUserMutation } from "@/redux/store";
// USER IMAGE
import dersigoUser from "../../../asset/images/dersigoUser.png";

const HomePage = () => {
  const { data, error, isFetching } = useFetchUsersQuery();
  console.log(data);

  const transformedData = data
    ? data.data.map((item) => {
        const id = item.id;
        const image = item.picture ? item.picture : dersigoUser;
        const title = `(${item.title ? item.title : "none"})`;
        const name = `${item.lastName.toUpperCase()}, ${item.firstName}`;

        return {
          id,
          image,
          title,
          name,
        };
      })
    : [];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = transformedData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ÜRÜN SİLME
  const [removeUser] = useRemoveUserMutation();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const deleteUser = () => {
    removeUser(selectedUserId);
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div>
      <div className="flex flex-col border bg-[#f4f5f7] border-[#f4f5f7] shadow-sm rounded-sm mb-3 relative">
        <div className="md:flex justify-between items-center space-x-2 my-2">
          <div className="text-blue-600 text-xl ml-3 font-medium">
            Users List
          </div>
          <div className="flex items-center md:justify-end justify-between gap-2">
            <div className="relative">
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
                className="py-2 px-4 border border-gray-200 block w-full rounded-sm text-sm focus:border-gray-200 focus:ring-transparent focus:shadow-sm"
                placeholder="Search for users"
              />
            </div>
            <div className="">
              <Link
                href="/users/newUser"
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-normal focus:ring-0 focus:outline-none focus:ring-offset-0 transition-all text-sm m-1 ml-0 bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 float-right"
              >
                <IconPlus size={16} />
                Add User
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        {filteredData.map((user) => (
          <div
            className="xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 "
            key={user.id}
          >
            <div className="flex flex-col border bg-[#f4f5f7] border-[#f4f5f7] shadow-sm rounded-sm mb-3 relative user-box">
              <div
                className={`p-3 space-y-3 ${
                  ["(ms)", "(miss)", "(mrs)"].includes(user.title.toLowerCase())
                    ? "bg-pink-100"
                    : user.title.toLowerCase() === "(mr)"
                    ? "bg-blue-100"
                    : ""
                }`}
              >
                <div className="relative mx-auto p-2 border border-gray-200 rounded-sm bg-gray-100">
                  <Link href={`/users/usersList/${user.id}`}>
                    <Image
                      src={user.image}
                      width={160}
                      height={160}
                      className="mx-auto rounded-sm"
                      alt="User's Picture"
                      priority
                    />
                  </Link>
                  <div className="user-icons">
                    <div className="z-40 absolute top-2 right-2 block bg-white p-2 leading-none rounded-full text-gray-500 text-base cursor-pointer">
                      <i className="hover:text-blue-500">
                        <IconSquareRoundedLetterX
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setIsDeleteModalOpen(true);
                          }}
                        />
                      </i>
                      {isDeleteModalOpen && selectedUserId === user.id && (
                        <div className="flex flex-col gap-2 absolute -top-[54px] right-[22px] bg-[#9AD0C2] text-[#141B19] py-2 px-2 rounded-md z-999 font-bold text-sm">
                          <p>Delete User!</p>
                          <div className="flex justify-around gap-2">
                            <button
                              onClick={deleteUser}
                              className="text-red-700"
                            >
                              Delete
                            </button>
                            <button
                              className="text-blue-700"
                              onClick={() => setIsDeleteModalOpen(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/users/usersList/${user.id}`}
                      className="z-40 absolute top-12 right-2 block bg-white p-2 leading-none rounded-full text-gray-500 text-base"
                    >
                      <i>
                        <IconExternalLink />
                      </i>
                    </Link>
                    <Link
                      href={`/users/updateUser/${user.id}`}
                      className="z-40 absolute top-[5.5rem] right-2 block bg-white p-2 leading-none rounded-full text-gray-500 text-base"
                    >
                      <i>
                        <IconUserEdit />
                      </i>
                    </Link>
                  </div>
                </div>
                <div className="flex justify-center items-center space-x-1">
                  <p className="mb-0 text-sm">{user.title}</p>
                  <h5 className="text-base font-semibold mb-0">{user.name}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

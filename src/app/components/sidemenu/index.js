"use client";
import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

const SideMenu = () => {
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);
  const [showPostsDropdown, setShowPostsDropdown] = useState(false);

  const toggleUsersDropdown = () => {
    setShowUsersDropdown(!showUsersDropdown);
    setShowPostsDropdown(false);
  };

  const togglePostsDropdown = () => {
    setShowPostsDropdown(!showPostsDropdown);
    setShowUsersDropdown(false);
  };

  return (
    <div className="bg-gray-100 h-full flex md:p-0 sm:pl-5 md:justify-center">
      <ul className="flex flex-row gap-4 z-40 sm:gap-10 p-0">
        <li
          className="h-fit"
          onMouseEnter={toggleUsersDropdown}
          onMouseLeave={toggleUsersDropdown}
        >
          <span className="flex gap-1 p-1 border-b-2 border-gray-500">
            Users <IconChevronDown size={16} className="m-auto" />
          </span>
          {showUsersDropdown && (
            <ul className="absolute bg-gray-100 shadow-md pl-0">
              <li className="p-1">
                <Link
                  href="/users/usersList"
                  className="text-blue-500 hover:text-blue-400 hover:border-b-2 border-blue-400"
                >
                  Users List
                </Link>
              </li>
              <li className="p-1">
                <Link
                  href="/users/newUser"
                  className="text-blue-500 hover:text-blue-400 hover:border-b-2 border-blue-400"
                >
                  New User
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className="h-fit"
          onMouseEnter={togglePostsDropdown}
          onMouseLeave={togglePostsDropdown}
        >
          <span className="flex gap-1 p-1 border-b-2 border-gray-500">
            Posts <IconChevronDown size={16} className="m-auto" />
          </span>
          {showPostsDropdown && (
            <ul className="absolute bg-gray-100 shadow-md pl-0">
              <li className="p-1">
                <Link
                  href="/posts/postsList"
                  className="text-blue-500 hover:text-blue-400 hover:border-b-2 border-blue-400"
                >
                  Posts List
                </Link>
              </li>
              <li className="p-1">
                <Link
                  href="/posts/newPost"
                  className="text-blue-500 hover:text-blue-400 hover:border-b-2 border-blue-400"
                >
                  New Post
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;

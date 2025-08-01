import { assets } from "@/Assets/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <aside className="flex flex-col bg-slate-100 h-screen w-28 sm:w-40 border-r border-black">
      {/* Logo Section */}
      <div className="px-3 py-3 border-b border-black flex justify-center sm:justify-start">
        <Image src={assets.logo} width={120} alt="App Logo" />
      </div>

      {/* Navigation Links */}
      <nav className="relative flex-1 py-12">
        <ul className="absolute right-2 sm:right-4 w-[60%] sm:w-[80%] space-y-5">
          {/* Add Blogs */}
          <li>
            <Link
              href="/admin/addproduct"
              className="flex items-center gap-3 px-3 py-2 bg-white border border-black shadow-[-4px_4px_0px_rgba(0,0,0,0.7)] font-medium"
            >
              <Image src={assets.add_icon} width={28} alt="Add Blog Icon" />
              <span className="hidden sm:inline">Add blogs</span>
            </Link>
          </li>

          {/* Blogs List */}
          <li>
            <Link
              href="/admin/bloglist"
              className="flex items-center gap-3 px-3 py-2 bg-white border border-black shadow-[-4px_4px_0px_rgba(0,0,0,0.7)] font-medium"
            >
              <Image src={assets.blog_icon} width={28} alt="Blogs Icon" />
              <span className="hidden sm:inline">Blogs List</span>
            </Link>
          </li>

          {/* Subscriptions */}
          <li>
            <Link
              href="/admin/subscriptions"
              className="flex items-center gap-0.5 px-0 py-4 bg-white border border-black shadow-[-4px_4px_0px_rgba(0,0,0,0.7)] font-medium"
            >
              <Image
                src={assets.email_icon}
                width={28}
                alt="Subscriptions Icon"
              />
              <span className="hidden sm:inline">Subscriptions</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

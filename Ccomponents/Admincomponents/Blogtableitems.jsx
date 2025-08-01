import { assets } from "@/Assets/Assets/assets";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

// Utility function to format date
const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj)) return "Invalid Date";
  return dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }); // e.g., "31 Jul 2025"
};

const Blogtableitems = ({
  author_img,
  title,
  author,
  date,
  mongoId,
  deleteBlog,
}) => {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(mongoId);
    }
  };

  return (
    <tr className="bg-white border border-b">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          width={40}
          height={40}
          alt="Author"
          src={author_img ? author_img : assets.profile_icon}
        />
        <p>{author || "No Author"}</p>
      </th>
      <td className="px-6 py-4">{title || "No Title"}</td>
      <td className="px-6 py-4">{date ? formatDate(date) : "15 Jul 2025"}</td>
      <td
        className="px-6 py-4 cursor-pointer text-red-600 font-bold"
        onClick={handleDelete}
      >
        X
      </td>
    </tr>
  );
};
export default Blogtableitems;

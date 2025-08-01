"use client";
import { assets } from "@/Assets/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const [image, setimage] = React.useState(null);
  const [data, setdata] = React.useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennet",
    author_img: "/author_img.png",
  });
  const onChangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(data);
  };
  const onSubmithandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("author_img", data.author_img);
    formData.append("image", image);
    const response = await axios.post("/api/blog", formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setimage(false);
      setdata({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Bennet",
        author_img: "/author_img.png",
      });
    } else {
      toast.error("Error");
    }
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={onSubmithandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            width={140}
            height={70}
            className="mt-4"
          />
        </label>
        <input
          type="file"
          hidden
          required
          id="image"
          onChange={(e) => setimage(e.target.files[0])}
        />
        <p className="text-xl mt-4">Blog Title</p>
        <input
          name="title"
          onChange={onChangehandler}
          value={data.title}
          className="w-full sm:w-[500px] mt--4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />
        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangehandler}
          value={data.description}
          className="w-full sm:w-[500px] mt--4 px-4 py-3 border"
          type="text"
          placeholder="Write content here"
          required
          rows={7}
        />
        <p className="text-xl mt-4">Blog Category</p>
        <select
          name="category"
          onChange={onChangehandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-700"
        >
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Startup">Startup</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          Add
        </button>
      </form>
    </>
  );
};

export default Page;

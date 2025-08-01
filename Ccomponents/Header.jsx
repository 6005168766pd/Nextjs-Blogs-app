import { assets } from "@/Assets/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

const Header = () => {
  const [email, setEmail] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", email);
    const response = await axios.post("/api/email", formdata);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error Subscribing Email");
    }
  };
  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <ToastContainer />
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt=""
          className="width-[130px] sm:w-auto"
        />
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_rgba(0, 0, 0, 0.9)]">
          Get Started
          <Image src={assets.arrow} alt="Arrow icon" />
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xlfont-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[750px] m-auto text-xs sm:text-base">
          {" "}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
          repudiandae odit nesciunt eos quam, explicabo blanditiis ex accusamus.
        </p>
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex justify-between max-w-[500px] shadow-[-7px_7px_0px_rgba(0,0,0,0.9)] scale-75 sm:scale-100 mx-auto mt-10 border-1 border-solid border-black "
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Your Email"
            className="pl-4 outline-none "
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;

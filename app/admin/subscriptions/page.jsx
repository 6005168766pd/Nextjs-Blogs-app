"use client";
import Subscriptionitems from "@/Ccomponents/Admincomponents/Subscriptionitems";
import axios from "axios";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const [emails, setEmails] = React.useState([]);
  const fetchemail = async () => {
    const response = await axios.get("/api/email");
    setEmails(response.data.emails);
  };
  const deleteemail = async (mongoid) => {
    const response = await axios.delete(`/api/email`, {
      params: { id: mongoid },
    });
    if (response.data.success) {
      toast.success(response.data.msg);
      fetchemail();
    } else {
      toast.error("Failed to delete email");
    }
  };
  useEffect(() => {
    fetchemail();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <ToastContainer />
      <h1>All Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscriptions
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:block">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((item, index) => {
              return (
                <Subscriptionitems
                  deleteemail={deleteemail}
                  key={index}
                  mongoId={item._id}
                  email={item.email}
                  date={item.date}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;

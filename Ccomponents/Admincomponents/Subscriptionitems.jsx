import React from "react";
import { ToastContainer } from "react-toastify";

const Subscriptionitems = ({ email, mongoId, deleteemail, date }) => {
  const emaildate = new Date(date);
  return (
    <tr className="bg-white border-b text-left">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {email ? email : "No Email"}
      </th>
      <td className="px-6 py-4 hidden sm:block">{emaildate.toDateString()}</td>
      <td
        className="px-6 py-4 cursor-pointer"
        onClick={() => deleteemail(mongoId)}
      >
        X
      </td>
    </tr>
  );
};

export default Subscriptionitems;

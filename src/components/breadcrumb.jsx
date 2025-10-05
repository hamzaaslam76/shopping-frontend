import React from "react";

const Breadcrumb = () => {
  return (
    <nav className="text-sm font-semibold text-black ml-8 sm:ml-10 lg:ml-20 mt-2">
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <a href="#" className="hover:underline">
            Home
          </a>
        </li>
        <li>{">"}</li>
        <li>
          <a href="#" className="hover:underline">
            New Arrival
          </a>
        </li>
        <li>{">"}</li>
        <li className="text-black font-semibold">
          Regal Leather Starlet
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;

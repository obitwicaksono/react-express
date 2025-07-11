import React from "react";

export function Header() {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img
              src="svgviewer-png-output.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              User Data
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
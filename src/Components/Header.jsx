import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/Images/logo (2).png";
import { HiHome, HiMagnifyingGlass, HiTv } from "react-icons/hi2";
import { IoMdMenu } from "react-icons/io";
import { TbMovie } from "react-icons/tb";
import { IoStar } from "react-icons/io5";
import HeaderItem from "./HeaderItem";
import { FaRegUser } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";

function Header() {
  const { user, logOut } = UserAuth();
  const [toggle, setToggle] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      // Redirect to home page after logout
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-between bg-black p-5">
      <div className="flex gap-4 items-center">
        <img
          src={logo}
          alt="logo"
          className="w-8 h-8 md:w-[50px] md:h-[50px] object-cover"
        />
        <h1 className="text-white-500 text-2xl md:text-3xl font-bold">Flick<span className="text-red-500">Rate</span></h1>
      </div>

      <div className="flex gap-2 ml-auto">
        {" "}
        {/* Added ml-auto to move items to the right */}
        {user?.email ? ( // Render logout button if user is logged in
          <button
            onClick={handleLogout}
            className="bg-[#12314d] px-5 py-2 rounded cursor-pointer text-white"
          >
            Logout
          </button>
        ) : (
          // Render sign in and sign up buttons if user is not logged in
          <>
            <Link to="/login">
              <button className="bg-[#12314d] px-6 py-2 rounded cursor-pointer text-white">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-[#12314d] px-6 py-2 rounded cursor-pointer text-white">
                Sign Up
              </button>
            </Link>
          </>
        )}
        {/* Menu bar icon */}
        <IoMdMenu
          className="text-white text-[30px] cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />
      </div>

      {/* Conditional rendering for the menu */}
      {toggle && (
        <div className="absolute mt-40 bg-[#121212] border-[1px] border-gray-700 p-3 px-8 py-4 z-30 flex flex-col">
          <Link to="/">
            <HeaderItem name="HOME" Icon={HiHome} />
          </Link>
          <Link to="/search">
            <HeaderItem name="SEARCH" Icon={HiMagnifyingGlass} />
          </Link>
          <Link to="/movie">
            <HeaderItem name="MOVIES" Icon={TbMovie} />
          </Link>
          <Link to="/tvshows">
            <HeaderItem name="TVSHOWS" Icon={HiTv} />
          </Link>
          {user?.email && (
            <Link to="/favourite">
              <HeaderItem name="FAVOURITE" Icon={IoStar} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;

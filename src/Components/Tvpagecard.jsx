import React from "react";
import heartIcon from "../assets/Images/heartIcon.png";
import { Link } from "react-router-dom";

function Tvpagecard({ tv, handleAddToFavourite }) {
  return (
    <div
      className="flex flex-col items-center relative group"
      style={{ width: "600px" }}
    >
      <Link to={`/zembedi/${tv.id}`}>
        <div className="w-full" style={{ width: "200px" }}>
          {" "}
          {/* Set a fixed width container */}
          <img
            src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
            className="w-full h-60 rounded-lg object-cover shadow-lg mb-4 transition-transform duration-300 transform hover:scale-105 cursor-pointer hover:border-[3px] border-gray-400"
            alt={tv.name}
          />
        </div>
        <div className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <img
            src={heartIcon}
            alt="Heart Icon"
            className="w-5 h-5 ml-1 mr-1 cursor-pointer"
            onClick={() => handleAddToFavourite(tv.id, tv.name, tv.poster_path)}
          />
        </div>
        <div className="text-white text-center">
          <p className="cursor-pointer">{tv.name}</p>
        </div>
      </Link>
    </div>
  );
}

export default Tvpagecard;

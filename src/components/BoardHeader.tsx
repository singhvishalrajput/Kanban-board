

import { Board } from "../types";
import { Search, X, Heart } from "lucide-react";
import globe from "../assets/globe-2-outline.png"
import { useState } from "react";
import hard from "../assets/Hard.png";
import add from "../assets/plus-circle-outline.png"
import bell from "../assets/bell-outline.png"
import alert from "../assets/alert-circle-outline.png"

import logo from "../assets/logo.png";
import trellomarkblue from "../assets/trello-mark-blue.png";

interface BoardHeaderProps {
  board: Board;
}

const BoardHeader = ({ board }: BoardHeaderProps) => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearchSubmit = () => {
    // Handle search submit logic here
    setShowMobileSearch(false);
  };

  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <div className="flex items-center">
          <h1 className="hidden sm:block text-xl font-semibold mr-2 text-gray-800"><img src={logo} alt="Trello" className="w-14 h-6" /></h1>
          <div className="hidden sm:block w-px h-6 bg-gray-300 mx-4"></div>
          <button 
            className="text-sm flex flex-row items-center gap-2 px-2 py-1 rounded mr-2"
            onClick={() => setShowMobileSearch(prev => !prev)}
          >
            <img src={trellomarkblue} alt="" />
            <span className="hidden sm:block">Boards</span>
            <Search className="w-4 h-4 sm:hidden" />
          </button>
          <div className="hidden sm:block w-px h-6 bg-gray-300 mx-4"></div>
          <div className="relative hidden md:block">
            <input
              type="text"
              className="bg-gray-100 px-3 py-1 pr-8 rounded-full text-sm w-90"
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-900" />
          </div>
        </div>
        <div className="flex items-center space-x-8">
        
          <div className="flex items-center gap-3">
          <button className="w-6 h-6 rounded-full  flex items-center justify-center">
            <img src={add} alt="" />
          </button>
          <button className="w-6 h-6 rounded-full  flex items-center justify-center">
            <img src={alert} alt="" />
          </button>
          <button className="w-6 h-6 rounded-full  flex items-center justify-center">
            <img src={bell} alt="" />
          </button>
          </div>
          <img
            src="https://i.pravatar.cc/30?img=10"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
      {showMobileSearch && (
        <div className="block md:hidden px-4 py-2 ">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-100 px-3 py-2 pr-12 rounded-md text-sm"
            />
            <button 
              onClick={() => setShowMobileSearch(false)}
              className="absolute right-10 top-1/2 transform -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
            <button 
              onClick={handleSearchSubmit}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Search className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-2 mt-4">
  <div className="flex flex-col md:flex-row md:items-center">
    <h2 className="text-xl font-semibold mb-2 md:mb-0 md:mr-4">{board.title}</h2>
    
    {/* Icons moved here for medium and larger screens */}
    <div className="hidden md:flex items-center mr-4">
      <button className="text-gray-200 mr-1">
        <Heart className="h-5 w-5" />
      </button>
      <div className="w-px h-5 bg-gray-300 mx-2"></div>
      <div className="flex items-center rounded px-1 py-1 text-sm">
        <img src={globe} alt="" />
        <span className="px-1 text-gray-300">Public</span>
      </div>
      <div className="w-px h-5 bg-gray-300 mx-2"></div>
      <button className="text-gray-600">
      <img src={hard} alt="" />
      </button>
    </div>
  </div>
  
  <div className="flex items-center justify-between w-full md:w-auto gap-4">
    {/* Icons shown only on mobile */}
    <div className="flex items-center md:hidden">
      <button className="text-gray-400">
        <Heart className="h-4 w-4" />
      </button>
      <div className="w-px h-4 bg-gray-400 mx-1"></div>
      <div className="flex items-center rounded px-1 py-1 text-sm">
        <img src={globe} alt="" />
        <span className="text-gray-400 ">Public</span>
      </div>
      <div className="w-px h-5 bg-gray-200 "></div>
      <button className="text-gray-600">
        <img src={hard} alt="" />
      </button>
    </div>
    
    <div className="flex items-center ml-auto">
      <div className="flex -space-x-2 mr-1 md:mr-10">
        {board.members.slice(0, 5).map((member) => (
          <img
            key={member.id}
            src={member.avatar}
            alt={member.name || "Member"}
            className="w-6 h-6 md:w-8 md:h-8  rounded-full border-2 border-white"
          />
        ))}
        {board.members.length > 5 && (
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-300 flex items-center justify-center border-2 border-white text-xs">
            +{board.members.length - 5}
          </div>
        )}
      </div>
      <button className="px-1 md:px-3 md:ml-3 py-1 rounded hover:bg-gray-200 ">Menu</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default BoardHeader;
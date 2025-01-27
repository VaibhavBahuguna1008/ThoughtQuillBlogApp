import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // To navigate programmatically
  const [selectedOption, setSelectedOption] = useState(
    location.pathname === "/posts?sort=trending"
      ? "Trending"
      : location.pathname === "/posts?sort=popular"
      ? "Most Popular"
      : location.pathname === "/posts?cat=databases"
      ? "databases"
      : location.pathname === "/posts?cat=development"
      ? "development"
      : location.pathname === "/posts?cat=web-design"
      ? "web-design"
      : location.pathname === "/posts?cat=seo"
      ? "seo"
      : location.pathname === "/posts?cat=marketing"
      ? "marketing"
      : location.pathname === "/posts?cat=web-design"
      ? "web-design"
      : "Select"
  );

  const handleOptionChange = (e) => {
    const selected = e.target.value;
    setSelectedOption(selected);
    if (selected === "Trending") {
      navigate("/posts?sort=trending");
    } else if (selected === "Most Popular") {
      navigate("/posts?sort=popular");
    }
    else if (selected === "Featured Posts") {
      navigate("/featured-posts");
    }
    else if (selected === "Saved Posts") {
      navigate("/saved-posts");
    }
    else if(selected === "databases"){
      navigate("/posts?cat=databases");
    }
    else if(selected === "development"){
      navigate("/posts?cat=development");
    }
    else if(selected === "web-design"){
      navigate("/posts?cat=web-design");
    }
    else if(selected === "marketing"){
      navigate("/posts?cat=marketing");
    }
    else if(selected === "seo"){
      navigate("/posts?cat=seo");
    }
  };

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between mb-7">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo.png" alt="thoughtquill Logo" w={32} h={32} />
        <span className="text-xl sm:text-xl md:text-2xl lg:text-3xl">ThoughtQuill</span>
      </Link>

      {/* MOBILE MENU */}
      <div className="lg:hidden">
        {/* MOBILE BUTTON */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex flex-col gap-[5.4px] ">
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${
                open && "rotate-45"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black transition-all ease-in-out ${
                open && "opacity-0"
              }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${
                open && "-rotate-45"
              }`}
            ></div>
          </div>
        </div>

        {/* MOBILE LINK LIST */}
        <div
          className={`w-full h-screen bg-[#e6e6ff] flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
          {location.pathname !== "/" && (
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          )}
          {location.pathname !== "/write" && (
            <Link
              to="/write"
              onClick={() => setOpen(false)}
              className="py-2 px-4  rounded-3xl bg-blue-800 text-white"
            >
              Create post
            </Link>
          )}
          <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="py-2 px-4   rounded-3xl  "
        >
          <option value="Select" disabled>
            Explore
          </option>
          <option value="Trending">Trending</option>
          <option value="Most Popular">Most Popular</option>
          <option value="Featured Posts">Featured Posts</option>
          <option value="Saved Posts">Saved Posts</option>
        </select>
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="py-2 px-4   rounded-3xl  "
        >
          <option value="Select" disabled>
            Categories
          </option>
          <option value="databases">Databases</option>
          <option value="development">Development</option>
          <option value="web-design">Web Design</option>
          <option value="seo">Search Engines</option>
          <option value="marketing">Marketing</option>
        </select>

          {location.pathname !== "/about" && (
            <Link to="/about" className="" onClick={() => setOpen(false)}>
              About
            </Link>
          )}
          <SignedOut>
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className="py-2 px-4  rounded-3xl bg-blue-800 text-white">
                Login 👋
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <div onClick={() => setOpen(false)}>
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden lg:flex lg:w-3/5 items-center gap-8 xl:gap-8 font-medium">
        {location.pathname !== "/" && <Link to="/">Home</Link>}
        {location.pathname !== "/write" && (
          <Link
            to="/write"
            className="py-2 px-4 rounded-3xl text-nowrap bg-blue-800 text-white text-center"
          >
            Create Post
          </Link>
        )}
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="py-2 px-4   rounded-3xl  "
        >
          <option value="Select" disabled>
            Explore
          </option>
          <option value="Trending">Trending</option>
          <option value="Most Popular">Most Popular</option>
          <option value="Featured Posts">Featured Posts</option>
          <option value="Saved Posts">Saved Posts</option>
        </select>
        
        {location.pathname !== "/about" && <Link to="/about">About</Link>}
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;

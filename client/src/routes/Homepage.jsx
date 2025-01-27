import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";

const Homepage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">

      {/* INTRODUCTION */}
      <div className="flex items-center justify-between">
        {/* titles */}
        <div className="">
          <h1 className="text-gray-800 text-3xl md:text-5xl lg:text-6xl font-bold">
            Influence <span className="text-blue-800">Inspire</span>  Invigorate  <span className="text-blue-800">Innovate</span> Infuse.
          </h1>
          <p className="mt-8 text-md md:text-xl">
          Let your ideas ignite a digital beacon - your unique voice deserves to be heard, and a blog is your canvas for inspiring others.
          </p>
        </div>
        {/* animated button */}
        <Link to="write" className="hidden lg:block relative">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-widest animate-spin animatedButton"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>
      {/* CATEGORIES */}
      <MainCategories />
      {/* FEATURED POSTS */}
      <div className="">
        <h1 className="text-3xl lg:text-4xl  font-bold text-gray-400 my-8">Featured Posts</h1>
        <FeaturedPosts />
      </div>
      
      {/* POST LIST */}
      <div className="">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-400 my-8">Recent Posts</h1>
        <PostList/>
      </div>
    </div>
  );
};

export default Homepage;

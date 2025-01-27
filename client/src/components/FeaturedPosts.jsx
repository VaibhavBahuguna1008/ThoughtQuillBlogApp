import { Link } from "react-router-dom";
import Image from "./Image";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import axiosInstance from "../lib/axios";

const fetchPost = async () => {
  const res = await axiosInstance.get(
    `/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;

  const posts = data.posts;
  if (!posts || posts.length === 0) {
    return;
  }

  return (

    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 ">
        {/* image */}
        {posts[0].img && <Image
          src={posts[0].img}
          className="rounded-3xl object-cover"
          w="895"
        />}
        {/* details */}
        <div className="flex items-baseline gap-4">
                <h1 className="font-semibold lg:text-lg">01.</h1>
                <span className="text-blue-800 lg:text-lg font-semibold capitalize">{posts[0].category}</span>
              <span className="text-gray-500 text-sm lg:text-sm text-nowrap">{format(posts[0].createdAt)}</span>
            </div>
        {/* title */}
        <Link
              to={posts[0].slug}>
            <div className="text-xl lg:text-2xl font-semibold">
                  {posts[0].title}
            </div>
            <div>
                <p className="text-sm md:text-md lg:text-md xl:text-lg ">
                    {posts[0].desc?.length > 100 ? posts[0].desc.substring(0, 100) + "...  " : posts[0].desc}
                    <span className="underline text-blue-800 font-bold text-sm text-nowrap">Read More</span>
                </p>
              </div>
            </Link>
      </div>
      
   

      {/* Others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* second */}
        {posts[1] && <div className="lg:h-1/3 flex  justify-between gap-4">
          {posts[1].img && <div className="w-1/3  aspect-video">
            <Image
              src={posts[1].img}
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>}
          {/* details and title */}
          <div className="w-2/3 flex flex-col gap-2">
            {/* details */}
            <div className="flex items-baseline gap-4">
                <h1 className="font-semibold lg:text-lg">02.</h1>
                <span className="text-blue-800 lg:text-lg font-semibold capitalize">{posts[1].category}</span>
              <span className="text-gray-500 text-sm lg:text-sm text-nowrap">{format(posts[1].createdAt)}</span>
            </div>
            {/* title */}
            
            <Link
              to={posts[1].slug}>
            <div className="text-xl lg:text-2xl font-semibold">
                  {posts[1].title}
            </div>
            <div>
                <p className="text-sm md:text-md lg:text-md xl:text-lg font-normal">
                    {posts[1].desc?.length > 100 ? posts[1].desc.substring(0, 100) + "...  " : posts[1].desc}
                    <span className="underline text-blue-800 font-bold text-sm text-nowrap">Read More</span>
                </p>
              </div>
            </Link>
          </div>
        </div>}
        {/* third */}
        {posts[2] && <div className="lg:h-1/3 flex justify-between gap-4">
          {posts[2].img && <div className="w-1/3 aspect-video">
            <Image
              src={posts[2].img}
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>}
          {/* details and title */}
          <div className="w-2/3 flex flex-col gap-2">
            {/* details */}
            <div className="flex items-baseline gap-4">
                <h1 className="font-semibold lg:text-lg">03.</h1>
                <span className="text-blue-800 lg:text-lg font-semibold capitalize">{posts[2].category}</span>
              <span className="text-gray-500 text-sm lg:text-sm text-nowrap">{format(posts[2].createdAt)}</span>
            </div>
            {/* title */}
            <Link
              to={posts[2].slug}>


            
            
            <div className="text-xl lg:text-2xl font-semibold">
                  {posts[2].title}
            </div>
            <div>
                <p className="text-sm md:text-md lg:text-md xl:text-lg font-normal">
                    {posts[2].desc?.length > 100 ? posts[2].desc.substring(0, 100) + "...  " : posts[2].desc}
                    <span className="underline text-blue-800 font-bold text-sm text-nowrap">Read More</span>
                </p>
              </div>
              </Link>
          </div>
        </div>}
        {/* fourth */}
        {posts[3] && <div className="lg:h-1/3 flex justify-between gap-4">
          {posts[3].img && <div className="w-1/3 aspect-video">
            <Image
              src={posts[3].img}
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>}
          {/* details and title */}
          <div className="w-2/3 flex flex-col gap-2">
            {/* details */}
            <div className="flex items-baseline gap-4">
                <h1 className="font-semibold lg:text-lg">04.</h1>
                <span className="text-blue-800 lg:text-lg font-semibold capitalize">{posts[3].category}</span>
              <span className="text-gray-500 text-sm lg:text-sm text-nowrap">{format(posts[3].createdAt)}</span>
            </div>
            {/* title */}
            <Link
              to={posts[3].slug}>
            <div className="text-xl lg:text-2xl font-semibold">
                  {posts[3].title}
            </div>
            <div>
                <p className="text-sm md:text-md lg:text-md xl:text-lg font-normal">
                    {posts[3].desc?.length > 100 ? posts[1].desc.substring(0, 100) + "...  " : posts[3].desc}
                    <span className="underline text-blue-800 font-bold text-sm text-nowrap">Read More</span>
                </p>
              </div>
            </Link>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default FeaturedPosts;
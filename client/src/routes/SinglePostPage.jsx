import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";

import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import axiosInstance from "../lib/axios";

const fetchPost = async (slug) => {
  const res = await axiosInstance.get(`/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found!";

  return (
    <div className="flex flex-col gap-8 ">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex flex-wrap text-nowrap items-center gap-3 text-gray-500 text-md">
            <Link className="text-blue-800" to={`/posts?author=${data.user.username}`}>
              <span className="text-gray-500 font-semibold">Author : </span> {data.user.username}
            </Link>
            <Link className="text-blue-800 font-semibold capitalize" to={`/posts?cat=${data.category}`}>
              <span className="text-gray-500">Category : </span> {data.category}
            </Link>
            <span className="text-gray-500 text-sm"> •  {format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 lg:text-lg font-medium">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.img} w="300" className="rounded-2xl" />
          </div>
        )}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12 justify-between">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user.img && (
                <Image
                  src={data.user.img}
                  className="w-12 h-12 rounded-full object-cover"
                  w="48"
                  h="48"
                />
              )}
              <Link className="text-blue-800" to={`/posts?author=${data.user.username}`}>{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-500">
              {data.visit} views
            </p>
          </div>
          <PostMenuActions post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to={"/posts"}>All</Link>
            <Link className="underline" to="/posts?cat=web-design">Web Design</Link>
            <Link className="underline" to="/posts?cat=development">Development</Link>
            <Link className="underline" to="/posts?cat=databases">Databases</Link>
            <Link className="underline" to="/posts?cat=search-engines">Search Engines</Link>
            <Link className="underline" to="/posts?cat=marketing">Marketing</Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;

import React from 'react';
import { useState } from "react";

import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from '@tanstack/react-query';
import PostListItem from '../components/PostListItem';
import SideMenu from '../components/SideMenu';
import axiosInstance from '../lib/axios';

const fetchPost = async () => {
  const res = await axiosInstance.get(
    `/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

function FeaturedPostsPage() {
  const [open, setOpen] = useState(false);
  const { isLoading, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPost(),
  });
  const posts = data?.posts; // Destructure posts from the data object
  const toggleSideMenu = () => setOpen(prev => !prev);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">No featured posts available.</p>
      </div>
    );
  }
  


  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-400 mb-5">Featured Posts</h1>
      
    

      <div className="flex flex-col-reverse gap-8 md:flex-row justify-between">
        <div className="w-full md:w-2/3">
          {posts.map((post) => (
            <PostListItem post={post} key={post._id} />
          ))}
        </div>
        

      </div>
    </div>
  );
}

export default FeaturedPostsPage;
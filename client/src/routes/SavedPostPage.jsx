
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

import PostListItem from "../components/PostListItem";
import axiosInstance from "../lib/axios";
function SavedPostPage() {
  const { getToken } = useAuth();
  const [open, setOpen] = useState(false);

  const fetchSavedPosts = async () => {
    const token = await getToken();
    const res = await axiosInstance.get(`/users/saved`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };

  const { isLoading, error, data: posts } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: fetchSavedPosts,
  });
  
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
        <p className="text-gray-600">No saved posts available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-400 mb-5">Saved Posts</h1>
      
      

      <div className="flex flex-col-reverse gap-8 md:flex-row justify-between">
        <div className="w-full  md:w-2/3">
          {posts.map((post) => (
            <PostListItem post={post} key={post._id} />
          ))}
        </div>
        

      </div>
    </div>
  );
}

export default SavedPostPage;

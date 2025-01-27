import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";
import axiosInstance from "../lib/axios";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    img && setValue((prev) => prev + `<p><img src="${img.url}" alt=""/></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) => prev + `<p><iframe class="ql-video" src="${video.url}"></iframe></p>`
      );
  }, [video]);

  const navigate = useNavigate();
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      try {
        const token = await getToken();

        
        const response = await axiosInstance.post(`/posts`, newPost, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        return response.data;
      } catch (error) {

        throw new Error(error.response?.data?.message || 'Failed to create post');
      }
    },
    onSuccess: (data) => {
      toast.success("Post has been created");
      navigate(`/${data.slug}`);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div className="flex items-center justify-center h-full">Please login to continue</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cover) {
      toast.warning("Please add a cover image");
      return;
    }

    const formData = new FormData(e.target);
    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    // Validate required fields
    if (!data.title || !data.desc || !data.content) {
      toast.warning("Please fill in all required fields");
      return;
    }

    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl lg:text-2xl font-bold text-blue-800">Create New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button type="button" className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            {cover ? 'Change cover image' : 'Add a cover image'}
          </button>
        </Upload>
        {cover && (
          <div className="relative w-full h-40">
            <img 
              src={cover.url} 
              alt="Cover preview" 
              className="w-auto h-full object-contain rounded-xl"
            />
          </div>
        )}
        <input
          required
          className="lg:text-4xl md:text-2xl text-xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Story"
          name="title"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="category" className="sm:text-sm md:text-md lg:text-lg">
            Choose a category:
          </label>
          <select
            name="category"
            id="category"
            className="p-2 rounded-xl bg-white shadow-md sm:text-sm md:text-md lg:text-lg"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          required
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="A Short Description"
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              🌆
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              ▶️
            </Upload>
          </div>
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {progress > 0 && <div className="text-sm text-gray-500">Upload progress: {progress}%</div>}
      </form>
    </div>
  );
};

export default Write;
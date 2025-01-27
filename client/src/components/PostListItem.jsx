import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";

const PostListItem = ({ post , index }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      
      {/* image */}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          {/* <div className="text-8xl font-bold text-gray-300 text-center">{index+1}.</div> */}
          <Image src={post.img} className="rounded-2xl object-cover" w="735" />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col items-start text-start gap-4 xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold text-start">
          {post.title}
        </Link>
        <div className="flex flex-col text-start gap-2 text-gray-500 text-md">   
          {post.user?.username && (
            <Link className="text-blue-800" to={`/posts?author=${post.user.username}`}>
              <span className="text-gray-500 font-semibold">Author :</span> {post.user.username}
            </Link>
          )}
          <Link className="text-blue-800 capitalize font-semibold" to={`/posts?cat=${post.category}`}>
            <span className="text-gray-500 font-semibold">Category :</span> {post.category}
          </Link>
          <span className="text-gray-500 text-sm lg:text-sm">{format(post.createdAt)}</span>
        </div>

        <p>{post.desc}</p>
        <Link to={`/${post.slug}`} className="underline text-blue-800 font-bold text-sm text-nowrap">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
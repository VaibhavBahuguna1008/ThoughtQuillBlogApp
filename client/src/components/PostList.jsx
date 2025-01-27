import PostListItem from "./PostListItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../lib/axios";

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);

  const res = await axiosInstance.get(`/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  });
  return res.data;
};

const PostList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  // if (status === "loading") return "Loading...";
  if (isFetching) return "Loading...";
  

  // if (status === "error") return "Something went wrong!";
  if (error) return "Something went wrong!";

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      
      endMessage={ allPosts.length == 0 ? <p><b>No posts found!</b></p> :
        <p>
          <b>All posts loaded!</b>
        </p>
      }
    >
      {allPosts.map((post ,index) => (
        <PostListItem key={ post._id} post={post}  index={index} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;

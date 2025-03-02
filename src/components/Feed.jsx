import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { BASE_BACKEND_URL } from "../utils/constants";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;

    const res = await axios.get(BASE_BACKEND_URL + "/feed", {
      withCredentials: true,
    });

    dispatch(addFeed(res?.data));
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if(feed.length <= 0) return<h1 className="text-center text-xl font-semibold text-gray-700 py-5">
  No New Users Found...
</h1> 
  return (
    feed && (
      <div>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

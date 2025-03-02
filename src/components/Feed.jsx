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

  return (
    feed && (
      <div>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;

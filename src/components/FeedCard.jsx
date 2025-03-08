import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_BACKEND_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { removeUserFromFeed } from "../utils/feedSlice";

const FeedCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const [exitAnimation, setExitAnimation] = useState(null);
  const [isChanging, setIsChanging] = useState(false); // Controls the new card animation

  const handleSendRequest = async (status, userId) => {
    setExitAnimation(status === "interested" ? "right" : "left");
    setIsChanging(true); // Start new card animation at the same time

    setTimeout(() => {
      dispatch(removeUserFromFeed(userId));
      axios.post(
        `${BASE_BACKEND_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      setExitAnimation(null); // Reset animation for the next card
      setIsChanging(false); // Reset flag for new card animation
    }, 800); // Ensure both animations happen together
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="flex justify-center items-center mt-20" // Move flex properties here
        key={_id} // Ensures animation resets for each new card
        initial={{ opacity: 0, scale: isChanging ? 0.9 : 1 }} // New card animation starts at the same time
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.8, ease: "easeOut" },
        }}
        exit={
          exitAnimation
            ? {
                x: exitAnimation === "right" ? 200 : -200,
                opacity: 0,
                rotate: exitAnimation === "right" ? 15 : -15, // Small tilt effect
                filter: "blur(10px)",
                transition: { duration: 0.8, ease: "easeOut" },
              }
            : {}
        }
      >
        <div className="card bg-base-300 w-96 shadow-xl rounded-lg flex flex-col justify-between">
          <figure className="h-98 flex justify-center items-center overflow-hidden">
            <img
              src={user.photoUrl}
              alt="photo"
              className="object-cover w-full h-full rounded-t-lg"
            />
          </figure>

          <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{about}</p>
            <div className="card-actions justify-center gap-4 mt-4">
              <button
                className="btn btn-primary"
                onClick={() => handleSendRequest("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleSendRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeedCard;

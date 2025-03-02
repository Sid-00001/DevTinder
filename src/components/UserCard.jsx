import React from "react";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const {_id, firstName, lastName, photoUrl, age, about, gender, skills } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_BACKEND_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
   
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure className="h-1/2 w-1/2 mx-auto mt-10">
          <img src={photoUrl} />
        </figure>
        <div className="card-body items-center text-center ">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " , " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary mx-2"
              onClick={() => {
                handleSendRequest("ignored", _id);
              }}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary "
              onClick={() => {
                handleSendRequest("interested", _id);
              }}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

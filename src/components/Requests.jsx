import React, { useEffect } from "react";
import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request || []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${BASE_BACKEND_URL}/user/requests/received`,
        {
          withCredentials: true,
        }
      );
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests)
    return <div className="text-center text-gray-500 py-5">Loading...</div>;
  if (requests.length === 0)
    return (
      <h1 className="text-center text-xl font-semibold text-gray-700 py-5">
        No Requests Found...
      </h1>
    );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
      Requests
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, about, gender } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className=" bg-neutral text-neutral-content rounded-lg p-6 flex flex-col sm:flex-row items-center w-full max-w-2xl "
            >
              <img
                src={photoUrl}
                alt={firstName}
                className="w-20 h-20 rounded-full border-4 border-primary shadow-md object-cover"
              />
              <div className="sm:ml-6 flex-grow text-center sm:text-left mt-4 sm:mt-0">
                <h2 className="text-xl font-semibold text-white">
                  {firstName} {lastName}
                </h2>
                <p className="text-gray-500">
                  <strong>{age || "N/A"} ,  {gender || "N/A"}</strong> 
                </p>
              
                <p className="text-sm text-gray-500 mt-1 italic">{about}</p>
              </div>
              <div className="mt-4 sm:mt-0 flex gap-4">
                <button className="btn btn-soft btn-accent">Accept</button>
                <button className="btn btn-soft btn-info">Reject</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;

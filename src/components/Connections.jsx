import React, { useEffect } from "react";
import axios from "axios";
import { BASE_BACKEND_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection || []);

  // If connections is nested inside another array, extract the first array
  const actualConnections = Array.isArray(connections[0])
    ? connections[0]
    : connections;

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(`${BASE_BACKEND_URL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnection(res.data));
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    fetchConnections();
  }, [dispatch]);

  if (!actualConnections)
    return <div className="text-center py-5">Loading...</div>;
  if (actualConnections.length === 0)
    return (
      <h1 className="text-center text-xl font-semibold text-gray-700 py-5">
        No Connections Found...
      </h1>
    );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        Your Connections
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actualConnections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            about,
            gender,
            skills,
          } = connection;
          return (
            <div
              key={_id}
              className="card bg-neutral text-neutral-content shadow-xl p-6 transition-transform transform hover:scale-105"
            >
              <figure className="flex justify-center">
                <img
                  src={photoUrl}
                  alt={firstName}
                  className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-lg"
                />
              </figure>
              <div className="card-body text-center">
                <h2 className="text-xl font-bold text-white">
                  {firstName} {lastName}
                </h2>
                <p className="text-gray-300">
                  <strong>Age:</strong> {age || "N/A"}
                </p>
                <p className="text-gray-300">
                  <strong>Gender:</strong> {gender || "N/A"}
                </p>
                <p className="text-sm text-gray-400 italic">{about}</p>
                <div className="mt-4">
                  {skills && skills.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="badge badge-primary px-3 py-1 text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="badge badge-error px-4 py-2 text-sm font-semibold">
                      No skills listed
                    </span>
                  )}
                </div>
                <button className="btn btn-outline btn-primary mt-4">
                  Chat
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

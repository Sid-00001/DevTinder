import React, { useEffect, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { BASE_BACKEND_URL } from "../utils/constants";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  
  // Use a more specific selector that gets exactly what we need
  const rawConnections = useSelector((store) => store.connection);

  // Memoize the processed connections to prevent unnecessary rerenders
  const actualConnections = useMemo(() => {
    if (!rawConnections) return null;
    // If connections are nested inside an array, extract them
    return Array.isArray(rawConnections[0]) ? rawConnections[0] : rawConnections;
  }, [rawConnections]);

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
    <div className="flex items-center justify-center flex-col h-[900px]">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        Your Connections
      </h1>
      <ConnectionCard connections={actualConnections} />
    </div>
  );
};

export default Connections;
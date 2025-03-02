import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, about, gender, skills } = user;
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
            <button className="btn btn-primary mx-2">Ignore</button>
            <button className="btn btn-secondary ">Connect</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

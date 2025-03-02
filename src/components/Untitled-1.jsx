return (<div className="container mx-auto p-6">
  <h1 className="text-3xl font-bold text-center mb-8 text-primary">Requests</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {requests.map((request) => { const { _id, firstName, lastName, photoUrl,
    age, about, gender, skills, } = request.fromUserId; return (
    <div
      key="{_id}"
      className="card bg-neutral text-neutral-content shadow-xl p-6 transition-transform transform hover:scale-105"
    >
      <figure className="flex justify-center">
        <img
          src="{photoUrl}"
          alt="{firstName}"
          className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-lg"
        />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-xl font-bold text-white">{firstName} {lastName}</h2>
        <p className="text-gray-300"><strong>Age:</strong> {age || "N/A"}</p>
        <p className="text-gray-300">
          <strong>Gender:</strong> {gender || "N/A"}
        </p>
        <p className="text-sm text-gray-400 italic">{about}</p>
        <div className="mt-4">
          {skills && skills.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
            <span
              key="{index}"
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
        <button className="btn btn-soft btn-accent">Accept</button>
        <button className="btn btn-soft btn-info">Reject</button>
      </div>
    </div>
    ); })}
  </div>
</div>)

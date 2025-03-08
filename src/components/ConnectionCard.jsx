import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";

const ConnectionCard = ({ connections }) => {
  return (
    <div className="flex justify-center">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="w-full max-w-[90%] lg:max-w-[80%] overflow-hidden"
      >
        {connections.map((connection) => {
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
            <SwiperSlide key={_id} className="max-w-[250px]">
              <div className="card bg-neutral text-neutral-content shadow-xl p-4 transition-transform transform hover:scale-105 mx-auto h-full">
                <figure className="flex justify-center pt-2">
                  <img
                    src={photoUrl}
                    alt={firstName}
                    className="w-20 h-20 rounded-full object-cover border-4 border-primary shadow-lg"
                  />
                </figure>
                <div className="card-body text-center p-3">
                  <h2 className="text-base font-bold text-white">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-300 text-xs">
                    <strong>Age:</strong> {age || "N/A"}
                  </p>
                  <p className="text-gray-300 text-xs">
                    <strong>Gender:</strong> {gender || "N/A"}
                  </p>
                  <p className="text-xs text-gray-400 italic line-clamp-2">
                    {about}
                  </p>
                  <div className="mt-1">
                    {skills && skills.length > 0 ? (
                      <div className="flex flex-wrap justify-center gap-1">
                        {skills.slice(0, 2).map((skill, index) => (
                          <span
                            key={index}
                            className="badge badge-primary px-1 py-1 text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {skills.length > 2 && (
                          <span className="badge badge-secondary px-1 py-1 text-xs">
                            +{skills.length - 2}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="badge badge-error px-2 py-1 text-xs">
                        No skills
                      </span>
                    )}
                  </div>
                  <button className="btn btn-outline btn-primary btn-xs mt-2">
                    Chat
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ConnectionCard;

import React, { useState } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllStores, getAllUsers } from "../../api/Getapi";
import { AddSRating } from "../../api/Postapi";
import toast from "react-hot-toast";
import noresult from "../../assets/noresult.png";

const UserCard = ({ name, rated, email, address, image, onRateClick }) => {
  return (
    <div
      data-aos="fade-up"
      className="bg-gradient-to-br from-gray-900 to-[#220123] rounded-lg shadow-lg p-6 flex flex-col text-center border border-gray-700 hover:border-purple-500 transition-all duration-300 h-full"
    >
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-gray-400 text-xs mb-4">{address}</p>

      {rated ? (
        <button className="mt-auto bg-purple-400 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-md">
          Already Rated
        </button>
      ) : (
        <button
          onClick={onRateClick}
          className="mt-auto bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Rate & Feedback
        </button>
      )}
    </div>
  );
};

const Hero = React.forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [ratingsAndFeedback, setRatingsAndFeedback] = useState({});
  const [currentRating, setCurrentRating] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState("");

  const queryClient = useQueryClient();

  const { data: getuser } = useQuery({
    queryKey: ["get-user"],
    queryFn: getAllStores,
    staleTime: 0,
    gcTime: Infinity,
  });

  console.log("getuser", getuser);
  console.log("ratingsAndFeedback", ratingsAndFeedback);
  console.log("currentRating", currentRating);
  console.log("currentFeedback", currentFeedback);

  console.log("selectedUser", selectedUser?.id);
  const userid = Cookies.get("user_id");

  const { mutate: addrating, isPending: isaddingratingPending } = useMutation({
    mutationKey: ["add-ratting"],
    mutationFn: AddSRating,
    onSuccess: (data) => {
      console.log("API response in onSuccess:", data);

      if (!data) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (data?.success) {
        toast.success("Added Rating Successfully");
        setCurrentFeedback("");
        setCurrentRating(0);
        queryClient.invalidateQueries(["get-user"]);
      } else {
        const errorMessage =
          data?.errors || data?.message || "Registration failed.";
        console.log(errorMessage);
        toast.error(errorMessage);
      }
    },
    onError: (error) => {
      toast.error(error?.message || "An error occurred.");
    },
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const openModalForUser = (user) => {
    setSelectedUser(user);

    setCurrentRating(0);
    setCurrentFeedback("");
    setShowModal(true);
  };
  const [ratingError, setRatingError] = useState("");

  const handleSubmitRatingAndFeedback = () => {
    if (currentRating === 0) {
      setRatingError("Please select at least one star.");
      return;
    }

    if (selectedUser) {
      setRatingsAndFeedback((prevRatings) => ({
        ...prevRatings,
        [selectedUser.store_name]: {
          rating: currentRating,
          feedback: currentFeedback,
        },
      }));

      addrating({
        user_id: userid,
        store_id: selectedUser?.id,
        rating: currentRating,
        feedback: currentFeedback,
      });

      setShowModal(false);
      setCurrentRating(0);
      setCurrentFeedback("");
      setRatingError("");
    }
  };

  const StarRating = ({ rating, setRating, setRatingError }) => {
    return (
      <div className="flex flex-col mb-4">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl transition-colors duration-200 ${
                star <= rating
                  ? "text-yellow-400"
                  : "text-gray-500 hover:text-gray-400"
              }`}
              onClick={() => {
                setRating(star);
                setRatingError("");
              }}
            >
              &#9733;
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className="max-w-7xl mx-auto min-h-screen bg-[#210323] p-6 relative font-sans "
    >
      <div className="flex justify-center p-4 md:p-10">
        <h1 className="md:text-5xl text-2xl font-extrabold tracking-tight">
          Rate This Store
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {getuser?.stores?.length > 0 ? (
          getuser.stores.map((user, index) => (
            <div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <UserCard
                rated={user.already_rated}
                name={user.name}
                email={user.email}
                address={user.address}
                image={user?.image}
                onRateClick={() => openModalForUser(user)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col justify-center items-center min-h-[300px] w-full">
            <div className="text-gray-500"> No Store Found</div>
            <img
              src={noresult}
              alt="no result"
              className="w-40 h-40 object-contain"
            />
          </div>
        )}
      </div>

      {showModal && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{
              backdropFilter: "blur(2px)",
              backgroundColor: "rgba(16, 16, 16, 0.1)",
            }}
            onClick={() => {
              setShowModal(false);
              setCurrentRating(0);
              setCurrentFeedback("");
            }}
          />

          <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none p-4">
            <div
              className="bg-[#101010] text-white p-6 rounded-lg shadow-lg pointer-events-auto max-w-xl w-full border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-purple-300">
                  Store Info & Feedback
                </h3>
                <button
                  className="rounded-full p-1 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                  onClick={() => setShowModal(false)}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-300">
                      <strong className="text-purple-200">Name:</strong>{" "}
                      {selectedUser.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-300">
                      <strong className="text-purple-200">Email:</strong>{" "}
                      {selectedUser.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-300">
                      <strong className="text-purple-200">Address:</strong>{" "}
                      {selectedUser.address}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700 mt-4">
                  <h4 className="text-lg font-medium mb-2 text-purple-200">
                    Your Rating:
                  </h4>

                  <StarRating
                    rating={currentRating}
                    setRating={setCurrentRating}
                    setRatingError={setRatingError}
                  />
                  {ratingError && (
                    <p className="text-red-500 text-sm -mt-3">{ratingError}</p>
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-2 text-purple-200">
                    Your Feedback:
                  </h4>
                  <textarea
                    className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 placeholder-gray-500 resize-y"
                    rows="4"
                    placeholder="Share your feedback about this store..."
                    value={currentFeedback}
                    onChange={(e) => setCurrentFeedback(e.target.value)}
                  ></textarea>
                </div>

                <button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 cursor-pointer px-4 rounded-md mt-4 transition duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#101010]"
                  onClick={handleSubmitRatingAndFeedback}
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default Hero;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { follow, loadUser, unFollow } from "../../../actions/userAction";
import { FOLLOW_RESET } from "../../../constants/userConstants";
import slugify from "../../../utils/SlugGenerator";

export default function FollowCard({ follower, show }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const { success: followSuccess, message } = useSelector(
    (state) => state.follow
  );
  useEffect(() => {
    if (followSuccess) {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch({ type: FOLLOW_RESET });
      dispatch(loadUser());
    }
  }, [followSuccess]);

  return (
    <div className="col-span-1">
      <div className="flex flex-col bg-white items-center py-6 px-4 bg-gradient-to-r border rounded-lg">
        <div className="w-full flex-col items-center justify-center">
          <h2 className="text-sm pb-4">About post</h2>
          <div className=" w-20 h-20 mx-auto border rounded-full overflow-hidden">
            <img
              className="flex h-full w-full items-center object-cover"
              src={follower?.profilePicture.url}
              alt="profile"
            />
          </div>
          <h2 className="text-sm font-bold text-center mt-2">
            {follower.name}
          </h2>
          <h3 className="text-xs text-center font-light">Dhaka Bangladesh</h3>
        </div>
        <div className="flex items-center mt-5">
          <Link
            to={`/profile/${follower && slugify(follower?.name)}/${
              follower?._id
            }/about`}
            className="border text-xs ease-in-out duration-500 hover:bg-indigo-500 hover:text-white border-indigo-500 bg-transparent rounded-2xl py-1 px-2 text-indigo-500"
          >
            View Profile
          </Link>
          {show && user?._id !== follower._id && (
            <>
              {user?.followings.find((item) => item._id === follower._id) ? (
                <button
                  onClick={function () {
                    dispatch(unFollow(follower._id));
                  }}
                  className="mx-2 border text-xs ease-in-out duration-500  bg-blue-600 hover:bg-white text-white border-indigo-500 bg-transparent rounded-2xl py-1 px-2 hover:text-indigo-500"
                >
                  UnFollow
                </button>
              ) : (
                <button
                  onClick={function () {
                    dispatch(follow(follower._id));
                  }}
                  className="mx-2 border text-xs ease-in-out duration-500  bg-blue-600 hover:bg-white text-white border-indigo-500 bg-transparent rounded-2xl py-1 px-2 hover:text-indigo-500"
                >
                  Follow +
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

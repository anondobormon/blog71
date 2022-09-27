import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { verifyUser } from "../actions/userAction";

export default function UserVerify() {
  const { id, token } = useParams();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.verifyUser);

  useEffect(() => {
    console.log(loading);
    console.log(id, token);
    dispatch(verifyUser(id, token));
  }, []);

  return (
    <div>
      <div className="w-full h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-64 border rounded text-center flex flex-col items-center justify-center gap-5 h-64">
          <p> Verified</p>
          <Link
            className="mx-5 text-slate-700 bg-slate-300 text-center px-4 py-2 cursor-pointer hover:text-slate-900 rounded font-semibold"
            to="/"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

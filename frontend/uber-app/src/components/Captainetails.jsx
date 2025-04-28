/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

export default function Captainetails() {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="../../images/driver.jpeg"
            alt="Driver"
          />
          <h4 className="text-lg font-medium">
            {captain && captain.fullname
              ? `${captain.fullname.firstname} ${captain.fullname.lastname}`
              : "No Captain"}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">$4</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex justify-center gap-4 items-start mt-6 p-3 bg-gray-100 rounded-xl">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { HomeButton } from "../components";
import Authnav from "../components/Authnav";
import { FiAlertTriangle } from "react-icons/fi";

const Payment = () => {
  return (
    <div className="min-h-screen ">
      <Authnav />

      <div className=" p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">Bill Payment</h2>
            <p className="text-gray-500 text-sm mt-1">
              Pay your bills securely
            </p>
          </div>

          {/* Error Message */}
          <div className="p-6">
            <div className="flex items-start gap-3 bg-red-50 p-4 rounded-lg border border-red-100">
              <FiAlertTriangle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-700">Account Required</h3>
                <p className="text-red-600 text-sm mt-1">
                  You don't have any eligible accounts to use this feature.
                  Please contact support or open a new account.
                </p>
              </div>
            </div>

            {/* Optional: Add call to action */}
            <div className="mt-6 flex flex-col gap-3">
              <button className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                Contact Support
              </button>
              <button className="w-full py-2.5 px-4 border border-green-600 text-green-600 hover:bg-green-50 font-medium rounded-lg transition-colors">
                Open New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

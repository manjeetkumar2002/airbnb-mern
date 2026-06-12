import React from "react";

const ErrorModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-red-600 mb-3">
          Error
        </h2>

        <p className="text-gray-700 mb-5">
          {message}
        </p>

        <button
          onClick={onClose}
          className="btn btn-error text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
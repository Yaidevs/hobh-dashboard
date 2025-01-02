import React from "react";

const DeclineModal = ({
  showModal,
  setShowModal,
  declineReason,
  setDeclineReason,
  submitDeclineReason,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="dark:bg-meta-4 bg-gray-2 rounded-lg p-6 w-96">
        <h2 className="text-lg font-medium text-black dark:text-white">
          Decline Resource
        </h2>
        <textarea
          className="w-full mt-4 outline-none p-2 border border-gray-2 rounded"
          placeholder="Provide a reason for declining"
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 text-black dark:text-white px-4 py-2 rounded mr-2"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="border-[#412D88] bg-[#412D88] text-white px-4 py-2 rounded"
            onClick={submitDeclineReason}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeclineModal;

import { Document, Page } from "react-pdf";
import { useState } from "react";
import {
  useApproveItemMutation,
  useDeclineItemMutation,
  useGetAllItemQuery,
} from "../api/dataApi";
import { EditIcon, Plus } from "lucide-react";
import DeclineModal from "../components/DeclineModal";
import Add from "../components/Add";
import Edit from "../components/Edit";


const ResourceTable = () => {
  const { data: resources, isSuccess } = useGetAllItemQuery();
  const [approve] = useApproveItemMutation();
  const [decline] = useDeclineItemMutation();
  const [showModal, setShowModal] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [declineId, setDeclineId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleAddResource = (resource) => {
    console.log("New Resource:", resource);
    // Add your logic to handle the new resource here
  };
  const handlEditResource = (resource) => {
    console.log("New Resource:", resource);
    // Add your logic to handle the new resource here
  };

  console.log(resources?.data);
  const [selectedPdf, setSelectedPdf] = useState(null); // State to hold selected PDF
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Set the number of items per page

  const handlePdfClick = (url) => {
    if (url.startsWith("https") || url.startsWith("www")) {
      window.open(url, "_blank");
    } else {
      setSelectedPdf(url);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approve(id).unwrap();
      window.location.reload();
    } catch (error) {
      console.error("Error approving:", error);
    }
  };
  const handleDecline = (id) => {
    setDeclineId(id);
    setShowModal(true);
  };

  const submitDeclineReason = async () => {
    if (!declineReason.trim()) {
      alert("Please provide a reason for declining.");
      return;
    }

    try {
      await decline({ id: declineId, message: declineReason }).unwrap();
      alert("Item declined successfully!");
      setShowModal(false);
      setDeclineReason("");
      window.location.reload();
    } catch (error) {
      console.error("Error declining item:", error);
      alert("Failed to decline item.");
    }
  };

  // Calculate the index of the last item on the current page
  const indexOfLastResource = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const indexOfFirstResource = indexOfLastResource - itemsPerPage;
  // Get the current resources
  const currentResources = resources?.data.slice(
    indexOfFirstResource,
    indexOfLastResource
  );

  // Calculate total pages
  const totalPages =
    resources && resources.data
      ? Math.ceil(resources.data.length / itemsPerPage)
      : 0;
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className=" flex items-end justify-end mr-2 mb-4 ">
          <div className="flex border-2 border-gray-700 pr-4 py-1 rounded-lg items-center justify-center">
            <button
              className="hover:text-primary"
              onClick={() => setShowAddModal(true)}
            >
              <Plus
                style={{
                  width: 50,
                  color: "#412D88",
                  fontSize: 20,
                }}
                strokeWidth={5}
              />
            </button>
            <p
              className="inline dark:text-white text-[#412D88] cursor-pointer font-bold"
              onClick={() => setShowAddModal(true)}
            >
              Add Resource
            </p>
          </div>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Files
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Title
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Description
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentResources?.map((resource, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  {resource.file && resource.file.length > 0 ? (
                    resource.file.map((file, index) => (
                      <a
                        key={index}
                        onClick={() => handlePdfClick(file)}
                        className="block text-blue-500 underline cursor-pointer"
                      >
                        {file.type === "image" ? (
                          <img
                            src={file}
                            alt="File Preview"
                            className="w-10 h-10 rounded-sm"
                          />
                        ) : (
                          "PDF File"
                        )}
                      </a>
                    ))
                  ) : (
                    <span className="text-gray-500">No files</span>
                  )}
                </td>
                <td className="border-b  border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {resource.title}
                  </h5>
                  <p className="text-sm">GHS {resource.price}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {resource.description}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {resource.verification.status === "Pending" ? (
                    <div className="flex space-x-4 mr-8">
                      <button
                        className="inline-flex rounded-full bg-warning text-warning bg-opacity-10 py-1 px-3 text-sm font-medium"
                        onClick={() => handleApprove(resource._id)} // Replace handleApprove with your approval function
                      >
                        Approve
                      </button>
                      <button
                        className="inline-flex rounded-full bg-warning text-warning bg-opacity-10 py-1 px-3 text-sm font-medium"
                        onClick={() => handleDecline(resource._id)} // Replace handleApprove with your approval function
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-4 mr-8">
                      <p className="bg-success text-success inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ">
                        {resource.verification.status}
                      </p>
                      <button
                        className="inline-flex rounded-full bg-warning text-warning bg-opacity-10 py-1 px-3 text-sm font-medium"
                        onClick={() => handleDecline(resource._id)} // Replace handleApprove with your approval function
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </td>

                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button className="hover:text-primary">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    <button
                      className="hover:text-primary"
                      onClick={() => setShowEditModal(true)}
                    >
                      <EditIcon style={{ width: 16 }} />
                    </button>
                    <Edit
                      showModal={showEditModal}
                      setShowModal={setShowEditModal}
                      onSubmit={handlEditResource}
                    />
                    <Add
                      showModal={showAddModal}
                      setShowModal={setShowAddModal}
                      onSubmit={handleAddResource}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeclineModal
        showModal={showModal}
        setShowModal={setShowModal}
        declineReason={declineReason}
        setDeclineReason={setDeclineReason}
        submitDeclineReason={submitDeclineReason}
      />
      {selectedPdf && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">PDF Viewer</h3>
          <button
            onClick={() => setSelectedPdf(null)}
            className="text-red-500 underline"
          >
            Close Viewer
          </button>
          <div className="border rounded mt-4">
            <Document file={selectedPdf}>
              <Page pageNumber={1} />
            </Document>
          </div>
        </div>
      )}
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {indexOfFirstResource + 1} to{" "}
          {Math.min(indexOfLastResource, resources?.data.length)} of{" "}
          {resources?.data.length} items
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceTable;

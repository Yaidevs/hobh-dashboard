import React, { useState } from "react";
import { useAddItemMutation } from "../api/dataApi";
import { useGetAllItemQuery } from "../../manage-category/api/dataApi";
import { useGetAllInstructorQuery } from "../../manage-instructors/api/dataApi";

const Add = ({ showModal, setShowModal, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [instructor, setInstructor] = useState("");
  const [addResource] = useAddItemMutation();
  const { data: categories, isLoading, isError } = useGetAllItemQuery();
  const {
    data: instructors,
    isLoading: instuctorsLoading,
    isError: instuctorsLoadingError,
  } = useGetAllInstructorQuery();
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setAdding(true);

      const resourceData = {
        title,
        files,
        category,
        description,
        price,
        currency,
        instructor,
      };

      // Add resource through mutation
      const res = await addResource(resourceData).unwrap();

      // If an onSubmit function is passed, call it with the resource data
      if (onSubmit) {
        onSubmit(res);
      }

      setShowModal(false);

      // Clear fields after submission
      setTitle("");
      setFiles([]);
      setCategory("");
      setDescription("");
      setPrice("");
      setCurrency("USD");
      setInstructor("");
      window.location.reload();
      console.log("Resource added successfully:", res);
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  if (!showModal) return null;
  return (
    <div onClick={() => setShowModal(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-50" >
      <div onClick={(e) => e.stopPropagation()}  className="dark:bg-meta-4 bg-white rounded-lg p-6 w-full mt-8 max-w-3xl">
        <h2 className="text-lg font-medium text-black dark:text-white mb-4">
          Add Resource
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full outline-none p-2 bg-gray-2 border-none dark:bg-[#1D2A39] text-black dark:text-white border border-gray-300 rounded"
          />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full outline-none p-2 border-none bg-gray-2 dark:bg-[#1D2A39]  text-black dark:text-white border border-gray-300 rounded"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full outline-none p-2 bg-gray-2 dark:bg-[#1D2A39] text-black border-none dark:text-white rounded"
          >
            <option value="">Select Category</option>
            {isLoading && <option>Loading categories...</option>}
            {isError && <option>Error loading categories</option>}
            {categories &&
              categories?.data.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
          </select>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full outline-none p-2 bg-gray-2 dark:bg-[#1D2A39] text-black dark:text-white border-gray-300 rounded"
          />
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 outline-none p-2 bg-gray-2 dark:bg-[#1D2A39] text-black dark:text-white border-gray-300 rounded"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="outline-none p-2 border-none bg-gray-2 dark:bg-[#1D2A39] text-black dark:text-white border-gray-300 rounded"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="ETB">ETB</option>
            </select>
          </div>
          <select
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            className="w-full outline-none p-2 bg-gray-2 dark:bg-[#1D2A39] text-black border-none dark:text-white rounded"
          >
            <option value="">Select Instructor</option>
            {instuctorsLoading && <option>Loading instructors...</option>}
            {instuctorsLoadingError && (
              <option>Error loading instructors</option>
            )}
            {instructors &&
              instructors?.data.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.firstName} {instructor.lastName}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-2 font-semibold text-white dark:text-black px-4 py-2 rounded mr-2"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="border-[#412D88] bg-[#412D88] text-white font-semibold px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;

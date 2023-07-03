import React, { useState, useEffect } from "react";
import { IJob, PartialBy } from "../../types";

type JobFormValue = PartialBy<IJob, "id">;

interface JobFormProps {
  initialValues: JobFormValue;
  mode: "create" | "update";
  onSubmit: (values: JobFormValue) => void;
  onCancel: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ initialValues, mode, onSubmit, onCancel }) => {
  const [values, setValues] = useState<PartialBy<IJob, "id">>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={values.title || ""}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="location"
          className="block text-gray-700 font-bold mb-2"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={values.location || ""}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="duration"
          className="block text-gray-700 font-bold mb-2"
        >
          Duration
        </label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={values.duration || ""}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="startDate"
          className="block text-gray-700 font-bold mb-2"
        >
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={values.startDate || ""}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="requirements"
          className="block text-gray-700 font-bold mb-2"
        >
          Requirements
        </label>
        <textarea
          id="requirements"
          name="requirements"
          value={values.requirements || ""}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md py-2 px-3 w-full resize-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="companyDetails"
          className="block text-gray-700 font-bold mb-2"
        >
          Company Details
        </label>
        <textarea
          id="companyDetails"
          name="companyDetails"
          value={values.companyDetails || ""}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md py-2 px-3 w-full resize-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="contactDetails"
          className="block text-gray-700 font-bold mb-2"
        >
          Contact Details
        </label>
        <textarea
          id="contactDetails"
          name="contactDetails"
          value={values.contactDetails || ""}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md py-2 px-3 w-full resize-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="publishEndDate"
          className="block text-gray-700 font-bold mb-2"
        >
          Publish End Date
        </label>
        <input
          type="date"
          id="publishEndDate"
          name="publishEndDate"
          value={values.publishEndDate || ""}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {mode === "create" ? "Create" : "Update"}
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded-md ml-3 hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JobForm;

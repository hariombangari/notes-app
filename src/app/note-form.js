"use client";
import { useRef } from 'react';

export default function NoteForm({ title, content, action, isUpdateView }) {
  const formRef = useRef(null);
  const hiddenRef = useRef(null);
  const onDeleteClick = () => {
    hiddenRef.current.value = "1";
    formRef.current.requestSubmit();
  }
  return (
    <form className="max-w-sm mx-auto" action={action} ref={formRef}>
      <div className="mb-5">
        <input
          type="text"
          id="title"
          name="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Title"
          defaultValue={title}
          required
        />
      </div>
      <div className="mb-5">
        <textarea
          id="note"
          name="note"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your notes here..."
          defaultValue={content}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2"
      >
        {isUpdateView ? "Update" : "Submit"}
      </button>
      <input type="hidden" name="deleteAction" id="deleteAction" value="0" ref={hiddenRef} />
      {isUpdateView && <button
        onClick={onDeleteClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Delete
      </button>}
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";

export default function Note({ channelId, id, title, content, archived }) {
  const router = useRouter();
  return (
    <div
      className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
      onClick={() => router.push(`/notes/${channelId}/${id}`)}
    >
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-h-20 truncate">
        {content}
      </p>
    </div>
  );
}

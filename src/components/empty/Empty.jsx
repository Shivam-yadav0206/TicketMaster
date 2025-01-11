import React from 'react'

const Empty = () => {
  return (
    <div class="min-h-screen flex flex-grow items-center justify-center bg-indigo-50 dark:bg-neutral-900">
      <div class="rounded-lg bg-white dark:bg-neutral-800/30 p-8 text-center shadow-xl">
        <h1 class="mb-4 text-4xl font-bold">404</h1>
        <p class="text-gray-600">
          Oops! No result found for your area.
        </p>
        <a
          href="/"
          class="mt-4 inline-block rounded bg-purple-500 px-4 py-2 font-semibold text-white hover:bg-purple-600">
          {" "}
          Go back to Home{" "}
        </a>
      </div>
    </div>
  );
}

export default Empty
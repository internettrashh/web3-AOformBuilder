
import React from 'react'

export function Bento() {
  return (
   
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-10 dark">
  <div
    class="bg-card text-card-foreground group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
    data-v0-t="card"
  >
    <a class="absolute inset-0 z-10" href="#">
      <span class="sr-only">View feature</span>
    </a>
    <div class="bg-gray-950 p-6">
      <div class="flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-8 h-8 text-primary"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <circle cx="12" cy="12" r="4"></circle>
        </svg>
        <h3 class="font-bold text-xl text-white">Instant Deployment</h3>
      </div>
      <p class="text-sm text-gray-400 mt-2">
        Deploy your app with a single click. Our infrastructure scales automatically to handle any traffic.
      </p>
    </div>
  </div>
  <div
    class="bg-card text-card-foreground group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
    data-v0-t="card"
  >
    <a class="absolute inset-0 z-10" href="#">
      <span class="sr-only">View feature</span>
    </a>
    <div class="bg-gray-950 p-6">
      <div class="flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-8 h-8 text-primary"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
        <h3 class="font-bold text-xl text-white">Powerful CLI</h3>
      </div>
      <p class="text-sm text-gray-400 mt-2">
        Manage your projects and deployments from the command line. Automate your workflows with our robust CLI.
      </p>
    </div>
  </div>
  <div
    class="bg-card text-card-foreground group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
    data-v0-t="card"
  >
    <a class="absolute inset-0 z-10" href="#">
      <span class="sr-only">View feature</span>
    </a>
    <div class="bg-gray-950 p-6">
      <div class="flex items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-8 h-8 text-primary"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
          <path d="M3 12A9 3 0 0 0 21 12"></path>
        </svg>
        <h3 class="font-bold text-xl text-white">Serverless Functions</h3>
      </div>
      <p class="text-sm text-gray-400 mt-2">
        Build serverless functions to handle your backend logic without managing any infrastructure.
      </p>
    </div>
  </div>
  <div
    class="bg-card text-card-foreground group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-2 border border-gray-200 dark:border-gray-700 sm:col-span-2"
    data-v0-t="card"
  >
    <a class="absolute inset-0 z-10" href="#">
      <span class="sr-only">View feature</span>
    </a>
    <div class="bg-gray-950 p-6 flex items-center gap-6">
      <img
        src="/placeholder.svg"
        alt="Vercel Analytics"
        width="100"
        height="100"
        class="rounded-lg"
        style="aspect-ratio: 100 / 100; object-fit: cover;"
      />
      <div>
        <h3 class="font-bold text-xl text-white">Advanced Analytics</h3>
        <p class="text-sm text-gray-400 mt-2">
          Get detailed insights into your application's performance, traffic, and user behavior.
        </p>
      </div>
    </div>
  </div>
  <div
    class="bg-card text-card-foreground group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 ease-in-out hover:-translate-y-2 border border-gray-200 dark:border-gray-700 sm:col-span-2 lg:col-span-1"
    data-v0-t="card"
  >
    <a class="absolute inset-0 z-10" href="#">
      <span class="sr-only">View feature</span>
    </a>
    <div class="bg-gray-950 p-6 flex items-center gap-6">
      <img
        src="/placeholder.svg"
        alt="Vercel Domains"
        width="100"
        height="100"
        class="rounded-lg"
        style="aspect-ratio: 100 / 100; object-fit: cover;"
      />
      <div>
        <h3 class="font-bold text-xl text-white">Custom Domains</h3>
      </div>
    </div>
  </div>
</div>
    
  )
}

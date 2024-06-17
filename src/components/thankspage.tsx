
export function Thankspage() {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-gray-950 dark:bg-gray-950">
      <div className="max-w-md space-y-4 px-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter text-white dark:text-white sm:text-4xl animate-confetti">
          Your response was recorded successfully
        </h1>
        <p className="text-white dark:text-white animate-confetti">
          Thank you for your feedback. We appreciate your input.
        </p>
      </div>
    </div>
  )
}

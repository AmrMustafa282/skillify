export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
      <a href="/" className="mt-4 text-blue-500 underline">
        Go back home
      </a>
    </div>
  );
}

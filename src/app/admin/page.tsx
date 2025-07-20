export default function AdminLoginPage() {
  return (
    <div className="fixed inset-0 z-50 w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white border border-gray-300 rounded-md shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>

        <label htmlFor="username" className="sr-only">
          Username or Email
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username or email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
}

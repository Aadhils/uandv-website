export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold text-purple-700">
        Welcome to U&V
      </h1>

      <p className="mt-6 text-xl text-gray-600 max-w-2xl">
        Everything Your Business Needs Under One Roof.
      </p>

      <button className="mt-10 bg-purple-700 text-white px-8 py-4 rounded-xl hover:bg-purple-800 transition">
        Get Started
      </button>
    </main>
  );
}
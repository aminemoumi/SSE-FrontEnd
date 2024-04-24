
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-pink-900 overflow-hidden">
      <section className="animate-bounce">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white tracking-widest">404</h1>
      </section>
      <section className="animate-pulse">
        <p className="text-2xl text-white mt-2">Page Not Found</p>
      </section>
      <section className="mt-5">
        <Link to="/" className="animate-wiggle inline-block text-pink-900 bg-white px-6 py-2 rounded-full shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
          Go Home
        </Link>
      </section>
      <section className="animate-spin slow mt-10">
        <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </section>
    </main>
  );
};

export default NotFound;







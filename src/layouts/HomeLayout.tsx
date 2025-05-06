import { Outlet, Link } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav className="w-full flex justify-between items-center px-6 py-4 shadow border-b border-pink-500 bg-black">

        <div className="text-xl font-bold text-pink-500">
          <Link to="/">MyApp</Link>
        </div>


        <div className="space-x-4">
          <Link to="/login">
            <button className="text-pink-500 border border-white px-4 py-2 rounded-xl hover:bg-gray-800 transition cursor-pointer">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-900 transition cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      </nav>
      <main className = 'flex-1'>
        <Outlet />
        </main>
        <footer>Footer</footer>
    </div>
  )
}

export default HomeLayout;

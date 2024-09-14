import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white/30 backdrop-blur-md w-full fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 ">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* logo */}
            <div>
              <Link href="/" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                <svg className="h-6 w-6 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span className="font-bold">Better Dev</span>
              </Link>
            </div>
            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/features" className="py-5 px-3 text-gray-700 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="py-5 px-3 text-gray-700 hover:text-gray-900">Pricing</Link>
            </div>
          </div>
          {/* secondary nav */}
          <div className="flex items-center space-x-1">
            <Link href="/login" className="py-5 px-3 text-black font-bold">Login</Link>
            <Link href="/signup" className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300">Signup</Link>
          </div>
        </div>
      </div>
      {/* mobile menu - always visible on small screens */}
      {/* <div className="md:hidden">
        <Link href="/features" className="block py-2 px-4 text-sm hover:bg-gray-200">Features</Link>
        <Link href="/pricing" className="block py-2 px-4 text-sm hover:bg-gray-200">Pricing</Link>
      </div> */}
    </nav>
  );
};

export default Navbar;

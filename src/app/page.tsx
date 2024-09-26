
import Loader from "../app/(root)/_components/Loader";
export default function Home() {
   
  return (
    <div>
      
      {/* <header className="bg-gray-900 text-white py-6">
        <nav className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">AI Resume Builder</h1>
          <ul className="flex space-x-4">
            <li><a href="#features" className="hover:text-gray-400">Features</a></li>
            <li><a href="#pricing" className="hover:text-gray-400">Pricing</a></li>
            <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </nav>
      </header> */}
      <Loader />

      {/* <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

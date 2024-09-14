
import Navbar from "./(root)/_components/Navbar";
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
     <Navbar/>
      <main className="container mx-auto py-12">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h2 className="text-4xl font-bold mb-4">Effortless Resume Creation with AI</h2>
          <p className="text-lg text-gray-600 mb-8">Generate professional resumes in seconds with our AI-powered platform.</p>
          <a href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">Get Started</a>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 ">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-xl font-semibold">AI-Powered</h4>
              <p className="mt-4 text-gray-600">Let AI handle the heavy lifting of formatting and content creation.</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold">Customizable Templates</h4>
              <p className="mt-4 text-gray-600">Choose from a variety of beautifully designed templates.</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold">Export as PDF</h4>
              <p className="mt-4 text-gray-600">Download your resume in PDF format for easy sharing.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <h3 className="text-3xl font-bold text-center mb-12">Pricing</h3>
          <div className="flex justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-sm">
              <h4 className="text-xl font-semibold mb-4">Free Plan</h4>
              <p className="text-gray-600 mb-8">Get started for free with basic templates and features.</p>
              <a href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">Sign Up for Free</a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-100">
          <h3 className="text-3xl font-bold text-center mb-12">Get in Touch</h3>
          <form className="max-w-lg mx-auto">
            <input className="w-full mb-4 p-3 border rounded-lg" type="text" placeholder="Your Name" />
            <input className="w-full mb-4 p-3 border rounded-lg" type="email" placeholder="Your Email" />
            <textarea className="w-full mb-4 p-3 border rounded-lg" placeholder="Your Message" rows={4}></textarea>
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Send Message</button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
      </footer>
    </div>
  );
}

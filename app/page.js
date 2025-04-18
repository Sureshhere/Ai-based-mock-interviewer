import React from 'react'
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Contect from './_components/Contect';
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";

const page = () => {
  return (
    <div>
      <Head>
        <title>AI Mock Interview</title>
        <meta name="description" content="Ace your next interview with AI-powered mock interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
        {/* Header Section */}
        <header className="w-full py-8 bg-gradient-to-r from-black via-gray-700 to-black shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
            <h1 className="text-3xl font-extrabold text-white drop-shadow-md">AI Mock Interview</h1>
            <nav className="flex flex-col sm:flex-row flex-wrap items-center justify-between mt-4 md:mt-0 space-y-4 sm:space-y-0 sm:space-x-8">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/Sureshhere/Ai-based-mock-interviewer"
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                <FaGithub className="w-10 h-8" />
              </a>

              <div className="flex flex-row items-center space-x-8">
                <a href="#features" className="text-lg text-white hover:text-yellow-300 transition">Features</a>
                <a href="#testimonials" className="text-lg text-white hover:text-yellow-300 transition">Testimonials</a>
                <a href="#contact" className="text-lg text-white hover:text-yellow-300 transition">Contact</a>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 md:px-0">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">Ace Your Next Interview</h2>
          <p className="mt-4 text-xl md:text-2xl text-white font-medium">Practice with AI-powered mock interviews and get personalized feedback</p>
          <div className="mt-8 flex flex-col md:flex-row">
            <a
              href="/dashboard"
              className="px-8 py-4 mb-4 md:mb-0 md:mr-4 text-lg font-bold bg-yellow-400 text-black rounded-full shadow-lg hover:bg-yellow-300 transition"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-8 py-4 text-lg font-bold border-2 border-white text-white rounded-full hover:bg-white hover:text-purple-600 transition"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-blue-50 px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-indigo-700">Features</h2>
            <p className="mt-4 text-lg text-gray-700">
              Our AI Mock Interview platform offers a range of powerful features:
            </p>
            <div className="flex flex-wrap justify-center mt-12">
              <div className="w-full md:w-1/3 px-6 py-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition">
                  <h3 className="text-2xl font-bold text-indigo-600">AI Mock Interviews</h3>
                  <p className="mt-4 text-gray-600">Experience realistic interview scenarios with our advanced AI.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-6 py-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition">
                  <h3 className="text-2xl font-bold text-indigo-600">Instant Feedback</h3>
                  <p className="mt-4 text-gray-600">Get instant, personalized feedback to improve your performance.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-6 py-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition">
                  <h3 className="text-2xl font-bold text-indigo-600">Comprehensive Reports</h3>
                  <p className="mt-4 text-gray-600">Receive detailed reports highlighting your strengths and weaknesses.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-gradient-to-b from-white via-purple-50 to-white px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-indigo-700">What Our Users Say</h2>
            <div className="flex flex-wrap justify-center mt-12">
              <div className="w-full md:w-1/2 px-6 py-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition">
                  <p className="text-gray-600">
                    "The AI mock interviews were incredibly helpful. I felt much more confident going into my real interview."
                  </p>
                  <h4 className="mt-6 text-lg font-bold text-purple-600">- Alex Johnson</h4>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-6 py-8">
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition">
                  <p className="text-gray-600">
                    "The feedback was spot on and helped me improve my answers. Highly recommend this service!"
                  </p>
                  <h4 className="mt-6 text-lg font-bold text-purple-600">- Sarah Williams</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-blue-50 px-6 md:px-0">
          <Contect />
        </section>
      </main>

      <footer className="py-8 bg-indigo-600 text-white text-center">
        <p>© 2024 AI Mock Interview. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default page

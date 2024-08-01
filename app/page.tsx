import Image from 'next/image'
import Link from 'next/link'
import { Ship, BarChart2, Globe } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-600 mb-4">
            Welcome to Tianyi
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Revolutionize your shipping operations with our cutting-edge tracking and management system.
          </p>
          <div className="mt-8 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center">
            <Link 
              href="/ship" 
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-lg"
            >
              Take a Look at Our Ships
            </Link>
          </div>
        </div>

        {/* Main Features Section */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center mb-16 sm:mb-24">
          <div className="order-2 md:order-1 relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[3/2]">
            <Image
              src="/ship.jpeg"
              alt="Tianyi Dashboard"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className="rounded-xl shadow-2xl"
              priority
            />
          </div>
          <div className="space-y-4 sm:space-y-6 order-1 md:order-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800">
              Effortless Shipping Management
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
            Experience unparalleled control over your shipping operations with Tianyi&apos;s intuitive platform. Our solution provides:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Ship className="text-blue-500 flex-shrink-0" size={24} />
                <span>Real-time tracking across global shipping routes</span>
              </li>
              <li className="flex items-center space-x-3">
                <BarChart2 className="text-blue-500 flex-shrink-0" size={24} />
                <span>Comprehensive analytics for data-driven decisions</span>
              </li>
              <li className="flex items-center space-x-3">
                <Globe className="text-blue-500 flex-shrink-0" size={24} />
                <span>Seamless integration with existing logistics systems</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-navy-800 mb-8 sm:mb-12">
            Unlock the Power of Tianyi
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Global Visibility',
                description: 'Monitor your shipments in real-time across every continent and ocean.',
                icon: <Globe className="text-blue-500 mb-4" size={32} />
              },
              {
                title: 'Smart Analytics',
                description: 'Gain actionable insights with our advanced data analysis tools.',
                icon: <BarChart2 className="text-blue-500 mb-4" size={32} />
              },
              {
                title: 'Seamless Integration',
                description: 'Easily connect Tianyi with your existing software ecosystem.',
                icon: <Ship className="text-blue-500 mb-4" size={32} />
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                {feature.icon}
                <h3 className="text-lg sm:text-xl font-semibold text-navy-600 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-blue-700 p-8 sm:p-12 rounded-2xl shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Shipping Operations?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
          oin thousands of companies already benefiting from Tianyi&apos;s powerful platform.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300 shadow-lg"
          >
            Get Started Today
          </Link>
        </div>
      </main>
    </div>
  )
}
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Ship, BarChart2, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

interface Circle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
}



const GenerativeBackground = () => {
  const [circles, setCircles] = useState<Circle[]>([])

  useEffect(() => {
    const generateCircles = () => {
      const newCircles: Circle[] = []
      for (let i = 0; i < 50; i++) {
        newCircles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          radius: Math.random() * 20 + 5,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
      setCircles(newCircles)
    }

    generateCircles()
    const interval = setInterval(generateCircles, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <svg className="absolute inset-0 w-full h-full z-0 opacity-20">
      {circles.map((circle, index) => (
        <motion.circle
          key={index}
          cx={`${circle.x}%`}
          cy={`${circle.y}%`}
          r={circle.radius}
          fill="currentColor"
          className="text-blue-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: circle.opacity }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
      ))}
    </svg>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <GenerativeBackground />
      <main className="container mx-auto px-4 py-8 sm:py-16 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-600 mb-4">
            Welcome to 天艺
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Construction Made Easy with All-In-One Solutions
          </p>
          <motion.div
            className="mt-8 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/ship" 
              className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition duration-300 shadow-lg"
            >
              Take a Look at Our Ships
            </Link>
          </motion.div>
        </motion.div>

        {/* Main Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center mb-16 sm:mb-24"
        >
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
              {[
                { Icon: Ship, text: "Real-time tracking across global shipping routes" },
                { Icon: BarChart2, text: "Detailed information on current shipment activities" },
                { Icon: Globe, text: "Seamless integration with existing logistics systems" }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <item.Icon className="text-blue-500 flex-shrink-0" size={24} />
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

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
                description: 'Never miss a moment with our live tracking-system website',
                icon: <BarChart2 className="text-blue-500 mb-4" size={32} />
              },
              {
                title: 'Seamless Integration',
                description: 'Easily connect Tianyi with your existing software ecosystem.',
                icon: <Ship className="text-blue-500 mb-4" size={32} />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {feature.icon}
                <h3 className="text-lg sm:text-xl font-semibold text-navy-600 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-gradient-to-r from-blue-500 to-blue-700 p-8 sm:p-12 rounded-2xl shadow-2xl"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Construction Operations?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Join plenty of companies already benefiting from Tianyi&apos;s powerful platform.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300 shadow-lg"
            >
              Get Started Today
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
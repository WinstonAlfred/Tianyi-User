import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to ShipTrack
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your shipping operations with our advanced tracking and management system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="/api/placeholder/600/400"
              alt="Shipping illustration"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900">
              Effortless Shipping Management
            </h2>
            <p className="text-gray-600">
              Our platform provides real-time tracking, detailed analytics, and seamless integration with your existing systems.
            </p>
            <div className="space-x-4">
              <Link 
                href="/shipment" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                View Shipments
              </Link>
              <Link 
                href="/ship" 
                className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Ship Details
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Real-time Tracking', 'Analytics Dashboard', 'Integration'].map((feature) => (
              <div key={feature} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature}</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
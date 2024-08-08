'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';

const ContactPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className={`max-w-4xl mx-auto py-12 px-4 ${isLoaded ? 'fade-in' : ''}`}>
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-600 animate-slide-down">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get in Touch</h2>
          <p className="mb-6 text-gray-600">We&apos;re here to answer any questions you may have about our services. Reach out to us and we&apos;ll respond as soon as we can.</p>
          
          <div className="space-y-4">
            {[
              { icon: Mail, text: "winston.tianyi@gmail.com" },
              { icon: Phone, text: "+62 81385697586" },
              { icon: MapPin, text: "14460, GoldCoast Office, Jakarta Utara, Indonesia" },
              { icon: Globe, text: "Visit our Company Profile Website", link: "https://tianyi.web.id/" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 text-gray-700">
                <item.icon className="w-5 h-5 text-blue-500" />
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                value={formData.message}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              disabled={isSubmitting}
            >
              <Send className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitMessage && (
              <p className={`mt-2 ${submitMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {submitMessage}
              </p>
            )}
          </form>
        </section>
      </div>
      
      <section className="mt-12 animate-scale-in">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Our Location</h2>
        <div className="aspect-w-16 aspect-h-9">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.4304875781855!2d106.73939471480328!3d-6.102853836036827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1d379b1e3857%3A0x5736a048272b79d5!2sGold%20Coast%20Office!5e0!3m2!1sen!2sid!4v1690173900234!5m2!1sen!2sid"
          width="600" 
          height="450" 
          style={{border:0}} 
          allowFullScreen={true} 
          loading="lazy"
          className="w-full h-full rounded-lg shadow-lg"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
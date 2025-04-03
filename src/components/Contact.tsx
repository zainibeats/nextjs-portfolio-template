"use client";

import React, { useState } from 'react';
import { Send, Mail, MapPin, Clock } from 'lucide-react';

/**
 * Contact component - User contact form and information
 * 
 * Features:
 * - Form validation with required fields
 * - Async form submission to API endpoint
 * - Success/error state handling
 * - Loading indicators during submission
 * - Contact information display
 * - Accessibility support with ARIA attributes
 */
export default function Contact() {
  // Form field state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Track form submission status
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  /**
   * Handles form submission with error handling
   * Submits data to the contact API endpoint
   * Updates UI based on submission result
   * 
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) throw new Error('Request failed');
      
      // Reset form and show success message on successful submission
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact information sidebar */}
          <div>
            <div className="space-y-8">
              {/* Email contact info */}
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 mt-1 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    <a href="mailto:john@doe.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      john@doe.com
                    </a>
                  </p>
                </div>
              </div>
              
              {/* Location information */}
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-gray-600 dark:text-gray-300">LOCATION</p>
                </div>
              </div>

              {/* Timezone information */}
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 mt-1 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-semibold mb-1">Timezone</h3>
                  <p className="text-gray-600 dark:text-gray-300">TIMEZONE</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
            {/* Name field */}
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
                aria-required="true"
              />
            </div>
            
            {/* Email field */}
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
                aria-required="true"
              />
            </div>
            
            {/* Message field */}
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
                aria-required="true"
              />
            </div>

            {/* Submit button with loading state */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors disabled:opacity-50"
              aria-label={status === 'loading' ? 'Sending message...' : 'Send message'}
            >
              <Send className="w-5 h-5" aria-hidden="true" />
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {/* Form submission feedback messages */}
            {status === 'success' && (
              <p className="text-green-600 dark:text-green-400 text-center">
                Message sent successfully!
              </p>
            )}
            
            {status === 'error' && (
              <p className="text-red-600 dark:text-red-400 text-center">
                There was an error sending your message. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
} 
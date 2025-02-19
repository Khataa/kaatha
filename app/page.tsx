// app/page.tsx
'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from './comps/header';
import Footer from './comps/footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, token, userType} = useAuth();
  if(isAuthenticated){
    router.push('/dashboard');
  }
  console.log(Cookie.get('token'));
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Header */}
      <Header/>
      <main className="flex-grow mt-12">
        {/* Hero Section */}
        <motion.section
          className="bg-white py-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Simplify Debt Management with Khaata
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Easy, Efficient, and Error-Free
            </p>
            <Link href="/sign-up" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition transform hover:scale-105">
              Get Started
            </Link>
          </div>
        </motion.section>

        {/* PAS Section */}
        <motion.section
          className="bg-gray-50 py-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {['Problem', 'Agitation', 'Solution'].map((title, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h3>
                  <p className="text-gray-600">
                    {title === 'Problem' &&
                      'Tired of manual bookkeeping and outdated debt management?'}
                    {title === 'Agitation' &&
                      'Wasting time, losing customers, and suffering reduced profits.'}
                    {title === 'Solution' &&
                      'Khaata simplifies debt management, saving you time and increasing profits.'}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features & Benefits Section */}
        <motion.section
          className="bg-white py-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Key Features & Benefits
            </h3>
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {[
                {
                  title: 'Digital Ledger',
                  description: 'Securely record and manage all your transactions in one place.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                  )
                },
                {
                  title: 'Real-Time Notifications',
                  description: 'Stay updated with instant alerts on every transaction.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 6.165 8 7.388 8 8.75v5.408c0 .386-.145.76-.405 1.035L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                  )
                },
                {
                  title: 'Automated Reminders',
                  description: 'Send timely payment reminders automatically to ensure collections.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
                    </svg>
                  )
                },
                {
                  title: 'Easy Tracking',
                  description: 'Monitor your transactions effortlessly with an intuitive interface.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18"></path>
                    </svg>
                  )
                },
                {
                  title: 'Customizable Invoices',
                  description: 'Create and send personalized invoices tailored to your business.',
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m-7 2h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center p-6 bg-gray-50 border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-full shadow mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="bg-blue-50 py-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Simplify Your Debt Management?
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Sign up now to experience the difference.
            </p>
            <Link href="/register" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold shadow hover:bg-blue-700 transition transform hover:scale-105">
              Get Started
            </Link>
          </div>
        </motion.section>
      </main>
      {/* Footer */}
      <Footer/>
    </div>
  );
}

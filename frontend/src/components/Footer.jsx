import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Footer() {
  const links = [
    {
      title: 'Quick Links',
      items: [
        'Investor Application',
        'Job Application', 
        'Startup Accelerator',
        'Career Program',
        'Our Team'
      ]
    },
    {
      title: 'Legal',
      items: [
        'Terms of Service',
        'Privacy Policy',
        'Decentralised Intelligence',
        'Compliance'
      ]
    }
  ];

  return (
    <footer className="mt-2 relative bg-gradient-to-b from-gray-900 to-custom-purple border-t border-white/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[200%] h-[100px] bg-[radial-gradient(circle,_rgba(139,92,246,0.1)_1%,transparent_70%)] -top-20 -left-1/2 animate-float"></div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-8 py-16 relative"
        initial="hidden"
        whileInView="visible"
        variants={footerVariants}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
              PERSIST VENTURES
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We partner with entrepreneurs to scale ideas. Our diverse team brings cross-sector expertise to elevate any business.
            </p>
            <div className="flex gap-4">
              <motion.a 
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                href="#"
              >
                <FaLinkedin className="text-2xl text-purple-300" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                href="#"
              >
                <FaTwitter className="text-2xl text-purple-300" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                href="#"
              >
                <FaGithub className="text-2xl text-purple-300" />
              </motion.a>
            </div>
          </motion.div>

          {/* Links Sections */}
          {links.map((section, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-purple-200 mb-2">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <motion.li 
                    key={itemIndex}
                    whileHover={{ x: 5 }}
                    className="group"
                  >
                    <a 
                      href="#" 
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{item}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-200 mb-2">
              Stay Updated
            </h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
              />
              <button className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Copyright */}
        <motion.div 
          variants={itemVariants}
          className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400"
        >
          <div className="order-2 md:order-1">
            © 2025 persistventures.com - All rights reserved
          </div>
          <div className="order-1 md:order-2 flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
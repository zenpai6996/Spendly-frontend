import React from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "@/assets/images/spendlylogo.png";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Demo", href: "#demo" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaGithub className="size-5" />, href: "https://github.com/zenpai6996", label: "Github" },
  { icon: <FaTwitter className="size-5" />, href: "https://x.com/srbii_", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "https://www.linkedin.com/in/souharda-roy-barman-profile/", label: "LinkedIn" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const socialIconVariants = {
  hover: {
    scale: 1.2,
    rotate: [0, 10, -10, 0],
    transition: { duration: 0.5 }
  },
  tap: {
    scale: 0.9
  }
};

export const Footer = ({
  sections = defaultSections,
  description = "AI powered personal Finance App",
  socialLinks = defaultSocialLinks,
  copyright = "© 2024 Shadcnblocks.com. All rights reserved.",
}: Footer7Props) => {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="pt-32 bg-[#111]"
    >
      <div className="container px-10">
        <motion.div 
          variants={containerVariants}
          className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left"
        >
          <motion.div 
            variants={itemVariants}
            className="flex w-full flex-col justify-between gap-6 lg:items-start"
          >
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-2 lg:justify-start"
            >
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/landing"
              >
                <img
                  src={Logo}
                  alt="Spendly Logo"
                  title="Spendly"
                  className="h-8"
                />
              </motion.a>
              <motion.h2 
                variants={itemVariants}
                className="text-xl text-gray-50 font-semibold"
              >
                Spendly
              </motion.h2>
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="max-w-[70%] text-sm text-gray-50"
            >
              {description}
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="max-w-[70%] text-sm text-gray-50"
            >
              Crafted with ❤️ by{" "}
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-primary"
              >
                <a href="https://github.com/zenpai6996">Souharda</a>
              </motion.span>
            </motion.p>

            <motion.ul 
              variants={containerVariants}
              className="flex items-center space-x-6 text-gray-50"
            >
              {socialLinks.map((social, idx) => (
                <motion.li 
                  key={idx}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="font-medium hover:text-primary"
                >
                  <motion.a 
                    variants={socialIconVariants}
                    href={social.href} 
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid w-full gap-6 md:grid-cols-3 lg:gap-20"
          >
            {sections.map((section, sectionIdx) => (
              <motion.div 
                key={sectionIdx}
                variants={itemVariants}
              >
                <motion.h3 
                  whileHover={{ x: 5 }}
                  className="mb-4 text-gray-50 font-bold"
                >
                  {section.title}
                </motion.h3>
                <motion.ul 
                  variants={containerVariants}
                  className="space-y-3 text-sm text-muted-foreground"
                >
                  {section.links.map((link, linkIdx) => (
                    <motion.li
                      key={linkIdx}
                      variants={itemVariants}
                      whileHover={{ x: 5, color: "#3b82f6" }} 
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-gray-50 md:flex-row md:items-center md:text-left"
        >
          <motion.p 
            whileHover={{ scale: 1.02 }}
            className="order-2 lg:order-1"
          >
            © {new Date().getFullYear()} Spendly. All rights reserved.
          </motion.p>
          
        </motion.div>
      </div>
    </motion.section>
  );
};
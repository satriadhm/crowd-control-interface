"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, CheckCircleIcon, CurrencyDollarIcon, CogIcon, UserGroupIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      opacity: number;
    }[] = [];
    const numParticles = 150;
    const mouse = { x: 0, y: 0 };

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        dx: Math.random() * 1 - 0.5,
        dy: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        const distX = particle.x - mouse.x;
        const distY = particle.y - mouse.y;
        const distance = Math.sqrt(distX ** 2 + distY ** 2);

        if (distance < 120) {
          particle.x += distX / 15;
          particle.y += distY / 15;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
        
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
      });
    };

    const animate = () => {
      drawParticles();
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    animate();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: <CogIcon className="h-8 w-8" />,
      title: "Advanced Testing Platform",
      description: "State-of-the-art crowdsourced testing infrastructure with modern technology",
    },
    {
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      title: "Earn Rewards",
      description: "Get compensated for high-quality testing contributions and feedback",
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: "Global Community",
      description: "Connect with testers worldwide in our collaborative testing ecosystem",
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "Verified Quality",
      description: "Comprehensive testing results with transparent reputation and review system",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a1e5e] via-[#001333] to-[#0a1e5e] text-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60"></canvas>
      
      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-10 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
              <span className="h-2 w-2 bg-tertiary rounded-full mr-2 animate-pulse"></span>
              Professional Crowdsourced Testing Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Professional App Testing</span>
              <span className="block bg-gradient-to-r from-tertiary to-tertiary-light bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join the future of software testing. Earn rewards while helping developers build better applications through our comprehensive testing network.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.a
              href="/login"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-tertiary to-tertiary-light text-white font-semibold rounded-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Testing Now
              <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="/register"
              className="inline-flex items-center px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white font-semibold rounded-lg hover:bg-opacity-20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join as Tester
            </motion.a>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
            >
              <div className="text-tertiary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-300">
            <div className="flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-tertiary mr-2" />
              <span>Quality Verified</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-tertiary mr-2" />
              <span>Secure & Transparent</span>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-tertiary mr-2" />
              <span>Global Community</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 pointer-events-none"></div>
    </div>
  );
}

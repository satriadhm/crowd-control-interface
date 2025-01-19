'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; radius: number; dx: number; dy: number }[] = [];
    const numParticles = 100;
    const mouse = { x: 0, y: 0 };

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: Math.random() * 2 - 1,
        dy: Math.random() * 2 - 1,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        const distX = particle.x - mouse.x;
        const distY = particle.y - mouse.y;
        const distance = Math.sqrt(distX ** 2 + distY ** 2);

        if (distance < 100) {
          particle.x += distX / 10;
          particle.y += distY / 10;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
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
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-screen bg-black text-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0"></canvas>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Crowdsourcing UAT
        </motion.h1>
        <motion.div
          className="text-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.span className="block">Join us in innovation 🚀</motion.span>
          <motion.span className="block">Earn rewards for testing 💰</motion.span>
          <motion.span className="block">Help us build better software 🖥️</motion.span>
        </motion.div>
        <motion.a
          href="/register"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.a>
      </div>
    </div>
  );
}

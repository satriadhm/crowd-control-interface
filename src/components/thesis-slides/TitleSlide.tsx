"use client";

import React from "react";
import { motion } from "framer-motion";

const TitleSlide = () => {
  return (
    <div className="max-w-6xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Tester Quality Control Mechanism for 
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-tertiary to-tertiary-light">
            Crowdsourcing-Based UAT
          </span>
          <span className="block mt-2 text-2xl text-gray-300">
            using M-X Algorithm
          </span>
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-12 space-y-4"
      >
        <div className="flex flex-col items-center">
          <p className="text-xl">Presented by:</p>
          <h2 className="text-2xl font-semibold">Glorious Satria Dhamang Aji</h2>
          <p className="text-lg">NIM: 1302213015</p>
        </div>

        <div className="mt-8">
          <p className="text-lg">Supervised by:</p>
          <p className="text-xl font-medium">Dana Sulistiyo Kusumo, S.T., M.T., Ph.D</p>
          <p className="text-sm text-gray-300">NIP: 02780011</p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-lg">Program Studi Sarjana Rekayasa Perangkat Lunak</p>
          <p className="text-lg">Fakultas Informatika</p>
          <p className="text-lg">Universitas Telkom</p>
          <p className="text-lg">2025</p>
        </div>
      </motion.div>
    </div>
  );
};

export default TitleSlide;
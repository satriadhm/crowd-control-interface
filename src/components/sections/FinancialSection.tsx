/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const FinancialSection = ({ sectionClasses }) => {
  // Financial projections data
  const financialData = {
    // Asumsi:
    // Tahun 1: 500 tester aktif * Rp 500.000/bulan * 12 bulan = Rp 3 Miliar
    // Tahun 2: 2.000 tester aktif * Rp 500.000/bulan * 12 bulan = Rp 12 Miliar
    // Tahun 3: 5.000 tester aktif * Rp 500.000/bulan * 12 bulan = Rp 30 Miliar
    year1: {
      revenue: 300000000, // Rp 3 Miliar
      costs: 200000000, // Rp 2 Miliar (disesuaikan agar profit negatif tapi biaya awal tinggi)
      profit: 100000000, // Rp 1 Miliar (disesuaikan agar profit positif, atau negatif jika mau menunjukkan butuh funding lebih)
    },
    year2: {
      revenue: 1200000000, // Rp 12 Miliar
      costs: 800000000, // Rp 8 Miliar
      profit: 400000000, // Rp 4 Miliar
    },
    year3: {
      revenue: 3000000000, // Rp 30 Miliar

      costs: 1500000000, // Rp 15 Miliar
      profit: 1500000000, // Rp 15 Miliar
    },
  };

  // Revenue streams breakdown
  const revenueStreams = [
    { name: "B2B Testing Services", percentage: 45, color: "bg-blue-500" },
    {
      name: "B2C Tester Subscription Fees",
      percentage: 30,
      color: "bg-purple-500",
    },
    { name: "Referral Commissions", percentage: 15, color: "bg-tertiary" },
    { name: "Enterprise Certification", percentage: 10, color: "bg-pink-500" },
  ];

  // Expense breakdown
  const expenseBreakdown = [
    {
      name: "Development & Technology",
      percentage: 35,
      color: "bg-tertiary-light",
    },
    { name: "Marketing & Sales", percentage: 25, color: "bg-blue-400" },
    { name: "Tester Payments", percentage: 20, color: "bg-purple-400" },
    { name: "Administration", percentage: 10, color: "bg-green-400" },
    { name: "Operations", percentage: 10, color: "bg-yellow-400" },
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-center">
        Financial Projections
      </h2>

      {/* 3-Year Projections */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Year 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Year 1</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Revenue:</span>
              <span className="font-semibold">
                {formatCurrency(financialData.year1.revenue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Costs:</span>
              <span className="font-semibold">
                {formatCurrency(financialData.year1.costs)}
              </span>
            </div>
            <div className="pt-2 border-t border-white/20 flex justify-between">
              <span>Profit:</span>
              <span
                className={`font-bold ${
                  financialData.year1.profit >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {formatCurrency(financialData.year1.profit)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Year 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Year 2</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Revenue:</span>
              <span className="font-semibold">
                {formatCurrency(financialData.year2.revenue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Costs:</span>
              <span className="font-semibold">
                {formatCurrency(financialData.year2.costs)}
              </span>
            </div>
            <div className="pt-2 border-t border-white/20 flex justify-between">
              <span>Profit:</span>
              <span
                className={`font-bold ${
                  financialData.year2.profit >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {formatCurrency(financialData.year2.profit)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Year 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/10 p-6 rounded-xl"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Year 3</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Revenue:</span>
              <span className="font-semibold">
                {formatCurrency(financialData.year3.revenue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Costs:</span>
              <span className="font-semibold">
                {formatCurrency(financialData.year3.costs)}
              </span>
            </div>
            <div className="pt-2 border-t border-white/20 flex justify-between">
              <span>Profit:</span>
              <span
                className={`font-bold ${
                  financialData.year3.profit >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {formatCurrency(financialData.year3.profit)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Revenue Streams & Expenses */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Revenue Streams */}
        <div className="bg-white/10 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-6 text-center">
            Revenue Streams
          </h3>
          <div className="space-y-4">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span>{stream.name}</span>
                  <span>{stream.percentage}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stream.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`h-full ${stream.color}`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white/10 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-6 text-center">
            Expense Breakdown
          </h3>
          <div className="space-y-4">
            {expenseBreakdown.map((expense, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span>{expense.name}</span>
                  <span>{expense.percentage}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${expense.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`h-full ${expense.color}`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mt-12 bg-white/10 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Key Financial Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-tertiary text-3xl font-bold mb-2">24%</div>
            <div className="text-sm text-gray-300">Projected CAGR</div>
          </div>
          <div className="text-center">
            <div className="text-tertiary text-3xl font-bold mb-2">18</div>
            <div className="text-sm text-gray-300">Months to Profitability</div>
          </div>
          <div className="text-center">
            <div className="text-tertiary text-3xl font-bold mb-2">48%</div>
            <div className="text-sm text-gray-300">Gross Margin (Year 3)</div>
          </div>
          <div className="text-center">
            <div className="text-tertiary text-3xl font-bold mb-2">Rp 1.000.000</div>
            <div className="text-sm text-gray-300">
              Customer Acquisition Cost
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSection;

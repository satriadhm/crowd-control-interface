'use client';

import ParticlesBackground from './components/ParticlesBackground';

export default function Home() {
  return (
    <div className="relative h-screen bg-black text-white">
      <ParticlesBackground />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-5xl font-bold mb-4">Welcome to Crowdsourcing UAT</h1>
        <div className="text-2xl mb-8">
          <TypewriterEffect
            textStyle={{
              color: '#ffffff',
              fontWeight: 500,
              fontSize: '1.5rem',
            }}
            startDelay={100}
            cursorColor="#ffffff"
            multiText={[
              'Join us in innovation 🚀',
              'Earn rewards for testing 💰',
              'Help us build better software 🖥️',
            ]}
            multiTextDelay={2000}
            typeSpeed={50}
          />
        </div>
        <a
          href="/register"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}

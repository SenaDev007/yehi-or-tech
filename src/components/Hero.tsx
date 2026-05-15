"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, MessageCircle, Sparkles, Globe, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-midnight" />
      
      {/* Animated Luminous Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-electric-blue/10 rounded-full blur-[100px]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gold text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 mr-2" />
              L'agence digitale de demain
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6"
            >
              Des idées <span className="text-gold">lumineuses</span>,<br />
              des solutions encore <br />
              plus <span className="text-electric-blue">brillantes</span>.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/60 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              YEHI OR Tech conçoit des sites web, applications, identités visuelles, 
              agents IA et automatisations pour aider les entreprises, écoles, commerces 
              et organisations à gagner en visibilité, en efficacité et en crédibilité.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/devis"
                className="w-full sm:w-auto px-8 py-4 bg-electric-blue hover:bg-electric-blue/90 text-white font-bold rounded-2xl transition-all shadow-xl shadow-electric-blue/30 flex items-center justify-center group"
              >
                Demander un devis
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 backdrop-blur-sm transition-all text-center"
              >
                Découvrir nos services
              </Link>
            </motion.div>
          </div>

          {/* Floating Visual Elements */}
          <div className="lg:w-1/2 relative h-[400px] md:h-[500px] w-full max-w-[500px] mx-auto lg:max-w-none">
            {/* Main Central Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 h-80 md:h-[400px] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-[40px] shadow-2xl z-20 overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-[10px] text-white/30 uppercase tracking-tighter">yehiortech.com</div>
              </div>
              <div className="p-6 space-y-4">
                <div className="h-8 w-3/4 bg-white/10 rounded-lg animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-white/5 rounded-md" />
                  <div className="h-4 w-full bg-white/5 rounded-md" />
                  <div className="h-4 w-2/3 bg-white/5 rounded-md" />
                </div>
                <div className="pt-4 grid grid-cols-2 gap-3">
                  <div className="h-20 bg-electric-blue/20 rounded-2xl border border-electric-blue/30" />
                  <div className="h-20 bg-gold/10 rounded-2xl border border-gold/20" />
                </div>
              </div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-0 md:right-10 z-30 px-6 py-3 bg-midnight/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Zap className="text-gold w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-white/40 uppercase font-bold">Agents</div>
                <div className="text-sm font-bold text-white">IA & Automation</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-0 md:left-10 z-30 px-6 py-3 bg-midnight/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center">
                <Globe className="text-electric-blue w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-white/40 uppercase font-bold">Solutions</div>
                <div className="text-sm font-bold text-white">Web & Mobile</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ x: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 right-0 translate-x-4 md:translate-x-12 z-10 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center space-x-3"
            >
              <ShieldCheck className="text-green-400 w-5 h-5" />
              <span className="text-sm font-medium text-white/80">Confiance & Sécurité</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

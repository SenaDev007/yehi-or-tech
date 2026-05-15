import React from "react";
import { motion } from "framer-motion";
import { Bot, Zap, MessageSquare, Bell, Calendar, UserCheck, Share2, MousePointer2 } from "lucide-react";

const useCases = [
  { icon: MessageSquare, text: "Agent IA WhatsApp" },
  { icon: Share2, text: "Agent IA Facebook" },
  { icon: MousePointer2, text: "Assistant Web Intelligent" },
  { icon: Bell, text: "Automatisation de relance" },
  { icon: Zap, text: "Publication automatique" },
  { icon: UserCheck, text: "Qualification de prospects" },
  { icon: Calendar, text: "Prise de rendez-vous" },
  { icon: Bot, text: "Support client 24/7" },
];

const AIAutomation = () => {
  return (
    <section className="py-24 bg-premium-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-electric-blue/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Automatisez ce qui vous ralentit.<br />
              <span className="text-gold">Concentrez-vous</span> sur ce qui vous fait grandir.
            </h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              L'intelligence artificielle n'est plus une option, c'est un levier de croissance. 
              Nous intégrons des solutions intelligentes directement dans vos workflows pour 
              transformer votre productivité.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {useCases.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-electric-blue/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-electric-blue/10 flex items-center justify-center group-hover:bg-electric-blue/20 transition-colors">
                    <item.icon className="w-5 h-5 text-electric-blue" />
                  </div>
                  <span className="text-white/80 font-medium text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative aspect-square max-w-[500px] mx-auto">
              {/* Central Brain/Core Visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-electric-blue/20 rounded-full blur-[60px] animate-pulse" />
                <div className="relative w-48 h-48 bg-gradient-to-br from-electric-blue to-tech-blue rounded-[60px] flex items-center justify-center shadow-2xl z-10 transform rotate-12">
                  <Bot className="w-24 h-24 text-white animate-bounce" style={{ animationDuration: '3s' }} />
                </div>
              </div>
              
              {/* Orbiting Elements (CSS Animations) */}
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 animate-spin-slow"
                  style={{ animationDuration: `${10 + i * 2}s` }}
                >
                  <div 
                    className="w-4 h-4 bg-gold rounded-full absolute top-0 left-1/2 -translate-x-1/2 blur-[2px]"
                    style={{ transform: `rotate(${i * 60}deg) translateY(-180px)` }}
                  />
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AIAutomation;

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

const ServiceCard = ({ title, description, icon: Icon, className, delay = 0 }: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        "group relative p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-500 overflow-hidden",
        className
      )}
    >
      {/* Hover Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon */}
      <div className="relative z-10 w-14 h-14 rounded-2xl bg-midnight border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gold/10 group-hover:border-gold/20 transition-all duration-500">
        <Icon className="w-7 h-7 text-white group-hover:text-gold transition-colors" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 group-hover:text-white/70 transition-colors">
          {description}
        </p>
      </div>
      
      {/* Bottom Corner Accent */}
      <div className="absolute bottom-0 right-0 w-12 h-12 bg-gold/10 rounded-tl-[32px] translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
    </div>
  );
};

export default ServiceCard;

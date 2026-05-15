import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  highlight?: string;
}

const PageHeader = ({ title, subtitle, highlight }: PageHeaderProps) => {
  return (
    <section className="relative pt-40 pb-20 bg-midnight overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
          {title} <span className="text-gold">{highlight}</span>
        </h1>
        {subtitle && (
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;

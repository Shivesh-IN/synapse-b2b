import React, { useState } from 'react';
import { ArrowRight, Award, ShieldCheck, Users, Globe, Phone, Mail, Briefcase, User } from 'lucide-react';

interface CompanyOverviewProps {
  onNavigateToCatalog: () => void;
}

const CompanyOverview: React.FC<CompanyOverviewProps> = ({ onNavigateToCatalog }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white shadow-2xl min-h-[500px] flex flex-col justify-center">
        <div className="absolute inset-0 transition-opacity duration-700">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000" 
            alt="Automotive Innovation" 
            className="w-full h-full object-cover opacity-40 grayscale mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        </div>
        
        <div className="relative z-10 p-12 md:p-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
            Vasus Brakes India
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed font-light border-l-4 border-teal-500 pl-6">
            Pioneering the future of automotive safety with advanced friction material technology. 
            Delivering precision-engineered brake systems for the global aftermarket.
          </p>
          <button 
            onClick={onNavigateToCatalog}
            className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 group shadow-lg"
          >
            Explore Digital Catalog
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Corporate Profile & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: ShieldCheck, color: "blue", title: "ISO Certified", desc: "IATF 16949:2016 Certified Manufacturing Process." },
          { icon: Award, color: "emerald", title: "OEM Quality", desc: "Trusted partner for major commercial brands." },
          { icon: Users, color: "indigo", title: "Expert Team", desc: "Over 500+ skilled engineers and specialists." },
          { icon: Globe, color: "orange", title: "Global Reach", desc: "Exporting premium components to 20+ countries." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
            <div className={`w-12 h-12 bg-${item.color}-50 text-${item.color}-900 rounded-lg flex items-center justify-center mb-4`}>
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-8">
          <div>
            <span className="text-slate-500 font-bold tracking-widest text-xs uppercase border-b-2 border-slate-300 pb-1">Our Identity</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3">Driving Innovation in Friction Material</h2>
          </div>
          <div className="prose text-slate-600 leading-relaxed space-y-4">
            <p>
              Established with a vision to redefine automotive safety, <strong>Vasus Brakes India</strong> has emerged as a leader in the manufacturing of high-quality Brake Linings, Brake Pads, and Clutch Facings.
            </p>
            <p>
              Our state-of-the-art facility integrates cutting-edge technology with rigorous quality control processes. We ensure that every product leaving our factory meets the highest international safety standards. With a robust distribution network spanning the length and breadth of India, we guarantee timely availability.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm uppercase mb-2">Mission</h4>
              <p className="text-sm text-slate-600">To provide safety-critical components that save lives and enhance vehicle performance globally.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm uppercase mb-2">Vision</h4>
              <p className="text-sm text-slate-600">To be the undisputed global benchmark in friction material manufacturing and sustainability.</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="space-y-4 pt-8">
            <img 
              src="https://images.unsplash.com/photo-1530968033775-2c92733b0c41?auto=format&fit=crop&q=80&w=600" 
              className="rounded-2xl shadow-lg w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500" 
              alt="Automotive Engine" 
            />
             <img 
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600" 
              className="rounded-2xl shadow-lg w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500" 
              alt="Engine Block" 
            />
          </div>
          <div className="space-y-4">
            <img 
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=600" 
              className="rounded-2xl shadow-lg w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500" 
              alt="Brake Disc Detail" 
            />
            <img 
              src="https://images.unsplash.com/photo-1504222490245-4767adc69c43?auto=format&fit=crop&q=80&w=600" 
              className="rounded-2xl shadow-lg w-full h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500" 
              alt="Precision Auto Parts" 
            />
          </div>
        </div>
      </div>

      {/* Product Categories Preview */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-10 text-center text-white">
           <h2 className="text-2xl font-bold">Comprehensive Product Portfolio</h2>
           <p className="text-slate-400 mt-2">Engineered for durability, designed for performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-white">
            <div className="p-8 hover:bg-slate-50 transition-colors text-center group">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                    <img src="https://placehold.co/100x100/f1f5f9/0f172a?text=Brake" alt="Brake Icon" className="w-8 h-8 mix-blend-multiply" />
                </div>
                <h3 className="font-bold text-slate-900">Brake Systems</h3>
                <p className="text-sm text-slate-500 mt-1">Pads, Linings, Shoes & Rotors</p>
            </div>
            <div className="p-8 hover:bg-slate-50 transition-colors text-center group">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                    <img src="https://placehold.co/100x100/f1f5f9/0f172a?text=Clutch" alt="Clutch Icon" className="w-8 h-8 mix-blend-multiply" />
                </div>
                <h3 className="font-bold text-slate-900">Transmission</h3>
                <p className="text-sm text-slate-500 mt-1">Clutch Facings & Buttons</p>
            </div>
            <div className="p-8 hover:bg-slate-50 transition-colors text-center group">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                    <img src="https://placehold.co/100x100/f1f5f9/0f172a?text=Lining" alt="Lining Icon" className="w-8 h-8 mix-blend-multiply" />
                </div>
                <h3 className="font-bold text-slate-900">Industrial</h3>
                <p className="text-sm text-slate-500 mt-1">Roll Linings & Friction Sheets</p>
            </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-slate-900 rounded-2xl p-10 text-white shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Founder Card */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex flex-col items-center text-center hover:border-teal-500 transition-colors">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mb-6 text-teal-400">
               <User className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Bheem Singh Yadav</h3>
            <div className="flex items-center gap-2 text-teal-400 text-sm font-semibold uppercase tracking-wider mb-6">
              <Briefcase className="w-4 h-4" />
              Founder
            </div>
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                <Phone className="w-5 h-5 text-slate-400" />
                <span className="font-mono text-slate-200">+91 7568574507</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                <Mail className="w-5 h-5 text-slate-400" />
                <span className="text-slate-200 text-sm">bsyadav@vasusbrakesindia.com</span>
              </div>
            </div>
          </div>

          {/* Sales Manager Card */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex flex-col items-center text-center hover:border-orange-500 transition-colors">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mb-6 text-orange-400">
               <User className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Ranu Sachan</h3>
            <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold uppercase tracking-wider mb-6">
              <Briefcase className="w-4 h-4" />
              Sales & Marketing Manager
            </div>
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                <Phone className="w-5 h-5 text-slate-400" />
                <span className="font-mono text-slate-200">+91 8114423844</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                <Mail className="w-5 h-5 text-slate-400" />
                <span className="text-slate-200 text-sm">Info@vasusbrakesindia.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
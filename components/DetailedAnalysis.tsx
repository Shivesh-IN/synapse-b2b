import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Play, Pause, RefreshCw, Cpu, Database, Search, Box, Layers, ArrowRight, Zap, Target, Lock, GitBranch, Shuffle, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

// --- Shared Components ---
const AnalysisHeader = ({ title, description, icon: Icon }: { title: string, description: string, icon: any }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
    <p className="text-slate-500 max-w-3xl ml-1">{description}</p>
  </div>
);

const SimulationCard = ({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all ${className}`}>
    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
      <div className="w-2 h-6 bg-teal-500 rounded-full" />
      {title}
    </h3>
    {children}
  </div>
);

// --- 1. Probability Analysis ---
export const DetailedProbability: React.FC = () => {
  const [arrivals, setArrivals] = useState<{ time: string; orders: number }[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [arrivalRate, setArrivalRate] = useState(3); // Moving average of arrivals
  const [forecastMean, setForecastMean] = useState(50); // Center of Gaussian curve

  // Simulate Poisson Process (Order Arrivals) & Update Prediction
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      // Poisson-like random number generation (lambda approx 3)
      const L = Math.exp(-3);
      let k = 0;
      let p = 1;
      do {
        k++;
        p *= Math.random();
      } while (p > L);
      const newOrders = k - 1;

      // Update Arrival Data
      setArrivals(prev => {
        const newArr = [...prev, { time: timeStr, orders: newOrders }];
        if (newArr.length > 20) newArr.shift();
        return newArr;
      });
      setTotalOrders(prev => prev + newOrders);

      // Update Moving Average Rate
      setArrivalRate(prev => (prev * 0.7) + (newOrders * 0.3));

      // Update Gaussian Mean based on Arrival Rate (Real-time Prediction Shift)
      // If arrival rate is high, forecast moves right (higher expected sales)
      setForecastMean(prev => {
        const targetMean = 20 + (arrivalRate * 15); // Map rate 0-6 to mean 20-110
        const drift = (targetMean - prev) * 0.1; // Smooth transition
        return prev + drift;
      });

    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, arrivalRate]);

  // Generate Gaussian Data based on dynamic forecastMean
  const gaussianData = Array.from({ length: 50 }, (_, i) => {
    const x = i * 2.5; // Scale 0-125
    const mu = forecastMean;
    const sigma = 15; // Fixed spread
    // Normal Distribution Formula
    const probability = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
    return { x, probability: probability * 1000 };
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <AnalysisHeader 
        title="Probability & Stochastic Processes" 
        description="Model customer demand and order arrival as stochastic processes; predict sales probabilistically."
        icon={Target}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimulationCard title="Real-Time Stochastic Order Arrival (Poisson Process)">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <span className={`inline-block w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-sm font-mono text-slate-500">{isRunning ? 'Live Data Stream' : 'Paused'}</span>
             </div>
             <button onClick={() => setIsRunning(!isRunning)} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
             </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={arrivals}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" hide />
                <YAxis allowDecimals={false} domain={[0, 8]} />
                <Tooltip />
                <Area type="monotone" dataKey="orders" stroke="#0d9488" fillOpacity={1} fill="url(#colorOrders)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
             <span className="text-sm text-slate-600">Current Arrival Rate (λ)</span>
             <span className="text-xl font-bold text-slate-900">{arrivalRate.toFixed(2)} / sec</span>
          </div>
        </SimulationCard>

        <SimulationCard title="Dynamic Sales Prediction (Normal Distribution)">
           <div className="h-64 w-full relative">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={gaussianData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="x" hide />
                 <YAxis hide domain={[0, 30]} />
                 <Tooltip />
                 <Line type="basis" dataKey="probability" stroke="#8b5cf6" strokeWidth={3} dot={false} isAnimationActive={false} />
               </LineChart>
             </ResponsiveContainer>
             
             {/* Visual Marker for Peak */}
             <div 
                className="absolute top-0 bottom-8 w-0.5 bg-indigo-400 border-dashed border-l border-indigo-400 opacity-50 transition-all duration-300 ease-out"
                style={{ left: `${(forecastMean / 125) * 100}%` }}
             />
             <div 
                className="absolute bottom-2 px-2 py-1 bg-indigo-600 text-white text-xs font-bold rounded shadow-lg transition-all duration-300 ease-out transform -translate-x-1/2"
                style={{ left: `${(forecastMean / 125) * 100}%` }}
             >
                Avg: {Math.round(forecastMean)}
             </div>
           </div>
           <div className="mt-4 text-sm text-slate-600 bg-indigo-50 p-3 rounded-lg border border-indigo-100 flex items-start gap-2">
             <Target className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
             <p>The prediction curve shifts automatically based on the incoming order rate. High traffic = Higher expected sales volume.</p>
           </div>
        </SimulationCard>
      </div>
    </div>
  );
};

// --- 2. CAO Analysis ---
export const DetailedCAO: React.FC = () => {
  const [metrics, setMetrics] = useState<{ time: string, cpu: number, throughput: number }[]>([]);
  const [load, setLoad] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const now = new Date().toLocaleTimeString();
        // Simulate CPU load based on "user load"
        const baseCpu = 20;
        const variableCpu = Math.random() * 10 * load;
        const cpu = Math.min(100, baseCpu + variableCpu);
        
        // Throughput inversely related to extreme load, but scales with moderate load
        const throughput = cpu < 90 ? cpu * 1.5 : (cpu * 1.5) * 0.5; // Throttling simulation

        const newArr = [...prev, { time: now, cpu, throughput }];
        if (newArr.length > 20) newArr.shift();
        return newArr;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [load]);

  return (
    <div className="space-y-6 animate-in fade-in">
       <AnalysisHeader 
        title="Computer Architecture & Optimization" 
        description="Understand system resource usage for order processing and analytics; optimize for latency and throughput."
        icon={Cpu}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <SimulationCard title="Real-Time System Resource Monitoring">
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={metrics}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="time" hide />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Line name="CPU Usage %" type="monotone" dataKey="cpu" stroke="#ef4444" strokeWidth={2} dot={false} isAnimationActive={false} />
                            <Line name="Throughput (req/s)" type="monotone" dataKey="throughput" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-4 justify-center">
                   <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-3 h-1 bg-red-500"></span> CPU Usage
                   </div>
                   <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-3 h-1 bg-blue-500"></span> Throughput
                   </div>
                </div>
            </SimulationCard>
        </div>

        <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Load Simulator
                </h3>
                <p className="text-sm text-slate-400 mb-6">Increase user load to observe CPU spikes and throughput throttling (Latency simulation).</p>
                
                <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium">
                        <span>Current Load Factor:</span>
                        <span className="text-yellow-400">{load}x</span>
                    </div>
                    <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        step="1"
                        value={load}
                        onChange={(e) => setLoad(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                        <span>Idle</span>
                        <span>Stress Test</span>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <div className="text-xs text-slate-400 uppercase font-bold mb-1">Architecture Note</div>
                    <p className="text-xs text-slate-300">
                        Notice how Throughput drops when CPU hits >90%. This demonstrates pipeline stalls and cache misses under heavy concurrency.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. DAA Analysis ---
export const DetailedDAA: React.FC = () => {
  const [arrayData] = useState(Array.from({ length: 15 }, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b));
  const [target, setTarget] = useState<number | ''>('');
  const [searchSteps, setSearchSteps] = useState<{ index: number, status: 'checked' | 'found' | 'eliminated' }[]>([]);
  const [searchType, setSearchType] = useState<'linear' | 'binary'>('binary');
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async () => {
    if (target === '' || isSearching) return;
    setIsSearching(true);
    setSearchSteps([]);

    const tgt = Number(target);

    if (searchType === 'linear') {
        for (let i = 0; i < arrayData.length; i++) {
            setSearchSteps(prev => [...prev, { index: i, status: 'checked' }]);
            await new Promise(r => setTimeout(r, 400));
            if (arrayData[i] === tgt) {
                setSearchSteps(prev => [...prev, { index: i, status: 'found' }]);
                setIsSearching(false);
                return;
            }
        }
    } else {
        // Binary
        let left = 0;
        let right = arrayData.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            setSearchSteps(prev => [...prev, { index: mid, status: 'checked' }]);
            await new Promise(r => setTimeout(r, 800));

            if (arrayData[mid] === tgt) {
                setSearchSteps(prev => [...prev, { index: mid, status: 'found' }]);
                setIsSearching(false);
                return;
            }

            if (arrayData[mid] < tgt) {
                // Eliminate left half
                const eliminated = [];
                for(let k=left; k<=mid; k++) eliminated.push({index: k, status: 'eliminated' as const});
                setSearchSteps(prev => [...prev, ...eliminated]);
                left = mid + 1;
            } else {
                // Eliminate right half
                const eliminated = [];
                for(let k=mid; k<=right; k++) eliminated.push({index: k, status: 'eliminated' as const});
                setSearchSteps(prev => [...prev, ...eliminated]);
                right = mid - 1;
            }
        }
    }
    setIsSearching(false);
  };

  const getBarColor = (index: number) => {
    const step = searchSteps.slice().reverse().find(s => s.index === index);
    if (!step) return '#e2e8f0'; // default
    if (step.status === 'found') return '#22c55e'; // green
    if (step.status === 'eliminated') return '#cbd5e1'; // grayed out
    if (step.status === 'checked') return '#f59e0b'; // orange
    return '#e2e8f0';
  };

  return (
    <div className="space-y-6 animate-in fade-in">
       <AnalysisHeader 
        title="Design & Analysis of Algorithms" 
        description="Design efficient order processing and search algorithms. Visualizing Time Complexity."
        icon={Search}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2">
            <SimulationCard title="Algorithmic Visualization: Product Search">
                <div className="flex items-center gap-4 mb-6">
                    <select 
                        value={searchType} 
                        onChange={(e) => setSearchType(e.target.value as any)}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-medium"
                    >
                        <option value="binary">Binary Search O(log n)</option>
                        <option value="linear">Linear Search O(n)</option>
                    </select>
                    <input 
                        type="number" 
                        placeholder="Target Value"
                        value={target}
                        onChange={(e) => setTarget(Number(e.target.value))}
                        className="border border-slate-200 rounded-lg px-4 py-2 w-32"
                    />
                    <button 
                        onClick={performSearch}
                        disabled={isSearching}
                        className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                        Run
                    </button>
                    <div className="text-xs text-slate-500 ml-auto">
                        Hint: Pick a number from the graph
                    </div>
                </div>

                <div className="h-64 flex items-end justify-center gap-1 sm:gap-2">
                    {arrayData.map((val, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 w-full">
                            <div 
                                className="w-full rounded-t-md transition-colors duration-300 relative group"
                                style={{ 
                                    height: `${(val / 100) * 200}px`, 
                                    backgroundColor: getBarColor(idx),
                                    opacity: searchSteps.slice().reverse().find(s => s.index === idx)?.status === 'eliminated' ? 0.3 : 1
                                }}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    Idx:{idx}
                                </div>
                            </div>
                            <span className="text-xs font-bold text-slate-600">{val}</span>
                        </div>
                    ))}
                </div>
            </SimulationCard>
         </div>

         <div>
             <SimulationCard title="Efficiency Analysis">
                 <div className="space-y-6">
                     <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                         <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-sm text-slate-700">Selected Algorithm</span>
                            <span className="text-xs bg-slate-200 px-2 py-1 rounded uppercase">{searchType}</span>
                         </div>
                         <div className="text-3xl font-bold text-indigo-600 mb-1">
                             {searchType === 'binary' ? 'O(log n)' : 'O(n)'}
                         </div>
                         <p className="text-xs text-slate-500">Time Complexity</p>
                     </div>

                     <div className="space-y-3">
                         <h4 className="font-bold text-slate-800 text-sm">Real-World Impact</h4>
                         <div className="flex items-start gap-3 text-sm text-slate-600">
                             <ArrowRight className="w-4 h-4 mt-1 text-teal-500 shrink-0" />
                             <p><strong>Binary Search:</strong> Essential for querying massive databases (1M+ parts) instantly.</p>
                         </div>
                         <div className="flex items-start gap-3 text-sm text-slate-600">
                             <ArrowRight className="w-4 h-4 mt-1 text-teal-500 shrink-0" />
                             <p><strong>Linear Search:</strong> Used only for small, unsorted lists (e.g., recent 5 orders).</p>
                         </div>
                     </div>
                 </div>
             </SimulationCard>
         </div>
      </div>
    </div>
  );
};

// --- 4. OOPS Analysis (IMPROVED) ---
export const DetailedOOP: React.FC = () => {
    // Encapsulation State
    const [encapData, setEncapData] = useState<{ public: string, private: string | null }>({ public: 'Visible', private: null });
    const [accessStatus, setAccessStatus] = useState<'idle' | 'success' | 'denied'>('idle');

    // Polymorphism State
    const [customerType, setCustomerType] = useState<'regular' | 'vip'>('regular');

    // Abstraction State
    const [isProcessing, setIsProcessing] = useState(false);
    const [processLog, setProcessLog] = useState<string[]>([]);

    const attemptAccess = (type: 'public' | 'private') => {
        if (type === 'public') {
            setEncapData(prev => ({ ...prev, public: 'Accessed!' }));
            setAccessStatus('success');
        } else {
            setAccessStatus('denied');
        }
        setTimeout(() => {
            setAccessStatus('idle');
            setEncapData(prev => ({ ...prev, public: 'Visible' }));
        }, 1500);
    };

    const runAbstraction = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        setProcessLog([]);
        const steps = [
            "User Interface: Button Clicked",
            "Abstraction Layer: Calling OrderService.placeOrder()",
            "Internal: Validating Inventory...",
            "Internal: Calculating Tax...",
            "Internal: Processing Payment...",
            "Database: Commit Transaction"
        ];

        for (const step of steps) {
            await new Promise(r => setTimeout(r, 600));
            setProcessLog(prev => [...prev, step]);
        }
        setIsProcessing(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in">
            <AnalysisHeader 
                title="Object Oriented Programming Architecture" 
                description="Interactive visualization of the four pillars of OOP driving the Synapse platform."
                icon={Box}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Encapsulation */}
                <SimulationCard title="Encapsulation" className="border-l-4 border-l-blue-500">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-sm text-slate-600">
                            Bundling data and methods, restricting direct access to components.
                        </div>
                        <Lock className="w-5 h-5 text-blue-500" />
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm relative overflow-hidden">
                        <div className="text-blue-700 font-bold mb-2">class Product {'{'}</div>
                        <div className="pl-4 text-green-600">public price = 100;</div>
                        <div className="pl-4 text-red-600">private supplierCost = 60;</div>
                        <div className="text-blue-700 mt-2">{'}'}</div>

                        {accessStatus === 'denied' && (
                            <div className="absolute inset-0 bg-red-100/90 flex items-center justify-center text-red-700 font-bold animate-in zoom-in">
                                <AlertCircle className="w-5 h-5 mr-2" /> Access Denied
                            </div>
                        )}
                         {accessStatus === 'success' && (
                            <div className="absolute inset-0 bg-green-100/90 flex items-center justify-center text-green-700 font-bold animate-in zoom-in">
                                <CheckCircle className="w-5 h-5 mr-2" /> 100
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button onClick={() => attemptAccess('public')} className="flex-1 bg-white border border-slate-300 px-3 py-2 rounded-lg text-sm hover:bg-slate-50">
                            Get Price
                        </button>
                        <button onClick={() => attemptAccess('private')} className="flex-1 bg-white border border-slate-300 px-3 py-2 rounded-lg text-sm hover:bg-slate-50 text-red-600">
                            Get Cost
                        </button>
                    </div>
                </SimulationCard>

                {/* 2. Inheritance */}
                <SimulationCard title="Inheritance" className="border-l-4 border-l-purple-500">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-sm text-slate-600">
                            Classes derive properties and behavior from parent classes.
                        </div>
                        <GitBranch className="w-5 h-5 text-purple-500" />
                    </div>

                    <div className="relative pl-6 space-y-4">
                        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200"></div>
                        
                        <div className="relative bg-purple-50 p-3 rounded-lg border border-purple-100">
                            <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full ring-2 ring-white"></div>
                            <div className="text-xs font-bold text-purple-800 uppercase mb-1">Parent Class: Product</div>
                            <div className="text-xs font-mono text-slate-600">id, name, price, stock</div>
                        </div>

                        <div className="relative bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                            <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-purple-500 rounded-full"></div>
                            <div className="text-xs font-bold text-slate-800 uppercase mb-1">Child Class: BrakePad</div>
                            <div className="text-xs text-slate-500 mb-2 italic">Inherits all fields from Product +</div>
                            <div className="text-xs font-mono bg-slate-100 p-2 rounded text-slate-700 animate-pulse">
                                frictionCoefficient: 0.42<br/>
                                material: 'Ceramic'
                            </div>
                        </div>
                    </div>
                </SimulationCard>

                {/* 3. Polymorphism */}
                <SimulationCard title="Polymorphism" className="border-l-4 border-l-teal-500">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-sm text-slate-600">
                            Single interface (calculateTotal), different underlying forms.
                        </div>
                        <Shuffle className="w-5 h-5 text-teal-500" />
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
                        <div className="flex justify-between items-center mb-4">
                             <span className="font-mono text-xs text-slate-500">order.calculateTotal(qty: 10)</span>
                             <div className="flex bg-white rounded-lg p-1 border border-slate-200">
                                 <button 
                                    onClick={() => setCustomerType('regular')}
                                    className={`px-3 py-1 text-xs rounded-md transition-colors ${customerType === 'regular' ? 'bg-teal-100 text-teal-800 font-bold' : 'text-slate-500'}`}
                                 >
                                     Regular
                                 </button>
                                 <button 
                                    onClick={() => setCustomerType('vip')}
                                    className={`px-3 py-1 text-xs rounded-md transition-colors ${customerType === 'vip' ? 'bg-teal-100 text-teal-800 font-bold' : 'text-slate-500'}`}
                                 >
                                     VIP
                                 </button>
                             </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="text-3xl font-bold text-teal-600 mb-1">
                                {customerType === 'regular' ? '₹1,000' : '₹800'}
                            </div>
                            <div className="text-xs text-slate-500 font-mono">
                                {customerType === 'regular' ? 'price * qty' : '(price * qty) * 0.8'}
                            </div>
                        </div>
                    </div>
                </SimulationCard>

                {/* 4. Abstraction */}
                <SimulationCard title="Abstraction" className="border-l-4 border-l-orange-500">
                    <div className="flex justify-between items-start mb-4">
                        <div className="text-sm text-slate-600">
                            Hiding complex implementation details behind a simple interface.
                        </div>
                        <EyeOff className="w-5 h-5 text-orange-500" />
                    </div>

                    <div className="relative">
                        <button 
                            onClick={runAbstraction}
                            disabled={isProcessing}
                            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2 mb-4"
                        >
                            {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Box className="w-4 h-4" />}
                            Place Order (Simple Interface)
                        </button>

                        <div className="bg-black rounded-xl p-4 h-32 overflow-y-auto font-mono text-xs text-green-400 space-y-1 shadow-inner">
                            <div className="text-slate-500 border-b border-slate-800 pb-1 mb-2">System Log (Hidden Complexity)</div>
                            {processLog.length === 0 && <span className="text-slate-600 italic">Waiting for input...</span>}
                            {processLog.map((log, idx) => (
                                <div key={idx} className="animate-in fade-in slide-in-from-left-2">
                                    <span className="opacity-50 mr-2">{'>'}</span>{log}
                                </div>
                            ))}
                        </div>
                    </div>
                </SimulationCard>

            </div>
        </div>
    );
};
import React from 'react';
import { 
  Calculator, Activity, TrendingUp, Target, 
  Cpu, HardDrive, Zap, Server, MousePointer, 
  Box, GitBranch, RefreshCcw, EyeOff, Shield, Layers,
  Database, FileCode, Workflow, Network, Search, Shuffle, Map
} from 'lucide-react';

// --- Shared Components ---
const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
    <div className="p-2 bg-slate-900 text-white rounded-lg">
      <Icon className="w-5 h-5" />
    </div>
    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
  </div>
);

const Card = ({ title, children, className = "" }: { title?: string, children: React.ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow ${className}`}>
    {title && <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>}
    {children}
  </div>
);

// --- 1. Probability Module ---
export const ProbabilityModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Probability & Random Process</h1>
        <p className="text-slate-300">Modeling uncertainty for data-driven inventory management.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card title="Role of Probability">
            <ul className="space-y-3">
              {[
                "Models uncertainty in customer demand rather than relying on assumptions.",
                "Represents random order arrivals using probability distributions.",
                "Predicts stock requirements based on expected demand and variability.",
                "Reduces risk of overstocking by avoiding holding unnecessary inventory.",
                "Prevents stockouts/shortages by calculating adequate safety stock.",
                "Improves decision-making through quantitative, data-driven forecasting.",
                "Optimizes inventory levels for cost efficiency and service reliability."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm">
                  <div className="mt-1.5 w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Expected Sales Calculation">
            <div className="mb-4 bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col items-center justify-center">
              <p className="font-mono text-sm text-slate-500 mb-3 w-full text-left">Formula for Expected Value:</p>
              <div className="font-serif text-2xl flex items-center gap-4 justify-center py-6 px-10 bg-slate-900 text-white shadow-lg border border-slate-800 rounded-xl w-full">
                <span className="italic font-bold">E[X]</span>
                <span className="text-slate-400">=</span>
                <div className="flex items-center">
                  <span className="text-5xl leading-none font-light">∑</span>
                  <div className="flex flex-col text-xs ml-1 font-mono text-slate-300">
                    <span>n</span>
                    <span>i=1</span>
                  </div>
                </div>
                <span className="italic ml-2 font-bold">x<sub className="text-xs font-normal">i</sub> P(x<sub className="text-xs font-normal">i</sub>)</span>
              </div>
            </div>
            <div className="space-y-4 text-sm text-slate-600">
              <ul className="space-y-2">
                <li><strong className="text-slate-900">Random Variable (X):</strong> Daily sales volume.</li>
                <li><strong className="text-slate-900">P(x):</strong> Probability of selling x units.</li>
                <li><strong className="text-slate-900">Expected Value:</strong> The weighted average predicting long-term results.</li>
              </ul>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card title="Stochastic Modeling of Orders">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-600" />
                  Random Order Arrivals (Poisson Process)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                  <div className="bg-slate-50 p-2 rounded text-center text-xs font-medium text-slate-700 border border-slate-100">Events occur independently</div>
                  <div className="bg-slate-50 p-2 rounded text-center text-xs font-medium text-slate-700 border border-slate-100">Constant rate (λ)</div>
                  <div className="bg-slate-50 p-2 rounded text-center text-xs font-medium text-slate-700 border border-slate-100">Fixed time interval</div>
                </div>
                <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-center text-sm">
                  Probability Formula<br/>
                  P(X=k) = (λ^k * e^-λ) / k!
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-100 p-4 rounded-lg">
                <h4 className="text-teal-900 font-bold text-sm mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Application
                </h4>
                <ul className="text-xs text-teal-800 space-y-1 list-disc list-inside">
                  <li>Predict orders per day/week</li>
                  <li>Plan inventory & staffing</li>
                  <li>Reduce stockouts & overstocking</li>
                  <li>Make data-driven decisions</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- 2. Computer Architecture Module ---
export const ArchitectureModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Computer Architecture & Organization</h1>
        <p className="text-slate-300">Hardware-software interaction in the Synapse platform.</p>
      </div>

      <SectionHeader title="System Data Flow" icon={Server} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: MousePointer, title: "I/O Interface", desc: "Order entry inputs flow through keyboard, mouse, GUI." },
          { icon: Cpu, title: "CPU & ALU", desc: "Multi-core processor handles search. ALU performs totals & taxes." },
          { icon: HardDrive, title: "Memory Hierarchy", desc: "L1/L2 cache for frequent parts. RAM for active sessions." },
          { icon: Database, title: "Storage & DMA", desc: "HDD/SSD stores catalog. DMA for direct disk-to-memory transfer." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="p-3 bg-slate-50 rounded-full mb-3 text-slate-700">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-2">{item.title}</h3>
            <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="Instruction Execution Cycle" className="lg:col-span-2">
          <div className="relative pl-2">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100"></div>
            <div className="space-y-6">
              {[
                { step: "Trigger", desc: "User action triggers I/O interrupt." },
                { step: "Fetch", desc: "CPU fetches instruction from memory." },
                { step: "Decode", desc: "Instruction decoded by control unit." },
                { step: "Execute", desc: "ALU performs calculations (Totals, Tax)." },
                { step: "Store", desc: "Data temporarily stored in registers." },
                { step: "Write Back", desc: "Results written to RAM / database & GUI updated." }
              ].map((s, i) => (
                <div key={i} className="relative flex items-center gap-4 ml-4">
                  <div className="absolute -left-[21px] w-3 h-3 bg-slate-900 rounded-full ring-4 ring-white"></div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.step}</span>
                    <p className="text-slate-700 text-sm font-medium">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Instruction Pipeline">
          <div className="flex flex-col items-center mb-6">
             <Zap className="w-12 h-12 text-yellow-500 mb-2" />
             <h4 className="font-bold text-slate-900">5-Stage Pipeline</h4>
          </div>
          <ul className="space-y-4">
            <li className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-600">
              <strong>Parallel Processing:</strong> Multiple instructions processed simultaneously.
            </li>
            <li className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-600">
              <strong>Latency:</strong> Reduces waiting time during peak traffic.
            </li>
            <li className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-600">
              <strong>Throughput:</strong> Supports multi-user parallel processing without extra hardware.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

// --- 3. OOP Module ---
export const OopModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Object Oriented Programming</h1>
        <p className="text-slate-300">Software design principles ensuring modularity, security, and scalability.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Encapsulation */}
        <Card className="border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <Box className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">1. Encapsulation</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4 font-medium">
            Wrapping data (variables) and methods (functions) into a single unit (class).
          </p>
          <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
            <li>Protects sensitive business information (customer info, pricing, transactions).</li>
            <li>Prevents unauthorized modification to product order, and inventory data.</li>
            <li>Ensures data consistency across GUI ↔ backend.</li>
          </ul>
        </Card>

        {/* Inheritance */}
        <Card className="border-l-4 border-l-purple-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
              <GitBranch className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">2. Inheritance</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4 font-medium">
            Creating new classes based on existing ones. A class that inherits from another reuse methods/fields.
          </p>
          <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
            <li>Helps create product variations (e.g., BrakePadProduct, DiscProduct → inherit from Product).</li>
            <li>Common functionality is reused (price, SKU, specs).</li>
            <li>Reduces code duplication.</li>
          </ul>
        </Card>

        {/* Polymorphism */}
        <Card className="border-l-4 border-l-teal-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-teal-100 text-teal-700 rounded-lg">
              <RefreshCcw className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">3. Polymorphism</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4 font-medium">
            Ability of the same function or method to behave differently based on the object.
          </p>
          <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
            <li>Used for multiple payment types (UPI, Cash, Card → processPayment()).</li>
            <li>Used for different order types (PurchaseOrder, ReturnOrder → calculateTotal()).</li>
            <li>Makes the system dynamic and flexible.</li>
          </ul>
        </Card>

        {/* Abstraction */}
        <Card className="border-l-4 border-l-orange-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 text-orange-700 rounded-lg">
              <EyeOff className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">4. Abstraction</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4 font-medium">
            Process of hiding internal implementation details and showing only essential functionality.
          </p>
          <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
            <li>Users interact with simple GUI, while complex logic (searching, recommendations) remains hidden.</li>
            <li>Backend layers abstract database operations and algorithms.</li>
            <li>Simplifies maintenance and teamwork.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

// --- 4. Design Analysis of Algorithms Module ---
export const DaaModule: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Design Analysis of Algorithms</h1>
        <p className="text-slate-300">Efficient computation and optimization logic driving Synapse.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Binary Search & Hashing */}
        <Card className="border-t-4 border-t-indigo-500">
          <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  <Search className="w-5 h-5 mr-2 text-indigo-500" />
                  Product Search
                </h3>
                <span className="text-xs font-mono text-slate-400">Binary Search & Hashing</span>
             </div>
             <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded">O(log n)</span>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Synapse manages thousands of SKUs. Linear search O(n) is too slow for real-time inventory checks.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Applied Logic</h4>
              <div className="flex items-center justify-between text-xs text-slate-700 font-mono bg-white p-2 rounded border border-slate-200 mb-2">
                <span>SKU: BP-F-001</span>
                <span className="text-green-600">Found (Index 42)</span>
              </div>
              <p className="text-xs text-slate-500">
                Sorted inventory allows dividing the search interval in half repeatedly. Hashing maps Product IDs directly to memory addresses for O(1) retrieval during checkout.
              </p>
            </div>
          </div>
        </Card>

        {/* Merge Sort */}
        <Card className="border-t-4 border-t-emerald-500">
          <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  <Shuffle className="w-5 h-5 mr-2 text-emerald-500" />
                  Order Sorting
                </h3>
                <span className="text-xs font-mono text-slate-400">Merge Sort</span>
             </div>
             <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded">O(n log n)</span>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Displaying orders by date or value requires a stable sorting algorithm that handles large datasets efficiently.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <h4 className="text-xs font-bold uppercase text-slate-500 mb-2">Applied Logic</h4>
              <div className="flex gap-1 mb-2">
                {[45, 12, 89, 23].map(n => (
                   <div key={n} className="h-8 w-8 flex items-center justify-center bg-white border border-slate-200 rounded text-xs">{n}</div>
                ))}
                <span className="self-center mx-1">→</span>
                {[12, 23, 45, 89].map(n => (
                   <div key={n} className="h-8 w-8 flex items-center justify-center bg-emerald-100 border border-emerald-300 text-emerald-800 rounded text-xs font-bold">{n}</div>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                We use Merge Sort because it has a guaranteed worst-case time complexity of O(n log n), ensuring the dashboard never freezes regardless of order volume.
              </p>
            </div>
          </div>
        </Card>

        {/* Dijkstra */}
        <Card className="border-t-4 border-t-orange-500">
          <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  <Map className="w-5 h-5 mr-2 text-orange-500" />
                  Warehouse Routing
                </h3>
                <span className="text-xs font-mono text-slate-400">Dijkstra's Algorithm</span>
             </div>
             <span className="px-2 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded">O(E + V log V)</span>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Calculating the shortest path for automated guided vehicles (AGVs) in the warehouse to pick items for an order.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 relative overflow-hidden">
               {/* Visual Nodes */}
               <svg className="w-full h-24" viewBox="0 0 300 100">
                 <line x1="50" y1="50" x2="150" y2="20" stroke="#cbd5e1" strokeWidth="2" />
                 <line x1="50" y1="50" x2="150" y2="80" stroke="#cbd5e1" strokeWidth="2" />
                 <line x1="150" y1="20" x2="250" y2="50" stroke="#f97316" strokeWidth="2" />
                 <line x1="150" y1="80" x2="250" y2="50" stroke="#cbd5e1" strokeWidth="2" />
                 <circle cx="50" cy="50" r="10" fill="#64748b" />
                 <circle cx="150" cy="20" r="10" fill="#f97316" />
                 <circle cx="150" cy="80" r="10" fill="#64748b" />
                 <circle cx="250" cy="50" r="10" fill="#0f172a" />
               </svg>
               <p className="text-xs text-slate-500 mt-2">
                 Minimizes travel distance for item picking, reducing order fulfillment time by calculating optimal paths between racks.
               </p>
            </div>
          </div>
        </Card>

        {/* Heuristics */}
        <Card className="border-t-4 border-t-pink-500">
          <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-pink-500" />
                  Recommendations
                </h3>
                <span className="text-xs font-mono text-slate-400">Frequency Heuristics</span>
             </div>
             <span className="px-2 py-1 bg-pink-50 text-pink-700 text-xs font-bold rounded">O(1) Lookup</span>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Suggesting "Frequently Bought Together" items (e.g., Brake Pads + Discs) using historical frequency data.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
               <div className="flex items-center gap-2 mb-2">
                 <div className="bg-white px-2 py-1 border border-slate-200 rounded text-xs shadow-sm">Brake Pads</div>
                 <div className="text-slate-400">+</div>
                 <div className="bg-white px-2 py-1 border border-slate-200 rounded text-xs shadow-sm">???</div>
               </div>
               <p className="text-xs text-slate-500">
                 A heuristic algorithm scans the association matrix to find the highest probability pair in constant time, boosting cross-sales.
               </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-slate-800 text-slate-300 p-6 rounded-xl overflow-hidden">
        <h3 className="text-white font-bold mb-4 flex items-center">
          <Server className="w-5 h-5 mr-2" />
          Complexity Analysis Table
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
              <tr>
                <th className="px-4 py-3">Algorithm</th>
                <th className="px-4 py-3">Use Case</th>
                <th className="px-4 py-3">Time Complexity</th>
                <th className="px-4 py-3">Space Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr>
                <td className="px-4 py-3 font-medium text-white">Binary Search</td>
                <td className="px-4 py-3">Product Catalog Search</td>
                <td className="px-4 py-3 font-mono text-teal-400">O(log n)</td>
                <td className="px-4 py-3 font-mono">O(1)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">Merge Sort</td>
                <td className="px-4 py-3">Sorting Order History</td>
                <td className="px-4 py-3 font-mono text-teal-400">O(n log n)</td>
                <td className="px-4 py-3 font-mono">O(n)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white">Dijkstra</td>
                <td className="px-4 py-3">Warehouse Dispatch Routing</td>
                <td className="px-4 py-3 font-mono text-teal-400">O(E + V log V)</td>
                <td className="px-4 py-3 font-mono">O(V)</td>
              </tr>
               <tr>
                <td className="px-4 py-3 font-medium text-white">Hashing</td>
                <td className="px-4 py-3">Product Retrieval by ID</td>
                <td className="px-4 py-3 font-mono text-teal-400">O(1)</td>
                <td className="px-4 py-3 font-mono">O(n)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { MOCK_SALES_DATA, MOCK_PRODUCTS } from '../constants';
import { analyzeMarketTrends } from '../services/geminiService';
import { InsightData } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BrainCircuit, Loader2, TrendingUp, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<InsightData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const data = await analyzeMarketTrends(MOCK_SALES_DATA, MOCK_PRODUCTS);
      setInsight(data);
      setLoading(false);
    };
    fetchInsights();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Executive Overview</h2>
          <p className="text-slate-500">Real-time performance metrics and AI forecasting.</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm border border-blue-100">
          <BrainCircuit className="w-4 h-4" />
          <span>Powered by Gemini 2.5 Flash</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Revenue (YTD)</h3>
          <p className="mt-2 text-3xl font-bold text-slate-900">₹31,20,000</p>
          <div className="mt-2 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12.5% vs last year</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Distributors</h3>
          <p className="mt-2 text-3xl font-bold text-slate-900">142</p>
          <div className="mt-2 flex items-center text-sm text-slate-600">
            <span>Across 8 regions</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pending Orders</h3>
          <p className="mt-2 text-3xl font-bold text-slate-900">28</p>
          <div className="mt-2 flex items-center text-sm text-orange-600">
             <span>Requires Action</span>
          </div>
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[400px]">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Sales Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={MOCK_SALES_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gemini Analysis */}
        <div className="bg-slate-900 p-6 rounded-xl shadow-lg text-white flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <BrainCircuit className="w-5 h-5 mr-2 text-teal-400" />
              Synapse Predictive Model
            </h3>
            {loading && <Loader2 className="w-5 h-5 animate-spin text-slate-400" />}
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              Generating supply chain insights...
            </div>
          ) : insight ? (
            <div className="space-y-6 flex-1">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Trend Analysis</h4>
                <p className="text-slate-200 leading-relaxed">{insight.trendAnalysis}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <h4 className="text-xs font-bold text-teal-400 uppercase mb-1">Forecast Demand</h4>
                  <p className="font-medium text-lg">{insight.forecastedDemand}</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                   <h4 className="text-xs font-bold text-orange-400 uppercase mb-1">Risk Factor</h4>
                   <p className="font-medium text-lg">{insight.riskFactor}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Critical Restock Needed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {insight.restockRecommendations.map((item, idx) => (
                    <span key={idx} className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-sm text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-red-400">Failed to load analytics.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
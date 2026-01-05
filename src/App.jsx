import React, { useState } from 'react';
import { PlusCircle, TrendingUp, TrendingDown, DollarSign, PieChart, Newspaper, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PortfolioTracker = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [holdings, setHoldings] = useState([
    { 
      id: 1, 
      ticker: 'AAPL', 
      name: 'Apple Inc.', 
      shares: 50, 
      avgPrice: 150.00, 
      currentPrice: 178.50, 
      sector: 'Technology',
      peRatio: 29.5,
      marketCap: '2.8T',
      dividendYield: 0.52,
      priceHistory: [
        { date: 'Oct 27', price: 172.30 },
        { date: 'Nov 3', price: 175.20 },
        { date: 'Nov 10', price: 176.80 },
        { date: 'Nov 17', price: 174.50 },
        { date: 'Nov 24', price: 178.50 }
      ]
    },
    { 
      id: 2, 
      ticker: 'MSFT', 
      name: 'Microsoft Corp.', 
      shares: 30, 
      avgPrice: 320.00, 
      currentPrice: 378.25, 
      sector: 'Technology',
      peRatio: 35.8,
      marketCap: '2.8T',
      dividendYield: 0.75,
      priceHistory: [
        { date: 'Oct 27', price: 365.00 },
        { date: 'Nov 3', price: 370.50 },
        { date: 'Nov 10', price: 372.80 },
        { date: 'Nov 17', price: 375.20 },
        { date: 'Nov 24', price: 378.25 }
      ]
    },
    { 
      id: 3, 
      ticker: 'JNJ', 
      name: 'Johnson & Johnson', 
      shares: 25, 
      avgPrice: 160.00, 
      currentPrice: 155.80, 
      sector: 'Healthcare',
      peRatio: 24.3,
      marketCap: '386B',
      dividendYield: 3.05,
      priceHistory: [
        { date: 'Oct 27', price: 158.20 },
        { date: 'Nov 3', price: 157.40 },
        { date: 'Nov 10', price: 156.90 },
        { date: 'Nov 17', price: 156.20 },
        { date: 'Nov 24', price: 155.80 }
      ]
    },
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [newHolding, setNewHolding] = useState({
    ticker: '',
    name: '',
    shares: '',
    avgPrice: ''
  });

  const [watchlist, setWatchlist] = useState([
    {
      id: 1,
      ticker: 'NVDA',
      name: 'NVIDIA Corporation',
      currentPrice: 495.50,
      targetPrice: 450.00,
      sector: 'Technology',
      peRatio: 68.2,
      marketCap: '1.2T',
      notes: 'Waiting for pullback after earnings run-up',
      priceHistory: [
        { date: 'Oct 27', price: 470.00 },
        { date: 'Nov 3', price: 478.50 },
        { date: 'Nov 10', price: 485.20 },
        { date: 'Nov 17', price: 490.80 },
        { date: 'Nov 24', price: 495.50 }
      ]
    },
    {
      id: 2,
      ticker: 'COST',
      name: 'Costco Wholesale',
      currentPrice: 875.20,
      targetPrice: 825.00,
      sector: 'Consumer Defensive',
      peRatio: 52.1,
      marketCap: '388B',
      notes: 'Strong fundamentals but waiting for better entry',
      priceHistory: [
        { date: 'Oct 27', price: 850.00 },
        { date: 'Nov 3', price: 858.40 },
        { date: 'Nov 10', price: 865.80 },
        { date: 'Nov 17', price: 870.50 },
        { date: 'Nov 24', price: 875.20 }
      ]
    },
    {
      id: 3,
      ticker: 'DIS',
      name: 'The Walt Disney Company',
      currentPrice: 98.50,
      targetPrice: 105.00,
      sector: 'Communication Services',
      peRatio: 38.5,
      marketCap: '180B',
      notes: 'Streaming profitability improving, good value here',
      priceHistory: [
        { date: 'Oct 27', price: 95.20 },
        { date: 'Nov 3', price: 96.50 },
        { date: 'Nov 10', price: 97.30 },
        { date: 'Nov 17', price: 98.00 },
        { date: 'Nov 24', price: 98.50 }
      ]
    }
  ]);

  const [showAddWatchlist, setShowAddWatchlist] = useState(false);
  const [newWatchItem, setNewWatchItem] = useState({
    ticker: '',
    name: '',
    targetPrice: '',
    notes: ''
  });

  const sampleNews = [
    { ticker: 'AAPL', headline: 'Apple announces new product lineup for Q4', sentiment: 'positive', date: '2024-11-26' },
    { ticker: 'JNJ', headline: 'Healthcare sector faces regulatory scrutiny', sentiment: 'neutral', date: '2024-11-25' },
    { ticker: 'MSFT', headline: 'Microsoft cloud revenue exceeds expectations', sentiment: 'positive', date: '2024-11-26' },
  ];

  const prospectingNews = [
    { ticker: 'NVDA', headline: 'AI chip demand remains strong heading into 2025', sentiment: 'positive', date: '2024-11-27' },
    { ticker: 'COST', headline: 'Costco membership renewals hit record highs', sentiment: 'positive', date: '2024-11-26' },
    { ticker: 'DIS', headline: 'Disney+ subscriber growth accelerates in latest quarter', sentiment: 'positive', date: '2024-11-26' },
    { ticker: 'MACRO', headline: 'Fed signals potential rate cuts in early 2025', sentiment: 'neutral', date: '2024-11-27' },
  ];

  const generatePortfolioHistory = () => {
    const history = [];
    const dates = ['Oct 27', 'Nov 3', 'Nov 10', 'Nov 17', 'Nov 24'];
    
    dates.forEach((date, index) => {
      let totalValue = 0;
      holdings.forEach(holding => {
        if (holding.priceHistory && holding.priceHistory[index]) {
          totalValue += holding.shares * holding.priceHistory[index].price;
        }
      });
      history.push({ date, value: totalValue });
    });
    
    return history;
  };

  const portfolioHistory = generatePortfolioHistory();

  const calculateMetrics = (holding) => {
    const costBasis = holding.shares * holding.avgPrice;
    const currentValue = holding.shares * holding.currentPrice;
    const gainLoss = currentValue - costBasis;
    const gainLossPercent = ((gainLoss / costBasis) * 100).toFixed(2);
    return { costBasis, currentValue, gainLoss, gainLossPercent };
  };

  const portfolioTotal = holdings.reduce((sum, h) => {
    const { currentValue } = calculateMetrics(h);
    return sum + currentValue;
  }, 0);

  const totalCostBasis = holdings.reduce((sum, h) => {
    const { costBasis } = calculateMetrics(h);
    return sum + costBasis;
  }, 0);

  const totalGainLoss = portfolioTotal - totalCostBasis;
  const totalGainLossPercent = ((totalGainLoss / totalCostBasis) * 100).toFixed(2);

  const addHolding = () => {
    if (newHolding.ticker && newHolding.shares && newHolding.avgPrice) {
      const basePrice = parseFloat(newHolding.avgPrice);
      const priceHistory = [
        { date: 'Oct 27', price: basePrice * 0.95 },
        { date: 'Nov 3', price: basePrice * 0.97 },
        { date: 'Nov 10', price: basePrice * 0.99 },
        { date: 'Nov 17', price: basePrice * 1.01 },
        { date: 'Nov 24', price: basePrice }
      ];
      
      const holding = {
        id: Date.now(),
        ticker: newHolding.ticker.toUpperCase(),
        name: newHolding.name || newHolding.ticker.toUpperCase(),
        shares: parseFloat(newHolding.shares),
        avgPrice: basePrice,
        currentPrice: basePrice,
        sector: 'Other',
        peRatio: 25.0,
        marketCap: 'N/A',
        dividendYield: 2.0,
        priceHistory
      };
      setHoldings([...holdings, holding]);
      setNewHolding({ ticker: '', name: '', shares: '', avgPrice: '' });
      setShowAddForm(false);
    }
  };

  const addWatchlistItem = () => {
    if (newWatchItem.ticker && newWatchItem.targetPrice) {
      const basePrice = parseFloat(newWatchItem.targetPrice);
      const currentPrice = basePrice * (1 + (Math.random() * 0.2 - 0.1));
      const priceHistory = [
        { date: 'Oct 27', price: currentPrice * 0.95 },
        { date: 'Nov 3', price: currentPrice * 0.97 },
        { date: 'Nov 10', price: currentPrice * 0.99 },
        { date: 'Nov 17', price: currentPrice * 1.01 },
        { date: 'Nov 24', price: currentPrice }
      ];
      
      const item = {
        id: Date.now(),
        ticker: newWatchItem.ticker.toUpperCase(),
        name: newWatchItem.name || newWatchItem.ticker.toUpperCase(),
        currentPrice: currentPrice,
        targetPrice: basePrice,
        sector: 'Other',
        peRatio: 25.0,
        marketCap: 'N/A',
        notes: newWatchItem.notes || '',
        priceHistory
      };
      setWatchlist([...watchlist, item]);
      setNewWatchItem({ ticker: '', name: '', targetPrice: '', notes: '' });
      setShowAddWatchlist(false);
    }
  };

  const sectorAllocation = holdings.reduce((acc, holding) => {
    const { currentValue } = calculateMetrics(holding);
    acc[holding.sector] = (acc[holding.sector] || 0) + currentValue;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Portfolio Tracker
          </h1>
          <p className="text-slate-400">Long-term investing made simple</p>
        </div>

        <div className="flex gap-4 mb-8 border-b border-slate-700">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`pb-3 px-2 font-semibold transition-colors relative ${
              activeTab === 'portfolio' 
                ? 'text-blue-400' 
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Current Portfolio
            {activeTab === 'portfolio' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('prospecting')}
            className={`pb-3 px-2 font-semibold transition-colors relative ${
              activeTab === 'prospecting' 
                ? 'text-emerald-400' 
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Prospecting
            {activeTab === 'prospecting' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"></div>
            )}
          </button>
        </div>

        {activeTab === 'portfolio' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Total Value</span>
                  <DollarSign className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-bold">${portfolioTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Total Gain/Loss</span>
                  {totalGainLoss >= 0 ? <TrendingUp className="w-5 h-5 text-emerald-400" /> : <TrendingDown className="w-5 h-5 text-red-400" />}
                </div>
                <div className={`text-3xl font-bold ${totalGainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  ${Math.abs(totalGainLoss).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`text-sm mt-1 ${totalGainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent}%
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Holdings</span>
                  <PieChart className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-3xl font-bold">{holdings.length}</div>
                <div className="text-sm text-slate-400 mt-1">positions</div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold">Daily Dose</h2>
                <span className="text-sm text-slate-400 ml-2">Nov 27, 2024</span>
              </div>
              <div className="space-y-3">
                {sampleNews.map((news, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded border border-slate-700">
                    <span className="text-blue-400 font-mono text-sm font-semibold">{news.ticker}</span>
                    <div className="flex-1">
                      <p className="text-slate-200">{news.headline}</p>
                      <span className="text-xs text-slate-500">{news.date}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      news.sentiment === 'positive' ? 'bg-emerald-900/30 text-emerald-400' : 
                      news.sentiment === 'negative' ? 'bg-red-900/30 text-red-400' : 
                      'bg-slate-700/30 text-slate-400'
                    }`}>
                      {news.sentiment}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-semibold">Portfolio Performance</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={portfolioHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Portfolio Value']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 mb-8">
              <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Holdings</h2>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add Position
                </button>
              </div>

              {showAddForm && (
                <div className="p-6 border-b border-slate-700 bg-slate-900/50">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      placeholder="Ticker (e.g., AAPL)"
                      value={newHolding.ticker}
                      onChange={(e) => setNewHolding({...newHolding, ticker: e.target.value})}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={newHolding.name}
                      onChange={(e) => setNewHolding({...newHolding, name: e.target.value})}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Shares"
                      value={newHolding.shares}
                      onChange={(e) => setNewHolding({...newHolding, shares: e.target.value})}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Avg Price"
                      value={newHolding.avgPrice}
                      onChange={(e) => setNewHolding({...newHolding, avgPrice: e.target.value})}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={addHolding}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/50">
                    <tr className="text-left text-sm text-slate-400">
                      <th className="p-4">Ticker</th>
                      <th className="p-4">Company</th>
                      <th className="p-4 text-right">Shares</th>
                      <th className="p-4 text-right">Avg Price</th>
                      <th className="p-4 text-right">Current Price</th>
                      <th className="p-4 text-right">Value</th>
                      <th className="p-4 text-right">Gain/Loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((holding) => {
                      const metrics = calculateMetrics(holding);
                      return (
                        <tr 
                          key={holding.id} 
                          className="border-t border-slate-700 hover:bg-slate-900/30 cursor-pointer"
                          onClick={() => setSelectedStock(holding)}
                        >
                          <td className="p-4">
                            <span className="font-mono font-semibold text-blue-400">{holding.ticker}</span>
                          </td>
                          <td className="p-4 text-slate-300">{holding.name}</td>
                          <td className="p-4 text-right">{holding.shares}</td>
                          <td className="p-4 text-right">${holding.avgPrice.toFixed(2)}</td>
                          <td className="p-4 text-right">${holding.currentPrice.toFixed(2)}</td>
                          <td className="p-4 text-right font-semibold">${metrics.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td className={`p-4 text-right font-semibold ${metrics.gainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {metrics.gainLoss >= 0 ? '+' : ''}${Math.abs(metrics.gainLoss).toFixed(2)}
                            <span className="text-sm ml-1">({metrics.gainLoss >= 0 ? '+' : ''}{metrics.gainLossPercent}%)</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-semibold mb-4">Sector Allocation</h2>
              <div className="space-y-3">
                {Object.entries(sectorAllocation).map(([sector, value]) => {
                  const percentage = ((value / portfolioTotal) * 100).toFixed(1);
                  return (
                    <div key={sector}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">{sector}</span>
                        <span className="text-slate-400">{percentage}% (${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prospecting' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Stocks Monitored</span>
                  <PieChart className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold">{watchlist.length}</div>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">At Target Price</span>
                  <TrendingDown className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-emerald-400">
                  {watchlist.filter(item => item.currentPrice <= item.targetPrice).length}
                </div>
                <div className="text-sm text-slate-400 mt-1">ready to buy</div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Above Target</span>
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-3xl font-bold text-amber-400">
                  {watchlist.filter(item => item.currentPrice > item.targetPrice).length}
                </div>
                <div className="text-sm text-slate-400 mt-1">waiting for pullback</div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Newspaper className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-semibold">Market Insights</h2>
                <span className="text-sm text-slate-400 ml-2">Nov 27, 2024</span>
              </div>
              <div className="space-y-3">
                {prospectingNews.map((news, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded border border-slate-700">
                    <span className={`font-mono text-sm font-semibold ${
                      news.ticker === 'MACRO' ? 'text-purple-400' : 'text-emerald-400'
                    }`}>
                      {news.ticker}
                    </span>
                    <div className="flex-1">
                      <p className="text-slate-200">{news.headline}</p>
                      <span className="text-xs text-slate-500">{news.date}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      news.sentiment === 'positive' ? 'bg-emerald-900/30 text-emerald-400' : 
                      news.sentiment === 'negative' ? 'bg-red-900/30 text-red-400' : 
                      'bg-slate-700/30 text-slate-400'
                    }`}>
                      {news.sentiment}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 mb-8">
              <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Watchlist</h2>
                <button
                  onClick={() => setShowAddWatchlist(!showAddWatchlist)}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add to Watchlist
                </button>
              </div>

              {showAddWatchlist && (
                <div className="p-6 border-b border-slate-700 bg-slate-900/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Ticker (e.g., TSLA)"
                      value={newWatchItem.ticker}
                      onChange={(e) => setNewWatchItem({...newWatchItem, ticker: e.target.value})}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={newWatchItem.name}
                      onChange={(e) => setNewWatchItem({...newWatchItem, name: e.target.value})}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 text-white"
                    />
                    <input
                      type="number"
                      placeholder="Target Price"
                      value={newWatchItem.targetPrice}
                      onChange={(e) => setNewWatchItem({...newWatchItem, targetPrice: e.target.value})}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Notes (optional)"
                      value={newWatchItem.notes}
                      onChange={(e) => setNewWatchItem({...newWatchItem, notes: e.target.value})}
                      className="px-3 py-2 bg-slate-800 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 text-white"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={addWatchlistItem}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddWatchlist(false)}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-900/50">
                    <tr className="text-left text-sm text-slate-400">
                      <th className="p-4">Ticker</th>
                      <th className="p-4">Company</th>
                      <th className="p-4 text-right">Current Price</th>
                      <th className="p-4 text-right">Target Price</th>
                      <th className="p-4 text-right">Distance to Target</th>
                      <th className="p-4 text-right">Status</th>
                      <th className="p-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watchlist.map((item) => {
                      const difference = item.currentPrice - item.targetPrice;
                      const percentDiff = ((difference / item.targetPrice) * 100).toFixed(2);
                      const atTarget = item.currentPrice <= item.targetPrice;
                      
                      return (
                        <tr 
                          key={item.id} 
                          className="border-t border-slate-700 hover:bg-slate-900/30 cursor-pointer"
                          onClick={() => setSelectedStock(item)}
                        >
                          <td className="p-4">
                            <span className="font-mono font-semibold text-emerald-400">{item.ticker}</span>
                          </td>
                          <td className="p-4 text-slate-300">{item.name}</td>
                          <td className="p-4 text-right font-semibold">${item.currentPrice.toFixed(2)}</td>
                          <td className="p-4 text-right text-slate-400">${item.targetPrice.toFixed(2)}</td>
                          <td className={`p-4 text-right font-semibold ${atTarget ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {atTarget ? '' : '+'}${Math.abs(difference).toFixed(2)}
                            <span className="text-sm ml-1">({atTarget ? '' : '+'}{percentDiff}%)</span>
                          </td>
                          <td className="p-4 text-right">
                            <span className={`text-xs px-2 py-1 rounded font-semibold ${
                              atTarget 
                                ? 'bg-emerald-900/30 text-emerald-400' 
                                : 'bg-amber-900/30 text-amber-400'
                            }`}>
                              {atTarget ? 'BUY ZONE' : 'WAITING'}
                            </span>
                          </td>
                          <td className="p-4 text-slate-400 text-sm max-w-xs truncate">{item.notes}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedStock && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setSelectedStock(null)}>
            <div className="bg-slate-800 rounded-lg border border-slate-700 max-w-3xl w-full my-8" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-700 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold font-mono text-blue-400">{selectedStock.ticker}</span>
                    {selectedStock.shares && (
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        calculateMetrics(selectedStock).gainLoss >= 0 ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'
                      }`}>
                        {calculateMetrics(selectedStock).gainLoss >= 0 ? '+' : ''}{calculateMetrics(selectedStock).gainLossPercent}%
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl text-slate-300 mb-1">{selectedStock.name}</h3>
                  <span className="text-sm text-slate-400">{selectedStock.sector}</span>
                </div>
                <button 
                  onClick={() => setSelectedStock(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 border-b border-slate-700">
                <h4 className="text-lg font-semibold mb-4">Key Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">Current Price</div>
                    <div className="text-2xl font-bold text-white">${selectedStock.currentPrice.toFixed(2)}</div>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">P/E Ratio</div>
                    <div className="text-2xl font-bold text-white">{selectedStock.peRatio}</div>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">Market Cap</div>
                    <div className="text-2xl font-bold text-white">${selectedStock.marketCap}</div>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <div className="text-slate-400 text-sm mb-1">{selectedStock.dividendYield ? 'Div Yield' : 'Target'}</div>
                    <div className="text-2xl font-bold text-white">
                      {selectedStock.dividendYield ? `${selectedStock.dividendYield}%` : `$${selectedStock.targetPrice?.toFixed(2)}`}
                    </div>
                  </div>
                </div>
              </div>

              {selectedStock.shares && (
                <div className="p-6 border-b border-slate-700">
                  <h4 className="text-lg font-semibold mb-4">Your Position</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Shares Owned</div>
                      <div className="text-xl font-semibold text-white">{selectedStock.shares}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Avg Buy Price</div>
                      <div className="text-xl font-semibold text-white">${selectedStock.avgPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Total Value</div>
                      <div className="text-xl font-semibold text-white">
                        ${calculateMetrics(selectedStock).currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm mb-1">Total Gain/Loss</div>
                      <div className={`text-xl font-semibold ${
                        calculateMetrics(selectedStock).gainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {calculateMetrics(selectedStock).gainLoss >= 0 ? '+' : ''}$
                        {Math.abs(calculateMetrics(selectedStock).gainLoss).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedStock.notes && (
                <div className="p-6 border-b border-slate-700">
                  <h4 className="text-lg font-semibold mb-2">Notes</h4>
                  <p className="text-slate-300">{selectedStock.notes}</p>
                </div>
              )}

              <div className="p-6">
                <h4 className="text-lg font-semibold mb-4">Recent Price History</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={selectedStock.priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#94a3b8"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#94a3b8"
                      style={{ fontSize: '12px' }}
                      domain={['dataMin - 5', 'dataMax + 5']}
                      tickFormatter={(value) => `$${value.toFixed(0)}`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default PortfolioTracker;
import React, { useMemo } from 'react';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/categories';
import { calculateTotalIncome, calculateTotalExpenses, getPremiumMetrics } from '../utils/calculations';
import { formatCurrency } from '../utils/dateFormatter';



const AnalyticsPage = ({ transactions, settings }) => {
  const currency = settings.currency;
  const metrics = getPremiumMetrics(transactions);

  // Data mapping for charts
  const categoryData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const totals = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
      return acc;
    }, {});

    return Object.entries(totals).map(([id, value]) => {
      const cat = EXPENSE_CATEGORIES.find(c => c.id === id);
      return { 
        name: cat?.label || 'Other', 
        value,
        color: cat?.color || '#64748B'
      };
    }).sort((a, b) => b.value - a.value);
  }, [transactions]);

  const monthlyData = useMemo(() => {
    // Grouping by date for trends - simulation for display since we might have few dates
    const grouped = transactions.reduce((acc, t) => {
      const date = t.date;
      if (!acc[date]) acc[date] = { date, income: 0, expense: 0 };
      acc[date][t.type] += t.amount;
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [transactions]);

  const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4', '#EF4444'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="value" style={{ color: entry.color || entry.fill }}>
              {entry.name}: {formatCurrency(entry.value, currency)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="analytics-page animate-fade-in">
      <div className="page-header">
        <div className="header-text">
          <h1>Analytics & Insights</h1>
          <p>Deep dive into your financial habits and trends</p>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card card">
          <label>Avg. Daily Spending</label>
          <h2>{formatCurrency(metrics.avgDaily, currency)}</h2>
          <p>Last 30 days</p>
        </div>
        <div className="metric-card card">
          <label>Largest Expense</label>
          <h2>{formatCurrency(metrics.largestExpense, currency)}</h2>
          <p>High impact transaction</p>
        </div>
        <div className="metric-card card">
          <label>Largest Income</label>
          <h2>{formatCurrency(metrics.largestIncome, currency)}</h2>
          <p>Top earning event</p>
        </div>
      </div>

      <div className="charts-grid">
        {/* Income vs Expense Bar Chart */}
        <div className="chart-container card">
          <h3>Income vs Expense</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={12} tickFormatter={(val) => val.split('-').slice(1).join('/')} />
                <YAxis stroke="var(--text-tertiary)" fontSize={12} tickFormatter={(val) => val > 1000 ? `${val/1000}k` : val} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="income" name="Income" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Breakdown Pie Chart */}
        <div className="chart-container card">
          <h3>Expense Breakdown</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Area Chart */}
        <div className="chart-container card full-width">
          <h3>Spending Trend</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--text-tertiary)" fontSize={12} />
                <YAxis stroke="var(--text-tertiary)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="expense" name="Expense" stroke="#4F46E5" fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

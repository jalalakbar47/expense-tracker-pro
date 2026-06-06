export const calculateBalance = (transactions) => {
  return transactions.reduce((acc, curr) => {
    return curr.type === 'income' ? acc + Number(curr.amount) : acc - Number(curr.amount);
  }, 0);
};

export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
};

export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);
};

export const calculateSavingsRate = (income, expense) => {
  if (income === 0) return 0;
  const savings = income - expense;
  return Math.round((savings / income) * 100);
};

export const calculateHealthScore = (income, expense, budget) => {
  if (income === 0) return 0;
  
  let score = 50; // Base score
  
  // Factor 1: Savings Rate (30 points max)
  const savingsRate = calculateSavingsRate(income, expense);
  if (savingsRate > 20) score += 30;
  else if (savingsRate > 10) score += 20;
  else if (savingsRate > 0) score += 10;
  else score -= 10;
  
  // Factor 2: Budget Adherence (20 points max)
  if (budget && budget.amount > 0) {
    if (expense <= budget.amount) score += 20;
    else {
      const over = (expense - budget.amount) / budget.amount;
      score -= Math.min(20, Math.round(over * 50));
    }
  } else {
    score += 10; // Neutral
  }

  return Math.min(100, Math.max(0, score));
};

export const getHealthStatus = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Average';
  return 'Poor';
};

export const getPremiumMetrics = (transactions) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const incomes = transactions.filter((t) => t.type === 'income');

  const largestExpense = expenses.length > 0 ? Math.max(...expenses.map((e) => Number(e.amount))) : 0;
  const largestIncome = incomes.length > 0 ? Math.max(...incomes.map((i) => Number(i.amount))) : 0;

  // Average daily spending (last 30 days)
  const now = new Date();
  const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
  const recentExpenses = expenses.filter(e => new Date(e.date) >= thirtyDaysAgo);
  const avgDaily = recentExpenses.length > 0 
    ? recentExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0) / 30 
    : 0;

  return {
    largestExpense,
    largestIncome,
    avgDaily: Math.round(avgDaily),
  };
};

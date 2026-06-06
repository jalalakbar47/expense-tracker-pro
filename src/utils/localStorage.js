const KEYS = {
  USERS: 'etp_users',
  CURRENT_USER: 'etp_current_user',
  // Base keys - logic will append email to these for per-user storage
  TRANSACTIONS_PREFIX: 'etp_transactions_',
  BUDGET_PREFIX: 'etp_budget_',
  SETTINGS_PREFIX: 'etp_settings_',
  THEME_PREFIX: 'etp_theme_',
};

// --- AUTH FUNCTIONS ---

export const getUsers = () => {
  const data = localStorage.getItem(KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

export const registerUser = (userData) => {
  const users = getUsers();
  const exists = users.find(u => u.email === userData.email);
  if (exists) throw new Error('User with this email already exists');
  
  const newUser = {
    ...userData,
    id: `u-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  return newUser;
};

export const loginUser = (email, password) => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  
  localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
  return user;
};

export const logoutUser = () => {
  localStorage.removeItem(KEYS.CURRENT_USER);
};

export const getCurrentUser = () => {
  const data = localStorage.getItem(KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

// --- USER-SPECIFIC DATA FUNCTIONS ---

const getPrefixKey = (baseKey) => {
  const user = getCurrentUser();
  if (!user) return null;
  return `${baseKey}${user.email}`;
};

export const saveTransactions = (transactions) => {
  const key = getPrefixKey(KEYS.TRANSACTIONS_PREFIX);
  if (key) localStorage.setItem(key, JSON.stringify(transactions));
};

export const getTransactions = () => {
  const key = getPrefixKey(KEYS.TRANSACTIONS_PREFIX);
  if (!key) return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveBudget = (budget) => {
  const key = getPrefixKey(KEYS.BUDGET_PREFIX);
  if (key) localStorage.setItem(key, JSON.stringify(budget));
};

export const getBudget = () => {
  const key = getPrefixKey(KEYS.BUDGET_PREFIX);
  if (!key) return { amount: 0 };
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : { amount: 0 };
};

export const saveSettings = (settings) => {
  const key = getPrefixKey(KEYS.SETTINGS_PREFIX);
  if (key) localStorage.setItem(key, JSON.stringify(settings));
};

export const getSettings = () => {
  const user = getCurrentUser();
  const key = getPrefixKey(KEYS.SETTINGS_PREFIX);
  if (!key) return { currency: 'PKR', userName: 'User' };
  
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : { currency: 'PKR', userName: user ? user.fullName : 'User' };
};

export const saveTheme = (theme) => {
  const key = getPrefixKey(KEYS.THEME_PREFIX);
  if (key) localStorage.setItem(key, theme);
};

export const getTheme = () => {
  const key = getPrefixKey(KEYS.THEME_PREFIX);
  if (!key) return 'light';
  return localStorage.getItem(key) || 'light';
};

// Backup & Restore
export const exportBackup = () => {
  const user = getCurrentUser();
  if (!user) return;

  const data = {
    transactions: getTransactions(),
    budget: getBudget(),
    settings: getSettings(),
    exportDate: new Date().toISOString(),
    userEmail: user.email
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `expense_tracker_backup_${user.fullName.replace(/\s+/g, '_')}_${new Date().getTime()}.json`;
  link.click();
};

export const importBackup = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.transactions) saveTransactions(data.transactions);
        if (data.budget) saveBudget(data.budget);
        if (data.settings) saveSettings(data.settings);
        resolve(true);
      } catch (err) {
        reject('Invalid backup file');
      }
    };
    reader.readAsText(file);
  });
};

export const clearAllData = () => {
  const tKey = getPrefixKey(KEYS.TRANSACTIONS_PREFIX);
  const bKey = getPrefixKey(KEYS.BUDGET_PREFIX);
  const sKey = getPrefixKey(KEYS.SETTINGS_PREFIX);
  
  if (tKey) localStorage.removeItem(tKey);
  if (bKey) localStorage.removeItem(bKey);
  if (sKey) localStorage.removeItem(sKey);
};

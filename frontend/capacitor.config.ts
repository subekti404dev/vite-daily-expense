import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.uripsub.daily_expense_cap',
  appName: 'Daily Expense',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://dew.uripsub.dev",
  },
};

export default config;

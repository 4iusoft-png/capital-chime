import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminAnalytics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  adminUsers: number;
  regularUsers: number;
  totalWalletBalance: number;
  pendingVerifications: number;
  pendingTransactions: number;
  usersByDate: Array<{ date: string; count: number }>;
  loading: boolean;
  error: string | null;
}

export function useAdminAnalytics(): AdminAnalytics {
  const [analytics, setAnalytics] = useState<AdminAnalytics>({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    newUsersToday: 0,
    newUsersThisWeek: 0,
    newUsersThisMonth: 0,
    adminUsers: 0,
    regularUsers: 0,
    usersByDate: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setAnalytics(prev => ({ ...prev, loading: true, error: null }));

      // Get total users count
      const { count: totalUsers, error: totalUsersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (totalUsersError) throw totalUsersError;

      // Get active users count
      const { count: activeUsers, error: activeError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      if (activeError) throw activeError;

      // Get inactive users count
      const { count: inactiveUsers, error: inactiveError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', false);

      if (inactiveError) throw inactiveError;

      // Get users created today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: newUsersToday, error: todayError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());

      if (todayError) throw todayError;

      // Get users created this week
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      weekAgo.setHours(0, 0, 0, 0);
      const { count: newUsersThisWeek, error: weekError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', weekAgo.toISOString());

      if (weekError) throw weekError;

      // Get users created this month
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      monthAgo.setHours(0, 0, 0, 0);
      const { count: newUsersThisMonth, error: monthError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', monthAgo.toISOString());

      if (monthError) throw monthError;

      // Get admin users count
      const { count: adminUsers, error: adminError } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'admin');

      if (adminError) throw adminError;

      // Get regular users count
      const { count: regularUsers, error: regularError } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'user');

      if (regularError) throw regularError;

      // Get user registration trend for the last 7 days
      const { data: usersByDate, error: trendError } = await supabase
        .from('profiles')
        .select('created_at')
        .gte('created_at', weekAgo.toISOString())
        .order('created_at', { ascending: true });

      if (trendError) throw trendError;

      // Group users by date
      const dateGroups = usersByDate?.reduce((acc: Record<string, number>, user) => {
        const date = new Date(user.created_at).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {}) || {};

      const usersByDateArray = Object.entries(dateGroups).map(([date, count]) => ({
        date,
        count,
      }));

      setAnalytics({
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        inactiveUsers: inactiveUsers || 0,
        newUsersToday: newUsersToday || 0,
        newUsersThisWeek: newUsersThisWeek || 0,
        newUsersThisMonth: newUsersThisMonth || 0,
        adminUsers: adminUsers || 0,
        regularUsers: regularUsers || 0,
        totalWalletBalance: 0,
        pendingVerifications: 0,
        pendingTransactions: 0,
        usersByDate: usersByDateArray,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching admin analytics:', error);
      setAnalytics(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch analytics',
      }));
    }
  };

  return analytics;
}
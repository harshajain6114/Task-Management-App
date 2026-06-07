import { useState, useCallback, useRef } from 'react';
import api from '../api/axios';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  // Store last used filters so mutations can re-fetch with same filters
  const lastFiltersRef = useRef({});

  const fetchTasks = useCallback(async (filters = {}) => {
    lastFiltersRef.current = filters;
    setLoading(true);
    try {
      const { data } = await api.get('/tasks', { params: filters });
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setTotalTasks(data.totalTasks);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    try {
      await api.post('/tasks', taskData);
      await fetchTasks(lastFiltersRef.current);
    } catch (err) {
      setError(err);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      await api.put(`/tasks/${id}`, taskData);
      await fetchTasks(lastFiltersRef.current);
    } catch (err) {
      setError(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      await fetchTasks(lastFiltersRef.current);
    } catch (err) {
      setError(err);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await api.patch(`/tasks/${id}/toggle`);
      await fetchTasks(lastFiltersRef.current);
    } catch (err) {
      setError(err);
    }
  };

  return {
    tasks,
    loading,
    error,
    totalPages,
    currentPage,
    totalTasks,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleStatus,
  };
};
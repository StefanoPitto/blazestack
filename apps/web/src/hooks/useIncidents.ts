import { useState, useEffect, useCallback } from 'react';
import { Incident, CreateIncidentData } from '@/types';
import { apiService } from '@/services/api';

interface UseIncidentsReturn {
  incidents: Incident[];
  loading: boolean;
  error: string | null;
  createIncident: (data: CreateIncidentData) => Promise<void>;
  refreshIncidents: () => Promise<void>;
  deleteIncident: (id: string) => Promise<void>;
}

export const useIncidents = (): UseIncidentsReturn => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIncidents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getIncidents();
      setIncidents(data);
    } catch (err) {
      setError('Failed to load incidents');
      console.error('Error fetching incidents:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createIncident = useCallback(async (data: CreateIncidentData) => {
    try {
      setError(null);
      const newIncident = await apiService.createIncident(data);
      setIncidents(prev => [newIncident, ...prev]);
    } catch (err) {
      setError('Failed to create incident');
      throw err;
    }
  }, []);

  const refreshIncidents = useCallback(async () => {
    await fetchIncidents();
  }, [fetchIncidents]);

  const deleteIncident = useCallback(async (id: string) => {
    try {
      await apiService.deleteIncident(id);
      setIncidents(prev => prev.filter(incident => incident.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete incident'
      );
    }
  }, []);

  useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  return {
    incidents,
    loading,
    error,
    createIncident,
    refreshIncidents,
    deleteIncident,
  };
};

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { NavigationTabs } from '@/components/layout/NavigationTabs';
import { IncidentForm } from '@/components/forms/IncidentForm';
import { IncidentList } from '@/components/IncidentList';
import { useIncidents } from '@/hooks/useIncidents';
import { CreateIncidentData } from '@/types';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { incidents, loading, error, createIncident, refreshIncidents, deleteIncident } = useIncidents();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCreateIncident = async (data: CreateIncidentData) => {
    await createIncident(data);
  };

  const handleFormSuccess = () => {
    setActiveTab(1);
  };

  return (
    <Box>
      <NavigationTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && (
          <IncidentForm
            onSubmit={handleCreateIncident}
            onSuccess={handleFormSuccess}
          />
        )}
        {activeTab === 1 && (
          <IncidentList
            incidents={incidents}
            loading={loading}
            error={error}
            onRefresh={refreshIncidents}
            onDelete={deleteIncident}
          />
        )}
      </Box>
    </Box>
  );
};

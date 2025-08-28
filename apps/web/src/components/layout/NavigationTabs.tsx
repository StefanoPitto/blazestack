import React from 'react';
import { Tabs, Tab, Paper } from '@mui/material';
import { Add, LocalFireDepartment } from '@mui/icons-material';

interface NavigationTabsProps {
  activeTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab icon={<Add />} label="Create Incident" iconPosition="start" />
        <Tab
          icon={<LocalFireDepartment />}
          label="View Incidents"
          iconPosition="start"
        />
      </Tabs>
    </Paper>
  );
};

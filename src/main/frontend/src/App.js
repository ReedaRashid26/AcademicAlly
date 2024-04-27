import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './components/TaskContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import TasksPage from './pages/TasksPage';
import AuthForm from './components/AuthForm';
import NavigationBar from './components/NavigationBar';

// Define your custom theme using Tokyo Night Storm color palette
const tokyoNightStormTheme = createTheme({
  palette: {
    primary: {
      main: '#7aa2f7',
    },
    secondary: {
      main: '#bb9af7',
    },
    error: {
      main: '#f7768e',
    },
    warning: {
      main: '#ff9e64',
    },
    info: {
      main: '#2ac3de',
    },
    success: {
      main: '#73daca',
    },
    background: {
      default: '#1a1b26',
      paper: '#24283b',
    },
    text: {
      primary: '#a9b1d6',
      secondary: '#9aa5ce',
      disabled: '#565f89',
    },
    divider: '#414868',
  },
});

function App() {
  return (
    <ThemeProvider theme={tokyoNightStormTheme}>
      <CssBaseline />
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<><AuthForm isLogin={true} /></>} />
          <Route path="/register" element={<><AuthForm isLogin={false} /></>} />
          <Route path="/home" element={<><NavigationBar showLinks={true} showLogOut={true} /><HomePage /></>} />
          <Route path="/notes" element={<><NavigationBar showLinks={true} showLogOut={true} /><NotesPage /></>} />
          <Route path="/tasks" element={<><NavigationBar showLinks={true} showLogOut={true} /><TasksPage /></>} />
        </Routes>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;

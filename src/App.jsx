import { useMemo, useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Snackbar,
  Alert,
  Box,
  Fade,
} from '@mui/material';
import { buildTheme } from './theme';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import ComponentsPage from './pages/ComponentsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const theme = useMemo(() => buildTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  const handleSignInSuccess = () => {
    setIsAuthed(true);
    setCurrentPage('dashboard');
    setSnackbarOpen(true);
    setShowLoginAlert(true);
  };

  const handleLogout = () => {
    setIsAuthed(false);
    setCurrentPage('landing');
    setShowLoginAlert(false);
  };

  const handleSelectPlan = () => {
    setCurrentPage(isAuthed ? 'dashboard' : 'auth');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
      case 'auth':
        return <AuthPage onSignInSuccess={handleSignInSuccess} />;
      case 'dashboard':
        return (
          <DashboardPage
            drawerOpen={drawerOpen}
            onDrawerClose={() => setDrawerOpen(false)}
            showLoginAlert={showLoginAlert}
            onDismissAlert={() => setShowLoginAlert(false)}
          />
        );
      case 'pricing':
        return <PricingPage onSelectPlan={handleSelectPlan} />;
      case 'components':
        return <ComponentsPage />;
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode((d) => !d)}
          isAuthed={isAuthed}
          onLogout={handleLogout}
          onMenuClick={() => setDrawerOpen((o) => !o)}
        />

        <Fade in key={currentPage} timeout={350}>
          <Box>{renderPage()}</Box>
        </Fade>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Sign-in successful — welcome to Stratus!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

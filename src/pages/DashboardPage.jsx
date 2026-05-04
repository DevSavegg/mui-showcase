import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Typography,
  Breadcrumbs,
  Link,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
  Tooltip,
  Alert,
  AlertTitle,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import { NAV_ITEMS } from '../mockData';
import OverviewView from './dashboardViews/OverviewView';
import UsersView from './dashboardViews/UsersView';
import AnalyticsView from './dashboardViews/AnalyticsView';
import BillingView from './dashboardViews/BillingView';
import SettingsView from './dashboardViews/SettingsView';
import HelpView from './dashboardViews/HelpView';

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 72;
const APPBAR_HEIGHT = 68; // matches Navbar Toolbar minHeight

const VIEWS = {
  overview: OverviewView,
  users: UsersView,
  analytics: AnalyticsView,
  billing: BillingView,
  settings: SettingsView,
  help: HelpView,
};

export default function DashboardPage({
  drawerOpen,
  onDrawerClose,
  showLoginAlert,
  onDismissAlert,
}) {
  const [activeNav, setActiveNav] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [savingInDialog, setSavingInDialog] = useState(false);
  const [savedInDialog, setSavedInDialog] = useState(false);

  const drawerWidth = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  const handleDialogSave = () => {
    setSavingInDialog(true);
    setSavedInDialog(false);
    setTimeout(() => {
      setSavingInDialog(false);
      setSavedInDialog(true);
    }, 2000);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSavingInDialog(false);
    setSavedInDialog(false);
  };

  // Used by both the permanent (desktop) and temporary (mobile) drawers.
  // `mini` controls whether labels are hidden — only the permanent drawer
  // collapses; the mobile drawer always shows labels.
  const renderDrawerContent = (mini) => (
    <Box sx={{ overflowX: 'hidden' }}>
      <Stack
        direction="row"
        justifyContent={mini ? 'center' : 'flex-end'}
        sx={{ px: 1, py: 1, display: { xs: 'none', md: 'flex' } }}
      >
        <Tooltip title={mini ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
          <IconButton size="small" onClick={() => setCollapsed((c) => !c)}>
            {mini ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider />
      <List sx={{ pt: 1 }}>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
            <Tooltip title={mini ? item.label : ''} placement="right" disableInteractive>
              <ListItemButton
                selected={activeNav === item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  onDrawerClose?.();
                }}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: mini ? 'center' : 'flex-start',
                  borderRadius: 1,
                  mx: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: mini ? 0 : 2,
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!mini && <ListItemText primary={item.label} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const ActiveView = VIEWS[activeNav] ?? OverviewView;
  const activeLabel = NAV_ITEMS.find((n) => n.id === activeNav)?.label ?? activeNav;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Desktop: permanent collapsible drawer that sits *below* the sticky AppBar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          transition: (t) =>
            t.transitions.create('width', {
              duration: t.transitions.duration.shortest,
            }),
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            top: APPBAR_HEIGHT,
            height: `calc(100% - ${APPBAR_HEIGHT}px)`,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: (t) =>
              t.transitions.create('width', {
                duration: t.transitions.duration.shortest,
              }),
          },
        }}
      >
        {renderDrawerContent(collapsed)}
      </Drawer>

      {/* Mobile: temporary drawer triggered by the navbar hamburger */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={onDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar sx={{ minHeight: APPBAR_HEIGHT }} />
        {renderDrawerContent(false)}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          transition: (t) =>
            t.transitions.create('width', {
              duration: t.transitions.duration.shortest,
            }),
        }}
      >
        {showLoginAlert && (
          <Alert
            severity="success"
            onClose={onDismissAlert}
            sx={{ mb: 2 }}
            variant="filled"
          >
            <AlertTitle>Welcome back, Ada!</AlertTitle>
            You're now signed in. Last login was 2 hours ago from San Francisco.
          </Alert>
        )}

        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
          <Link
            underline="hover"
            color="inherit"
            href="#"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <HomeIcon fontSize="small" />
            Home
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Workspaces
          </Link>
          <Typography color="text.primary">{activeLabel}</Typography>
        </Breadcrumbs>

        <ActiveView onOpenDialog={() => setDialogOpen(true)} />
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create new project</DialogTitle>
        <DialogContent dividers>
          {!savingInDialog && !savedInDialog && (
            <Typography color="text.secondary">
              Click "Save" below to provision a new project. This will simulate a
              2-second async call to the backend.
            </Typography>
          )}
          {savingInDialog && (
            <Stack spacing={1.5}>
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="rectangular" height={80} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="80%" />
            </Stack>
          )}
          {savedInDialog && (
            <Alert severity="success">
              <AlertTitle>Project created</AlertTitle>
              Your new project "stratus-prod-7" is now live.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Tooltip title="Triggers a 2s skeleton load state">
            <span>
              <Button
                onClick={handleDialogSave}
                variant="contained"
                disabled={savingInDialog}
              >
                {savedInDialog ? 'Save again' : 'Save'}
              </Button>
            </span>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

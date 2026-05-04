import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Badge,
  Switch,
  Stack,
  Box,
  Tooltip,
  FormControlLabel,
  Menu,
  MenuItem,
  Divider,
  Autocomplete,
  TextField,
  InputAdornment,
  Chip,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Slide,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect, useRef, useState } from 'react';
import { SEARCH_ITEMS, NOTIFICATIONS, NAV_LINKS, LANGUAGES } from '../mockData';

export default function Navbar({
  currentPage,
  setCurrentPage,
  darkMode,
  toggleDarkMode,
  isAuthed,
  onLogout,
  onMenuClick,
}) {
  const [accountAnchor, setAccountAnchor] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [langAnchor, setLangAnchor] = useState(null);
  const [language, setLanguage] = useState('en');
  const searchRef = useRef(null);

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const visibleLinks = NAV_LINKS.filter((l) => !l.requiresAuth || isAuthed);

  return (
    <Slide direction="down" in={true} mountOnEnter>
      <AppBar position="sticky" elevation={0} color="transparent">
        <Toolbar sx={{ gap: 1.5, minHeight: 68 }}>
          {currentPage === 'dashboard' && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={onMenuClick}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            onClick={() => setCurrentPage('landing')}
            sx={{ cursor: 'pointer', userSelect: 'none', mr: 2 }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1.5,
                display: 'grid',
                placeItems: 'center',
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: '#fff',
              }}
            >
              <RocketLaunchIcon fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.01em' }}>
              Stratus
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {visibleLinks.map((link) => {
              const active = currentPage === link.id;
              return (
                <Button
                  key={link.id}
                  onClick={() => setCurrentPage(link.id)}
                  sx={{
                    color: active ? 'primary.main' : 'text.primary',
                    bgcolor: active ? (t) => (t.palette.mode === 'dark' ? 'rgba(124,156,255,0.15)' : 'rgba(79,70,229,0.08)') : 'transparent',
                    fontWeight: active ? 700 : 500,
                    px: 1.5,
                    '&:hover': {
                      bgcolor: (t) =>
                        t.palette.mode === 'dark'
                          ? 'rgba(255,255,255,0.06)'
                          : 'rgba(0,0,0,0.04)',
                    },
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Autocomplete
            options={SEARCH_ITEMS}
            groupBy={(opt) => opt.group}
            getOptionLabel={(opt) => opt.label}
            sx={{ width: 260, display: { xs: 'none', lg: 'block' } }}
            size="small"
            onChange={(_, value) => {
              if (!value) return;
              const target = NAV_LINKS.find(
                (l) => l.label.toLowerCase() === value.label.toLowerCase()
              );
              if (target && (!target.requiresAuth || isAuthed)) {
                setCurrentPage(target.id);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={searchRef}
                placeholder="Search…"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Chip
                      label="/"
                      size="small"
                      sx={{ height: 20, fontSize: 11, mr: 1 }}
                    />
                  ),
                }}
              />
            )}
          />

          <Tooltip title={darkMode ? 'Switch to light' : 'Switch to dark'}>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={toggleDarkMode} size="small" />}
              label={
                darkMode ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />
              }
              sx={{ mr: 0.5, ml: 1 }}
            />
          </Tooltip>

          <Tooltip title="Language">
            <IconButton
              onClick={(e) => setLangAnchor(e.currentTarget)}
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              <LanguageIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={langAnchor}
            open={Boolean(langAnchor)}
            onClose={() => setLangAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            {LANGUAGES.map((lang) => (
              <MenuItem
                key={lang.code}
                selected={language === lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setLangAnchor(null);
                }}
              >
                <Box component="span" sx={{ mr: 1.5, fontSize: 18 }}>
                  {lang.flag}
                </Box>
                {lang.label}
              </MenuItem>
            ))}
          </Menu>

          {isAuthed && (
            <>
              <Tooltip title="Notifications">
                <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Popover
                anchorEl={notifAnchor}
                open={Boolean(notifAnchor)}
                onClose={() => setNotifAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{ paper: { sx: { width: 360, mt: 1 } } }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2, pb: 1 }}>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Notifications
                  </Typography>
                  <Chip label={`${unreadCount} new`} size="small" color="primary" />
                </Stack>
                <Divider />
                <List sx={{ p: 0, maxHeight: 400, overflowY: 'auto' }}>
                  {NOTIFICATIONS.map((n) => (
                    <ListItem key={n.id} disablePadding>
                      <ListItemButton
                        sx={{
                          py: 1.25,
                          borderLeft: 3,
                          borderColor: n.unread ? n.color : 'transparent',
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: n.color, width: 36, height: 36, fontSize: 14 }}>
                            {n.initials}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body2" fontWeight={n.unread ? 700 : 500}>
                              {n.title}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography variant="caption" color="text.secondary" component="span">
                                {n.body}
                              </Typography>
                              <Typography variant="caption" color="text.disabled" sx={{ display: 'block' }}>
                                {n.time}
                              </Typography>
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <Box sx={{ p: 1 }}>
                  <Button fullWidth size="small" onClick={() => setNotifAnchor(null)}>
                    Mark all as read
                  </Button>
                </Box>
              </Popover>
            </>
          )}

          {!isAuthed && currentPage !== 'auth' && (
            <Stack direction="row" spacing={1} sx={{ ml: 0.5 }}>
              <Button color="inherit" onClick={() => setCurrentPage('auth')}>
                Sign in
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setCurrentPage('auth')}
              >
                Get started
              </Button>
            </Stack>
          )}

          {isAuthed && (
            <>
              <Tooltip title="Account">
                <IconButton
                  onClick={(e) => setAccountAnchor(e.currentTarget)}
                  sx={{ p: 0.5, ml: 0.5 }}
                >
                  <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main' }}>S</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={accountAnchor}
                open={Boolean(accountAnchor)}
                onClose={() => setAccountAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                slotProps={{ paper: { sx: { minWidth: 220, mt: 1 } } }}
              >
                <Box sx={{ px: 2, py: 1 }}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Ada Lovelace
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    ada@analytical.io
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={() => setAccountAnchor(null)}>
                  <PersonIcon fontSize="small" sx={{ mr: 1.5 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={() => setAccountAnchor(null)}>
                  <SettingsIcon fontSize="small" sx={{ mr: 1.5 }} />
                  Settings
                  <Box sx={{ flexGrow: 1 }} />
                  <Chip
                    label="⌘ ,"
                    size="small"
                    sx={{ height: 20, fontSize: 10 }}
                    icon={<KeyboardCommandKeyIcon sx={{ fontSize: 12 }} />}
                  />
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    setAccountAnchor(null);
                    onLogout();
                  }}
                >
                  <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

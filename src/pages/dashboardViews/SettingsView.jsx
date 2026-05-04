import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Paper,
  Grid,
  MenuItem,
  Divider,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { SETTINGS_NOTIFICATIONS, SETTINGS_API_KEYS, COUNTRIES, LANGUAGES } from '../../mockData';

export default function SettingsView() {
  const [notifs, setNotifs] = useState(
    Object.fromEntries(SETTINGS_NOTIFICATIONS.map((n) => [n.id, n.defaultOn]))
  );
  const [twoFa, setTwoFa] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>Settings</Typography>
          <Typography variant="body2" color="text.secondary">
            Profile, notifications, API access, and security.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined">Discard</Button>
          <Button variant="contained">Save changes</Button>
        </Stack>
      </Stack>

      <Stack spacing={3}>
        {/* Profile */}
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700}>Profile</Typography>
          <Typography variant="caption" color="text.secondary">
            How you appear to your team and on shared content.
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={3}>
              <Stack alignItems="center" spacing={1}>
                <Avatar sx={{ width: 96, height: 96, bgcolor: 'primary.main', fontSize: 36 }}>
                  AL
                </Avatar>
                <Button size="small">Change photo</Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Full name" defaultValue="Ada Lovelace" size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" defaultValue="ada@analytical.io" size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Country" defaultValue="United States" size="small">
                    {COUNTRIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Language" defaultValue="en" size="small">
                    {LANGUAGES.map((l) => (
                      <MenuItem key={l.code} value={l.code}>{l.flag} {l.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    label="Bio"
                    size="small"
                    defaultValue="Mathematician, software pioneer, occasional poet."
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        {/* Notifications */}
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700}>Notifications</Typography>
          <Typography variant="caption" color="text.secondary">
            Choose what we ping you about.
          </Typography>
          <Stack spacing={1.5} sx={{ mt: 2 }} divider={<Divider flexItem />}>
            {SETTINGS_NOTIFICATIONS.map((n) => (
              <Stack
                key={n.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ py: 0.5 }}
              >
                <Box>
                  <Typography variant="body2" fontWeight={600}>{n.label}</Typography>
                  <Typography variant="caption" color="text.secondary">{n.sub}</Typography>
                </Box>
                <Switch
                  checked={notifs[n.id]}
                  onChange={(_, on) => setNotifs((s) => ({ ...s, [n.id]: on }))}
                />
              </Stack>
            ))}
          </Stack>
        </Paper>

        {/* API keys */}
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>API keys</Typography>
              <Typography variant="caption" color="text.secondary">
                Use these to authenticate requests from your servers.
              </Typography>
            </Box>
            <Button startIcon={<AddIcon />} size="small" variant="outlined">
              Generate key
            </Button>
          </Stack>
          <Stack spacing={1.5} sx={{ mt: 2 }} divider={<Divider flexItem />}>
            {SETTINGS_API_KEYS.map((k) => (
              <Stack
                key={k.id}
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ sm: 'center' }}
                spacing={1}
                sx={{ py: 0.5 }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <KeyIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography variant="body2" fontWeight={600}>{k.label}</Typography>
                      {k.id.includes('live') && <Chip label="Live" size="small" color="error" />}
                    </Stack>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                      {k.prefix}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="caption" color="text.secondary">
                      Last used {k.lastUsed}
                    </Typography>
                  </Box>
                  <Tooltip title="Copy"><IconButton size="small"><ContentCopyIcon fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Revoke"><IconButton size="small"><DeleteOutlineIcon fontSize="small" /></IconButton></Tooltip>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Paper>

        {/* Security */}
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="subtitle1" fontWeight={700}>Security</Typography>
          <Stack spacing={1.5} sx={{ mt: 2 }} divider={<Divider flexItem />}>
            <FormControlLabel
              control={<Switch checked={twoFa} onChange={(_, v) => setTwoFa(v)} />}
              label={
                <Box>
                  <Typography variant="body2" fontWeight={600}>Two-factor authentication</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Required for owners and admins.
                  </Typography>
                </Box>
              }
              sx={{ alignItems: 'flex-start', m: 0 }}
            />
            <FormControlLabel
              control={<Switch checked={marketing} onChange={(_, v) => setMarketing(v)} />}
              label={
                <Box>
                  <Typography variant="body2" fontWeight={600}>Allow marketing emails</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tips, product updates, and the occasional case study.
                  </Typography>
                </Box>
              }
              sx={{ alignItems: 'flex-start', m: 0 }}
            />
          </Stack>
        </Paper>

        {/* Danger zone */}
        <Paper variant="outlined" sx={{ p: 3, borderColor: 'error.light' }}>
          <Typography variant="subtitle1" fontWeight={700} color="error.main">
            Danger zone
          </Typography>
          <Alert severity="warning" variant="outlined" sx={{ mt: 2 }}>
            Deleting your workspace is permanent. All projects, data, and integrations will be removed.
          </Alert>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 2 }}>
            <Button color="error" variant="outlined">Transfer ownership</Button>
            <Button color="error" variant="contained">Delete workspace</Button>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

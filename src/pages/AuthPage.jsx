import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  CircularProgress,
  Divider,
  Link,
  FormHelperText,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useState } from 'react';
import { ROLES, SUBSCRIPTION_TIERS } from '../mockData';

export default function AuthPage({ onSignInSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('engineer');
  const [tier, setTier] = useState('pro');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignInSuccess();
    }, 1200);
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'radial-gradient(circle at 30% 20%, rgba(144,202,249,0.08), transparent 40%)'
            : 'radial-gradient(circle at 30% 20%, rgba(25,118,210,0.06), transparent 40%)',
      }}
    >
      <Paper elevation={6} sx={{ p: { xs: 3, sm: 5 }, maxWidth: 460, width: '100%' }}>
        <Stack spacing={3}>
          <Stack alignItems="center" spacing={1}>
            <Box
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: 2,
                p: 1.5,
                display: 'flex',
              }}
            >
              <RocketLaunchIcon />
            </Box>
            <Typography variant="h5" fontWeight={700}>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to your Stratus account
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<GitHubIcon />}>
              GitHub
            </Button>
          </Stack>

          <Divider>
            <Typography variant="caption" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            defaultValue="ada@analytical.io"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="filled"
            fullWidth
            defaultValue="hunter2hunter2"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Display name (optional)"
            variant="standard"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {ROLES.map((r) => (
                <MenuItem key={r.value} value={r.value}>
                  {r.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>This helps us tailor your dashboard</FormHelperText>
          </FormControl>

          <FormControl>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Subscription tier
            </Typography>
            <RadioGroup
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              row
            >
              {SUBSCRIPTION_TIERS.map((t) => (
                <FormControlLabel
                  key={t.value}
                  value={t.value}
                  control={<Radio size="small" />}
                  label={t.label}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            }
            label={
              <Typography variant="body2">
                I agree to the <Link href="#">Terms</Link> and{' '}
                <Link href="#">Privacy Policy</Link>
              </Typography>
            }
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleSignIn}
            disabled={!agreed || loading}
            startIcon={
              loading ? <CircularProgress size={18} color="inherit" /> : null
            }
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>

          <Typography variant="body2" color="text.secondary" align="center">
            Don't have an account? <Link href="#">Create one</Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

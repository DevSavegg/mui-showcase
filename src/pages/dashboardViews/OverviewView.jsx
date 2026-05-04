import {
  Box,
  Paper,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Chip,
  Pagination,
  Stack,
  Button,
  Slider,
  Rating,
  Stepper,
  Step,
  StepLabel,
  Tooltip,
  IconButton,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CloudIcon from '@mui/icons-material/Cloud';
import { useState } from 'react';
import { TABLE_ROWS, ONBOARDING_STEPS } from '../../mockData';

const ROWS_PER_PAGE = 4;

const KPI = [
  { label: 'MRR',           value: '$24,500', delta: '+12.4%', icon: <AttachMoneyIcon />, color: 'success.main' },
  { label: 'Active users',  value: '1,284',   delta: '+3.1%',  icon: <GroupsIcon />,      color: 'primary.main' },
  { label: 'API calls / day', value: '4.2M',  delta: '+18%',   icon: <CloudIcon />,       color: 'info.main' },
  { label: 'Conversion',    value: '3.6%',    delta: '-0.4%',  icon: <TrendingUpIcon />,  color: 'warning.main' },
];

const statusColor = (status) =>
  ({ Active: 'success', Invited: 'warning', Suspended: 'error' }[status] || 'default');

export default function OverviewView({ onOpenDialog }) {
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [sliderValue, setSliderValue] = useState(60);
  const [rating, setRating] = useState(4);
  const [activeStep, setActiveStep] = useState(1);

  const pagedRows = TABLE_ROWS.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

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
          <Typography variant="h4" fontWeight={700}>Overview</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your team, projects, and billing in one place.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Refresh data"><IconButton><RefreshIcon /></IconButton></Tooltip>
          <Tooltip title="Open save dialog">
            <Button variant="contained" startIcon={<AddIcon />} onClick={onOpenDialog}>
              New project
            </Button>
          </Tooltip>
        </Stack>
      </Stack>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {KPI.map((kpi) => (
          <Grid item xs={12} sm={6} md={3} key={kpi.label}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="caption" color="text.secondary">{kpi.label}</Typography>
                    <Typography variant="h5" fontWeight={700}>{kpi.value}</Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: kpi.delta.startsWith('-') ? 'error.main' : 'success.main' }}
                    >
                      {kpi.delta} vs last week
                    </Typography>
                  </Box>
                  <Box sx={{ color: kpi.color }}>{kpi.icon}</Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab label="Members" />
          <Tab label="Settings" />
          <Tab label="Onboarding" />
        </Tabs>

        {tab === 0 && (
          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">MRR</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagedRows.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>
                        <Chip label={row.status} size="small" color={statusColor(row.status)} />
                      </TableCell>
                      <TableCell align="right">${(row.mrr / 100).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack direction="row" justifyContent="flex-end" sx={{ p: 2 }}>
              <Pagination
                count={Math.ceil(TABLE_ROWS.length / ROWS_PER_PAGE)}
                page={page}
                onChange={(_, p) => setPage(p)}
                color="primary"
              />
            </Stack>
          </Box>
        )}

        {tab === 1 && (
          <Box sx={{ p: 4 }}>
            <Stack spacing={4} maxWidth={500}>
              <Box>
                <Typography gutterBottom>API rate limit ({sliderValue} req/sec)</Typography>
                <Slider
                  value={sliderValue}
                  onChange={(_, v) => setSliderValue(v)}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 0, label: '0' },
                    { value: 50, label: '50' },
                    { value: 100, label: '100' },
                  ]}
                />
              </Box>
              <Box>
                <Typography gutterBottom>How would you rate Stratus?</Typography>
                <Rating value={rating} onChange={(_, v) => setRating(v)} size="large" />
              </Box>
              <Box>
                <Typography gutterBottom>Storage usage (mocked)</Typography>
                <LinearProgress variant="determinate" value={sliderValue} />
              </Box>
            </Stack>
          </Box>
        )}

        {tab === 2 && (
          <Box sx={{ p: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {ONBOARDING_STEPS.map((label) => (
                <Step key={label}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>
            <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 4 }}>
              <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
                Back
              </Button>
              <Button
                variant="contained"
                disabled={activeStep === ONBOARDING_STEPS.length - 1}
                onClick={() => setActiveStep((s) => s + 1)}
              >
                Next
              </Button>
            </Stack>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton,
  useTheme,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from 'react';
import {
  ANALYTICS_DAYS,
  ANALYTICS_DAILY_USERS,
  ANALYTICS_DAILY_SESSIONS,
  ANALYTICS_API_CALLS,
  ANALYTICS_TRAFFIC_BY_REGION,
  ANALYTICS_MONTHS,
  ANALYTICS_REVENUE_2024,
  ANALYTICS_REVENUE_2025,
  ANALYTICS_SPARKLINES,
} from '../../mockData';

const SPARK_KPIS = [
  { label: 'New signups',     value: '1,284',   delta: '+12.4%', data: ANALYTICS_SPARKLINES.signups, color: 'primary.main' },
  { label: 'Revenue (mo)',    value: '$28.4k',  delta: '+8.7%',  data: ANALYTICS_SPARKLINES.revenue, color: 'success.main' },
  { label: 'Error rate',      value: '0.04%',   delta: '-0.01%', data: ANALYTICS_SPARKLINES.errors,  color: 'warning.main' },
  { label: 'p95 latency',     value: '108 ms',  delta: '-12 ms', data: ANALYTICS_SPARKLINES.latency, color: 'info.main' },
];

export default function AnalyticsView() {
  const theme = useTheme();
  const [range, setRange] = useState('30d');

  const chartColors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
    error: theme.palette.error.main,
  };

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
          <Typography variant="h4" fontWeight={700}>Analytics</Typography>
          <Typography variant="body2" color="text.secondary">
            Real-time product metrics powered by MUI X Charts.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <ToggleButtonGroup
            size="small"
            exclusive
            value={range}
            onChange={(_, v) => v && setRange(v)}
          >
            <ToggleButton value="7d">7d</ToggleButton>
            <ToggleButton value="30d">30d</ToggleButton>
            <ToggleButton value="90d">90d</ToggleButton>
            <ToggleButton value="1y">1y</ToggleButton>
          </ToggleButtonGroup>
          <Tooltip title="Refresh"><IconButton><RefreshIcon /></IconButton></Tooltip>
          <Button variant="contained" startIcon={<DownloadIcon />}>Export report</Button>
        </Stack>
      </Stack>

      {/* KPI sparkline row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {SPARK_KPIS.map((kpi) => (
          <Grid item xs={12} sm={6} md={3} key={kpi.label}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="caption" color="text.secondary">
                  {kpi.label}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5 }}>
                  <Box>
                    <Typography variant="h5" fontWeight={700}>{kpi.value}</Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: kpi.delta.startsWith('-') ? 'error.main' : 'success.main' }}
                    >
                      {kpi.delta} vs prev period
                    </Typography>
                  </Box>
                  <Box sx={{ width: 110, height: 48 }}>
                    <SparkLineChart
                      data={kpi.data}
                      curve="natural"
                      area
                      showHighlight
                      showTooltip
                      colors={[theme.palette[kpi.color.split('.')[0]].main]}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Daily users line chart + uptime gauge */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 2, height: 360 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  Daily active users
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Last 30 days · users vs sessions
                </Typography>
              </Box>
            </Stack>
            <Box sx={{ height: 290 }}>
              <LineChart
                xAxis={[{ data: ANALYTICS_DAYS, label: 'Day', tickMinStep: 5 }]}
                series={[
                  {
                    data: ANALYTICS_DAILY_USERS,
                    label: 'Users',
                    color: chartColors.primary,
                    area: true,
                    curve: 'monotoneX',
                    showMark: false,
                  },
                  {
                    data: ANALYTICS_DAILY_SESSIONS,
                    label: 'Sessions',
                    color: chartColors.info,
                    curve: 'monotoneX',
                    showMark: false,
                  },
                ]}
                margin={{ top: 16, right: 16, bottom: 40, left: 56 }}
                grid={{ horizontal: true }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 2, height: 360 }}>
            <Typography variant="subtitle1" fontWeight={700}>Uptime SLA</Typography>
            <Typography variant="caption" color="text.secondary">
              Rolling 30-day availability
            </Typography>
            <Box sx={{ height: 240, mt: 1 }}>
              <Gauge
                value={99.97}
                valueMin={99}
                valueMax={100}
                startAngle={-110}
                endAngle={110}
                text={({ value }) => `${value}%`}
                sx={{
                  [`& .${gaugeClasses.valueText}`]: { fontSize: 32, fontWeight: 700 },
                  [`& .${gaugeClasses.valueArc}`]: { fill: chartColors.success },
                  [`& .${gaugeClasses.referenceArc}`]: { fill: theme.palette.action.hover },
                }}
              />
            </Box>
            <Stack direction="row" justifyContent="space-around">
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Target</Typography>
                <Typography variant="body2" fontWeight={700}>99.95%</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Incidents</Typography>
                <Typography variant="body2" fontWeight={700}>0</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">MTTR</Typography>
                <Typography variant="body2" fontWeight={700}>4m</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Bar + pie row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={7}>
          <Paper variant="outlined" sx={{ p: 2, height: 360 }}>
            <Typography variant="subtitle1" fontWeight={700}>API calls by endpoint</Typography>
            <Typography variant="caption" color="text.secondary">
              Top 6 endpoints, last 24 hours
            </Typography>
            <Box sx={{ height: 290 }}>
              <BarChart
                xAxis={[{
                  scaleType: 'band',
                  data: ANALYTICS_API_CALLS.map((r) => r.endpoint),
                }]}
                series={[{
                  data: ANALYTICS_API_CALLS.map((r) => r.calls),
                  label: 'Calls',
                  color: chartColors.primary,
                }]}
                margin={{ top: 16, right: 16, bottom: 40, left: 56 }}
                borderRadius={6}
                grid={{ horizontal: true }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: 2, height: 360 }}>
            <Typography variant="subtitle1" fontWeight={700}>Traffic by region</Typography>
            <Typography variant="caption" color="text.secondary">
              Share of total sessions
            </Typography>
            <Box sx={{ height: 290 }}>
              <PieChart
                series={[{
                  data: ANALYTICS_TRAFFIC_BY_REGION,
                  innerRadius: 50,
                  outerRadius: 110,
                  paddingAngle: 2,
                  cornerRadius: 4,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 50, additionalRadius: -8, color: 'gray' },
                }]}
                colors={[
                  chartColors.primary,
                  chartColors.success,
                  chartColors.warning,
                  chartColors.info,
                  chartColors.secondary,
                ]}
                margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Revenue YoY */}
      <Paper variant="outlined" sx={{ p: 2, height: 360 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight={700}>Revenue trend (YoY)</Typography>
            <Typography variant="caption" color="text.secondary">
              MRR in $k · 2024 vs 2025
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ height: 290 }}>
          <LineChart
            xAxis={[{ scaleType: 'point', data: ANALYTICS_MONTHS }]}
            series={[
              {
                data: ANALYTICS_REVENUE_2024,
                label: '2024',
                color: chartColors.info,
                curve: 'monotoneX',
              },
              {
                data: ANALYTICS_REVENUE_2025,
                label: '2025',
                color: chartColors.primary,
                curve: 'monotoneX',
                area: true,
              },
            ]}
            margin={{ top: 16, right: 16, bottom: 40, left: 56 }}
            grid={{ horizontal: true }}
          />
        </Box>
      </Paper>
    </Box>
  );
}

import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  LinearProgress,
  Chip,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  IconButton,
  Tooltip,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';
import {
  BILLING_INVOICES,
  BILLING_USAGE,
  BILLING_MONTHLY_SPEND,
  ANALYTICS_MONTHS,
} from '../../mockData';

const invoiceColor = (s) =>
  ({ Paid: 'success', Refunded: 'warning', Failed: 'error' }[s] || 'default');

export default function BillingView() {
  const theme = useTheme();

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
          <Typography variant="h4" fontWeight={700}>Billing</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your plan, payment method, and invoice history.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined">Cancel plan</Button>
          <Button variant="contained" startIcon={<StarIcon />}>Upgrade</Button>
        </Stack>
      </Stack>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Plan card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', height: '100%' }}>
            <CardContent>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>Current plan</Typography>
              <Typography variant="h4" fontWeight={800}>Team</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                $49 / month · billed monthly
              </Typography>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 2 }} />
              <Stack spacing={1}>
                <Typography variant="body2">✓ Unlimited projects</Typography>
                <Typography variant="body2">✓ 1M API calls / mo</Typography>
                <Typography variant="body2">✓ SSO + audit logs</Typography>
                <Typography variant="body2">✓ 99.99% SLA</Typography>
              </Stack>
              <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.7 }}>
                Renews on June 1, 2026
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Usage card */}
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Usage this period
            </Typography>
            <Stack spacing={2.5} sx={{ mt: 2 }}>
              {BILLING_USAGE.map((u) => {
                const pct = (u.used / u.limit) * 100;
                const danger = pct >= 80;
                return (
                  <Box key={u.label}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={600}>{u.label}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {u.format(u.used)} / {u.format(u.limit)}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={pct}
                      color={danger ? 'warning' : 'primary'}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Payment method */}
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Payment method
            </Typography>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mt: 1,
              }}
            >
              <CreditCardIcon sx={{ fontSize: 36, color: 'primary.main' }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={700}>
                  Visa ending in 4242
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Expires 09 / 2028
                </Typography>
              </Box>
              <Chip label="Default" size="small" color="primary" />
            </Box>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button size="small" variant="outlined">Update card</Button>
              <Button size="small">Add backup</Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Monthly spend */}
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 1 }}>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>Monthly spend</Typography>
                <Typography variant="caption" color="text.secondary">
                  Last 12 invoiced months · USD
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                ${BILLING_MONTHLY_SPEND.reduce((a, b) => a + b, 0)}
              </Typography>
            </Stack>
            <Box sx={{ height: 220 }}>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ANALYTICS_MONTHS }]}
                series={[{
                  data: BILLING_MONTHLY_SPEND,
                  label: 'Spend',
                  color: theme.palette.primary.main,
                }]}
                margin={{ top: 16, right: 8, bottom: 30, left: 40 }}
                borderRadius={6}
                grid={{ horizontal: true }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Invoice history */}
      <Paper variant="outlined">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight={700}>Invoice history</Typography>
          <Tooltip title="Export all">
            <IconButton size="small"><DownloadIcon fontSize="small" /></IconButton>
          </Tooltip>
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {BILLING_INVOICES.map((inv) => (
                <TableRow key={inv.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{inv.id}</TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell>{inv.plan}</TableCell>
                  <TableCell>
                    <Chip size="small" label={inv.status} color={invoiceColor(inv.status)} />
                  </TableCell>
                  <TableCell align="right">${inv.amount.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="View invoice">
                      <IconButton size="small"><OpenInNewIcon fontSize="small" /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

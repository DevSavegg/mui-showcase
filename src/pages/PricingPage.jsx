import {
  Container,
  Stack,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  ButtonGroup,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  Tooltip,
  Avatar,
  AvatarGroup,
  Zoom,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useState } from 'react';
import { PRICING_TIERS, PRICING_COMPARISON, AVATAR_USERS } from '../mockData';

export default function PricingPage({ onSelectPlan }) {
  const [billing, setBilling] = useState('yearly');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const pagedRows = PRICING_COMPARISON.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ position: 'relative', pb: 10 }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 10 } }}>
        <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 5 }}>
          <Chip label="Simple, transparent pricing" color="primary" variant="outlined" />
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.25rem', md: '3.5rem' }, maxWidth: 800 }}
          >
            Pick the plan that fits{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              your team
            </Box>
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 640, fontWeight: 400 }}>
            14-day free trial on every paid plan. Cancel anytime, no questions asked.
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} sx={{ pt: 2 }}>
            <ToggleButtonGroup
              value={billing}
              exclusive
              onChange={(_, v) => v && setBilling(v)}
              size="small"
              color="primary"
            >
              <ToggleButton value="monthly" sx={{ px: 3 }}>
                Monthly
              </ToggleButton>
              <ToggleButton value="yearly" sx={{ px: 3 }}>
                Yearly
                <Chip
                  label="−20%"
                  size="small"
                  color="success"
                  sx={{ ml: 1, height: 20, fontSize: 11 }}
                />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>

        <Grid container spacing={3} alignItems="stretch">
          {PRICING_TIERS.map((tier, i) => {
            const price = billing === 'monthly' ? tier.monthly : tier.yearly;
            return (
              <Grid item xs={12} md={4} key={tier.id}>
                <Zoom in style={{ transitionDelay: `${i * 80}ms` }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: tier.featured ? 2 : 1,
                      borderColor: tier.featured ? 'primary.main' : 'divider',
                      transform: tier.featured ? 'scale(1.03)' : 'none',
                      position: 'relative',
                      overflow: 'visible',
                    }}
                    elevation={tier.featured ? 6 : 1}
                  >
                    {tier.featured && (
                      <Chip
                        label="Most popular"
                        color="primary"
                        size="small"
                        icon={<StarIcon />}
                        sx={{
                          position: 'absolute',
                          top: -12,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontWeight: 700,
                        }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Typography variant="overline" color="primary">
                        {tier.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {tier.description}
                      </Typography>
                      <Stack direction="row" alignItems="baseline" spacing={0.5} sx={{ mb: 0.5 }}>
                        <Typography variant="h2" sx={{ fontSize: '3.5rem' }}>
                          ${price}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          /{billing === 'monthly' ? 'mo' : 'mo, billed annually'}
                        </Typography>
                      </Stack>
                      <Divider sx={{ my: 3 }} />
                      <List dense disablePadding>
                        {tier.features.map((f) => (
                          <ListItem key={f} disableGutters disablePadding sx={{ mb: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 28 }}>
                              <CheckCircleIcon color="success" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={f} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                    <CardActions sx={{ p: 4, pt: 0 }}>
                      <Button
                        fullWidth
                        variant={tier.featured ? 'contained' : 'outlined'}
                        size="large"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => onSelectPlan?.(tier.id)}
                      >
                        {tier.cta}
                      </Button>
                    </CardActions>
                  </Card>
                </Zoom>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ pt: 10 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            textAlign: 'center',
            background: (t) =>
              t.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(124,156,255,0.08), rgba(244,114,182,0.05))'
                : 'linear-gradient(135deg, rgba(79,70,229,0.04), rgba(219,39,119,0.03))',
          }}
        >
          <Stack spacing={2} alignItems="center">
            <VerifiedUserIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h5">Loved by engineering teams</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 540 }}>
              Join Ada, Alan, Grace and thousands more shipping with Stratus every day.
            </Typography>
            <AvatarGroup max={5} sx={{ justifyContent: 'center', mt: 1 }}>
              {AVATAR_USERS.map((u) => (
                <Avatar key={u.name} sx={{ bgcolor: u.color }}>
                  {u.name[0]}
                </Avatar>
              ))}
            </AvatarGroup>
            <ButtonGroup variant="outlined" size="large" sx={{ mt: 1 }}>
              <Button>Talk to sales</Button>
              <Button>Read case studies</Button>
              <Button>Compare plans</Button>
            </ButtonGroup>
          </Stack>
        </Paper>
      </Container>

      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Stack spacing={1} alignItems="center" textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="overline" color="primary">
            Detailed comparison
          </Typography>
          <Typography variant="h3">All features at a glance</Typography>
        </Stack>

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Feature</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Starter</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">
                    <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                      Pro
                      <Chip label="Popular" size="small" color="primary" />
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Team</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagedRows.map((row) => (
                  <TableRow key={row.feature} hover>
                    <TableCell>
                      <Tooltip title={`Compare ${row.feature} across plans`} placement="right">
                        <span>{row.feature}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">{row.starter}</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {row.pro}
                    </TableCell>
                    <TableCell align="center">{row.team}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={PRICING_COMPARISON.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Paper>
      </Container>
    </Box>
  );
}

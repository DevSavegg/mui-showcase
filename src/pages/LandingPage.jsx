import {
  Container,
  Stack,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Fab,
  Avatar,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { FEATURE_CARDS, FAQ_ITEMS } from '../mockData';

export default function LandingPage({ onGetStarted }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        pb: 8,
        overflow: 'hidden',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: theme.palette.mode === 'dark' ? 0.35 : 0.5,
          pointerEvents: 'none',
          zIndex: 0,
        },
        '&::before': {
          width: 500,
          height: 500,
          top: -150,
          left: -150,
          background: `radial-gradient(circle, ${theme.palette.primary.main}, transparent 70%)`,
        },
        '&::after': {
          width: 400,
          height: 400,
          top: 100,
          right: -120,
          background: `radial-gradient(circle, ${theme.palette.secondary.main}, transparent 70%)`,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 14 }, pb: { xs: 6, md: 12 }, position: 'relative', zIndex: 1 }}>
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Chip
            label="✨ New: AI-powered insights are here"
            color="primary"
            variant="outlined"
            sx={{
              fontWeight: 500,
              backdropFilter: 'blur(8px)',
              bgcolor: (t) =>
                t.palette.mode === 'dark'
                  ? 'rgba(124,156,255,0.08)'
                  : 'rgba(255,255,255,0.6)',
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.75rem', md: '5rem' },
              maxWidth: 900,
              lineHeight: 1.05,
            }}
          >
            Ship product faster with{' '}
            <Box
              component="span"
              sx={{
                background: (t) =>
                  `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Stratus
            </Box>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 720, fontWeight: 400 }}
          >
            The all-in-one platform for engineering teams to monitor, deploy, and
            scale modern applications — without the complexity.
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ pt: 2 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={onGetStarted}
            >
              Start free trial
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<PlayCircleOutlineIcon />}
            >
              Watch demo
            </Button>
          </Stack>

          <Stack
            direction="row"
            spacing={-1}
            sx={{ pt: 4 }}
            alignItems="center"
          >
            {['A', 'B', 'C', 'D', 'E'].map((c, i) => (
              <Avatar
                key={c}
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][i],
                  border: `2px solid ${theme.palette.background.default}`,
                }}
              >
                {c}
              </Avatar>
            ))}
            <Typography variant="body2" color="text.secondary" sx={{ pl: 2 }}>
              Trusted by 12,000+ developers worldwide
            </Typography>
          </Stack>
        </Stack>
      </Container>

      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <Stack spacing={1} sx={{ mb: 5 }} alignItems="center" textAlign="center">
          <Typography variant="overline" color="primary">
            Why Stratus
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            Everything you need, nothing you don't
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {FEATURE_CARDS.map((feature) => (
            <Grid item xs={12} sm={6} md={3} key={feature.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 6,
                    borderColor: 'primary.main',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={feature.image}
                  alt={feature.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" component="h3">
                      {feature.title}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {feature.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button size="small" endIcon={<ArrowForwardIcon />}>
                    Learn more
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="md" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Stack spacing={1} sx={{ mb: 4 }} alignItems="center" textAlign="center">
          <Typography variant="overline" color="primary">
            FAQ
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            Frequently asked questions
          </Typography>
          <Divider flexItem sx={{ mt: 2, width: 60, borderBottomWidth: 3, borderColor: 'primary.main' }} />
        </Stack>

        {FAQ_ITEMS.map((item) => (
          <Accordion key={item.id} disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      <Fab
        color="primary"
        aria-label="chat"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
      >
        <ChatIcon />
      </Fab>
    </Box>
  );
}

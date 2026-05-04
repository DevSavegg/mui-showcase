import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShieldIcon from '@mui/icons-material/Shield';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { HELP_TOPICS, FAQ_ITEMS, AVATAR_USERS } from '../../mockData';

const TOPIC_ICONS = [
  <RocketLaunchIcon fontSize="large" />,
  <CodeIcon fontSize="large" />,
  <ReceiptLongIcon fontSize="large" />,
  <ShieldIcon fontSize="large" />,
];

export default function HelpView() {
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
          <Typography variant="h4" fontWeight={700}>Help & Support</Typography>
          <Typography variant="body2" color="text.secondary">
            Search our docs or reach the team directly.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<ChatBubbleOutlineIcon />}>
          Contact support
        </Button>
      </Stack>

      {/* Hero search */}
      <Paper
        sx={{
          p: { xs: 3, md: 5 },
          mb: 3,
          textAlign: 'center',
          background: (t) =>
            `linear-gradient(135deg, ${t.palette.primary.main} 0%, ${t.palette.primary.dark} 100%)`,
          color: 'primary.contrastText',
        }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          How can we help?
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.85, mb: 3 }}>
          Search 100+ articles, API references, and tutorials.
        </Typography>
        <TextField
          fullWidth
          placeholder="Search the docs…"
          sx={{
            maxWidth: 560,
            mx: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><SearchIcon /></InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Topic cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {HELP_TOPICS.map((topic, i) => (
          <Grid item xs={12} sm={6} md={3} key={topic.title}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardActionArea sx={{ height: '100%', alignItems: 'flex-start' }}>
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 1 }}>{TOPIC_ICONS[i]}</Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {topic.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {topic.body}
                  </Typography>
                  <Chip size="small" label={`${topic.count} articles`} />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        {/* FAQ */}
        <Grid item xs={12} md={8}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Frequently asked
            </Typography>
            <Box sx={{ mt: 1 }}>
              {FAQ_ITEMS.map((q) => (
                <Accordion key={q.id} disableGutters elevation={0} square>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body2" fontWeight={600}>
                      {q.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {q.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Contact card */}
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="subtitle1" fontWeight={700}>
              Still stuck?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Our team typically replies within an hour.
            </Typography>

            <Stack spacing={1.5}>
              <Button startIcon={<ChatBubbleOutlineIcon />} variant="contained" fullWidth>
                Start a live chat
              </Button>
              <Button startIcon={<EmailOutlinedIcon />} variant="outlined" fullWidth>
                Email us
              </Button>
            </Stack>

            <Box sx={{ mt: 3 }}>
              <Typography variant="caption" color="text.secondary">
                Online right now
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                <AvatarGroup max={4}>
                  {AVATAR_USERS.slice(0, 5).map((u) => (
                    <Avatar key={u.name} sx={{ bgcolor: u.color, width: 28, height: 28, fontSize: 12 }}>
                      {u.name[0]}
                    </Avatar>
                  ))}
                </AvatarGroup>
                <Typography variant="caption" color="text.secondary">
                  + 12 support agents
                </Typography>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

import {
  Container,
  Stack,
  Typography,
  Box,
  Grid,
  Paper,
  Autocomplete,
  TextField,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  AvatarGroup,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Backdrop,
  CircularProgress,
  Button,
  TextareaAutosize,
  Fade,
  Grow,
  Slide,
  Zoom,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import LayersIcon from '@mui/icons-material/Layers';
import { useState } from 'react';
import { COUNTRIES, AVATAR_USERS, GALLERY_ITEMS } from '../mockData';

function Section({ title, description, children }) {
  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Divider />
      </Stack>
      {children}
    </Paper>
  );
}

const TRANSITION_OPTIONS = [
  { value: 'fade', label: 'Fade' },
  { value: 'grow', label: 'Grow' },
  { value: 'slide', label: 'Slide' },
  { value: 'zoom', label: 'Zoom' },
];

export default function ComponentsPage() {
  const [transition, setTransition] = useState('fade');
  const [transitionKey, setTransitionKey] = useState(0);
  const [selectedCountries, setSelectedCountries] = useState(['Japan', 'Sweden']);
  const [view, setView] = useState('grid');
  const [textFormat, setTextFormat] = useState(['bold']);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [bio, setBio] = useState(
    'I build distributed systems and care a lot about good error messages.'
  );

  const renderTransition = () => {
    const content = (
      <Box
        sx={{
          width: '100%',
          height: 140,
          borderRadius: 2,
          background: (t) =>
            `linear-gradient(135deg, ${t.palette.primary.main}, ${t.palette.secondary.main})`,
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
          fontWeight: 700,
        }}
      >
        {transition.toUpperCase()} transition
      </Box>
    );

    if (transition === 'fade')
      return <Fade in key={transitionKey} timeout={500}>{content}</Fade>;
    if (transition === 'grow')
      return <Grow in key={transitionKey} timeout={500}>{content}</Grow>;
    if (transition === 'slide')
      return (
        <Slide direction="up" in key={transitionKey} timeout={500} mountOnEnter>
          {content}
        </Slide>
      );
    if (transition === 'zoom')
      return <Zoom in key={transitionKey} timeout={500}>{content}</Zoom>;
    return content;
  };

  return (
    <Box sx={{ position: 'relative', pb: 10 }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 8 } }}>
        <Stack spacing={1} sx={{ mb: 5 }} alignItems="center" textAlign="center">
          <Chip label="Component playground" color="primary" variant="outlined" />
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            Live MUI showcase
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 640, fontWeight: 400 }}>
            A grab-bag of components that didn't fit elsewhere — every one of these
            is a real, interactive MUI primitive.
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Section
              title="Autocomplete"
              description="Multi-select with chips, free-typing filter, and keyboard navigation built in."
            >
              <Autocomplete
                multiple
                options={COUNTRIES}
                value={selectedCountries}
                onChange={(_, v) => setSelectedCountries(v)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      key={option}
                      color="primary"
                      variant="outlined"
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Supported countries" placeholder="Add country" />
                )}
              />
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section
              title="ToggleButtonGroup"
              description="Single-select for view, multi-select for text formatting."
            >
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">View mode</Typography>
                  <Box>
                    <ToggleButtonGroup
                      value={view}
                      exclusive
                      onChange={(_, v) => v && setView(v)}
                      size="small"
                    >
                      <ToggleButton value="grid">Grid</ToggleButton>
                      <ToggleButton value="list">List</ToggleButton>
                      <ToggleButton value="kanban">Kanban</ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Text format</Typography>
                  <Box>
                    <ToggleButtonGroup
                      value={textFormat}
                      onChange={(_, v) => setTextFormat(v)}
                      size="small"
                    >
                      <ToggleButton value="bold"><b>B</b></ToggleButton>
                      <ToggleButton value="italic"><i>I</i></ToggleButton>
                      <ToggleButton value="underline"><u>U</u></ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </Box>
              </Stack>
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section
              title="AvatarGroup"
              description="Stacks avatars and rolls extras into a +N badge — useful for collaborator lists."
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <AvatarGroup max={4}>
                  {AVATAR_USERS.map((u) => (
                    <Avatar key={u.name} sx={{ bgcolor: u.color }}>
                      {u.name[0]}
                    </Avatar>
                  ))}
                </AvatarGroup>
                <Typography variant="body2" color="text.secondary">
                  {AVATAR_USERS.length} collaborators on this project
                </Typography>
              </Stack>
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section
              title="Transitions"
              description="Fade, Grow, Slide, Zoom — built-in animation primitives that wrap any element."
            >
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                  <ToggleButtonGroup
                    value={transition}
                    exclusive
                    onChange={(_, v) => {
                      if (!v) return;
                      setTransition(v);
                      setTransitionKey((k) => k + 1);
                    }}
                    size="small"
                  >
                    {TRANSITION_OPTIONS.map((t) => (
                      <ToggleButton key={t.value} value={t.value}>
                        {t.label}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                  <Button size="small" onClick={() => setTransitionKey((k) => k + 1)}>
                    Replay
                  </Button>
                </Stack>
                <Box sx={{ minHeight: 140 }}>{renderTransition()}</Box>
              </Stack>
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section
              title="TextareaAutosize"
              description="Native textarea that grows with its content — no JS measurement needed in app code."
            >
              <TextareaAutosize
                minRows={3}
                maxRows={8}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={{
                  width: '100%',
                  fontFamily: 'inherit',
                  fontSize: 14,
                  padding: 12,
                  borderRadius: 10,
                  resize: 'none',
                  outline: 'none',
                  border: '1px solid rgba(0,0,0,0.15)',
                  background: 'transparent',
                  color: 'inherit',
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {bio.length} characters
              </Typography>
            </Section>
          </Grid>

          <Grid item xs={12} md={6}>
            <Section
              title="Backdrop"
              description="Full-screen overlay for blocking interactions during a heavy load. Click anywhere to dismiss."
            >
              <Stack spacing={2} alignItems="flex-start">
                <Typography variant="body2" color="text.secondary">
                  Useful for full-page operations like CSV imports or model training jobs.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<LayersIcon />}
                  onClick={() => setBackdropOpen(true)}
                >
                  Show backdrop
                </Button>
              </Stack>
            </Section>
          </Grid>

          <Grid item xs={12}>
            <Section
              title="ImageList"
              description="Quilted layout with variable column-spans — use for media galleries or asset libraries."
            >
              <ImageList variant="quilted" cols={3} rowHeight={160} gap={8}>
                {GALLERY_ITEMS.map((item) => (
                  <ImageListItem key={item.img} cols={item.cols} rows={1}>
                    <img
                      src={`${item.img}&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                      style={{ borderRadius: 8 }}
                    />
                    <ImageListItemBar
                      title={item.title}
                      sx={{ borderRadius: '0 0 8px 8px' }}
                      actionIcon={
                        <IconButton sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Section>
          </Grid>

          <Grid item xs={12}>
            <Card
              sx={{
                background: (t) =>
                  `linear-gradient(135deg, ${alpha(t.palette.primary.main, 0.1)}, ${alpha(
                    t.palette.secondary.main,
                    0.08
                  )})`,
                border: 'none',
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <InfoIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      Look bottom-right
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      The SpeedDial is a Fab that fans out into multiple actions on hover —
                      try it.
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Backdrop
        open={backdropOpen}
        onClick={() => setBackdropOpen(false)}
        sx={{
          color: '#fff',
          zIndex: (t) => t.zIndex.drawer + 1,
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress color="inherit" />
        <Typography>Click anywhere to dismiss</Typography>
      </Backdrop>

      <SpeedDial
        ariaLabel="Quick actions"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction icon={<FileCopyIcon />} tooltipTitle="Copy" />
        <SpeedDialAction icon={<SaveIcon />} tooltipTitle="Save" />
        <SpeedDialAction icon={<PrintIcon />} tooltipTitle="Print" />
        <SpeedDialAction icon={<ShareIcon />} tooltipTitle="Share" />
      </SpeedDial>
    </Box>
  );
}

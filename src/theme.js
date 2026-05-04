import { createTheme, alpha } from '@mui/material/styles';

export const buildTheme = (mode) => {
  const isDark = mode === 'dark';

  const primary = isDark ? '#7c9cff' : '#4f46e5';
  const secondary = isDark ? '#f472b6' : '#db2777';
  const bgDefault = isDark ? '#0b0d12' : '#f7f8fb';
  const bgPaper = isDark ? '#12151c' : '#ffffff';

  return createTheme({
    palette: {
      mode,
      primary: { main: primary },
      secondary: { main: secondary },
      background: { default: bgDefault, paper: bgPaper },
      divider: isDark ? alpha('#fff', 0.08) : alpha('#000', 0.06),
    },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 },
      h2: { fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1 },
      h3: { fontWeight: 700, letterSpacing: '-0.02em' },
      h4: { fontWeight: 700, letterSpacing: '-0.015em' },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      subtitle1: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
      overline: { letterSpacing: '0.12em', fontWeight: 700 },
    },
    shadows: [
      'none',
      isDark
        ? '0 1px 2px rgba(0,0,0,0.4)'
        : '0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06)',
      isDark
        ? '0 2px 6px rgba(0,0,0,0.5)'
        : '0 2px 4px rgba(15,23,42,0.05), 0 4px 8px rgba(15,23,42,0.05)',
      isDark
        ? '0 4px 12px rgba(0,0,0,0.55)'
        : '0 4px 12px rgba(15,23,42,0.07)',
      isDark
        ? '0 6px 20px rgba(0,0,0,0.6)'
        : '0 6px 16px rgba(15,23,42,0.08)',
      isDark
        ? '0 8px 28px rgba(0,0,0,0.6)'
        : '0 8px 24px rgba(15,23,42,0.09)',
      isDark
        ? '0 12px 36px rgba(0,0,0,0.65)'
        : '0 12px 32px rgba(15,23,42,0.10)',
      ...Array(18).fill(
        isDark
          ? '0 16px 48px rgba(0,0,0,0.7)'
          : '0 16px 48px rgba(15,23,42,0.12)'
      ),
    ],
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: isDark
              ? alpha('#0b0d12', 0.7)
              : alpha('#ffffff', 0.75),
            backdropFilter: 'blur(12px) saturate(160%)',
            WebkitBackdropFilter: 'blur(12px) saturate(160%)',
            borderBottom: `1px solid ${
              isDark ? alpha('#fff', 0.08) : alpha('#000', 0.06)
            }`,
          },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 1 },
        styleOverrides: {
          root: {
            border: `1px solid ${
              isDark ? alpha('#fff', 0.06) : alpha('#000', 0.05)
            }`,
            backgroundImage: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 10, paddingInline: 16 },
          containedPrimary: {
            background: `linear-gradient(135deg, ${primary} 0%, ${alpha(
              primary,
              0.85
            )} 100%)`,
            boxShadow: `0 4px 14px ${alpha(primary, 0.4)}`,
            '&:hover': {
              boxShadow: `0 6px 20px ${alpha(primary, 0.5)}`,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500 },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600, minHeight: 48 },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 12,
            backgroundColor: isDark ? '#1f2330' : '#1f2937',
            padding: '6px 10px',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            marginInline: 8,
            '&.Mui-selected': {
              backgroundColor: alpha(primary, isDark ? 0.18 : 0.1),
              color: primary,
              '& .MuiListItemIcon-root': { color: primary },
              '&:hover': {
                backgroundColor: alpha(primary, isDark ? 0.24 : 0.14),
              },
            },
          },
        },
      },
    },
  });
};

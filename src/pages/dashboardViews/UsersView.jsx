import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  Paper,
  Tooltip,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import { useMemo, useState } from 'react';
import { TABLE_ROWS, AVATAR_USERS } from '../../mockData';

const ROLE_FILTERS = ['All', 'Owner', 'Admin', 'Editor', 'Viewer'];

const statusColor = (s) =>
  ({ Active: 'success', Invited: 'warning', Suspended: 'error' }[s] || 'default');

const initials = (name) =>
  name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

const colorFor = (name) => {
  const m = AVATAR_USERS.find((u) => u.name === name);
  return m?.color ?? '#64748b';
};

export default function UsersView() {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const rows = useMemo(() => {
    return TABLE_ROWS.filter((r) => {
      const matchesQuery =
        !query ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.email.toLowerCase().includes(query.toLowerCase());
      const matchesRole = roleFilter === 'All' || r.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [query, roleFilter]);

  const columns = [
    {
      field: 'name',
      headerName: 'Member',
      flex: 1.4,
      minWidth: 220,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ bgcolor: colorFor(params.value), width: 32, height: 32, fontSize: 13 }}>
            {initials(params.value)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
              fontWeight={600}
              component="div"
              noWrap
              sx={{ lineHeight: 1.3 }}
            >
              {params.value}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
              noWrap
              sx={{ lineHeight: 1.3 }}
            >
              {params.row.email}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    { field: 'role', headerName: 'Role', flex: 0.6, minWidth: 110 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.6,
      minWidth: 120,
      renderCell: (p) => <Chip size="small" label={p.value} color={statusColor(p.value)} />,
    },
    {
      field: 'mrr',
      headerName: 'MRR',
      flex: 0.5,
      minWidth: 100,
      align: 'right',
      headerAlign: 'right',
      valueFormatter: (v) => `$${(v / 100).toFixed(2)}`,
    },
  ];

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
          <Typography variant="h4" fontWeight={700}>Users</Typography>
          <Typography variant="body2" color="text.secondary">
            {TABLE_ROWS.length} members across your workspace.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Export CSV"><IconButton><DownloadIcon /></IconButton></Tooltip>
          <Button variant="contained" startIcon={<PersonAddIcon />}>
            Invite teammate
          </Button>
        </Stack>
      </Stack>

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
          <TextField
            placeholder="Search by name or email"
            size="small"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: { md: 380 } }}
          />
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <FilterListIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            {ROLE_FILTERS.map((r) => (
              <Chip
                key={r}
                label={r}
                size="small"
                color={roleFilter === r ? 'primary' : 'default'}
                variant={roleFilter === r ? 'filled' : 'outlined'}
                onClick={() => setRoleFilter(r)}
              />
            ))}
          </Stack>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ height: 480 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(r) => r.id}
          rowHeight={64}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}

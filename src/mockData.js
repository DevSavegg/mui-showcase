import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import HelpIcon from '@mui/icons-material/Help';
import BoltIcon from '@mui/icons-material/Bolt';
import ShieldIcon from '@mui/icons-material/Shield';
import InsightsIcon from '@mui/icons-material/Insights';
import HubIcon from '@mui/icons-material/Hub';
import React from 'react';

export const FEATURE_CARDS = [
  {
    id: 1,
    title: 'Lightning Fast',
    description:
      'Sub-100ms p99 response times powered by a globally distributed edge network and aggressive caching.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    tags: ['Performance', 'Edge'],
    icon: React.createElement(BoltIcon),
  },
  {
    id: 2,
    title: 'Enterprise Security',
    description:
      'SOC 2 Type II, HIPAA, and ISO 27001 certified. End-to-end encryption with customer-managed keys.',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    tags: ['Security', 'Compliance'],
    icon: React.createElement(ShieldIcon),
  },
  {
    id: 3,
    title: 'Deep Insights',
    description:
      'Real-time dashboards, custom event tracking, and anomaly detection — all out of the box.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    tags: ['Analytics', 'AI'],
    icon: React.createElement(InsightsIcon),
  },
  {
    id: 4,
    title: 'Seamless Integrations',
    description:
      '120+ first-party integrations and a fully typed SDK. Webhooks, REST, and GraphQL endpoints.',
    image:
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80',
    tags: ['Developer', 'API'],
    icon: React.createElement(HubIcon),
  },
];

export const FAQ_ITEMS = [
  {
    id: 'q1',
    question: 'How does the free trial work?',
    answer:
      'You get 14 days of full Pro access with no credit card required. After the trial you can pick any plan or stay on the free tier.',
  },
  {
    id: 'q2',
    question: 'Can I bring my own database?',
    answer:
      'Yes — we support Postgres, MySQL, and MongoDB connection strings. Self-hosted instances work via our secure tunnel.',
  },
  {
    id: 'q3',
    question: 'What does support look like?',
    answer:
      'All paid plans include 24/7 chat support with a 1-hour response SLA. Enterprise plans include a dedicated solutions architect.',
  },
  {
    id: 'q4',
    question: 'Is there a self-hosted option?',
    answer:
      'Yes. Self-hosted is available on the Enterprise plan with a Helm chart, Terraform module, and air-gapped install support.',
  },
];

export const ROLES = [
  { value: 'engineer', label: 'Software Engineer' },
  { value: 'designer', label: 'Product Designer' },
  { value: 'pm', label: 'Product Manager' },
  { value: 'data', label: 'Data Scientist' },
  { value: 'other', label: 'Other' },
];

export const SUBSCRIPTION_TIERS = [
  { value: 'free', label: 'Free — 1 project' },
  { value: 'pro', label: 'Pro — $19/mo' },
  { value: 'team', label: 'Team — $49/mo' },
];

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: React.createElement(DashboardIcon) },
  { id: 'users', label: 'Users', icon: React.createElement(PeopleIcon) },
  { id: 'analytics', label: 'Analytics', icon: React.createElement(BarChartIcon) },
  { id: 'billing', label: 'Billing', icon: React.createElement(ReceiptIcon) },
  { id: 'settings', label: 'Settings', icon: React.createElement(SettingsIcon) },
  { id: 'help', label: 'Help', icon: React.createElement(HelpIcon) },
];

export const TABLE_ROWS = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@analytical.io', role: 'Owner', status: 'Active', mrr: 4900 },
  { id: 2, name: 'Alan Turing', email: 'alan@bletchley.uk', role: 'Admin', status: 'Active', mrr: 1900 },
  { id: 3, name: 'Grace Hopper', email: 'grace@cobol.dev', role: 'Editor', status: 'Invited', mrr: 0 },
  { id: 4, name: 'Linus Torvalds', email: 'linus@kernel.org', role: 'Admin', status: 'Active', mrr: 1900 },
  { id: 5, name: 'Margaret Hamilton', email: 'margaret@apollo.nasa', role: 'Editor', status: 'Active', mrr: 1900 },
  { id: 6, name: 'Dennis Ritchie', email: 'dmr@bell-labs.com', role: 'Viewer', status: 'Suspended', mrr: 0 },
  { id: 7, name: 'Barbara Liskov', email: 'barbara@mit.edu', role: 'Admin', status: 'Active', mrr: 4900 },
  { id: 8, name: 'Donald Knuth', email: 'don@stanford.edu', role: 'Owner', status: 'Active', mrr: 4900 },
];

export const ONBOARDING_STEPS = [
  'Create your workspace',
  'Invite your team',
  'Connect a data source',
  'Ship your first dashboard',
];

export const SEARCH_ITEMS = [
  { label: 'Overview', group: 'Pages' },
  { label: 'Pricing', group: 'Pages' },
  { label: 'Components', group: 'Pages' },
  { label: 'Dashboard', group: 'Pages' },
  { label: 'Sign in', group: 'Pages' },
  { label: 'Invite a teammate', group: 'Actions' },
  { label: 'Create new project', group: 'Actions' },
  { label: 'Generate API key', group: 'Actions' },
  { label: 'Export billing report', group: 'Actions' },
  { label: 'Ada Lovelace', group: 'People' },
  { label: 'Alan Turing', group: 'People' },
  { label: 'Grace Hopper', group: 'People' },
  { label: 'Linus Torvalds', group: 'People' },
];

export const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Deployment succeeded',
    body: 'stratus-prod-3 was deployed to production',
    time: '2m ago',
    color: 'success.main',
    initials: 'D',
    unread: true,
  },
  {
    id: 2,
    title: 'New teammate joined',
    body: 'Grace Hopper accepted your invite',
    time: '1h ago',
    color: 'primary.main',
    initials: 'G',
    unread: true,
  },
  {
    id: 3,
    title: 'Usage threshold reached',
    body: "You've used 80% of your monthly API quota",
    time: '4h ago',
    color: 'warning.main',
    initials: '!',
    unread: true,
  },
  {
    id: 4,
    title: 'Invoice paid',
    body: 'Pro plan — $19.00 charged to •••• 4242',
    time: 'Yesterday',
    color: 'text.secondary',
    initials: '$',
    unread: false,
  },
];

export const NAV_LINKS = [
  { id: 'landing', label: 'Home' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'components', label: 'Components' },
  { id: 'dashboard', label: 'Dashboard', requiresAuth: true },
];

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

export const PRICING_TIERS = [
  {
    id: 'free',
    name: 'Starter',
    monthly: 0,
    yearly: 0,
    description: 'For individuals getting started',
    features: ['1 project', '1k API calls / mo', 'Community support', 'Basic analytics'],
    cta: 'Get started free',
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 19,
    yearly: 15,
    description: 'For small teams shipping fast',
    features: [
      'Unlimited projects',
      '1M API calls / mo',
      '24/7 chat support',
      'Advanced analytics',
      'Custom domains',
    ],
    cta: 'Start Pro trial',
    featured: true,
  },
  {
    id: 'team',
    name: 'Team',
    monthly: 49,
    yearly: 39,
    description: 'For growing engineering teams',
    features: [
      'Everything in Pro',
      'SSO + SAML',
      'Audit logs',
      'Dedicated CSM',
      '99.99% SLA',
    ],
    cta: 'Talk to sales',
    featured: false,
  },
];

export const PRICING_COMPARISON = [
  { feature: 'Projects', starter: '1', pro: 'Unlimited', team: 'Unlimited' },
  { feature: 'API calls / month', starter: '1,000', pro: '1,000,000', team: '10,000,000' },
  { feature: 'Team members', starter: '1', pro: '5', team: 'Unlimited' },
  { feature: 'Custom domains', starter: '—', pro: '✓', team: '✓' },
  { feature: 'SSO / SAML', starter: '—', pro: '—', team: '✓' },
  { feature: 'Audit logs', starter: '—', pro: '—', team: '✓' },
  { feature: 'SLA', starter: '—', pro: '99.9%', team: '99.99%' },
  { feature: '24/7 support', starter: '—', pro: '✓', team: '✓ + CSM' },
  { feature: 'Storage', starter: '1 GB', pro: '50 GB', team: '500 GB' },
  { feature: 'Webhooks', starter: '5', pro: 'Unlimited', team: 'Unlimited' },
];

export const GALLERY_ITEMS = [
  { img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80', title: 'Workstation', cols: 2 },
  { img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80', title: 'Network rack', cols: 1 },
  { img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80', title: 'Code editor', cols: 1 },
  { img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80', title: 'Circuit board', cols: 1 },
  { img: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400&q=80', title: 'Tablet sketches', cols: 1 },
  { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80', title: 'Analytics chart', cols: 2 },
];

export const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Japan',
  'Canada', 'Australia', 'Netherlands', 'Sweden', 'Singapore',
  'Brazil', 'India', 'South Korea', 'Spain', 'Italy',
];

export const AVATAR_USERS = [
  { name: 'Ada Lovelace', color: '#ef4444' },
  { name: 'Alan Turing', color: '#f59e0b' },
  { name: 'Grace Hopper', color: '#10b981' },
  { name: 'Linus Torvalds', color: '#3b82f6' },
  { name: 'Margaret Hamilton', color: '#8b5cf6' },
  { name: 'Dennis Ritchie', color: '#ec4899' },
  { name: 'Barbara Liskov', color: '#14b8a6' },
];

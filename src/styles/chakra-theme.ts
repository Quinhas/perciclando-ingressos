import { extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  colors: {
    white: '#FFF',
    black: '#000',

    primary: {
      50: '#E7F0FF',
      100: '#C5D1EF',
      200: '#A0B2DE',
      300: '#7C93D0',
      400: '#5775C1',
      500: '#3E5BA8',
      600: '#2F4783',
      700: '#21335F',
      800: '#111E3B',
      900: '#040A1A',
    },

    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },

    green: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },

    red: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },

    yellow: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      950: '##422006',
    },

    gray: {
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#E4E4E7',
      300: '#D4D4D8',
      400: '#A1A1AA',
      500: '#71717A',
      600: '#52525B',
      700: '#3F3F46',
      800: '#27272A',
      900: '#18181B',
      950: '#09090b',
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      'body': {
        bgColor: mode('gray.100', 'gray.800')(props),
        transitionProperty: 'all',
        transitionDuration: 'normal',
      },
      '#__next': {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
      },
    }),
  },
  config: {
    disableTransitionOnChange: false,
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
});

export default theme;
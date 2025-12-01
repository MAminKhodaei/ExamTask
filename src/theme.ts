import { createTheme } from '@mui/material/styles';

/**
 * Blue Bank Theme Configuration
 * 
 * This theme is carefully crafted to match the reference design exactly.
 * Key considerations:
 * - RTL (Right-to-Left) support for Persian text
 * - Mobile-first approach with precise color palette
 * - Custom typography for Persian font rendering
 */
const theme = createTheme({
  // RTL direction for Persian language support
  direction: 'rtl',
  
  palette: {
    // Deep Navy - Primary color for header and dark elements
    primary: {
      main: '#1a2847',
      dark: '#0f1829',
      light: '#2d3f5f',
      contrastText: '#ffffff',
    },
    
    // Yellow - Accent color for CTAs and highlights
    secondary: {
      main: '#d4a843',
      dark: '#b8923a',
      light: '#ddb85f',
      contrastText: '#1a2847',
    },
    
    // Background colors
    background: {
      default: '#e8e8e8', // Neutral gray for desktop background
      paper: '#f5f5f5',   // Off-white for transaction sheet
    },
    
    // Text colors
    text: {
      primary: '#1a2847',
      secondary: '#6b7280',
    },
  },
  
  typography: {
    // Persian font family - Vazirmatn is a modern Persian font
    fontFamily: [
      'Vazirmatn',
      'Tahoma',
      'Arial',
      'sans-serif',
    ].join(','),
    
    // Heading styles
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    
    // Body text
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
  },
  
  // Component-specific overrides
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap');
        
        /* Ensure smooth scrolling for pull-up sheet */
        html {
          scroll-behavior: smooth;
        }
        
        /* Remove default margins and set background */
        body {
          margin: 0;
          padding: 0;
          background-color: #e8e8e8;
        }
        
        /* Prevent horizontal scroll on mobile */
        body, html {
          overflow-x: hidden;
        }
      `,
    },
    
    // Button overrides for consistent styling
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Preserve Persian text casing
          fontWeight: 500,
        },
      },
    },
    
    // Icon button overrides
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
  
  // Spacing unit (8px base)
  spacing: 8,
});

export default theme;

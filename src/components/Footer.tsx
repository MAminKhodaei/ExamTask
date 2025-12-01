import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import {
    Home,
    CreditCard,
    Apps,
    SyncAlt,
    Person,
} from '@mui/icons-material';
import type { NavItem } from '../data/mockData';

/**
 * Footer Component Props
 */
interface FooterProps {
    items: NavItem[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

/**
 * Get icon component based on icon name
 */
const getNavIcon = (iconName: string, isActive: boolean) => {
    const iconProps = {
        sx: {
            fontSize: 28,
            color: isActive ? '#d4a843' : '#6b7280',
        },
    };

    const iconMap: Record<string, React.ReactElement> = {
        home: <Home {...iconProps} />,
        credit_card: <CreditCard {...iconProps} />,
        apps: <Apps {...iconProps} />,
        sync_alt: <SyncAlt {...iconProps} />,
        person: <Person {...iconProps} />,
    };

    return iconMap[iconName] || <Home {...iconProps} />;
};

/**
 * Footer Component
 * 
 * Fixed bottom navigation bar with 5 items.
 * 
 * Features:
 * - Fixed positioning at bottom of viewport
 * - Active state highlighting (yellow color)
 * - Tab switching functionality
 * - Responsive icon sizing
 * 
 * Design Notes:
 * - Background: white with subtle shadow
 * - Active color: Yellow (#d4a843) to match theme
 * - Inactive color: Gray (#6b7280)
 * - Icons are evenly spaced using flexbox
 */
const Footer: React.FC<FooterProps> = ({ items, activeTab, onTabChange }) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100%',
                maxWidth: 430, // Match app container max-width
                backgroundColor: 'white',
                borderTop: '1px solid #e5e7eb',
                boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)',
                zIndex: 1000,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingY: 1.5,
                    paddingX: 2,
                }}
            >
                {items.map((item) => {
                    const isActive = item.id === activeTab;

                    return (
                        <Box
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 0.5,
                                cursor: 'pointer',
                                minWidth: 60,
                                // Smooth transition for color changes
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                    opacity: 0.8,
                                },
                            }}
                        >
                            {/* Icon */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {getNavIcon(item.icon, isActive)}
                            </Box>

                            {/* Label */}
                            <Typography
                                variant="caption"
                                sx={{
                                    fontSize: '0.7rem',
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? '#d4a843' : '#6b7280',
                                    transition: 'all 0.2s ease-in-out',
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Footer;

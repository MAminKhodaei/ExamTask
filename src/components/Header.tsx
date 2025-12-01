import React from 'react';
import { Box, IconButton, Typography, Stack } from '@mui/material';
import {
    HelpOutline,
    NotificationsOutlined,
    AccountCircleOutlined,
    SearchOutlined,
    Visibility,
    VisibilityOff,
    Add,
    BarChart,
} from '@mui/icons-material';
import { formatToPersianNumber } from '../data/mockData';

/**
 * Header Component Props
 */
interface HeaderProps {
    balance: number;
    balanceVisible: boolean;
    onToggleBalance: () => void;
    onTopUp: () => void;
    onReport: () => void;
}

/**
 * Header Component
 * 
 * Renders the top section of the app including:
 * - Top navigation bar with action icons
 * - Balance display with visibility toggle
 * - Two circular action buttons (Top-up and Report)
 * 
 * Critical Implementation Notes:
 * - Action buttons MUST be perfectly circular (width === height, borderRadius: '50%')
 * - No rectangular borders or margin artifacts allowed
 * - Background gradient matches reference design
 */
const Header: React.FC<HeaderProps> = ({
    balance,
    balanceVisible,
    onToggleBalance,
    onTopUp,
    onReport,
}) => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(180deg, #1a2847 0%, #243a5e 100%)',
                color: 'white',
                paddingTop: 2,
                paddingBottom: 6,
                position: 'relative',
                borderRadius: 0,
            }}
        >
            {/* Top Navigation Bar */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingX: 2,
                    marginBottom: 3,
                }}
            >
                {/* Left side icons */}
                <Stack direction="row" spacing={1}>
                    <IconButton size="small" sx={{ color: 'white' }}>
                        <HelpOutline />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'white' }}>
                        <NotificationsOutlined />
                    </IconButton>
                </Stack>

                {/* Center title */}
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    خانه
                </Typography>

                {/* Right side icons */}
                <Stack direction="row" spacing={1}>
                    <IconButton size="small" sx={{ color: 'white' }}>
                        <AccountCircleOutlined />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'white' }}>
                        <SearchOutlined />
                    </IconButton>
                </Stack>
            </Box>

            {/* Balance Section */}
            <Box
                sx={{
                    textAlign: 'center',
                    marginBottom: 4,
                }}
            >
                {/* Balance Amount */}
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        marginBottom: 1,
                        letterSpacing: '0.05em',
                    }}
                >
                    {balanceVisible ? formatToPersianNumber(balance) : '••••••••'}
                    <Typography
                        component="span"
                        sx={{
                            fontSize: '1rem',
                            marginRight: 1,
                            fontWeight: 400,
                        }}
                    >
                        ریال
                    </Typography>
                </Typography>

                {/* Balance Visibility Toggle */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0.5,
                        cursor: 'pointer',
                    }}
                    onClick={onToggleBalance}
                >
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        موجودی
                    </Typography>
                    <IconButton
                        size="small"
                        sx={{
                            color: 'white',
                            padding: 0.5,
                        }}
                    >
                        {balanceVisible ? (
                            <Visibility sx={{ fontSize: '1rem' }} />
                        ) : (
                            <VisibilityOff sx={{ fontSize: '1rem' }} />
                        )}
                    </IconButton>
                </Box>
            </Box>

            {/* Action Buttons - CRITICAL SECTION */}
            {/* 
        These buttons MUST be perfectly circular.
        Key requirements:
        1. Equal width and height
        2. borderRadius: '50%' for perfect circle
        3. minWidth override to prevent Material UI defaults
        4. No margin artifacts or rectangular borders
      */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingX: 4,
                    gap: 4,
                }}
            >
                {/* Report Button - Dark Circle with Chart Icon */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <IconButton
                        onClick={onReport}
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%', // Perfect circle
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            minWidth: 64, // Override Material UI default minWidth
                            padding: 0, // Remove default padding
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                            },
                            // Ensure no rectangular artifacts
                            border: 'none',
                            outline: 'none',
                        }}
                    >
                        <BarChart sx={{ fontSize: 28, color: 'white' }} />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        گزارش مالی
                    </Typography>
                </Box>

                {/* Top-up Button - Yellow Circle with Plus Icon */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <IconButton
                        onClick={onTopUp}
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: '50%', // Perfect circle
                            backgroundColor: '#d4a843',
                            minWidth: 64, // Override Material UI default minWidth
                            padding: 0, // Remove default padding
                            '&:hover': {
                                backgroundColor: '#ddb85f',
                            },
                            // Ensure no rectangular artifacts
                            border: 'none',
                            outline: 'none',
                        }}
                    >
                        <Add sx={{ fontSize: 32, color: '#1a2847' }} />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        شارژ حساب
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
    ShoppingCart,
    Public,
    Receipt,
} from '@mui/icons-material';
import type { Transaction } from '../data/mockData';
import { formatAmount } from '../data/mockData';

/**
 * TransactionSheet Component Props
 */
interface TransactionSheetProps {
    transactions: Transaction[];
}

/**
 * Get icon component based on transaction type
 */
const getTransactionIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactElement> = {
        shopping_cart: <ShoppingCart />,
        public: <Public />,
        receipt: <Receipt />,
    };

    return iconMap[iconName] || <Receipt />;
};

/**
 * TransactionSheet Component
 * 
 * Implements the "pull-up" bottom sheet behavior with transaction list.
 * 
 * Critical Implementation:
 * - Appears as a white "tab" sitting at the bottom of the header
 * - Slides up smoothly when user scrolls
 * - Eventually covers the entire screen on scroll
 * - Uses transform and position for smooth animations
 * 
 * Technical Approach:
 * - Position: relative with negative margin to overlap header
 * - Border radius on top corners for "sheet" appearance
 * - Scroll listener to track scroll position
 * - Transform: translateY() for smooth sliding effect
 */
const TransactionSheet: React.FC<TransactionSheetProps> = ({ transactions }) => {
    const [scrollY, setScrollY] = useState(0);

    /**
     * Track scroll position for pull-up effect
     * The sheet will slide up as the user scrolls down
     */
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /**
     * Calculate transform based on scroll position
     * - At scroll 0: sheet is at initial position
     * - As scroll increases: sheet slides up (negative translateY)
     * - Max slide: 0 (fully up, covering header)
     */
    const calculateTransform = () => {
        // Initial offset from top (how far down the sheet starts)
        const initialOffset = 0;

        // Calculate slide amount (capped at 0 to prevent over-sliding)
        const slideAmount = Math.max(initialOffset - scrollY * 0.5, 0);

        return `translateY(${slideAmount}px)`;
    };

    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                marginTop: -3, // Overlap with header to create "tab" effect
                position: 'relative',
                zIndex: 10,
                minHeight: '100vh',
                paddingTop: 3,
                paddingBottom: 10, // Extra padding for footer
                transform: calculateTransform(),
                transition: 'transform 0.1s ease-out', // Smooth animation
                boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.08)',
                // Add fade-in animation for tab switching
                animation: 'fadeIn 0.3s ease-in-out',
                '@keyframes fadeIn': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            }}
        >
            {/* Handle/Indicator at top of sheet */}
            <Box
                sx={{
                    width: 40,
                    height: 4,
                    backgroundColor: '#d1d5db',
                    borderRadius: 2,
                    margin: '0 auto 16px',
                }}
            />

            {/* Transaction List */}
            <Box sx={{ paddingX: 2 }}>
                {transactions.map((transaction, index) => (
                    <React.Fragment key={transaction.id}>
                        {/* Transaction Item */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingY: 2.5,
                                gap: 2,
                                opacity: 0,
                                animation: 'slideUpFade 0.5s ease-out forwards',
                                animationDelay: `${index * 0.1}s`,
                                '@keyframes slideUpFade': {
                                    '0%': {
                                        opacity: 0,
                                        transform: 'translateY(20px)',
                                    },
                                    '100%': {
                                        opacity: 1,
                                        transform: 'translateY(0)',
                                    },
                                },
                            }}
                        >
                            {/* Amount (Left side in RTL) */}
                            <Box
                                sx={{
                                    minWidth: 130,
                                    textAlign: 'left',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#1a2847',
                                        fontSize: '0.8rem',
                                        backgroundColor: transaction.amount > 0 ? '#fef3c7' : 'transparent',
                                        padding: transaction.amount > 0 ? '6px 10px' : '6px 0',
                                        borderRadius: 1.5,
                                        display: 'inline-block',
                                    }}
                                >
                                    {formatAmount(transaction.amount)}
                                </Typography>
                            </Box>

                            {/* Transaction Details (Center) */}
                            <Box
                                sx={{
                                    flex: 1,
                                    textAlign: 'right',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#1a2847',
                                        marginBottom: 0.5,
                                        fontSize: '0.9rem',
                                    }}
                                >
                                    {transaction.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#9ca3af',
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    {transaction.time} • {transaction.date}
                                </Typography>
                            </Box>

                            {/* Icon (Right side in RTL) */}
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    backgroundColor: '#f3f4f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <Box sx={{ color: '#6b7280', display: 'flex', fontSize: '1.3rem' }}>
                                    {getTransactionIcon(transaction.icon)}
                                </Box>
                            </Box>
                        </Box>

                        {/* Divider (except for last item) */}
                        {index < transactions.length - 1 && (
                            <Box
                                sx={{
                                    height: 1,
                                    backgroundColor: '#e5e7eb',
                                    opacity: 0,
                                    animation: 'fadeIn 0.5s ease-out forwards',
                                    animationDelay: `${index * 0.1 + 0.2}s`,
                                    '@keyframes fadeIn': {
                                        '0%': { opacity: 0 },
                                        '100%': { opacity: 1 },
                                    },
                                }}
                            />
                        )}
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    );
};

export default TransactionSheet;

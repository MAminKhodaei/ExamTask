import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import Header from './components/Header';
import TransactionSheet from './components/TransactionSheet';
import Footer from './components/Footer';
import {
    userBalance,
    transactions,
    navigationItems,
} from './data/mockData';

/**
 * Main Application Component
 * 
 * This is the root component that orchestrates the entire Blue Bank UI.
 * 
 * Architecture:
 * - Mobile-first design with strict max-width constraint (430px)
 * - Centered on desktop with neutral background
 * - State management for balance visibility and active tab
 * - Modular component structure for maintainability
 * 
 * Layout Structure:
 * 1. Outer container: Full viewport with background color
 * 2. Inner container: Max-width 430px, centered
 * 3. Header: Balance and action buttons
 * 4. TransactionSheet: Pull-up sheet with transactions
 * 5. Footer: Fixed bottom navigation
 */
const App: React.FC = () => {
    /**
     * State: Balance visibility toggle
     * Controls whether the balance amount is shown or hidden (••••••••)
     */
    const [balanceVisible, setBalanceVisible] = useState(true);

    /**
     * State: Active navigation tab
     * Determines which view is currently displayed
     */
    const [activeTab, setActiveTab] = useState('home');

    /**
     * Handler: Toggle balance visibility
     */
    const handleToggleBalance = () => {
        setBalanceVisible((prev) => !prev);
    };

    /**
     * Handler: Top-up button click
     * In production, this would navigate to top-up flow
     */
    const handleTopUp = () => {
        console.log('Top-up clicked');
        // TODO: Implement top-up flow
    };

    /**
     * Handler: Report button click
     * In production, this would navigate to financial reports
     */
    const handleReport = () => {
        console.log('Report clicked');
        // TODO: Implement report view
    };

    /**
     * Handler: Tab change
     * Switches between different views (home, cards, etc.)
     */
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        console.log('Tab changed to:', tabId);
    };

    /**
     * Render different content based on active tab
     * - Home: Full transaction list
     * - Other tabs: Empty white page (placeholder)
     */
    const renderContent = () => {
        if (activeTab === 'home') {
            return <TransactionSheet transactions={transactions} />;
        }

        // Placeholder for other tabs
        return (
            <Box
                key={activeTab}
                sx={{
                    backgroundColor: 'white',
                    minHeight: '100vh',
                    marginTop: -3,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    paddingTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280',
                    // Critical styles for tab overlap stability
                    position: 'relative',
                    zIndex: 10,
                    boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.08)',
                    // Animation
                    animation: 'fadeIn 0.3s ease-in-out',
                    '@keyframes fadeIn': {
                        '0%': { opacity: 0 },
                        '100%': { opacity: 1 },
                    },
                }}
            >
                <p>صفحه در حال توسعه</p>
            </Box>
        );
    };

    return (
        <>
            {/* 
        Outer Container: Full viewport background
        This creates the neutral gray background visible on desktop
      */}
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: '#e8e8e8',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {/* 
          Inner Container: Mobile-first constraint
          Max-width: 430px ensures mobile layout
          Centered on desktop with margin: auto
        */}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 430,
                        backgroundColor: 'white',
                        minHeight: '100vh',
                        position: 'relative',
                        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {/* Header Section */}
                    <Header
                        balance={userBalance}
                        balanceVisible={balanceVisible}
                        onToggleBalance={handleToggleBalance}
                        onTopUp={handleTopUp}
                        onReport={handleReport}
                    />

                    {/* Main Content Area */}
                    {renderContent()}

                    {/* Footer Navigation */}
                    <Footer
                        items={navigationItems}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                    />
                </Box>
            </Box>
        </>
    );
};

export default App;

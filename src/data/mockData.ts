/**
 * Mock Data for Blue Bank Application
 * 
 * This file contains all the static data used in the application.
 * In a production app, this would be fetched from an API.
 */

export interface Transaction {
    id: string;
    title: string;
    date: string;
    time: string;
    amount: number; // Positive for income, negative for expense
    type: 'shopping' | 'internet' | 'payment' | 'transfer';
    icon: string; // Icon identifier
}

/**
 * User's current balance in Rials
 * Matches the reference image: 2,253,623
 */
export const userBalance = 2253623;

/**
 * Transaction history
 * Ordered by date (most recent first)
 * Amounts are in Rials
 */
export const transactions: Transaction[] = [
    {
        id: '1',
        title: 'خرید از فروشگاه',
        date: '۲۵ آبان ۱۴۰۴',
        time: '۱۶:۵۵',
        amount: -600000,
        type: 'shopping',
        icon: 'shopping_cart',
    },
    {
        id: '2',
        title: 'خرید اینترنتی',
        date: '۲۵ آبان ۱۴۰۴',
        time: '۱۱:۰۹',
        amount: -960000,
        type: 'internet',
        icon: 'public',
    },
    {
        id: '3',
        title: 'دریافت ارزاک',
        date: '۲۵ آبان ۱۴۰۴',
        time: '۱۱:۰۹',
        amount: 3500000,
        type: 'payment',
        icon: 'receipt',
    },
    {
        id: '4',
        title: 'خرید اینترنتی',
        date: '۲۴ آبان ۱۴۰۴',
        time: '۱۹:۵۵',
        amount: -960000,
        type: 'internet',
        icon: 'public',
    },
    {
        id: '5',
        title: 'خرید از فروشگاه',
        date: '۲۲ آبان ۱۴۰۴',
        time: '۱۱:۵۱',
        amount: -600000,
        type: 'shopping',
        icon: 'shopping_cart',
    },
    {
        id: '6',
        title: 'خرید از فروشگاه',
        date: '۲۱ آبان ۱۴۰۴',
        time: '۱۱:۵۱',
        amount: -1000000,
        type: 'shopping',
        icon: 'shopping_cart',
    },
];

/**
 * Navigation items for footer
 * Icons are Material UI icon names
 */
export interface NavItem {
    id: string;
    label: string;
    icon: string;
    active?: boolean;
}

export const navigationItems: NavItem[] = [
    {
        id: 'home',
        label: 'خانه',
        icon: 'home',
        active: true,
    },
    {
        id: 'cards',
        label: 'کارت‌ها',
        icon: 'credit_card',
    },
    {
        id: 'menu',
        label: 'منو',
        icon: 'apps',
    },
    {
        id: 'transfer',
        label: 'انتقال',
        icon: 'sync_alt',
    },
    {
        id: 'profile',
        label: 'پروفایل',
        icon: 'person',
    },
];

/**
 * Format number to Persian numerals with thousand separators
 * Example: 2253623 -> ۲,۲۵۳,۶۲۳
 */
export const formatToPersianNumber = (num: number): string => {
    // Convert to Persian numerals
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    // Add thousand separators
    const formatted = Math.abs(num).toLocaleString('en-US');

    // Replace English digits with Persian
    return formatted.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

/**
 * Format amount with sign and currency
 * Example: -600000 -> "۶۰۰,۰۰۰ - ریال"
 * Example: 3500000 -> "۳,۵۰۰,۰۰۰ + ریال"
 */
export const formatAmount = (amount: number): string => {
    const absAmount = Math.abs(amount);
    const formatted = formatToPersianNumber(absAmount);
    const sign = amount < 0 ? '-' : '+';
    return `${formatted} ${sign} ریال`;
};

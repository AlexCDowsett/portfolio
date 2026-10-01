export const site = {
    name: 'Alex Dowsett',
    shortName: 'Alex',
    role: 'Software developer',
    location: 'Based near London, England',
    email: import.meta.env.VITE_CONTACT_EMAIL || 'alex@dowsett.dev',
    cv: '/CV',
    links: [
        { label: 'GitHub', href: 'https://github.com/AlexCDowsett' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alex-dowsett-27266b151/' },
        { label: 'Instagram', href: 'https://www.instagram.com/alexccole_/' },
        { label: 'LeetCode', href: 'https://leetcode.com/u/alex220101/' },
    ],
};

export const navigation = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#work' },
    { label: 'Contact', href: '#contact' },
];

export const capabilities = [
    { number: '01', title: 'Web experiences', detail: 'React · JavaScript · Three.js' },
    { number: '02', title: 'Data applications', detail: 'Python · SQL · Machine learning' },
    { number: '03', title: 'Systems projects', detail: 'C · VHDL · FPGA' },
];

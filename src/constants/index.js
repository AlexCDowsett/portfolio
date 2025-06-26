export const navLinks = [
    {
        id: 1,
        name: 'Home',
        href: '#home',
    },
    {
        id: 2,
        name: 'About',
        href: '#about',
    },
    {
        id: 3,
        name: 'Work',
        href: '#work',
    },
    {
        id: 4,
        name: 'Contact',
        href: '#contact',
    },
    {
        id: 5,
        name: 'CV',
        href: '/cv',
    },
];


export const clientReviews = [
    {
        id: 1,
        name: 'Emily Johnson',
        position: 'Marketing Director at GreenLeaf',
        img: 'assets/review1.png',
        review:
            'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
    },
    {
        id: 2,
        name: 'Mark Rogers',
        position: 'Founder of TechGear Shop',
        img: 'assets/review2.png',
        review:
            'Adrian\'s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He\'s a true professional! Fantastic work.',
    },
    {
        id: 3,
        name: 'John Dohsas',
        position: 'Project Manager at UrbanTech ',
        img: 'assets/review3.png',
        review:
            'I can\'t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
    },
    {
        id: 4,
        name: 'Ether Smith',
        position: 'CEO of BrightStar Enterprises',
        img: 'assets/review4.png',
        review:
            'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
    },
];

export const myProjects = [
    {
        title: 'Portfolio Website',
        desc: 'A modern, interactive portfolio website featuring my projects and a chance to learn frontiend languages. Built with React and Three.js for immersive 3D graphics, enhanced with Framer Motion for smooth animations and transitions.',
        subdesc: 'Utilizes React Three Fiber for 3D rendering, Tailwind CSS for responsive design, and GSAP for advanced animations. Features a custom 3D computer model with interactive screens showcasing project demos in real-time. The portfolio implements responsive design principles, ensuring optimal viewing across all devices. The 3D scene is optimized for performance using React Three Fiber\'s efficient rendering pipeline, while Framer Motion provides smooth page transitions and micro-interactions. The project demonstrates modern web development practices including component-based architecture, state management, and responsive design patterns.',
        href: 'https://github.com/AlexCDowsett/portfolio',
        texture: '/textures/project/project1.mp4',
        textureOffset: { x: 0.375, y: 0.64 },
        textureRepeat: { x: 4.3, y: 5 },
        logo: '/assets/project-logo1.png',
        logoStyle: {
            backgroundColor: '#2A1816',
            border: '0.2px solid #36201D',
            boxShadow: '0px 0px 60px 0px #AA3C304D',
        },
        spotlight: '/assets/spotlight1.png',
        tags: [
            {
                id: 1,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'TailwindCSS',
                path: '/assets/tailwindcss.png',
            },
            {
                id: 3,
                name: 'Vite',
                path: '/assets/vite.svg',
            },
            {
                id: 4,
                name: 'Three.js',
                path: '/assets/threejs-inverted.png',
            },
            {
                id: 5,
                name: 'Framer Motion',
                path: '/assets/framer.svg',
            },
            {
                id: 6,
                name: 'ESLint',
                path: '/assets/eslint.svg',
            },
            {
                id: 7,
                name: 'PostCSS',
                path: '/assets/postcss.svg',
            },
            {
                id: 8,
                name: 'GSAP',
                path: '/assets/gsap.svg',
            },
        ],
    },
    {
        title: 'VOC Analyser',
        desc: 'A sophisticated machine learning application for analyzing Volatile Organic Compounds (VOC) data from pig farms. Processes millions of data points to predict pig conditions, vaccine effects, and feeding patterns.',
        subdesc: 'Implements advanced data processing techniques including cleaning, standardization, and normalization. Uses machine learning algorithms to identify patterns and make predictions about pig health and farm conditions. The application features a custom-built GUI using PyQt6 for data visualization and user interaction. Implements parallel processing for handling large datasets efficiently, with SQL database integration for persistent storage. The system includes automated data validation, error handling, and reporting features, making it suitable for both research and practical farm management applications.',
        href: 'https://github.com/AlexCDowsett/voc-organiser',
        texture: '/textures/project/voc-analyser.mp4',
        textureOffset: { x: 0.475, y: 0.66 },
        textureRepeat: { x: 4.12, y: 5.5 },
        logo: '/assets/project-logo2.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight2.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.svg',
            },
            {
                id: 2,
                name: 'Pandas',
                path: '/assets/pandas.svg',
            },
            {
                id: 3,
                name: 'PyQt6',
                path: '/assets/qt.svg',
            },
            {
                id: 4,
                name: 'SQL',
                path: '/assets/mysql.svg',
            },
            {
                id: 4,
                name: 'Matplotlib',
                path: '/assets/matplotlib.svg',
            },
            {
                id: 5,
                name: 'Machine Learning',
                path: '/assets/ml.png',
            },
        ],
    },
    {
        title: 'Vivant Smart Doorbell',
        desc: 'An advanced smart doorbell system featuring fingerprint scanning and facial recognition capabilities. Includes a web interface for remote access and control.',
        subdesc: 'Developed a complete solution including hardware integration, backend API, and iOS app connectivity. Uses PHP for database interactions and secure API endpoints. The system implements real-time facial recognition using OpenCV and custom machine learning models, with secure fingerprint authentication for authorized access. Features a responsive web dashboard for remote monitoring and control, with real-time notifications and access logs. The backend implements RESTful API architecture with secure authentication and data encryption. The iOS app provides mobile access to doorbell controls and monitoring features.',
        href: 'https://github.com/AlexCDowsett/vivant',
        texture: '/textures/project/vivant.mp4',
        textureOffset: { x: 0.375, y: 0.34 },
        textureRepeat: { x: 4.3, y: 5.5 },
        logo: '/assets/project-logo3.png',
        logoStyle: {
            backgroundColor: '#60f5a1',
            background:
                'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
            border: '0.2px solid rgba(208, 213, 221, 1)',
            boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
        },
        spotlight: '/assets/spotlight3.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.svg',
            },
            {
                id: 2,
                name: 'PHP',
                path: '/assets/php.svg',
            },
            {
                id: 3,
                name: 'SQL',
                path: '/assets/mysql.svg',
            },
            {
                id: 4,
                name: 'OpenCV',
                path: '/assets/opencv.svg',
            },
        ],
    },
    {
        title: 'VHDL Calculator',
        desc: 'A low-latency calculator implemented in VHDL, featuring UART communication for serial data transfer. Optimized for performance and reliability.',
        subdesc: 'Designed with a focus on minimizing latency and maximizing throughput. Includes comprehensive testing and verification procedures. The calculator implements a custom ALU design with optimized arithmetic operations, featuring parallel processing capabilities for complex calculations. The UART interface enables reliable serial communication with external devices, while the FPGA implementation allows for hardware acceleration of mathematical operations. The design includes extensive test benches and verification procedures to ensure reliability and performance under various conditions.',
        href: 'https://github.com/AlexCDowsett/vhdl-calculator/',
        texture: '/textures/project/VHDL.mp4',
        textureOffset: { x: 0.375, y: 0.25 },
        textureRepeat: { x: 4.3, y: 6 },
        logo: '/assets/project-logo4.png',
        logoStyle: {
            backgroundColor: '#0E1F38',
            border: '0.2px solid #0E2D58',
            boxShadow: '0px 0px 60px 0px #2F67B64D',
        },
        spotlight: '/assets/spotlight4.png',
        tags: [
            {
                id: 1,
                name: 'Vivado',
                path: '/assets/vivado.png',
            },
            {
                id: 2,
                name: 'FPGA',
                path: '/assets/vhdl.svg',
            },
        ],
    },
    {
        title: 'C Radio',
        desc: 'A custom radio implementation in C with interactive controls including tuning knobs, volume control, and a display interface.',
        subdesc: 'Features real-time signal processing and user interface updates. Implements efficient memory management and hardware interaction. The radio system includes a custom-built signal processing pipeline for audio filtering and enhancement, with real-time frequency analysis and tuning capabilities. The user interface features a responsive display system with custom graphics rendering, while the control system implements precise analog-to-digital conversion for accurate knob position detection. The project demonstrates efficient memory management techniques and hardware abstraction for cross-platform compatibility.',
        href: 'https://www.youtube.com/watch?v=Ahwoks_dawU',
        texture: '/textures/project/cradio.mp4',
        textureOffset: { x: 0.81, y: 0.23 },
        textureRepeat: { x: 4.2, y: 5.6 },
        logo: '/assets/project-logo5.png',
        logoStyle: {
            backgroundColor: '#1C1A43',
            border: '0.2px solid #252262',
            boxShadow: '0px 0px 60px 0px #635BFF4D',
        },
        spotlight: '/assets/spotlight5.png',
        tags: [
            {
                id: 1,
                name: 'C',
                path: '/assets/c.svg',
            },
        ],
    },
    {
        title: 'Essensuals Booking System',
        desc: 'A comprehensive booking management system for a salon, featuring appointment scheduling, client management, and staff coordination.',
        subdesc: 'Developed with a focus on user experience and efficient data management. Includes automated reminders and scheduling conflict prevention. The system features a custom-built GUI using Tkinter, with an intuitive calendar interface for appointment management. Implements a robust SQL database backend for efficient data storage and retrieval, with automated backup and recovery procedures. The application includes features for client history tracking, staff scheduling, and automated email/SMS notifications. The system is packaged using PyInstaller for easy deployment and includes comprehensive error handling and logging capabilities.',
        href: 'https://github.com/AlexCDowsett/essenuals-booking-system',
        texture: '/textures/project/Essensuals.mp4',
        textureOffset: { x: 0.375, y: 0.64 },
        textureRepeat: { x: 4.3, y: 5 },
        logo: '/assets/project-logo3.png',
        logoStyle: {
            backgroundColor: '#60f5a1',
            background:
                'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
            border: '0.2px solid rgba(208, 213, 221, 1)',
            boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
        },
        spotlight: '/assets/spotlight3.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.svg',
            },
            {
                id: 2,
                name: 'Tkinter',
                path: '/assets/tkinter.png',
            },
            {
                id: 3,
                name: 'SQL',
                path: '/assets/mysql.svg',
            },
            {
                id: 4,
                name: 'PyInstaller',
                path: '/assets/pyinstaller.png',
            },
        ],
    },
    {
        title: 'VOC Organiser',
        desc: 'A specialized tool for organizing and processing raw VOC sensor data files. Features automated file restructuring, metadata editing, and batch processing capabilities.',
        subdesc: 'Developed in collaboration with researchers to streamline their workflow. Includes a user-friendly interface and comprehensive error handling. The application implements advanced file processing algorithms for handling various data formats, with automated metadata extraction and validation. Features a custom-built GUI using PyQt6 for intuitive data management, including batch processing capabilities and progress tracking. The system includes data visualization tools for quick analysis and export functionality for various formats. Implements robust error handling and logging, with automated backup procedures to ensure data integrity.',
        href: 'https://github.com/AlexCDowsett/voc-organiser',
        texture: '/textures/project/voc-organiser.mp4',
        textureOffset: { x: 0.8, y: 0.28 },
        textureRepeat: { x: 4, y: 5.5 },
        logo: '/assets/project-logo2.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight2.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.svg',
            },
            {
                id: 2,
                name: 'PyQt6',
                path: '/assets/qt.svg',
            },
            {
                id: 3,
                name: 'PyInstaller',
                path: '/assets/pyinstaller.png',
            },
            {
                id: 4,
                name: 'Pandas',
                path: '/assets/pandas.svg',
            },
        ],
    },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        modelScale: isSmall ? 1 : isMobile ? 1.5 : 2.5,
        modelPosition: isMobile ? [0.25, -1, 8] : [0.25, -3, 0],
        cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
        reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
        ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
        targetPosition: isSmall ? [0, -10, -10] : isMobile ? [-5, -10, -10] : isTablet ? [-7, -7, -10] : [-13, -13, -10],
    };
};

export const workExperiences = [
    {
        id: 1,
        name: 'Framer',
        pos: 'Lead Web Developer',
        duration: '2022 - Present',
        title: "Framer serves as my go-to tool for creating interactive prototypes. I use it to bring designs to  life, allowing stakeholders to experience the user flow and interactions before development.",
        icon: '/assets/framer.svg',
        animation: 'victory',
    },
    {
        id: 2,
        name: 'Figma',
        pos: 'Web Developer',
        duration: '2020 - 2022',
        title: "Figma is my collaborative design platform of choice. I utilize it to work seamlessly with team members and clients, facilitating real-time feedback and design iterations. Its cloud-based.",
        icon: '/assets/figma.svg',
        animation: 'clapping',
    },
    {
        id: 3,
        name: 'Notion',
        pos: 'Junior Web Developer',
        duration: '2019 - 2020',
        title: "Notion helps me keep my projects organized. I use it for project management, task tracking, and as a central hub for documentation, ensuring that everything from design notes to.",
        icon: '/assets/notion.svg',
        animation: 'salute',
    },
];

export const ScreenLocations = [
        {pX: 0, pY: 0, pZ: 0, rX: 0, rY: 0, rZ: 0},
        {pX: 3.21, pY: 0.75, pZ: 8.1, rX: -0.2, rY: -1.10, rZ: 0},
        {pX: 2.85, pY: -0.15, pZ: 9.9, rX: -0.2, rY: -0.45, rZ: 0},
        {pX: -0.03, pY: 1.25, pZ: 7.70, rX: -0.2, rY: -0.9, rZ: 0},
        {pX: 0.63, pY: 2.25, pZ: 7.9, rX: -0.2, rY: 0.15, rZ: 0},
        {pX: -0.25, pY: 3.35, pZ: 7.5, rX: -0.20, rY: 0.5, rZ: 0},
        {pX: -1.15, pY: 1.7, pZ: 8.0, rX: -0.21, rY: 0.95, rZ: 0},
        {pX: 0.3, pY: 0, pZ: 10.7, rX: -0.2, rY: 1.2, rZ: 0},
        {pX: 0, pY: 0, pZ: 0, rX: -0.2, rY: 0, rZ: 0},]

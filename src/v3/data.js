export const identity = {
    name: 'Alex Dowsett',
    email: import.meta.env.VITE_CONTACT_EMAIL || 'alex@dowsett.dev',
    cv: '/v3/alex-dowsett-cv.pdf',
    github: 'https://github.com/AlexCDowsett',
    linkedin: 'https://www.linkedin.com/in/alex-dowsett-27266b151/',
};

export const projects = [
    {
        slug: 'voc-analysis', date: '2024', number: '01', title: 'Making sense of millions of sensor readings.',
        name: 'Agricultural VOC Analytics', category: 'DATA & MACHINE LEARNING',
        summary: 'Bespoke research software that turns raw agricultural sensor data into something researchers can explore, compare and learn from.',
        origin: 'University final-year project',
        role: 'Individual university final-year project',
        outcome: 'A research foundation taken forward by a PhD student at the University of Surrey.',
        tags: ['Python', 'SQL', 'PyQt6', 'scikit-learn'],
        image: '/v3/voc-analyser.jpg', imageAlt: 'The VOC analysis desktop application showing sensor data plots',
        video: '/v3/demos/voc-analyser.mp4',
        repo: 'https://github.com/AlexCDowsett/voc-analyser',
        companion: { name: 'VOC File Organiser', date: '2024', repo: 'https://github.com/AlexCDowsett/voc-organiser' },
        context: 'Agricultural VOC sensors generate large volumes of readings. Before those readings can help researchers understand animal health, the raw files need to become consistent, usable data.',
        contribution: [
            ['Build the data pipeline', 'Built a companion VOC File Organiser to prepare raw sensor files, then developed software to import and store readings, clean corrupt points and spikes, and normalise and standardise data before analysis.'],
            ['Make analysis accessible', 'Built a PyQt6 desktop interface with plots and test information, helping users explore trends without working directly with raw files.'],
            ['Explore meaningful patterns', 'Applied PCA and t-SNE to visualise clusters and investigate relationships with changes in diet, temperature and vaccination.'],
        ],
        result: 'The platform processed millions of data points and provided a foundation for predictive analysis of animal health. Following completion, the software and research foundation continued to be developed by a PhD student at the university.',
        reflection: 'This project brings together the work I enjoy most: understanding a domain, building a dependable data pipeline and making the results usable for someone else.',
    },
    {
        slug: 'vivant', date: '2023', number: '02', title: 'Connecting hardware, software and people.',
        name: 'Vivant Smart Doorbell', category: 'BACKEND & SYSTEMS INTEGRATION',
        summary: 'A Raspberry Pi doorbell combining visitor video communication, facial recognition and fingerprint authentication with a connected backend.',
        origin: 'University group project',
        role: 'Software lead · Seven-person university team',
        outcome: 'Led software delivery and coordinated integration across a seven-person multidisciplinary team.',
        tags: ['Python', 'SQL', 'PHP', 'AWS', 'Raspberry Pi'],
        image: '/v3/vivant.jpg', imageAlt: 'The working Vivant Raspberry Pi doorbell prototype with camera and display',
        video: '/v3/demos/vivant.mp4',
        repo: 'https://github.com/AlexCDowsett/vivant',
        context: 'Developed as a university group project, Vivant explored how a smart doorbell could connect a physical device, authentication, video communication, a database and a companion application.',
        contribution: [
            ['Own the software delivery', 'Led software development, organised software tasks and coordinated hardware and software integration within a seven-person engineering team.'],
            ['Connect the system', 'Developed backend functionality in Python, SQL and PHP, including APIs to support communication with the iOS companion application and an AWS-hosted database.'],
            ['Bring the device to life', 'Implemented facial recognition and fingerprint authentication, alongside a graphical interface for visitor video communication on Raspberry Pi and Linux.'],
        ],
        result: 'The team produced an integrated smart doorbell prototype connecting physical hardware with backend services and an iOS companion app. My contribution focused on software leadership, backend development and integration; the companion app was part of the wider team’s work.',
        reflection: 'It taught me to treat interfaces between people as carefully as interfaces between systems: agree what each component needs, communicate clearly and test the integration.',
    },
    {
        slug: 'first-portfolio', date: '2025', number: '03', preview: 'screens',
        title: 'My first portfolio, in three dimensions.', name: 'First Portfolio Website', category: 'WEB DEVELOPMENT',
        origin: 'Personal project', role: 'Design and frontend development',
        summary: 'My first personal portfolio: a hands-on exploration of React, responsive interfaces and Three.js, with a room of 3D screens bringing my projects to life.',
        tags: ['React', 'JavaScript', 'Three.js', 'GSAP'],
        href: '/legacy',

    },
    {
        slug: 'booking-system', date: '2019', number: '04', title: 'Software shaped around a working day.',
        name: 'Essensuals Booking System', category: 'BUSINESS SOFTWARE',
        summary: 'A bespoke desktop booking application for a local salon, bringing staff access, appointments and payment tracking into one workflow.',
        origin: 'School · A-Level project',
        role: 'Individual school A-Level project for a local business',
        outcome: 'A practical application covering authentication, appointment scheduling and payment tracking.',
        tags: ['Python', 'Tkinter', 'SQLite'],
        image: '/v3/booking.jpg', imageAlt: 'The Essensuals desktop salon booking application',
        video: '/v3/demos/booking.mp4',
        repo: 'https://github.com/AlexCDowsett/essenuals-booking-system',
        context: 'A local salon needed a booking application organised around its own appointments, staff and services. This became an early opportunity to turn business requirements into working software.',
        contribution: [
            ['Model the business', 'Designed a SQLite database and application logic for clients, staff, services and appointment records.'],
            ['Build the workflow', 'Created a Python and Tkinter desktop interface for staff authentication, calendar-based appointment management and payment tracking.'],
            ['Make it configurable', 'Supported working hours, appointment intervals and service pricing, so the application could reflect the salon’s day-to-day operations.'],
        ],
        result: 'Delivered a bespoke desktop booking application covering the core salon workflow. Developed as an A-Level project, it demonstrates an early focus on software that solves a concrete business problem.',
        reflection: 'A useful system starts with the people using it. Understanding the business workflow was as important as writing the application.',
    },

];

export const furtherProjects = [
    { name: 'UART Calculator', date: '2024', detail: 'Modular arithmetic over a serial connection', tech: 'VHDL · FPGA · Test benches', href: 'https://github.com/AlexCDowsett/vhdl-calculator' },
    { name: 'C Radio', date: '2022', detail: 'Embedded software with physical controls', tech: 'C · Electronics', href: 'https://www.youtube.com/watch?v=Ahwoks_dawU' },
];

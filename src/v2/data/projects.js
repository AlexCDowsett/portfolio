/** Project stories and screen artwork used by the V2 room. */
export const projects = [
    {
        id: 'voc-analyser', title: 'VOC Analyser', year: 'Research project',
        summary: 'A desktop tool for finding patterns in volatile organic compound readings from pig farms.',
        detail: 'It tidies sensor data, plots it and uses PCA and t-SNE to explore how readings relate to pens and conditions.',
        stack: ['Python', 'Pandas', 'PyQt', 'Data visualisation'],
        href: 'https://github.com/AlexCDowsett/voc-analyser', screen: 'Object_222', art: '/v2/screens/voc-analyser.png',
    },
    {
        id: 'vivant', title: 'Vivant', year: 'Connected hardware',
        summary: 'A smart doorbell and access system built around a Raspberry Pi.',
        detail: 'Visitors can be identified, call through video, and request access. The build pairs the device with an API and iOS companion app.',
        stack: ['Raspberry Pi', 'PHP', 'MySQL', 'iOS'],
        href: 'https://github.com/AlexCDowsett/vivant', screen: 'Object_225', art: '/v2/screens/vivant.png',
    },
    {
        id: 'uart-calculator', title: 'UART Calculator', year: 'Digital design',
        summary: 'A small calculator designed in VHDL and operated over a serial connection.',
        detail: 'Addition, subtraction, multiplication and division are split into modules and checked with test benches.',
        stack: ['VHDL', 'UART', 'FPGA', 'Test benches'],
        href: 'https://github.com/AlexCDowsett/vhdl-calculator', screen: 'Object_210', art: '/v2/screens/uart-calculator.png',
    },
    {
        id: 'c-radio', title: 'C Radio', year: 'Embedded systems',
        summary: 'A radio built in C with physical tuning and volume controls.',
        detail: 'A hands-on hardware project, with an on-device display and controls designed around listening rather than a menu.',
        stack: ['C', 'Embedded', 'Electronics'],
        href: 'https://www.youtube.com/watch?v=Ahwoks_dawU', screen: 'Object_207', art: '/v2/screens/c-radio.png',
    },
    {
        id: 'essensuals-booking', title: 'Essensuals Booking', year: 'College project',
        summary: 'A salon booking system for appointments, clients, staff and services.',
        detail: 'The desktop application uses a local database to bring the day-to-day booking workflow into one place.',
        stack: ['Python', 'Tkinter', 'SQLite'],
        href: 'https://github.com/AlexCDowsett/essenuals-booking-system', screen: 'Object_216', art: '/v2/screens/essensuals.png',
    },
    {
        id: 'voc-organiser', title: 'VOC File Organiser', year: 'Research tooling',
        summary: 'A small utility that makes batches of raw sensor test files easier to manage.',
        detail: 'It gives files consistent names and supports batch processing and compression before analysis.',
        stack: ['Python', 'Desktop tools', 'Data'],
        href: 'https://github.com/AlexCDowsett/voc-organiser', screen: 'Object_219', art: '/v2/screens/voc-organiser.png',
    },
    {
        id: 'portfolio', title: 'This portfolio', year: 'Ongoing',
        summary: 'A portfolio with a tiny room full of old computers, each showing a different project.',
        detail: 'Built with React and Three.js. The screen artwork is drawn for this version and the room can be explored on touch, mouse or keyboard.',
        stack: ['React', 'Three.js', 'WebGL'],
        href: 'https://github.com/AlexCDowsett/portfolio', screen: 'Object_231', art: '/v2/screens/portfolio.png',
    },
];

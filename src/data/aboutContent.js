// Environment variables
const PERSONAL_NAME = import.meta.env.VITE_PERSONAL_NAME || 'Alex Dowsett';
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'alex@dowsett.dev';

export const aboutContent = {
    "introduction": {
        "title": `Hi, I'm ${PERSONAL_NAME}`,
        "description": "As a University of Surrey graduate, I’ve developed my backend skills and explored frontend development through this portfolio, building responsive software solutions."
    },
    "passion": {
        "title": "My Passion for Coding",
        "description": "I love solving problems and building things through code. Programming isn't just my profession—it's my passion. I enjoy exploring new technologies and enhancing my skills."
    },
    "location": {
        "title": "Flexible across locations and time zones",
        "description": "I'm based near London, England and open to remote work worldwide."
    },
    "techStack": {
        "title": "Tech Stack",
        "description": "I specialise in a variety of languages, frameworks and tools that allow me to build robust and scalable applications."
    },
    "contact": {
        "title": "Contact me",
        "email": CONTACT_EMAIL
    }
};

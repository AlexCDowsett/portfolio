// Environment variables
const PERSONAL_NAME = import.meta.env.VITE_PERSONAL_NAME || 'Alex Dowsett';
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'alex@dowsett.dev';

export const aboutContent = {
    "introduction": {
        "title": `Hi, I'm ${PERSONAL_NAME}`,
        "description": "As a recent graduate, from Univerisity of Surrey and 12 years of experience, I have honed my skills in backend dev with an introduction to frontend with this portfolio, creating elegant and responsive software solutions."
    },
    "passion": {
        "title": "My Passion for Coding",
        "description": "I love solving problems and building things through code. Programming isn't just my profession—it's my passion. I enjoy exploring new technologies, and enhancing my skills."
    },
    "location": {
        "title": "Flexible with time zone communications & locations",
        "description": "I'm based near London, England and open to remote work worldwide."
    },
    "techStack": {
        "title": "Tech Stack",
        "description": "I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable applications."
    },
    "contact": {
        "title": "Contact me",
        "email": CONTACT_EMAIL
    }
}; 
import React, {useRef, useState, useEffect, forwardRef} from "react";
import emailJS from '@emailjs/browser';
import {useMediaQuery} from "react-responsive";
import confetti from "canvas-confetti";
import {ConfettiSideCannons} from "../components/ConfettiSideCannons.jsx";
import {AnimatePresence} from "framer-motion";
import Notification from "../components/SlideInNotifications.jsx";
import GlitchEffect from "../components/Glitch.jsx";
import {useScroll} from '../context/ScrollContext.jsx';

// Environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;
const CONTACT_NAME = import.meta.env.VITE_CONTACT_NAME;

// Initialize EmailJS
emailJS.init(EMAILJS_PUBLIC_KEY);

// Debug logging for production troubleshooting
console.log('EmailJS Config:', {
    serviceId: EMAILJS_SERVICE_ID,
    templateId: EMAILJS_TEMPLATE_ID,
    publicKey: EMAILJS_PUBLIC_KEY ? `${EMAILJS_PUBLIC_KEY.substring(0, 8)}...` : 'undefined',
    contactEmail: CONTACT_EMAIL,
    contactName: CONTACT_NAME
});

const Contact = forwardRef((props, ref) => {
    const contactRef = ref || useRef(null);
    const {setIsContactVisible} = useScroll();
    const [isVisible, setIsVisible] = useState(false);
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    })

    const [notifications, setNotifications] = useState([]);

    const removeNotif = (id) => {
        setNotifications((pv) => pv.filter((n) => n.id !== id));
    };

    const handleChange = ({target: {name, value}}) => {
        setForm({...form, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        // Additional debugging for the submit process
        console.log('Submitting form with config:', {
            serviceId: EMAILJS_SERVICE_ID,
            templateId: EMAILJS_TEMPLATE_ID,
            publicKey: EMAILJS_PUBLIC_KEY ? `${EMAILJS_PUBLIC_KEY.substring(0, 8)}...` : 'undefined'
        });

        try {
            await emailJS.send(EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    from_name: form.name,
                    to_name: CONTACT_NAME,
                    from_email: form.email,
                    to_email: CONTACT_EMAIL,
                    message: form.message
                },
                EMAILJS_PUBLIC_KEY)
            setLoading(false)

            setForm({
                name: '',
                email: '',
                message: '',
            });

            //alert('Thank you. I will get back to you as soon as possible.')
            setNotifications((pv) => [{
                id: Math.random(),
                text: "Success! Thank you. I will get back to you as soon as possible.",
                duration: 5000
            }, ...pv]);
            ConfettiSideCannons()

        } catch (error) {
            setLoading(false)
            console.error('EmailJS Error:', error);
            //alert('Something went wrong. Please try again later.')
            setNotifications((pv) => [{
                id: Math.random(),
                text: "Error! Something went wrong. Please try again later or contact me via email.",
                duration: 5000
            }, ...pv])

        }


    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                setIsContactVisible(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (contactRef.current) {
            observer.observe(contactRef.current);
        }

        return () => {
            if (contactRef.current) {
                observer.unobserve(contactRef.current);
            }
        };
    }, [setIsContactVisible]);



    return (
        <section ref={contactRef} className="c-space pt-2.5 sm:pt-16 relative pb-5" id="contact">
            <div className="relative flex items-center justify-center flex-col">
                <img 
                    src="/assets/terminal.png" 
                    alt="terminal background" 
                    className="object-cover absolute inset-0 hidden lg:block lg:pl-12 place-self-center"
                    style={{ maxHeight: '100%' }}
                />
                <div className="contact-container relative z-10">
                    <h3 className="head-text lg:mt-10 xl:mt-14">Let's Talk</h3>
                    <p className="text-lg text-white-600 mt-1">
                        Whether you're looking to build a new website, improve your existing platform, or bring a unique
                        project to life, I'm here to help.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-5 xl:mt-16 flex flex-col space-y-1 xl:space-y-7">
                        <label className='space-y-1 xl:space-y-3'>
                            <span className="field-label">Full Name</span>

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="Peter Parker"/>
                        </label>

                        <label className='space-y-1 xl:space-y-3'>
                            <span className="field-label">Email</span>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="doctor@who.com"/>
                        </label>

                        <label className='space-y-1 xl:space-y-3'>
                            <span className="field-label">Your Message</span>

                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                row={5}
                                className="field-input"
                                placeholder="Hi, I'm interested in..."/>

                        </label>

                        <button 
                            className="field-btn transition-transform duration-300 ease-in-out transform hover:scale-110" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                            <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow"/>
                        </button>
                    </form>


                    <p className="text-white-600 text-lg pt-2 sm:pt-4 pb-0.5 sm:pb-1 text-center">
                        Alternatively, send me an email at...
                    </p>


                        <a href={`mailto:${CONTACT_EMAIL}`}>
                        <p className="text-center text-xl lg:text-2xl font-medium text-white lg:mb-10 hover:text-blue-400 hover:underline">{CONTACT_EMAIL}</p>
                        </a>
                </div>
            </div>
            <div
                className="flex flex-col gap-1 w-full sm:w-auto pl-5 pr-5 sm:pl-0 sm:pr-0 fixed bottom-3 sm:bottom-20 pb-0 justify-center z-50 pointer-events-none" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                <AnimatePresence>
                    {notifications.map((n) => (
                        <Notification removeNotif={removeNotif} {...n} key={n.id}/>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
});

export default Contact;

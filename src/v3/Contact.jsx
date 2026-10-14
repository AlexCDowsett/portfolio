import { useRef, useState } from 'react';
import emailJS from '@emailjs/browser';
import { Link } from 'react-router-dom';
import { identity } from './data.js';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
    const [state, setState] = useState('idle');
    const lock = useRef(false);
    const configured = Boolean(serviceId && templateId && publicKey);
    const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));
    async function submit(event) {
        event.preventDefault();
        if (lock.current || form.website || !configured) return;
        if (!form.name.trim() || !form.message.trim()) { setState('invalid'); return; }
        lock.current = true;
        setState('sending');
        try {
            await emailJS.send(serviceId, templateId, {
                from_name: form.name.trim(), from_email: form.email.trim(),
                to_name: import.meta.env.VITE_CONTACT_NAME || 'Alex', to_email: identity.email,
                message: form.message.trim(),
            }, publicKey);
            setForm({ name: '', email: '', message: '', website: '' });
            setState('success');
        } catch { setState('error'); }
        finally { lock.current = false; }
    }
    return (
        <section className="v3-contact" id="contact" aria-labelledby="v3-contact-title">
            <div className="v3-shell v3-contact-layout">
                <div>
                    <p className="v3-kicker"><span className="v3-dot" /> LET’S CONNECT</p>
                    <h2 id="v3-contact-title">Good work starts<br />with a <em>conversation.</em></h2>
                    <p className="v3-contact-intro">Looking for an engineer who can understand the problem, build the solution and bring people along? I’d love to hear about your team.</p>
                    <a className="v3-contact-email" href={`mailto:${identity.email}`}>{identity.email} <span aria-hidden="true">↗</span></a>
                    <p className="v3-contact-note">London area, UK · Open to remote opportunities</p>
                    <div className="v3-contact-socials"><a href={identity.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={identity.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={identity.cv} target="_blank" rel="noreferrer">View CV ↗</a></div>
                </div>
                <form className="v3-form" onSubmit={submit} aria-label="Contact Alex" aria-busy={state === 'sending'}>
                    <div className="v3-form-pair">
                        <label>Your name<input name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={update} placeholder="Peter Parker" /></label>
                        <label>Email address<input type="email" name="email" autoComplete="email" required maxLength={254} value={form.email} onChange={update} placeholder="you@company.com" /></label>
                    </div>
                    <label>Your message<textarea name="message" rows={5} required maxLength={5000} value={form.message} onChange={update} placeholder="Tell me about the role, your team, or what you’re working on…" /></label>
                    <div className="v3-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} /></label></div>
                    <div className="v3-form-bottom"><p>Your details are only used to reply.<br /><Link to="/legal#privacy">Privacy policy</Link></p><button className="v3-button v3-button-gold" type="submit" disabled={!configured || state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'}<span aria-hidden="true">↗</span></button></div>
                    <div className="v3-form-status" role="status" aria-live="polite">
                        {state === 'success' && 'Thanks for getting in touch. Your message has been sent.'}
                        {state === 'error' && <>Your message couldn’t be sent. Please try again or <a href={`mailto:${identity.email}`}>email me directly</a>. Your message is still here.</>}
                        {state === 'invalid' && 'Please add your name and a message before sending.'}
                        {!configured && <>The form is currently unavailable. Please <a href={`mailto:${identity.email}`}>email me directly</a>.</>}
                    </div>
                </form>
            </div>
        </section>
    );
}

import { useState } from 'react';
import emailJS from '@emailjs/browser';
import { site } from '../data/site.js';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const contactName = import.meta.env.VITE_CONTACT_NAME || site.shortName;

export function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [sending, setSending] = useState(false);
    const canSend = Boolean(serviceId && templateId && publicKey);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!canSend || sending) return;

        setSending(true);
        setStatus('');
        try {
            await emailJS.send(serviceId, templateId, {
                from_name: form.name,
                to_name: contactName,
                from_email: form.email,
                to_email: site.email,
                message: form.message,
            }, publicKey);
            setForm({ name: '', email: '', message: '' });
            setStatus('Thanks for reaching out. I’ll get back to you soon.');
        } catch {
            setStatus(`Something went wrong. Email me directly at ${site.email}.`);
        } finally {
            setSending(false);
        }
    }

    function updateField(event) {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    }

    return (
        <section className="v2-contact-section" id="contact" aria-labelledby="v2-contact-title">
            <div className="v2-shell v2-contact-layout">
                <div className="v2-contact-copy">
                    <p className="v2-eyebrow">Have a project in mind? <span className="v2-heading-rule" /></p>
                    <h2 id="v2-contact-title">Let’s make<br /><span>something matter.</span></h2>
                    <p>Tell me what you’re working on, what’s getting in the way, or just say hello.</p>
                    <a className="v2-email-link" href={`mailto:${site.email}`}>{site.email} <span aria-hidden="true">↗</span></a>
                </div>
                <form className="v2-contact-form" onSubmit={handleSubmit}>
                    <label>Name<input name="name" autoComplete="name" value={form.name} onChange={updateField} placeholder="Your name" required /></label>
                    <label>Email<input name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} placeholder="you@example.com" required /></label>
                    <label>Message<textarea name="message" rows="4" value={form.message} onChange={updateField} placeholder="A little about your project…" required /></label>
                    <button className="v2-button v2-button-primary" type="submit" disabled={!canSend || sending}>
                        {sending ? 'Sending…' : canSend ? 'Send message' : 'Email me instead'} <span aria-hidden="true">↗</span>
                    </button>
                    {!canSend && <p className="v2-form-hint">The contact form is being set up. For now, write to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>}
                    {status && <p className="v2-form-status" role="status">{status}</p>}
                </form>
            </div>
        </section>
    );
}

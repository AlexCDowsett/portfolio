import { useEffect, useState } from 'react';

const DOMAIN = 'dowsett.dev';
const PORTFOLIO = import.meta.env.VITE_PORTFOLIO_TITLE || "Alex's Portfolio";

/** Types the domain into the portfolio name and mirrors it to the browser tab. */
export function usePortfolioTypewriter(enabled, fallbackTitle = 'Alex Dowsett') {
    const [text, setText] = useState(enabled ? '' : fallbackTitle);
    const [isTyping, setIsTyping] = useState(enabled);

    useEffect(() => {
        if (!enabled) {
            setText(fallbackTitle);
            setIsTyping(false);
            document.title = 'Privacy & terms | Alex Dowsett';
            return undefined;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setText(PORTFOLIO);
            setIsTyping(false);
            document.title = PORTFOLIO;
            return undefined;
        }

        let textNow = '';
        let phraseIndex = 0;
        let timeoutId;
        const phrases = [DOMAIN, PORTFOLIO];

        const type = () => {
            const phrase = phrases[phraseIndex];
            if (textNow.length < phrase.length) {
                textNow += phrase[textNow.length];
                setText(textNow);
                document.title = textNow;
                timeoutId = window.setTimeout(type, 105);
                return;
            }

            if (phraseIndex === 0) {
                timeoutId = window.setTimeout(erase, 900);
            } else {
                setIsTyping(false);
            }
        };

        const erase = () => {
            textNow = textNow.slice(0, -1);
            setText(textNow);
            document.title = textNow || '|';
            if (textNow.length) {
                timeoutId = window.setTimeout(erase, 60);
            } else {
                phraseIndex = 1;
                timeoutId = window.setTimeout(type, 105);
            }
        };

        setText('');
        setIsTyping(true);
        document.title = '|';
        timeoutId = window.setTimeout(type, 500);

        return () => window.clearTimeout(timeoutId);
    }, [enabled, fallbackTitle]);

    return { text, isTyping };
}

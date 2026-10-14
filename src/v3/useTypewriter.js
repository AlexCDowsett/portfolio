import { useEffect, useState } from 'react';

const TITLE = import.meta.env.VITE_PORTFOLIO_TITLE || "Alex's Portfolio";

export function useTypewriter() {
    const [text, setText] = useState('');
    const [typing, setTyping] = useState(true);

    useEffect(() => {
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let timer;
        let current = '';
        let stage = 0;
        const phrases = ['dowsett.dev', TITLE];
        const finish = () => {
            window.clearTimeout(timer);
            setText(TITLE);
            setTyping(false);
        };
        const tick = () => {
            if (stage === 1) {
                current = current.slice(0, -1);
                if (!current) stage = 2;
            } else {
                const phrase = phrases[stage === 0 ? 0 : 1];
                current = phrase.slice(0, current.length + 1);
                if (current === phrase) {
                    if (stage === 2) { finish(); return; }
                    setText(current);
                    stage = 1;
                    timer = window.setTimeout(tick, 1300);
                    return;
                }
            }
            setText(current);
            timer = window.setTimeout(tick, stage === 1 ? 48 : 100);
        };
        if (motion.matches) finish();
        else timer = window.setTimeout(tick, 250);
        const change = () => { if (motion.matches) finish(); };
        motion.addEventListener('change', change);
        return () => {
            window.clearTimeout(timer);
            motion.removeEventListener('change', change);
        };
    }, []);
    return { text, typing };
}

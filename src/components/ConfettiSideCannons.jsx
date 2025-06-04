import confetti from "canvas-confetti";

export function ConfettiSideCannons() {
        const end = Date.now() + 100; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

        const frame = () => {
            if (Date.now() > end) return;

            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                startVelocity: 40,
                origin: { x: 0, y: 0.5 },
                colors: colors,
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                startVelocity: 40,
                origin: { x: 1, y: 0.5 },
                colors: colors,
            });

            requestAnimationFrame(frame);
        };

        frame();
    }
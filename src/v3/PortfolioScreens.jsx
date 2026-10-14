import { Component, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import OriginalScreens from '../components/OriginalScreens.jsx';

class PreviewBoundary extends Component {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? null : this.props.children; }
}

function OverviewCamera() {
    const { camera, size, invalidate } = useThree();
    useLayoutEffect(() => {
        // Blend halfway between the wide overview and the legacy scene's close framing.
        const closeZoom = size.width / size.height / 0.85;
        const zoom = (1 + closeZoom) / 2;
        camera.fov = 2 * Math.atan(Math.tan(75 * Math.PI / 360) / zoom) * 180 / Math.PI;
        camera.updateProjectionMatrix();
        invalidate();
    }, [camera, size.width, size.height, invalidate]);
    return null;
}

export default function PortfolioScreens() {
    const container = useRef(null);
    const [visible, setVisible] = useState(false);
    const [ready, setReady] = useState(false);
    const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const [supported] = useState(() => {
        try {
            const context = document.createElement('canvas').getContext('webgl2');
            if (!context) return false;
            context.getExtension('WEBGL_lose_context')?.loseContext();
            return true;
        } catch { return false; }
    });
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '100px' });
        observer.observe(container.current);
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const change = () => setReduced(media.matches);
        media.addEventListener('change', change);
        return () => { observer.disconnect(); media.removeEventListener('change', change); };
    }, []);
    const markReady = useMemo(() => () => setReady(true), []);
    return <div className="v3-screens-preview" ref={container}>
        <div className="v3-screens-fallback" aria-hidden={ready}><span>THE ORIGINAL PORTFOLIO</span><strong>A room full of ideas.</strong><small>{supported ? 'Loading the 3D screens…' : 'Explore the original site to see more.'}</small></div>
        {supported && visible && <div className={`v3-screens-render ${ready ? 'is-ready' : ''}`} role="img" aria-label="The original portfolio’s 3D screens, lighting and project demos">
            <PreviewBoundary><Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 1.5]} frameloop={reduced ? 'demand' : 'always'} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}>
                <OverviewCamera />
                {/* Preserve the original overview pose. Recentring the floor moves the screens far from the camera. */}
                <Suspense fallback={null}><group scale={0.9} position={[0, -2.5, -1]} rotation={[0.2, -0.1, 0]}><OriginalScreens playing={!reduced} onReady={markReady} /></group></Suspense>
            </Canvas></PreviewBoundary>
        </div>}
    </div>;
}

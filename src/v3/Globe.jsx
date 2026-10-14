import { Component, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { BackSide, SRGBColorSpace, TextureLoader } from 'three';
import { CanvasHealth } from './CanvasHealth.jsx';

const EARTH_ROTATION_SPEED = 0.035;
const CLOUD_RELATIVE_DRIFT = 0.009;

class GlobeBoundary extends Component {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    componentDidCatch() { this.props.onFailure(); }
    render() { return this.state.failed ? null : this.props.children; }
}

function Earth({ moving, onReady }) {
    const surface = useRef();
    const clouds = useRef();
    const [texture, cloudTexture] = useLoader(TextureLoader, ['/v3/earth.jpg', '/v3/clouds.webp']);
    texture.colorSpace = SRGBColorSpace;
    cloudTexture.colorSpace = SRGBColorSpace;
    useEffect(() => { onReady(); }, [onReady]);
    useFrame((_, delta) => {
        if (!moving) return;
        const step = Math.min(delta, 0.05);
        if (surface.current) surface.current.rotation.y += step * EARTH_ROTATION_SPEED;
        // Travel with Earth, while drifting backwards relative to its surface.
        if (clouds.current) clouds.current.rotation.y += step * (EARTH_ROTATION_SPEED - CLOUD_RELATIVE_DRIFT);
    });
    return (
        <group rotation={[0.14, -1.65, -0.14]}>
            <group ref={surface}>
                <mesh>
                    <sphereGeometry args={[2, 64, 48]} />
                    <meshStandardMaterial map={texture} roughness={0.92} metalness={0.12} color="#bac8bc" />
                </mesh>
                <mesh>
                    <sphereGeometry args={[2.035, 40, 24]} />
                    <meshBasicMaterial color="#b6d3cc" wireframe transparent opacity={0.055} />
                </mesh>
            </group>
            <mesh ref={clouds}>
                <sphereGeometry args={[2.018, 64, 48]} />
                <meshStandardMaterial map={cloudTexture} transparent opacity={0.48} depthWrite={false} roughness={1} />
            </mesh>
            <mesh>
                <sphereGeometry args={[2.07, 48, 32]} />
                <meshBasicMaterial color="#629eae" side={BackSide} transparent opacity={0.12} />
            </mesh>
        </group>
    );
}

export default function Globe() {
    const container = useRef();
    const [visible, setVisible] = useState(true);
    const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const [ready, setReady] = useState(false);
    const [failed, setFailed] = useState(false);
    const markReady = useRef(() => setReady(true)).current;
    const markFailed = useRef(() => { setFailed(true); setReady(false); }).current;
    const [supported] = useState(() => {
        try {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
            if (!context) return false;
            context.getExtension('WEBGL_lose_context')?.loseContext();
            return true;
        } catch { return false; }
    });
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting);
            if (!entry.isIntersecting) setReady(false);
        }, { rootMargin: '100px' });
        // Observe the hero, whose bounds remain reliable when the globe is clipped on phones.
        observer.observe(container.current.closest('section') || container.current);
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onMotion = () => setReduced(motion.matches);
        motion.addEventListener('change', onMotion);
        return () => { observer.disconnect(); motion.removeEventListener('change', onMotion); };
    }, []);
    const moving = visible && !reduced;
    return (
        <div className="v3-globe" ref={container} data-moving={moving}>
            <div className={`v3-globe-fallback ${ready && !failed ? 'is-hidden' : ''}`} aria-hidden="true"><span className="v3-fallback-surface" /><span className="v3-fallback-clouds" /></div>
            <div className="v3-globe-render" aria-hidden="true">
                {supported && visible && !failed && <GlobeBoundary onFailure={markFailed}><Suspense fallback={null}>
                    <Canvas camera={{ position: [0, 0, 6.3], fov: 45 }} dpr={[1, 1.5]} frameloop={moving ? 'always' : 'demand'} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}>
                        <CanvasHealth onFailure={markFailed} />
                        <ambientLight intensity={0.55} />
                        <directionalLight position={[4, 3, 4]} color="#f1e3c5" intensity={2.5} />
                        <directionalLight position={[-4, -1, 1]} color="#325467" intensity={0.8} />
                        <Earth moving={moving} onReady={markReady} />
                    </Canvas>
                </Suspense></GlobeBoundary>}
            </div>
        </div>
    );
}

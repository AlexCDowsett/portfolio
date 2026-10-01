import { Suspense, useEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '../data/projects.js';

function fitScreenUv(geometry) {
    const fitted = geometry.clone();
    const uv = fitted.getAttribute('uv');
    if (!uv) return fitted;
    let minU = Infinity; let maxU = -Infinity; let minV = Infinity; let maxV = -Infinity;
    for (let index = 0; index < uv.count; index += 1) {
        minU = Math.min(minU, uv.getX(index)); maxU = Math.max(maxU, uv.getX(index));
        minV = Math.min(minV, uv.getY(index)); maxV = Math.max(maxV, uv.getY(index));
    }
    const width = maxU - minU; const height = maxV - minV;
    for (let index = 0; index < uv.count; index += 1) {
        uv.setXY(index, (uv.getX(index) - minU) / width, (uv.getY(index) - minV) / height);
    }
    uv.needsUpdate = true;
    return fitted;
}

function RoomModel() {
    const { scene } = useGLTF('/models/old_computers.glb');
    const textures = useTexture(projects.map((project) => project.art));
    const room = useMemo(() => {
        const copy = scene.clone(true);
        const artwork = new Map(projects.map((project, index) => [project.screen, textures[index]]));
        artwork.set('Object_213', textures[0]);
        artwork.set('Object_228', textures[6]);
        copy.traverse((object) => {
            const texture = artwork.get(object.name);
            if (texture && object.isMesh) {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.anisotropy = 8;
                texture.wrapS = THREE.ClampToEdgeWrapping;
                texture.wrapT = THREE.ClampToEdgeWrapping;
                texture.generateMipmaps = false;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.needsUpdate = true;
                object.geometry = fitScreenUv(object.geometry);
                object.material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, side: THREE.DoubleSide, depthTest: false, depthWrite: false });
                object.renderOrder = 999;
            }
            if (object.isMesh && object.name !== 'Object_14' && !texture) {
                object.material = Array.isArray(object.material)
                    ? object.material.map((material) => material.clone())
                    : object.material.clone();
                const materials = Array.isArray(object.material) ? object.material : [object.material];
                materials.forEach((material) => material.color?.multiply(new THREE.Color('#eee3cf')));
            }
            if (object.name === 'Object_14' && object.isMesh) {
                object.material = object.material.clone();
                object.material.color.set('#817b69');
            }
        });
        return copy;
    }, [scene, textures]);

    return (
        <group position={[0, -2.5, -1]} rotation={[0.2, -0.1, 0]} scale={0.9}>
            <ambientLight intensity={1.5} color="#fff4e3" />
            <directionalLight position={[-4, 8, 6]} intensity={2} color="#fff0d8" />
            <pointLight position={[2, 4, -2]} intensity={10} distance={18} color="#d9a77b" />
            <group>
                <primitive object={room} />
            </group>
        </group>
    );
}

function ResponsiveCamera() {
    const { camera, size } = useThree();
    useEffect(() => {
        camera.position.set(0, 0.8, size.width < 600 ? 11.5 : 9);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
    }, [camera, size.width]);
    return null;
}

function LoadingRoom() {
    return <Html center><span className="v2-room-loading">Waking the old computers…</span></Html>;
}

export function ProjectRoom() {
    return (
        <div className="v2-room-canvas" aria-label="Interactive 3D room of computers showing project screens">
            <Canvas camera={{ position: [0, 0.8, 9], fov: 48 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
                <color attach="background" args={['#e9e7dc']} />
                <ResponsiveCamera />
                <Suspense fallback={<LoadingRoom />}>
                    <RoomModel />
                    <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={0.85} maxPolarAngle={2.1} rotateSpeed={0.55} />
                </Suspense>
            </Canvas>
            <span className="v2-room-caption" aria-hidden="true">PROJECT ROOM · DRAG TO LOOK AROUND</span>
        </div>
    );
}

useGLTF.preload('/models/old_computers.glb');

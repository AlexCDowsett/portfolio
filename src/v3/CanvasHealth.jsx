import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export function CanvasHealth({ onFailure }) {
    const canvas = useThree(state => state.gl.domElement);
    useEffect(() => {
        const lost = event => { event.preventDefault(); onFailure(); };
        canvas.addEventListener('webglcontextlost', lost);
        return () => canvas.removeEventListener('webglcontextlost', lost);
    }, [canvas, onFailure]);
    return null;
}

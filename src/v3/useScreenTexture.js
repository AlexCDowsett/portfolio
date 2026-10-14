import { useEffect, useState } from 'react';
import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { SRGBColorSpace, VideoTexture } from 'three';

// A decoded image remains visible until Safari actually supplies a video frame.
// Autoplay restrictions or a failed video never leave a monitor blank.
export function useScreenTexture(src, posterSrc, playing) {
    const poster = useTexture(posterSrc);
    const { invalidate } = useThree();
    const [current, setCurrent] = useState(null);
    useEffect(() => {
        poster.colorSpace = SRGBColorSpace;
        poster.needsUpdate = true;
        invalidate();
    }, [poster, invalidate]);
    useEffect(() => {
        setCurrent(null);
        if (!playing) return undefined;
        const video = document.createElement('video');
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.loop = true;
        video.preload = 'auto';
        video.crossOrigin = 'anonymous';
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        let disposed = false;
        let texture;
        let frame;
        const activate = () => {
            if (disposed || video.readyState < 2) return;
            texture ||= new VideoTexture(video);
            texture.colorSpace = SRGBColorSpace;
            setCurrent(texture);
            invalidate();
        };
        const decoded = () => {
            if (video.requestVideoFrameCallback) frame = video.requestVideoFrameCallback(activate);
            else activate();
        };
        const fallback = () => {
            if (!disposed) { setCurrent(null); invalidate(); }
        };
        video.addEventListener('playing', decoded);
        video.addEventListener('error', fallback);
        video.src = src;
        video.play().catch(fallback);
        return () => {
            disposed = true;
            if (frame !== undefined) video.cancelVideoFrameCallback?.(frame);
            video.removeEventListener('playing', decoded);
            video.removeEventListener('error', fallback);
            video.pause();
            video.removeAttribute('src');
            video.load();
            texture?.dispose();
        };
    }, [src, playing, invalidate]);
    return current || poster;
}

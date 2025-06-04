import {motion, useScroll, useSpring} from "framer-motion";


const ScrollProgress = ({ isSticky, isMobile }) => {
    const {scrollYProgress} = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 origin-left"
            style={{ 
                scaleX,
                height: isMobile && isSticky ? "4px" : "2px",
                backgroundColor: '#a3a3a3'  // Changed back to original gray color
            }}/>
    )
}
export default ScrollProgress;

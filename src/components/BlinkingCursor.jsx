import React from "react";
import { motion } from "framer-motion";

const BlinkingCursor = () => {
    return (
        <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{
                display: "inline-block",
                marginLeft: "5px",  // Optional: spacing after text
                lineHeight: "1",    // To keep underscore aligned with text
            }}
        >_
        </motion.span>
    );
};

export default BlinkingCursor;

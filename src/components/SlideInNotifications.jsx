import React, { useEffect } from "react";
import { FiMail, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const Notification = ({ text, id, removeNotif, duration }) => {
    useEffect(() => {
        const timeoutRef = setTimeout(() => {
            removeNotif(id);
        }, duration);

        return () => clearTimeout(timeoutRef);
    }, [id, removeNotif, duration]);

    const classType = text.includes("Error") ? "bg-red-700" : "bg-green-700";

    return (
        <motion.div
            layout
            initial={{ y: -15, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`p-2 flex items-center text-center rounded gap-2 text-s sm:text-lg font-medium shadow-lg text-white pointer-events-auto ${classType} ${duration === 2000 ? "whitespace-nowrap" : ""}`}
        >

            <FiMail className="mt-0.5 text-3xl" />
            <span><p className="lg:mr-32 lg:ml-32">{text}</p></span>
            <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
                <FiX />
            </button>
        </motion.div>
    );
};

export default Notification;
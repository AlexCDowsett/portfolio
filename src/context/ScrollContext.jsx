import React, { createContext, useState, useContext } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const [isAboutVisible, setIsAboutVisible] = useState(false);
    const [isExperienceVisible, setIsExperienceVisible] = useState(false);
    const [isProjectsVisible, setIsProjectsVisible] = useState(false);
    const [isContactVisible, setIsContactVisible] = useState(false);

    return (
        <ScrollContext.Provider value={{
            isAboutVisible,
            setIsAboutVisible,
            isExperienceVisible,
            setIsExperienceVisible,
            isProjectsVisible,
            setIsProjectsVisible,
            isContactVisible,
            setIsContactVisible
        }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScroll = () => useContext(ScrollContext); 
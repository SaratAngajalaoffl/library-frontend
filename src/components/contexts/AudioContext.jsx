import React, { createContext, useContext, useState } from "react";

const audioContext = createContext();

const AudioProvider = ({ children }) => {
    const [book, setBook] = useState(null);

    const play = () => {};

    const pause = () => {};

    const stop = () => {};

    return <audioContext.Provider value={{}}>{children}</audioContext.Provider>;
};

export const useAuthContext = () => {
    const data = useContext(audioContext);

    return data;
};

export default AudioProvider;

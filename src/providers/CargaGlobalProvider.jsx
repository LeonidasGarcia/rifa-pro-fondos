import React, { useState } from "react";

const globalCargaContext = React.createContext();

export const useGlobalCargaContext = () => {
    return globalCargaContext;
}

const CargaGlobalProvider = ({ children }) => {
    const [cargaGlobal, setGlobalCarga] = useState(false);

    return (
        <globalCargaContext.Provider value={[cargaGlobal, setGlobalCarga]}>
            {children}
        </globalCargaContext.Provider>
    );
}

export default CargaGlobalProvider;

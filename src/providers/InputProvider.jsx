import React, { useState } from "react"

const inputContext = React.createContext();

export const useInputContext = () => {
    return inputContext;
}

const InputProvider = ({ children }) =>{

    const [comprador, setComprador] = useState({
        comprador: "",
        contacto: "",
        tickets: "",
        compradorAntiguo: "",
        ticketsRef: ""
    });


    return (
        <inputContext.Provider value={[comprador, setComprador]}>
            {children}
        </inputContext.Provider>
    );

}

export default InputProvider;
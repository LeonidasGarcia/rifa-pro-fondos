import React, { useState } from "react"

const vendedorContext = React.createContext();

export const useVendedorContext = () => {
    return vendedorContext;
}

const VendedorProvider = ({ children }) =>{

    const [vendedor, setVendedor] = useState({
        nombre: "",
        contador: 0,
        compradores: [],
        email: "",
        admin: false
    });


    return (
        <vendedorContext.Provider value={[vendedor, setVendedor]}>
            {children}
        </vendedorContext.Provider>
    );

}

export default VendedorProvider;
import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVendedorContext } from "../providers/VendedorProvider";
import { ElementoCarga } from "./Page";

const Login = () => {

    const refCorreo = useRef(null);
    const refClave = useRef(null);
    const navegar = useNavigate();
    const [vendedor, setVendedor] = useContext(useVendedorContext());
    const [error, setError] = useState(false);
    const [errorHumano, setErrorHumano] = useState("");
    const [errorServidor, setErrorServidor] = useState("");
    const [cargando, setCargando] = useState(false);

    useEffect(()=>{
        sessionStorage.setItem("vendedor", JSON.stringify({nombre:""}));
    }, [])

    const loginAction = ()=>{

        setCargando(true);

        (async ()=>{
            fetch("https://rifa-pro-fondos-tau.vercel.app/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: refCorreo.current.value,
                    contrasena: refClave.current.value
                }) 
            }).then(res=>{
                return res.json();
            }).then(res=>{
                if ("error" in res) {
                    setCargando(false);
                    setError(true);
                    setErrorHumano("Correo o contraseña incorrectos");
                    refCorreo.current.value = "";
                    refClave.current.value = "";
                    setTimeout(()=>{
                        setErrorHumano("");
                        setError(false);
                    }, 1500);
                    
                } else {
                    setCargando(false);
                    setVendedor(res);
                    navegar("/registrar");
                }
            }).catch((err)=>{
                setError(true);
                setErrorServidor("El servidor no responde");
                setCargando(false);
                setTimeout(()=>{
                setError(false);
                setErrorServidor("");
                }, 1500);
            })
        })()
    }

    return (
        <>
        <div className="flex h-screen items-center">
        <section className="w-80 lg:w-Login rounded-xl h-96 lg:h-Login outline-dashed outline-white relative p-4 sm:flex sm:flex-col sm:items-center sm:relative sm:p-8">
                <h1 className="text-4xl text-white mb-4 mt-4 font-bold self-start">Iniciar Sesión</h1>
                <form action="/" className="flex flex-col flex-1 justify-center items-center">
                    <div className="m-8 mb-1 flex flex-col">
                        <label htmlFor="correo" className="text-center text-white font-bold">Ingrese su correo institucional</label>
                        <input ref={refCorreo} autoFocus name="correo" id="correo" autoComplete="true" placeholder="nombre.paternom@unmsm.edu.pe" type="email" className="w-72 m-1 p-2 pt-0 pb-1 bg-transparent text-center border-solid outline-none border-2 border-transparent border-b-blue-600 h-6" />
                    </div>
                    <div className="m-8 mt-1 flex flex-col">
                        <label htmlFor="clave" className="text-center text-white font-bold">Ingrese su contraseña</label>
                        <input ref={refClave} name="password" id="clave" autoComplete="true" placeholder="Contraseña que se le ha asignado" type="password" className="w-72 m-1 p-2 pt-0 pb-1 text-center border-solid outline-none border-2 bg-transparent border-transparent border-b-blue-600 h-6" />
                    </div>
                </form>
                <button onClick={()=> (cargando) ? "" : loginAction()} className="flex justify-center items-center bg-blue-400 text-2xl w-60 h-12 rounded-xl m-8 text-white font-bold active:bg-blue-500">{ (cargando) ? <ElementoCarga /> : "Ingresar" }</button>
                { (error) ? <span className="absolute bottom-0 mb-6 text-red-600 font-bold">{ (errorHumano != "") ? errorHumano : errorServidor }</span> : <></> }
            </section>
        </div> 
        </>

    );
}

export default Login;
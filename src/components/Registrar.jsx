import { faArrowAltCircleLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { useVendedorContext } from "../providers/VendedorProvider";
import { useGlobalCargaContext } from "../providers/CargaGlobalProvider";
import { useInputContext } from "../providers/InputProvider";
import InputProvider from "../providers/InputProvider";
import { ElementoCarga } from "./Page";

const Manage = () => {

    const [vendedor, setVendedor] = useContext(useVendedorContext());

    useEffect(()=>{

        let vendedorGuardado = JSON.parse(sessionStorage.getItem("vendedor"));

        try {
            if (vendedorGuardado.nombre === "") {
                sessionStorage.setItem("vendedor", JSON.stringify(vendedor));
                setVendedor(vendedor);
                setVendedor(vendedorGuardado);
            
            }
            else {
                setVendedor(vendedorGuardado);
            }   
        } catch (error) {}
        
    }, [])

    const cerrarSesion = () => {
        setVendedor("");
    }

    return (
        <>
            {(vendedor.nombre != "" && typeof vendedor.nombre !== "undefined") ? <><div className="flex flex-col w-screen">
                <Link  to="/"><button onClick={()=>cerrarSesion()} className="relative m-5"><FontAwesomeIcon icon={faArrowAltCircleLeft} /> Cerrar Sesión</button></Link>
                <h1 className="flex self-center w-3/4 relative sm:top-0 mt-5 text-center text-white text-5xl font-bold justify-center items-center">
                    <div className="w-full">Bienvenido/a, {vendedor.nombre}</div>
                </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center order-1">
                
                    <TablaVendidos datosCompradores={vendedor.compradores} contador={vendedor.contador} />
                    <div className="order-1 sm:order-1">
                        <Registrar />       
                        {(vendedor.admin) ? <DownladExcel /> : "ni pinxo"}
                    </div>
                
                
            </div></> : <><div className="flex w-screen relative justify-center items-center h-screen sm:h-screen">Oe inicia sesión primero, sano</div></>}
        </>
    );
}

const Registrar = () => {

    const [cargaGlobal, setGlobalCarga] = useContext(useGlobalCargaContext());
    const [tickets, setTickets] = useState("");
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const inputConcursante = useRef(null);
    const inputContacto = useRef(null);
    const inputTickets = useRef(null);
    
    const [vendedor, setVendedor] = useContext(useVendedorContext());

    const cambiarTickets = (e) => {
        let num = e.target.value;
        if (!num.includes("-") && !num.includes("e")){ 
            if (num == "") setTickets(num) 
            else {
                num = Number(num);
                if (num > 20 - vendedor.contador) setTickets(20-vendedor.contador) 
                else if (num % 1 !== 0) setTickets(Math.floor(Number(num)));
                else if (num != 0) setTickets(num);
            }
        
        } else {
            setTickets(1);
        }
        
    }

    const registarNuevoComprador = () => {

        let nombreConcursante = inputConcursante.current.value.trim();
        let contactoConcursante = inputContacto.current.value.trim();
        let ticketsConcursante = inputTickets.current.value.trim();

        if (20-vendedor.contador != 0) {

            if (nombreConcursante != "" && contactoConcursante !== "" && ticketsConcursante != "" && !isNaN(Number(contactoConcursante)) && Number(contactoConcursante) != 0 && contactoConcursante.length <= 12) {
            
                if (Number(ticketsConcursante) <= 0) {
                    setMensaje("El numero de tickets no puede ser cero");
                    return;
                };
               
    
                setCargando(true);
                setGlobalCarga(true);
    
                (async ()=>{
                    fetch("/api/register", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nombre_comprador: inputConcursante.current.value,
                            telefono_comprador: inputContacto.current.value,
                            email_vendedor: vendedor.email,
                            tickets_numero: inputTickets.current.value
                        }) 
                    }).then(res=>res.json()).then(res=>{
                        if ("error" in res) {
                            setMensaje(res.error);
                            setTimeout(()=>{
                                setMensaje("");
                            }, 1500)
                        } else {
                            inputConcursante.current.value = "";
                            inputContacto.current.value = "";
                            setTickets("");
                            setMensaje("Comprador registrado!");
                            sessionStorage.setItem("vendedor", JSON.stringify(res));
                            setTimeout(()=>{
                                setMensaje("");
                            }, 1500)
                            setVendedor(res);
                        }
                        setCargando(false);
                        setGlobalCarga(false);
                    }).catch(err=>{
                        setCargando(false);
                        setGlobalCarga(false);
                        setMensaje("Error en el servidor");
                    });
                })()
                
            } else {
                setCargando(false);
                setGlobalCarga(false);
                setMensaje("Los datos ingresados no son validos");
                inputConcursante.current.value = "";
                inputContacto.current.value = "";
                setTickets("");
            }

        } else {
            setCargando(false);
            setGlobalCarga(false);
                setMensaje("Ya vendiste todos tus tickets");
        }

        setTimeout(()=>{
            setMensaje("");
        }, 1500)

    }

    return (
        <div className="flex flex-col order-1 sm:order-2 m-5 p-5 rounded-lg relative backdrop-blur-sm outline-dashed outline-blue-600">
                <span className="text-sm absolute bottom-0 right-0 mr-2 mb-2 z-50">Ventas Restantes: {20 - vendedor.contador}</span>
                <div className="m-3">
                    <label htmlFor="nombres">Nombres completos del concursante:</label>
                    <input placeholder="Nombres completos" name="nombres" ref={inputConcursante} type="text" className="bg-transparent outline-none m-2 border-2 border-transparent border-b-blue-600 p-2 pb-3 h-6" />
                </div>
                <div className="m-3">
                    <label htmlFor="contacto">Contacto del concursante:</label>
                    <input placeholder="Teléfono celular" name="contacto" ref={inputContacto} type="text" className="bg-transparent outline-none m-2 border-2 text-1xl border-transparent border-b-blue-600 p-2 pb-3 h-6" />
                </div>
                <div className="m-3">
                    <label htmlFor="tickets">N° tickets</label>
                    <input onChange={(e)=>cambiarTickets(e)} ref={inputTickets} className="bg-transparent text-center outline-none border-b-2 border-blue-600 p-1" type="number" pattern="^[0-9]*$" min="1" max={20 - vendedor.contador} value={tickets} />
                </div>
                <div className="flex flex-col justify-center">
                    <button onClick={()=> (cargaGlobal) ? "" : ((cargando) ? "" : registarNuevoComprador())} className="flex justify-center items-center m-5 w-40 h-12 self-center rounded-lg text-white bg-blue-500 active:bg-blue-600 hover:bg-blue-700 transition-colors">{ (cargando) ? <ElementoCarga /> : "Registrar" }</button>
                    <div className="relative h-2">
                        <span className="absolute">{(cargando) ? "Registrando..." : ""}</span>
                        <span className="h-2">{mensaje}</span>
                    </div>
                </div>
            </div>
    );
}

const TablaVendidos = ({ datosCompradores, contador }) =>{
     return (
        <div className="flex flex-col order-2 sm:order-2 w-80 sm:w-ContenedorTablaVendidos sm:h-ContenedorTablaVendidos h-ContenedorMobileTablaVendidos  m-5 p-5 rounded-lg backdrop-blur-sm outline-dashed outline-blue-600">
            <Cabecera />
            <InputProvider>
                <FilasDinamicas datosCompradores={datosCompradores} />
                <ActualizarInfo contador={contador} />
            </InputProvider>
        </div>
     );
}

const Cabecera = () =>{
    return (
        <div className="grid grid-cols-3 auto-rows-TablaVendidos font-bold text-sm sm:text-1xl border-2 border-solid border-blue-600 hover:bg-blue-600 transition-colors duration-200">
                <span className="text-white flex justify-center items-center bg-transparent p-2 border-r-2 border-blue-600 select-none">Concursante</span>
                <span className="text-white flex justify-center items-center bg-transparent p-2 select-none">Contacto</span>
                <span className="text-white flex justify-center items-center bg-transparent p-2 border-l-2 border-blue-600 select-none">Tickets vendidos</span>
        </div>
    );
}

const FilasDinamicas = ({datosCompradores}) =>{

    const [comprador, setComprador] = useContext(useInputContext());
    const filaRef = useRef({});

    return (
        <div className="flex-1 bg-transparent overflow-auto">
                { datosCompradores.map((compradores)=>{
                    return (
                        <>
                        <div key={compradores.id} ref={(el) => (filaRef.current[`opcion-${compradores.id}`] = el)} onClick={(e)=>{

                            if (!filaRef.current[`opcion-${compradores.id}`].classList.contains("bg-blue-600")) {
                                filaRef.current[`opcion-${compradores.id}`].classList.remove("bg-transparent");
                                filaRef.current[`opcion-${compradores.id}`].classList.add("bg-blue-600");
                            } else {
                                filaRef.current[`opcion-${compradores.id}`].classList.remove("bg-blue-600");
                                filaRef.current[`opcion-${compradores.id}`].classList.add("bg-transparent");
                                setComprador({
                                    comprador: "",
                                    contacto: "",
                                    tickets: "",
                                    compradorAntiguo: "",
                                    ticketsRef: ""
                                });
                                return;
                            }                            

                            Object.values(filaRef.current).forEach((el) => {
                                if (el) {
                                    if (el.id !== `opcion-${compradores.id}`) {
                                        el.classList.remove("bg-blue-600");
                                        el.classList.add("bg-transparent");
                                    }
                                }
                              });

                              /*
                              if (comprador.compradorAntiguo != "") {
                                console.log("me ejecuto")
                                const nuevoComprador = comprador;
                                nuevoComprador.comprador = compradores.comprador;
                                nuevoComprador.contacto = compradores.telefono;
                                nuevoComprador.tickets = compradores.contador;
                                nuevoComprador.ticketsRef = compradores.contador;
                                setComprador(nuevoComprador);
                              } else {
                                */
                                setComprador({
                                    comprador: compradores.comprador,
                                    contacto: compradores.telefono,
                                    tickets: compradores.contador,
                                    compradorAntiguo: compradores.comprador,
                                    ticketsRef: compradores.contador
                                });
                              
                                
                            
                            
                            

                        }} id={`opcion-${compradores.id}`} className="grid text-sm sm:text-1xl grid-cols-3 auto-rows-auto transition-colors duration-200 border-solid border-2 border-t-0 border-blue-600">
                            <div className="flex break-words flex-col flex-wrap whitespace-normal font-bold cursor-pointer select-none border-r-2 p-2 text-center border-blue-600">
                                <div className="w-full">{compradores.comprador}</div>
                            </div>
                            <div className="flex justify-center items-center font-bold cursor-pointer select-none p-2 text-center">
                                <div className="w-full">{compradores.telefono}</div>
                            </div>
                            <span className="flex justify-center items-center font-bold cursor-pointer select-none border-l-2 border-blue-600 p-2 text-center">
                                <div className="w-full">{compradores.contador}</div>
                            </span>
                        </div>
                        </>
                    );
                }) }
        </div>
    );
}

const ActualizarInfo = ({contador}) => {

    const [cargaGlobal, setGlobalCarga] = useContext(useGlobalCargaContext());
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [comprador, setComprador] = useContext(useInputContext());
    const [vendedor, setVendedor] = useContext(useVendedorContext());

    const modificarTickets = (e) => {

        if (comprador.compradorAntiguo !== "") {
            let max;

            if (e.target.max > 20-contador) {
            max = Number(e.target.max);
        } else {
            max = 20-contador;
        }

        let num = e.target.value;
        if (!num.includes("-") && !num.includes("e")){ 
            if (num == "") setComprador({...comprador, tickets: num});
            num = Number(num);
            if (num > max) setComprador({...comprador, tickets: max});
            else {
                if (Number(num) % 1 !== 0) setComprador({...comprador, tickets: Math.floor(Number(num))});
                else if (num != 0) setComprador({...comprador, tickets: num});
            }
            
        } else {
            setComprador({...comprador, tickets: 1});
        }
        //setComprador({...comprador, tickets: num});
        //console.log(comprador.tickets);
        } else {
            setComprador({...comprador, tickets: ""});
        }

        
    }

    const modificarContacto = (e) => {

        if (comprador.compradorAntiguo !== "") {
            let contactoConcursante = e.target.value
            setComprador({ ...comprador, contacto: contactoConcursante })
        } else {
            setComprador({...comprador, contacto: ""});
        }

        
    }

    const modificarConcursante = (e) => {
        if (comprador.compradorAntiguo !== "") {
            const nombreComprador = e.target.value;
            setComprador({ ...comprador, comprador: nombreComprador })
        } else {
            setComprador({...comprador, comprador: ""});
        }
    }

    const actualizar = ()=> {

        setCargando(true);
        setGlobalCarga(true);

        let nombreConcursante = comprador.comprador.trim();
        let nombreNuevo = comprador.compradorAntiguo;
        let contactoConcursante = comprador.contacto;
        let ticketsConcursante = comprador.tickets;

        if (nombreConcursante != "" && contactoConcursante !== "" && ticketsConcursante != "" && !isNaN(Number(contactoConcursante)) && Number(contactoConcursante) != 0 && String(contactoConcursante).length <= 12) {

            const dataJSON = JSON.stringify({
                nombre_comprador: nombreNuevo,
                telefono_comprador: contactoConcursante,
                email_vendedor: vendedor.email,
                tickets_numero: String(ticketsConcursante),
                nuevo_comprador: nombreConcursante,
                tickets_Ref: comprador.ticketsRef
            });
            
            (async ()=>{
                fetch("/api/actualizar", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: dataJSON
                }).then(res=>res.json()).then(res=>{
                    if ("error" in res) {
                        setMensaje(res.error)
                    } else {
                        setMensaje("Datos actualizados!");
                        sessionStorage.setItem("vendedor", JSON.stringify(res));
                        setTimeout(()=>{
                            setMensaje("");
                        }, 1100)
                        const compradorNuevo = comprador;
                        compradorNuevo.compradorAntiguo = nombreConcursante;
                        compradorNuevo.ticketsRef = ticketsConcursante;
                        setComprador(compradorNuevo);
                        setVendedor(res);
                    }
                    setCargando(false);
                    setGlobalCarga(false);
                }).catch((err)=>{
                    setCargando(false);
                    setGlobalCarga(false);
                    setMensaje(err);
                });
            })()
           
            
        } else {
            setCargando(false);
            setGlobalCarga(false);
            setMensaje("Error al introducir los datos");
        }

        setTimeout(()=>{
            setMensaje("");
        }, 1100)

    }

    const eliminar = ()=> {

        if (comprador.comprador != "" && comprador.contacto != "") {

            setCargando(true);
            setGlobalCarga(true);

            (async ()=>{
                fetch("/api/erase", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre_comprador: comprador.comprador, 
                        email_vendedor: vendedor.email
                    })
                }).then(res=>res.json()).then(res=>{
                        if ("error" in res) {
                            setMensaje(res.error);
                        } else {
                            setMensaje("Datos eliminados!")
                            sessionStorage.setItem("vendedor", JSON.stringify(res));
                            setTimeout(()=>{
                                setMensaje("");
                            }, 1100)
                            setVendedor(res);
                            setComprador({
                                comprador: "",
                                contacto: "",
                                tickets: "",
                                compradorAntiguo: "",
                                ticketsRef: ""
                            });
                        }
                        setCargando(false);
                        setGlobalCarga(false);
                }).catch((err)=>{
                    setCargando(false);
                    setGlobalCarga(false);
                    setMensaje(err);
                })
            })()

        } else {
            setCargando(false);
            setGlobalCarga(false);
            setMensaje("Faltan campos por llenar");
        }

        setTimeout(()=>{
            setMensaje("");
        }, 1100)
        
    }

    return (
        <div className="p-3 m-3">
                <div className="flex flex-col sm:flex-row">
                    <div className="m-2 sm:ml-1 sm:mr-1">
                        <label htmlFor="concursante" className="text-sm">Nombre del concursante</label>
                                                                                                                                     
                        <input onChange={(e)=>modificarConcursante(e)} placeholder="Nombre a actualizar" name="concursante" className="sm:w-40 bg-transparent outline-none border-2 p-2 h-6 pb-3 border-transparent border-b-blue-600" type="text" value={comprador.comprador}/>
                    </div>
                    <div className="m-2 sm:ml-1 sm:mr-1">
                        <label htmlFor="contacto" className="text-sm">Número de teléfono</label>
                    <input onChange={(e)=>modificarContacto(e)} placeholder="Teléfono a actualizar" name="contacto" className="w-40 p-2 h-6 bg-transparent outline-none border-2 pb-3 border-transparent border-b-blue-600" maxLength="10" type="tel" value={comprador.contacto} />
                    </div>
                    <div className="m-2 sm:ml-1 sm:mr-1">
                        <label htmlFor="N° Tickets" className="text-sm">N° Tickets</label>
                        <input  onChange={(e)=>modificarTickets(e)} className="w-16 p-1 pt-0 outline-none text-center bg-transparent border-b-2 border-blue-600 pb-1" type="number" min="1" max={(20-contador+comprador.ticketsRef < 20) ? 20-contador+comprador.ticketsRef : 20} step="1" readOnly={false} value={comprador.tickets} />
                    </div>
                    
                </div>
                <div className="flex items-center justify-center mt-2">
                    <button onClick={()=>(cargaGlobal) ? "" : ((cargando) ? "" : actualizar())} className="bg-blue-500 active:bg-blue-700 hover:bg-blue-600 transition-colors m-1 w-32 h-8 self-center rounded-lg text-white">Actualizar</button>
                    <button onClick={()=>(cargaGlobal) ? "" : ((cargando) ? "" : eliminar())} className="bg-red-600 active:bg-red-800 hover:bg-red-700 m-1 w-32 h-8 self-center rounded-lg text-white">Eliminar</button>
                </div>
                <div className="flex justify-center items-center h-4 m-3 relative">
                    <span className="absolute text-center">{(cargando) ? "Estamos procesando su solicitud, espere..." : ""}</span>
                    <span>{mensaje}</span>
                </div>
            </div>
    );
}

const DownladExcel = ({admin}) => {
    
    const [vendedor, setVendedor] = useContext(useVendedorContext());
    const [cargaGlobal, setGlobalCarga] = useContext(useGlobalCargaContext())
    const [urlVendedor, setUrlVendedor] = useState("");
    const [urlComprador, setUrlComprador] = useState("");
    const [error, setError] = useState(false);
    const [cargando, setCargando] = useState(false);

    useEffect(()=>{

        setCargando(true);
        setGlobalCarga(true);

        (async ()=>{
            fetch("/api/download-excel-vendedores", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email_vendedor: vendedor.email
                })
            }).then(res=>res.blob()).then(res=>{
                    if ("error" in res) {
                    } else {
                        const urlNuevo = window.URL.createObjectURL(res);
                        setUrlVendedor(urlNuevo);
                        setCargando(false);
                        setGlobalCarga(false);
                    }
            }).catch((err)=>{
                setError(true);
            })
        })()

        

    }, [vendedor]);

    useEffect(()=>{

        setCargando(true);
        setGlobalCarga(true);

        (async ()=>{
            fetch("/api/download-excel-compradores", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email_vendedor: vendedor.email
                })
            }).then(res=>res.blob()).then(res=>{
                    if ("error" in res) {
                    } else {
                        const urlNuevo = window.URL.createObjectURL(res);
                        setUrlComprador(urlNuevo);
                        setCargando(false);
                        setGlobalCarga(false);
                    }
            }).catch((err)=>{
                setError(true);
            })
        })()

    }, [vendedor]);

    const descargarVendedores = () => {
        const link = document.createElement('a');
        link.href = urlVendedor;
        link.download = 'excel-vendedores.xlsx';  
        link.click();  
    }

    const descargarCompradores = () => {
        const link = document.createElement('a');
        link.href = urlComprador;
        link.download = 'excel-compradores.xlsx';  
        link.click();  
    }

    const recargar = () => {
        setCargando(true);
        setGlobalCarga(true);

        (async ()=>{
            fetch("/api/download-excel-vendedores", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email_vendedor: vendedor.email
                })
            }).then(res=>res.blob()).then(res=>{
                    if ("error" in res) {
                        setMensaje(res.error);
                    } else {
                        const urlNuevo = window.URL.createObjectURL(res);
                        setUrlVendedor(urlNuevo);
                        setCargando(false);
                        setGlobalCarga(false);
                    }
            }).catch((err)=>{
                setError(true);
            })
        })()

        setCargando(true);
        setGlobalCarga(true);

        (async ()=>{
            fetch("/api/download-excel-compradores", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email_vendedor: vendedor.email
                })
            }).then(res=>res.blob()).then(res=>{
                    if ("error" in res) {
                        setMensaje(res.error);
                    } else {
                        const urlNuevo = window.URL.createObjectURL(res);
                        setUrlComprador(urlNuevo);
                        setCargando(false);
                        setGlobalCarga(false);
                    }
            }).catch((err)=>{
                setError(true);
            })
        })()

    }

    return (
        <div className="flex flex-col justify-center items-center order-1 sm:order-2 m-5 relative ">
            <div className="flex flex-col sm-flex-row">
                <div className="flex justify-center items-center">
                    <button onClick={()=>(cargaGlobal) ? "" : ((cargando) ? "" : descargarVendedores())} className="bg-blue-500 active:bg-blue-600 hover:bg-blue-700 transition-colors p-4 rounded-lg m-3 flex justify-center items-center w-60 h-14">{(cargando) ? <><ElementoCarga aditional={"mr-2"} /> Descargar Vendedores</> : "Descargar Vendedores"}</button>
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={()=>(cargaGlobal) ? "" : ((cargando) ? "" : descargarCompradores())} className="bg-blue-500 active:bg-blue-600 hover:bg-blue-700 transition-colors p-4 rounded-lg m-3 flex justify-center items-center w-60 h-14">{(cargando) ? <><ElementoCarga aditional={"mr-2"} /> Descargar Compradores</> : "Descargar Compradores"}</button>
                </div>
            </div>
            <span className="m-1 flex justify-center items-center">{(error) ? <>Error al cargar el archivo <button className="underline ml-1" onClick={()=>recargar()}>Reintentar</button></> : ""}</span>
        </div>
    );
}

export default Manage;
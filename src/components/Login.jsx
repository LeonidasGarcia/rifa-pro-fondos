import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <section className="p-8 flex flex-col items-center w-Login h-Login bg-gray-50 rounded-xl">
                <h1 className="text-4xl mb-4 mt-4 font-bold self-start">Iniciar Sesión</h1>
                <form action="/" className="flex flex-col flex-1 justify-center items-center">
                    <div className="m-8 mb-1 flex flex-col">
                        <label htmlFor="correo" className="text-center font-bold">Ingrese su correo institucional</label>
                        <input autoFocus name="correo" id="correo" placeholder="nombre.paternom@unmsm.edu.pe" type="text" className="w-72 m-1 p-1 pl-2 pr-2 text-center rounded-lg border-solid border-slate-700 outline-none border-2 focus:border-slate-800" />
                    </div>
                    <div className="m-8 mt-1 flex flex-col">
                        <label htmlFor="clave" className="text-center font-bold">Ingrese su contraseña</label>
                        <input name="password" id="clave" placeholder="Contraseña que se le ha asignado" type="password" className="w-72 m-1 p-1 pl-2 pr-2 text-center rounded-lg border-solid border-slate-700 border-2 outline-none focus:border-slate-800" />
                    </div>
                </form>
                <Link to="/registrar"><button className="bg-slate-700 w-60 h-12 rounded-xl m-8 text-white font-bold active:bg-slate-800">Ingresar</button></Link>
            </section>

        </>

    );
}

export default Login;
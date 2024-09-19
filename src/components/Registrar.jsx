import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Registrar = () => {
    return (
        <>
            <Link to="/"><button className="absolute top-0 left-0 m-4 text-white"> <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Regresar al Login</button></Link>
            <div className="flex flex-col bg-slate-50 p-4 rounded-lg">
                <div>
                    <label htmlFor="nombres">Nombres completos del concursante:</label>
                    <input name="nombres" autoFocus type="text" className="outline-none rounded-e-lg m-2 border-2 p-1 border-slate-700" />
                </div>
                <div>
                    <label htmlFor="contacto">Contacto del concursante:</label>
                    <input name="contacto" type="text" className="outline-none m-2 rounded-e-lg border-2 p-1 border-slate-700" />
                </div>
                <button className="bg-blue-500 m-2 w-32 h-8 self-center rounded-lg text-white active:bg-blue-600">Registrar</button>
            </div>
        </>

    );
}

export default Registrar;
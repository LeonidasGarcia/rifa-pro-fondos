import Login from './Login.jsx'
import Manage from './Registrar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Page = () => {
    return (
        <>
        <div className='bg-mobile-background sm:bg-desktop-background bg-cover absolute w-full h-full'></div>
        <div className='absolute w-screen h-full sm:h-screen opacity-85 bg-gradient-to-t from-slate-900 to-slate-600' ></div>
        <div className="flex flex-col w-screen h-full sm:h-screen justify-center items-center">
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route path='/registrar' element={<Manage />} />
                </Routes>
            </BrowserRouter>
            <span className='block order-10 relative text-gray-400 text-center m-2'>Creado por LeaL Studio con mucho cariño para la FISI</span>
        </div>
        </>
    );
}

export const ElementoCarga = ({aditional}) => {
    return (
        <div className={`inline-block animate-cargando w-8 h-8 border-solid border-4 border-blue-50 border-t-blue-500 rounded-full ${aditional}`}></div>
    );
}

export default Page;
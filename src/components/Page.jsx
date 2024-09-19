import Login from './Login.jsx'
import Registrar from './Registrar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Page = () => {
    return (
        <div className="w-screen h-screen bg-slate-700 flex justify-center items-center">
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route path='/registrar' element={<Registrar />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default Page;
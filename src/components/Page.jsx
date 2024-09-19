import Login from './Login.jsx'
import Registrar from './Registrar.jsx'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

const Page = () => {
    return (
        <div className="w-screen h-screen bg-slate-700 flex justify-center items-center">
            <Router>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/registrar' element={<Registrar />} />
                </Routes>
            </Router>

        </div>
    );
}

export default Page;
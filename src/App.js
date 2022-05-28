import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/Shared/NotFound/NotFound';
import Purchase from './pages/Purchase/Purchase';
import RequireAuth from './pages/Login/RequireAuth';
function App() {
    return (
        <div className='home mx-auto'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/service/:id' element={<RequireAuth>
                    <Purchase />
                </RequireAuth>} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </div>
    );
}

export default App;

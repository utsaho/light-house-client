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
import Dashboard from './pages/Dashboard/Dashboard';
import MyOrders from './pages/Dashboard/MyOrders';
import MyProfile from './pages/Dashboard/MyProfile';
import AddAReview from './pages/Dashboard/AddAReview';
import ManageAllOrders from './pages/Dashboard/ManageAllOrders';
import RequireAdmin from './hooks/RequireAdmin';
import Payment from './pages/Dashboard/Payment';
import AddNewProduct from './pages/Dashboard/Admin/AddNewProduct';
import MakeAdmin from './pages/Dashboard/Admin/MakeAdmin';
import ManageProducts from './pages/Dashboard/Admin/ManageProducts';
import Blogs from './pages/Home/Blogs';

function App() {
    return (
        <div className='home mx-auto'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/blogs' element={<Blogs />} />
                <Route path='/service/:id' element={<RequireAuth>
                    <Purchase />
                </RequireAuth>} />

                {/* Nested Route */}
                <Route path='/dashboard' element={<RequireAuth>
                    <Dashboard /> </RequireAuth>} >
                    <Route index element={<MyProfile />} />
                    <Route path='orders' element={<MyOrders />} />
                    <Route path='review' element={<AddAReview />} />
                    <Route path='manageAllOrders' element={<RequireAdmin><ManageAllOrders /></RequireAdmin>} />
                    <Route path='addNewProduct' element={<RequireAdmin> <AddNewProduct /> </RequireAdmin>} />
                    <Route path='makeAdmin' element={<RequireAdmin> <MakeAdmin /> </RequireAdmin>} />
                    <Route path='manageProducts' element={<RequireAdmin><ManageProducts /></RequireAdmin>} />
                    <Route path='payment/:id' element={<Payment />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
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

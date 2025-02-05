
import LoginComponent from '../components/auth/LoginComponent';
import SignupComponent from '../components/auth/SignupComponent';
import ProtectedRoute from './ProtectedElement';
import {BrowserRouter , Routes, Route} from 'react-router-dom';

const RouterComponent = () => {
    
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/signup" element={<SignupComponent />} />
                    <Route path="/" element={<ProtectedRoute element={<SignupComponent />} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default RouterComponent;
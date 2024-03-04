import { Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import ProtectedView from './components/ProtectedView';
import SignupVerify from './components/SignupVerify';
import ResetPassword from './components/ResetPassword';

function App() {
    return (
        <Routes>
            <Route index element={ <ProtectedView><Dashboard /></ProtectedView>} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup/verify" element={<SignupVerify />} />
            <Route path="/reset/password" element={<ResetPassword />} />
        </Routes>
    )
}

export default App;

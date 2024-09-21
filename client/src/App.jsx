import React from 'react';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Signup from './components/userSignup';
import Dashboard from './components/talkwithAi';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/userSignup" element={<Signup />} />
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Signup from './components/userSignup';
import Dashboard from './components/talkwithAi';
import Texttoimage from './components/textToimage';
import Index from './components/index';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/userSignup" element={<Signup />} />
                <Route path="/talkwithAi" element={<Dashboard />} />
                <Route path="/textToimage" element={<Texttoimage/>} />
            </Routes>
        </Router>
    );
}

export default App;
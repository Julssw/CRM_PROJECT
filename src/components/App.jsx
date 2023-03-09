import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './NavBar';
import FormPage from './AddRequest';
import EditForm from './EditRequest';
import Tables from './TableRequest';




function App() {
    return (
        <Router>
            <NavBar />
                <Routes>
                    <Route path="/" element={<FormPage /> } />
                    <Route path="/table" element={<Tables /> } />
                    <Route path="/edit/:id" element={<EditForm /> } />
                </Routes>
            
        </Router>
 
 )
}
export default App;
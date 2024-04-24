
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EventCreate from './pages/EventCreate'; 
import Statistics from './pages/Statistics'; 
import UserManagement from './pages/UserManagement'; 
import CreateUser from './pages/CreateUser'; 
import EditUser from './pages/EditUser';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import ChangePassword from './components/ChangePassword';



registerLocale('fr', fr);
setDefaultLocale('fr');

function App() {
  

  return (
   // Use <Router> to wrap our routing system.
    //  Utilisation de <Router> pour encapsuler notre système de routage.
    <Router>
       
        {/* Configuration of the routes for our application. */}
        {/* Configuration des routes de notre application. */}
        <Routes>

          
          <Route path="/" element={<Login />} />
          <Route path="/change-password/:id" element={<ChangePassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/event/create" element={<EventCreate />} />
            
          <Route path="/admin/statistics" element={<Statistics />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/users/create" element={<CreateUser />} />
          <Route path="/admin/users/:id/edit" element={<EditUser />} />

              <Route path="*" element={<NotFound />} />
        
        </Routes>
    </Router>
  );
}


export default App;

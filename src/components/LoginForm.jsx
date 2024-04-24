
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/LoginForm.css';
import Logo from '../assets/logo.jpg';

function LoginForm() {
  // State hooks for managing form inputs, errors, and messages.
  // Hooks d'état pour gérer les entrées de formulaire, les erreurs et les messages.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  // UseEffect hook to check for password change messages in localStorage on component mount.
  // Hook useEffect pour vérifier la présence de messages de changement de mot de passe dans le localStorage lors du montage du composant.
  useEffect(() => {
    const message = localStorage.getItem('passwordSuccessMessage');
    if (message) {
      setPasswordChangeMessage(message);
      localStorage.removeItem('passwordSuccessMessage');
    }
  }, []); // This effect runs only once on component mount.

  // Function to handle form submission and login logic.
  // Fonction pour gérer la soumission de formulaire et la logique de connexion.
  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior.
    // Empêche le comportement de soumission de formulaire par défaut.
    event.preventDefault();

    try {
      // Make a POST request to the login API with the email and password.
      // Effectue une requête POST à l'API de connexion avec l'email et le mot de passe.
      const response = await axios.post('http://localhost:4000/api/login', { email, password });

      // Destructure the response data to get the message, authToken, and userId.
      // Déstructure les données de réponse pour obtenir le message, authToken et userId.
      const { message, authToken, userId } = response.data;

      // Check if it's the user's first login which requires a password change.
      // Vérifie s'il s'agit de la première connexion de l'utilisateur nécessitant un changement de mot de passe.
      if (message === 'First login - Change password') {
        // Store a message in localStorage prompting the user to change their password.
        // Stocke un message dans le localStorage invitant l'utilisateur à changer son mot de passe.
        localStorage.setItem('passwordChangeMessage', 'Première connexion: Veuillez modifier votre mot de passe.');
        
        // Navigate to the password change page with the userId as a parameter.
        // Navigue vers la page de changement de mot de passe avec l'userId en tant que paramètre.
        navigate(`/change-password/${userId}`);
      } else {
        // Store the authToken in localStorage for subsequent authenticated requests.
        // Stocke le authToken dans le localStorage pour les requêtes authentifiées ultérieures.
        localStorage.setItem('authToken', authToken);

        // Decode the JWT token to extract user information, specifically the userRole.
        // Décode le jeton JWT pour extraire les informations de l'utilisateur, spécifiquement le userRole.
        const decodedToken = jwtDecode(authToken);

        // Store the userRole in localStorage for role-based access control.
        // Stocke le userRole dans le localStorage pour le contrôle d'accès basé sur les rôles.
        localStorage.setItem('userRole', decodedToken.userRole);

        // Redirect the user to different pages based on their role.
        // Redirige l'utilisateur vers différentes pages en fonction de son rôle.
        if (decodedToken.userRole === 'admin') {
          window.location.href = "/admin/statistics";
        } else {
          window.location.href = "/dashboard"; 
        }
      }
    } catch (error) {
      // Set the error state with the error message from the response, if available, or the generic error message.
      // Définit l'état d'erreur avec le message d'erreur de la réponse, si disponible, ou le message d'erreur générique.
      setError(error.response?.data?.message || error.message);
    }
  }; 


  return (
    <form className="form" onSubmit={handleSubmit}>
       <div> <img src={Logo} alt="logo" /></div>
        {passwordChangeMessage && <div className="password-updated">{passwordChangeMessage}</div>}
        {error && <div className="error-message">{error}</div>}
      <div className="flex-column">
        <label>Email </label>
      </div>
      <div className="inputForm">
        <input
          type="email"
          className="input"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          />
      </div>
      <div className="flex-column">
        <label>Mot de Passe </label>
      </div>
      <div className="inputForm">
        <input
          type="password"
          className="input"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
      </div>
      <div className="flex-row">
        <span className="span">{"En cas d'oubli de votre mot de passe, veuillez contacter votre résponsable SSE"}</span>
      </div>
      <button className="button-submit">Se connecter</button>
    </form>
    );
  }
  
export default LoginForm;
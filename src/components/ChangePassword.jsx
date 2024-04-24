import { useState, useEffect } from 'react'; // Importing necessary hooks
import { useParams } from 'react-router-dom'; // Importing useParams hook
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook
import axios from 'axios'; // Importing Axios for making HTTP requests
import Logo from '../assets/logo.jpg'; // Importing logo image

function ChangePassword() {
  const navigate = useNavigate(); // Initializing useNavigate hook for programmatic navigation
  const { id } = useParams(); // Get userId from URL parameters // Récupérer l'identifiant utilisateur à partir des paramètres d'URL
  const [password, setNewPassword] = useState(''); // State variable to hold new password // Variable d'état pour contenir le nouveau mot de passe
  const [confirmNewPassword, setConfirmNewPassword] = useState(''); // State variable to hold confirm new password // Variable d'état pour contenir la confirmation du nouveau mot de passe
  const [error, setError] = useState(''); // State variable to hold error messages // Variable d'état pour contenir les messages d'erreur
  const [message, setPasswordChangeMessage] = useState(''); // State variable to hold password change message // Variable d'état pour contenir le message de changement de mot de passe

  useEffect(() => {
    // Retrieve password change message from localStorage
    // Récupérer le message de changement de mot de passe depuis le localStorage
    const message = localStorage.getItem('passwordChangeMessage');
    if (message) {
      // Display the password change message
      // Afficher le message de changement de mot de passe
      setPasswordChangeMessage(message);
      // Remove the message from localStorage once displayed
      // Supprimer le message du localStorage une fois affiché
      localStorage.removeItem('passwordChangeMessage');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if both passwords match
    // Vérifier si les deux mots de passe correspondent
    if (password !== confirmNewPassword) {
      setError("Passwords do not match."); // Set error message // Définir le message d'erreur
      return;
    }
    try {
      // Send password change request to the backend
      // Envoyer la demande de changement de mot de passe au backend
      const response = await axios.post(`http://localhost:4000/api/change-password/${id}`, {
        password,
      });
      
      // Check if password was successfully changed
      // Vérifier si le mot de passe a été changé avec succès
      if (response.status === 200) {
        localStorage.setItem('passwordSuccessMessage', 'Your password has been successfully updated. Please log in with your new password.'); // Store success message in localStorage // Stocker le message de succès dans le localStorage
        // Redirect user to login page with a message
        // Rediriger l'utilisateur vers la page de connexion avec un message
        navigate('/');
      }
    } catch (error) {
      // Handle errors returned by the backend
      // Gérer les erreurs renvoyées par le backend
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <section className="login-container">
      <form className="form" onSubmit={handleSubmit}>
        <header> <img src={Logo} alt="logo" /></header>
        {message && <div className='update-password'>{message}</div>} {/* Display password change message */}
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        <div className="flex-column">
          <label>New Password</label> {/* Label for new password input */}
          {/* Étiquette pour la saisie du nouveau mot de passe */}
        </div>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex-column">
          <label>Confirm New Password</label> {/* Label for confirm new password input */}
          {/* Étiquette pour la confirmation du nouveau mot de passe */}
        </div>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            placeholder="Confirm your new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button className="button-submit">Change Password</button> {/* Submit button */}
        {/* Bouton de soumission */}
      </form>
    </section>
  );
}

export default ChangePassword;

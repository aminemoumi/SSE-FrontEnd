import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Define the UserModal functional component with destructured props.
// Définition du composant fonctionnel UserModal avec les props destructurées.
function UserModal({ user, isOpen, onClose, onUpdate }) {
  // State for the editable user and any error messages.
  // État pour l'utilisateur modifiable et les messages d'erreur.
  const [editableUser, setEditableUser] = useState({ ...user });
  const [error, setError] = useState('');

  // Effect hook to reset the editable user when the selected user changes.
  // Hook d'effet pour réinitialiser l'utilisateur modifiable lorsque l'utilisateur sélectionné change.
  useEffect(() => {
    setEditableUser({ ...user });
  }, [user]);

  // Function to handle changes in input fields, updating the editable user state.
  // Fonction pour gérer les changements dans les champs de saisie, mettant à jour l'état de l'utilisateur modifiable.
  const handleChange = e => {
    const { name, value } = e.target;
    setEditableUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle the save action, making a PATCH request to update the user data.
  // Fonction pour gérer l'action de sauvegarde, effectuant une requête PATCH pour mettre à jour les données de l'utilisateur.
  const handleSave = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.patch(`http://localhost:4000/api/users/${editableUser.id}`, editableUser, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      onUpdate(response.data);
      console.log('Les modifications ont été enregistrées avec succès dans la base de données.');
      onClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      setError('Erreur lors de la mise à jour. Veuillez réessayer.');
    }
  };

  // Return null to not render the modal when it is not open.
  // Retourne null pour ne pas rendre la modale lorsqu'elle n'est pas ouverte.
  if (!isOpen) return null;

  return (
    <aside className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <section className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">Prénom</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstname" type="text" name="firstname" value={editableUser.firstname || ''} onChange={handleChange} placeholder="Prénom" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Nom</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastname" type="text" name="lastname" value={editableUser.lastname || ''} onChange={handleChange} placeholder="Nom" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" value={editableUser.email || ''} onChange={handleChange} placeholder="Email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">Entreprise</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="enterprise" type="text" name="enterprise" value={editableUser.enterprise || ''} onChange={handleChange} placeholder="Entreprise" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">Position</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="position" type="text" name="position" value={editableUser.position || ''} onChange={handleChange} placeholder="Position" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">Processus</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="process" type="text" name="process" value={editableUser.process || ''} onChange={handleChange} placeholder="Processus" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">Role</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role_id" type="text" name="role_id" value={editableUser.role_id || ''} onChange={handleChange} placeholder="Role" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-transparent hover:bg-pink-900 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" onClick={handleSave}>
            Sauvegarder
          </button>
          <button className="bg-transparent hover:bg-pink-900 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" onClick={onClose}>
            Fermer
          </button>
        </div>
      </section>
    </aside>
  );
  }
UserModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    enterprise: PropTypes.string,
    position: PropTypes.string,
    process: PropTypes.string,
    role_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default UserModal;







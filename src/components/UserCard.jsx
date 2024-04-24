import PropTypes from 'prop-types';




function UserCard({ user, onClick, onDelete }) {

 // Function to handle click events on the user card, triggering the onClick callback with the user data.
  // Fonction pour gérer les événements de clic sur la carte utilisateur, déclenchant le callback onClick avec les données de l'utilisateur.
  const handleClick = () => {
    console.log('Click detected on user:', user.firstname);
    onClick(user);
  };
// Function to handle the deletion of a user, triggered by a button click. It asks for confirmation before proceeding with the deletion.
  // Fonction pour gérer la suppression d'un utilisateur, déclenchée par un clic sur un bouton. Elle demande une confirmation avant de procéder à la suppression.
  const handleDelete = (userId) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");
    if (isConfirmed) {
      onDelete(userId);
      alert("Utilisateur supprimé.");
    }
  };


  return (
    <section className="m-12 bg-pink-900 max-w-[300px] rounded-xl hover:bg-pink-950 hover:scale-110 duration-700 p-5">


<h4 className="py-2 text-white font-bold flex items-center border border-grey-700 rounded-lg p-2"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Entreprise:</span>
<span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400 text-center"> {user.enterprise}</span></h4>


<h4 className="py-2 text-white font-bold flex items-center"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Email :</span>
<span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400 text-center"> {user.email}</span></h4>


<h4 className="py-2 text-white font-bold flex items-center"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Prénom :</span>
<span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400 text-center">{user.firstname}</span></h4>


<h4 className="py-2 text-white font-bold flex items-center"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Nom :</span>
<span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400 text-center"> {user.lastname}</span></h4>

<h4 className="py-2 text-white font-bold flex items-center"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Position :</span>
<span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400 text-center">{user.position}</span></h4>


<h4 className="py-2 text-white font-bold flex items-center"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Processus :</span>
<span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400 text-center"> {user.process}</span></h4>

<h4 className="py-2 text-white font-bold flex items-center"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Rôle</span>
<span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400 text-center"> {user.role_id}</span></h4>


<div className="pt-5 pb-2 flex justify-center space-x-4">
<button onClick={handleClick} className="w-36 h-10 font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500">🔎 : par ici !</button>
<button  onClick={() => handleDelete(user.id)} className="w-36 h-10 font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500">Supprimer</button>
</div>
</section>
  );
}

// Define prop types for the UserCard component to ensure proper usage.
// Définition des types de props pour le composant UserCard pour garantir une utilisation appropriée.
UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Assurez-vous que l'id est inclus pour la suppression
    enterprise: PropTypes.string,
    email: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    position: PropTypes.string,
    process: PropTypes.string,
    role_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserCard;

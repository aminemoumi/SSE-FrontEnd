import PropTypes from 'prop-types'; // Importing PropTypes for type-checking

// Our component, displaying a summary card of an event.
// Notre composant, affichant la fiche résumée d'un événement.
function EventCard({ event, onDelete }) {

  // Function to handle event deletion
  // Fonction pour gérer la suppression d'événement
  const handleDelete = (eventId) => {
    // Confirm deletion with user
    // Confirmer la suppression avec l'utilisateur
    const isConfirmed = window.confirm("Are you sure you want to delete this event?");
    if (isConfirmed) {
      // Call onDelete function passed from parent component to delete event
      // Appeler la fonction onDelete passée depuis le composant parent pour supprimer l'événement
      onDelete(eventId);
      // Display deletion confirmation
      // Afficher la confirmation de suppression
      alert("Event deleted.");
    }
  };

  // Return JSX representing the event card
  // Retourner JSX représentant la fiche de l'événement
  return (
    <article className="m-12 bg-pink-900 max-w-[300px] rounded-xl hover:bg-pink-950 hover:scale-110 duration-700 p-5">

      <h4 className="py-2 text-white font-bold flex items-center border border-grey-700 rounded-lg p-2"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Ville du site:</span>
        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-500 dark:text-white text-center">{event.site_town}</span></h4>

      <h4 className="py-2 text-white font-bold flex items-center"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Origine de événement:</span>
        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-500 dark:text-white text-center">{event.event_origin.title}</span></h4>

      <h4 className="py-2 text-white font-bold flex items-center"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Type événement:</span>
        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-500 dark:text-white text-center">{event.event_type.title}</span></h4>

      <h4 className="py-2 text-white font-bold flex items-center"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Nature de événement:</span>
        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-500 dark:text-white text-center">{event.event_nature.title}</span></h4>

      <h4 className="py-2 text-white font-bold flex items-center"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Nom du site:</span>
        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-500 dark:text-white text-center">{event.site_name}</span></h4>

      <h4 className="py-2 text-white font-bold flex items-center"><span className="flex-1 ms-3 whitespace-nowrap text-xs">Numéro du site:</span>
        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-500 dark:text-white text-center">{event.site_number}</span></h4>

      {/* Footer containing buttons for event actions */}
      {/* Pied de page contenant des boutons pour les actions sur l'événement */}
      <footer className="pt-5 pb-2 flex justify-center space-x-4">
        {/* Button to view more details */}
        {/* Bouton pour afficher plus de détails */}
        <button className="w-36 h-10 font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500">🔎 : par ici !</button>
        {/* Button to delete event */}
        {/* Bouton pour supprimer l'événement */}
        <button
          className="w-36 h-10 font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500"
          onClick={() => handleDelete(event.id)}
        >
          Supprimer
        </button>
      </footer>

    </article>
  );
}

// PropType validation for the EventCard component
// Validation PropType pour le composant EventCard
EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    site_town: PropTypes.string.isRequired,
    event_origin: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    event_type: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    event_nature: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    site_name: PropTypes.string.isRequired,
    site_number: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired, // PropType for onDelete function
};

export default EventCard; // Exporting the EventCard component

import PropTypes from 'prop-types';

function EventCard({ event, onDelete }) {
  const handleDelete = (eventId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this event?");
    if (isConfirmed) {
      onDelete(eventId);
      alert("Event deleted.");
    }
  };

  return (
    <article className="m-12 bg-pink-900 max-w-[300px] rounded-xl hover:bg-pink-950 hover:scale-110 duration-700 p-5">
      <h4 className="py-2 text-white font-bold flex items-center border border-grey-700 rounded-lg p-2">
        <span className="flex-1 ms-3 whitespace-nowrap text-xs">Ville du site:</span>
        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-500 dark:text-white text-center">{event.site_town}</span>
      </h4>

      <h4 className="py-2 text-white font-bold flex items-center">
        <span className="flex-1 ms-3 whitespace-nowrap text-xs">Nom du site:</span>
        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-500 dark:text-white text-center">{event.site_name}</span>
      </h4>

      <h4 className="py-2 text-white font-bold flex items-center">
        <span className="flex-1 ms-3 whitespace-nowrap text-xs">Numéro du site:</span>
        <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-500 dark:text-white text-center">{event.site_number}</span>
      </h4>

      <footer className="pt-5 pb-2 flex justify-center space-x-4">
        <button className="w-36 h-10 font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500">🔎 : par ici !</button>
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

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    site_town: PropTypes.string.isRequired,
    site_name: PropTypes.string.isRequired,
    site_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EventCard;

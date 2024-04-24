// Import necessary hooks from 'react', 'axios' for making HTTP requests, and the EventCard component for displaying individual events.
// Importation des hooks nécessaires de 'react', 'axios' pour effectuer des requêtes HTTP, et du composant EventCard pour afficher les événements individuels.
import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';

// Define the EventList functional component to display a list of events.
// Définition du composant fonctionnel EventList pour afficher une liste d'événements.
function EventList() {
  // State hooks for managing events data, loading status, error messages, and search term for filtering.
  // Hooks d'état pour gérer les données des événements, le statut de chargement, les messages d'erreur et le terme de recherche pour le filtrage.
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // UseEffect hook to fetch events data from the API on component mount.
  // Hook useEffect pour récupérer les données des événements depuis l'API lors du montage du composant.
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    axios.get('http://localhost:4000/api/events', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then((response) => {
      setEvents(response.data.events);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des événements:', error);
      setError('Une erreur est survenue lors de la récupération des événements.');
      setLoading(false);
    });
  }, []);

  // Filtering the events based on the search term entered by the user.
  // Filtrage des événements en fonction du terme de recherche saisi par l'utilisateur.
  const filteredEvents = events.filter(event =>
    event.site_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle the deletion of an event using its ID.
  // Fonction pour gérer la suppression d'un événement à l'aide de son ID.
  const handleDeleteEvent = (eventId) => {
    const authToken = localStorage.getItem('authToken');
    axios.delete(`http://localhost:4000/api/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    .then(() => {
      // Update the state to reflect the removal of the event from the list.
      // Mise à jour de l'état pour refléter la suppression de l'événement de la liste.
      setEvents(currentEvents => currentEvents.filter(event => event.id !== eventId));
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'événement:', error);
    });
  };

  // Display loading message while data is being fetched.
  // Affichage d'un message de chargement pendant la récupération des données.
  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  // Display an error message if an error occurs during data fetching.
  // Affichage d'un message d'erreur en cas d'erreur lors de la récupération des données.
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  // Display a message if there are no events to show.
  // Affichage d'un message s'il n'y a pas d'événements à afficher.
  if (events.length === 0) {
    return <div>Aucun événement disponible.</div>;
  }

  return (
    <section className='flex-1 ml-1/4 p-4 overflow-auto'> {/* Enlève 'overflow-auto' pour empêcher le défilement */}
    <input
      type="text"
      placeholder="Rechercher par nom de site..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-4 p-2 border rounded w-full" 
    />
    <div className="flex justify-center flex-wrap"> {/* Cette div va centrer les cartes d'événements */}
      {filteredEvents.map((eventData) => (
        <EventCard
          key={eventData.id}
          event={eventData}
          eventOrigin={eventData.event_origin.title}
          onDelete={handleDeleteEvent}
        />
      ))}
    </div>
  </section>
  
  );
}

export default EventList;
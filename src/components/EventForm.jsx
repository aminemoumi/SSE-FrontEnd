import { useState } from 'react';
import axios from 'axios';

const EventForm = () => {
  const [event, setEvent] = useState({
    site_name: '',
    site_number: '',
    site_town: '',
    witness: '',
    event_description: '',
    info_sse_description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await axios.post('http://localhost:4000/api/events', {
        ...event,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log('Réponse du serveur:', response.data);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      <div className="w-1/2 px-4 py-2">
        <label>Nom du site</label>
        <input 
          name="site_name" 
          value={event.site_name} 
          onChange={handleChange} 
          className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300"
        />
      </div>
      <div className="w-1/2 px-4 py-2">
        <label>Numéro du site</label>
        <input 
          name="site_number" 
          value={event.site_number} 
          onChange={handleChange} 
          className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300"
        />
      </div>
      <div className="w-1/2 px-4 py-2">
        <label>Ville du site</label>
        <input 
          name="site_town" 
          value={event.site_town} 
          onChange={handleChange} 
          className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300"
        />
      </div>
      <div className="w-1/2 px-4 py-2">
        <label>Témoin</label>
        <input 
          name="witness" 
          value={event.witness} 
          onChange={handleChange} 
          className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300"
        />
      </div>
      <div className="w-1/2 px-4 py-2">
        <label>Description de l'événement</label>
        <textarea 
          name="event_description" 
          value={event.event_description} 
          onChange={handleChange} 
          className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300"
        />
      </div>
      <div className="w-1/2 px-4 py-2">
        <label>Description des informations SSE</label>
        <textarea 
          name="info_sse_description" 
          value={event.info_sse_description} 
          onChange={handleChange} 
          className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300"
        />
      </div>

      <div className="w-full flex justify-center">
        <button type="submit" className="rounded-lg relative w-36 h-14 cursor-pointer flex items-center border border-pink-900 bg-pink-900 group hover:bg-pink-900 active:bg-pink-900 active:border-pink-900 mt-10">
          <span className="text-white font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300">
            Créer
          </span>
          <span className="absolute right-0 h-full w-10 rounded-lg bg-pink-900 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
            <svg className="svg w-8 text-white" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" x2="12" y1="5" y2="19"></line>
              <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
};

export default EventForm;




































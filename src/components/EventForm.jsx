// Import necessary hooks and components from 'react', 'axios' for HTTP requests, and 'react-datepicker' for selecting dates.
// Importe les hooks et composants nécessaires de 'react', 'axios' pour les requêtes HTTP, et 'react-datepicker' pour la sélection des dates.
import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Define the EventForm component for managing event data.
// Définit le composant EventForm pour la gestion des données d'événements.
const EventForm = () => {
  // State for storing event form fields.
  // État pour stocker les champs du formulaire d'événement.
  const [event, setEvent] = useState({
    site_name: '',
    site_number: '',
    site_town: '',
    witness: '',
    event_description: '',
    info_sse_description: '',
    status_event: '',
    corrective_action: '',
    deadline_action: null,
    action_pilot: '',
    action_status: '',
  });
  
  // State for storing dropdown options data.
  // État pour stocker les données des options déroulantes.
  const [selectData, setSelectData] = useState({
    event_type: [],
    event_nature: [],
    detection_context: [],
    work_phase: [],
    risk_level_1: [],
    criticality: [],
    event_origin: [],
  });

  // UseEffect hook to load dropdown data on component mount.
  // Hook useEffect pour charger les données déroulantes au montage du composant.
  useEffect(() => {
    // Async function to load data from APIs.
    // Fonction asynchrone pour charger les données à partir des APIs.
    const loadData = async () => {
      // Retrieve the authToken from local storage for authorization.
      // Récupère le authToken du stockage local pour l'autorisation.
      const authToken = localStorage.getItem('authToken');

      try {
        // Fetch all dropdown data concurrently using Promise.all.
        // Récupère toutes les données déroulantes simultanément avec Promise.all.
        const responses = await Promise.all([
          axios.get('http://localhost:4000/api/workphase/titles', { headers: { Authorization: `Bearer ${authToken}` } }),
          axios.get('http://localhost:4000/api/eventorigin/titles', { headers: { Authorization: `Bearer ${authToken}` } }),
          axios.get('http://localhost:4000/api/detectioncontext/titles', { headers: { Authorization: `Bearer ${authToken}` } }),
          axios.get('http://localhost:4000/api/eventtype/titles', { headers: { Authorization: `Bearer ${authToken}` } }),
          axios.get('http://localhost:4000/api/eventnature/titles', { headers: { Authorization: `Bearer ${authToken}` } }),
          axios.get('http://localhost:4000/api/risklevel1/titles', { headers: { Authorization: `Bearer ${authToken}` } }),
          axios.get('http://localhost:4000/api/criticality/infos', { headers: { Authorization: `Bearer ${authToken}` } }),
        ]);

        // Update state with fetched data for dropdowns.
        // Met à jour l'état avec les données récupérées pour les listes déroulantes.
        setSelectData({
          work_phase: Object.values(responses[0].data).flat(),
          event_origin: Object.values(responses[1].data).flat(),
          detection_context: Object.values(responses[2].data).flat(),
          event_type: Object.values(responses[3].data).flat(),
          event_nature: Object.values(responses[4].data).flat(),
          risk_level_1: Object.values(responses[5].data).flat(),
          criticality: Object.values(responses[6].data).flat(),
        });
        // console.log(selectData.event_type);

      } catch (error) {
        // Log error in case data loading fails.
        // Journalise l'erreur en cas d'échec du chargement des données.
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    // Call loadData function.
    // Appelle la fonction loadData.
    loadData();
  }, []);

  // Function to handle form field changes and update state.
  // Fonction pour gérer les changements des champs de formulaire et mettre à jour l'état.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  // Function to handle date selection and update state.
  // Fonction pour gérer la sélection de la date et mettre à jour l'état.
  const handleDateChange = (date) => {
    console.log('Nouvelle date sélectionnée :', date);
    setEvent({
      ...event,
      deadline_action: date,
    });
  };

  // Function to handle form submission and post data to API.
  // Fonction pour gérer la soumission du formulaire et poster les données à l'API.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem('authToken');

    try {
      // Post form data to server and log response.
      // Poste les données du formulaire au serveur et journalise la réponse.
      const response = await axios.post('http://localhost:4000/api/events', {
        ...event,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log('Réponse du serveur:', response.data);
    } catch (error) {
      // Log error in case of submission failure.
      // Journalise l'erreur en cas d'échec de la soumission.
      console.error('Erreur lors de la soumission:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}className="flex flex-wrap">
      {/* Champs input */}
      <div className="w-1/2 px-4 py-2"><label>Nom du site</label><input name="site_name" value={event.site_name} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 "/></div>
      <div className="w-1/2 px-4 py-2"><label>Numéro du site</label><input name="site_number" value={event.site_number} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 "/></div>
      <div className="w-1/2 px-4 py-2"><label>Ville du site</label><input name="site_town" value={event.site_town} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 "/></div>
      <div className="w-1/2 px-4 py-2"><label>Témoin</label><input name="witness" value={event.witness} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 " /></div>
      <div className="w-1/2 px-4 py-2"><label>Description de événement</label><textarea name="event_description" value={event.event_description} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 " /></div>
      <div className="w-1/2 px-4 py-2"><label>Description des informations SSE</label><textarea name="info_sse_description" value={event.info_sse_description} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 " /></div>
      <div className="w-1/2 px-4 py-2"><label>Action corrective</label><input name="corrective_action" value={event.corrective_action} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 " /></div>
      <div className="w-1/2 px-4 py-2">
        <label>Date limite action</label>
        <DatePicker name="deadline_action"
          selected={event.deadline_action}
          onChange={handleDateChange}
          dateFormat="dd-MM-yyyy" // Format de date souhaité
          showTimeSelect // Afficher le sélecteur d'heure
          timeFormat="HH:mm" // Format de l'heure
          className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 "  />
      </div>

      <div  className="w-1/2 px-4 py-2"><label>Pilote de action</label><input name="action_pilot" value={event.action_pilot} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 " /></div>
      
      {/* Champs select pour le type d'événement */}
      <div  className="w-1/2 px-4 py-2">
        <label>Type événement</label>
        <select name="event_type_id" value={event.event_type_id} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 ">
          <option value="">...</option>
          {selectData.event_type.map((type) => (
            <option key={type.id} value={type.id}>{type.title}</option>
          ))}
        </select>
      </div>


      {/* Liste déroulante pour la nature de l'événement */}
      <div  className="w-1/2 px-4 py-2">
        <label>Nature de événement</label>
        <select name="event_nature_id" value={event.event_nature_id} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 ">
        <option value="">...</option>
          {selectData.event_nature.map((nature) => (
            <option key={nature.id} value={nature.id}>{nature.title}</option>
          ))}
        </select>
      </div>
      
      {/* Liste déroulante pour le contexte de détection */}
      <div  className="w-1/2 px-4 py-2">
        <label>Contexte de détection</label>
        <select name="detection_context_id" value={event.detection_context_id} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 ">
        <option value="">...</option>
          {selectData.detection_context.map((context) => (
            <option key={context.id} value={context.id}>{context.title}</option>
          ))}
        </select>
      </div>
      
      {/* Liste déroulante pour la phase de travail */}
      <div  className="w-1/2 px-4 py-2">
        <label>Phase de travail</label>
        <select name="work_phase_id" value={event.work_phase_id} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 ">
        <option value="">...</option>
          {selectData.work_phase.map((phase) => (
            <option key={phase.id} value={phase.id}>{phase.title}</option>
          ))}
        </select>
      </div>
      
      {/* Liste déroulante pour le niveau de risque 1 */}
      <div  className="w-1/2 px-4 py-2">
        <label>Niveau de risque 1</label>
        <select name="risk_level_1_id" value={event.risk_level_1_id} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 ">
        <option value="">...</option>
          {selectData.risk_level_1.map((level) => (
            <option key={level.id} value={level.id}>{level.title}</option>
          ))}
        </select>
      </div>
      
      {/* Liste déroulante pour la criticité */}
      <div  className="w-1/2 px-4 py-2">
        <label>Criticité</label>
        <select name="criticality_id" value={event.criticality_id} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 ">
        <option value="">...</option>
          {selectData.criticality.map((criticality) => (
          <option key={criticality.id} value={criticality.id}>
            {criticality.gravity} {criticality.frequency} {criticality.criticality_note}</option>
            ))}
          </select>
        </div>

      {/* Liste déroulante pour l'origine de l'événement */}
      <div  className="w-1/2 px-4 py-2">
        <label>Origine de événement</label>
        <select name="event_origin_id" value={event.event_origin_id} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 ">
        <option value="">...</option>
          {selectData.event_origin.map((origin) => (
            <option key={origin.id} value={origin.id}>{origin.title}</option>
          ))}
        </select>
      </div>
      
      {/* Champs pour le statut de l'événement et le statut de l'action */}
      <div  className="w-1/2 px-4 py-2">
        <label>Statut de événement</label>
        <input name="status_event" value={event.status_event} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 "/>
      </div>
      <div  className="w-1/2 px-4 py-2">
        <label>Statut de action</label>
        <input name="action_status" value={event.action_status} onChange={handleChange} className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 "/>
      </div>

      
         {/* Bouton Soumettre */}
         <div className="w-full flex justify-center">
         <button type="submit"
className="rounded-lg relative w-36 h-14 cursor-pointer flex items-center border border-pink-900 bg-pink-900 group hover:bg-pink-900 active:bg-pink-900 active:border-pink-900 mt-10"
>
<span
  className="text-white font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300"
>
 Créer
</span>
<span
  className="absolute right-0 h-full w-10 rounded-lg bg-pink-900 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300"
>
  <svg
    className="svg w-8 text-white" 
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
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




































import { useState } from 'react';
import axios from 'axios';



const UserForm = () => {
  // Initialize state for user data with an object containing user attributes.
  // Initialisation de l'état pour les données utilisateur avec un objet contenant les attributs utilisateur.
  const [user, setUser] = useState({
    enterprise: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    position: '',
    process: '',
    role_id: ''
  });

  // Function to handle changes in input fields, updating the state accordingly.
  // Fonction pour gérer les changements dans les champs de saisie, en mettant à jour l'état en conséquence.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

 // Function to handle form submission, making a POST request with the user data.
 // Fonction pour gérer la soumission du formulaire, en effectuant une requête POST avec les données de l'utilisateur.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem('authToken');
   // const userRole = localStorage.getItem('userRole');
    console.log(authToken)
    try {
      const response = await axios.post('http://localhost:4000/api/users', user, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        }
      });
      console.log('Réponse du serveur :', response.data);
     
    } catch (error) {
      console.error('Il y a eu un problème avec la requête:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-y-4 w-full max-w-md mx-auto my-8'>
    {Object.keys(user).map((key) => (
      <div key={key} className='w-full'>
        <input 
          name={key}
          value={user[key]}
          onChange={handleChange}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          className="w-full border-2 border-pink-900 rounded-lg text-black px-4 py-2 text-base hover:border-white focus:border-white focus:outline-none transition duration-300 "
        />
      </div>
    ))}
  
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
  </form>
  
  );
};

export default UserForm;

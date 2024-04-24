import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
import LogoutButton from '../components/LogoutButton';


function NavBar() {
  const userRole = localStorage.getItem('userRole');
  console.log(userRole);

  return (
    <aside className='w-1/4 h-screen flex flex-col justify-between fixed inset-y-0 left-0'> 
    <div className="w-full"> 
  <img src={Logo} alt="logo" className="max-w-full h-auto" />
</div>
      <div className="flex flex-col justify-center items-center flex-grow ">
      <nav className='w-2/3'>
        <ul className='flex flex-col gap-8'>
            <button className="relative group cursor-pointer text-sky-50  overflow-hidden h-14 w-54 rounded-md bg-pink-900 p-2
              flex justify-center items-center font-extrabold">
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-pink-950"></div>
              <li className="z-10"><Link to="/dashboard">Liste des Événements</Link></li>    
            </button>
            <button className="relative group cursor-pointer text-sky-50  overflow-hidden h-14 w-54 rounded-md bg-pink-900 p-2
              flex justify-center items-center font-extrabold">
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-pink-950"></div>
              <li className="z-10"><Link to="/event/create">Déclaration Événement</Link></li>    
            </button>
{userRole === 'admin' && (
            <>
                <button className="relative group cursor-pointer text-sky-50  overflow-hidden h-14 w-54 rounded-md bg-pink-900 p-2
              flex justify-center items-center font-extrabold">
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-pink-950"></div>
              <li className="z-10"><Link to="/admin/statistics">Statistiques</Link></li>    
            </button>
            <button className="relative group cursor-pointer text-sky-50  overflow-hidden h-14 w-54 rounded-md bg-pink-900 p-2
              flex justify-center items-center font-extrabold">
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-pink-950"></div>
              <li className="z-10"><Link to="/admin/users">Gestion des Utilisateurs</Link></li>    
            </button>
               <button className="relative group cursor-pointer text-sky-50  overflow-hidden h-14 w-54 rounded-md bg-pink-900 p-2
              flex justify-center items-center font-extrabold">
              <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-pink-950"></div>
              <li className="z-10"><Link to="/admin/users/create">Créer Utilisateur</Link></li>    
            </button>
            </>
          )}
        </ul>
      </nav> 
      </div>
         <div className='ml-4 mb-5 '><LogoutButton/></div> 
    </aside>
  );
}

export default NavBar;









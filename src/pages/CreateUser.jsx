import NavBar from "../components/NavBar";
import UserForm from "../components/UserForm";


function CreateUser() {
  return (
    <div className='flex min-h-screen'>
      <nav className='w-1/4'> 
        <NavBar /> 
      </nav>
  
    
      <main className='flex-1  flex justify-center items-centerml-1/4 p-8 bg-pink-900  overflow-auto'>
         <div className="w-5/6 h-5/5 bg-white flex flex-col justify-center items-center rounded-3xl ">
          <UserForm />
        </div>
      </main>
    </div>
  );
   
}

export default CreateUser;

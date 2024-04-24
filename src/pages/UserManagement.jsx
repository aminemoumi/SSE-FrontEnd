import NavBar from "../components/NavBar";
import UserList from "../components/UserList";

function UserManagement() {
  return (
    <div className='flex min-h-screen'>
      <nav className='w-1/4'> 
        <NavBar />
      </nav>
      <main className='w-3/4 overflow-y-auto bg-gray-300'>
        <UserList /> 
      </main>
    </div>
  );
}

export default UserManagement;





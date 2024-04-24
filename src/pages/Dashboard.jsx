import NavBar from "../components/NavBar";
import EventList from "../components/EventList";
function Dashboard() {
  return (
    <div className='flex min-h-screen'>
      <nav className='w-1/4'>
        <NavBar /> 
      </nav>
      <main className='w-3/4  overflow-auto bg-gray-300 '> 
        <EventList /> 
      </main>
    </div>
  );
}

export default Dashboard;


import NavBar from "../components/NavBar";
import EventForm from "../components/EventForm";

function EventCreate() {
  return (
    <div className='flex min-h-screen'>
      <nav className='w-1/4'> 
        <NavBar /> 
      </nav>
      <main className='flex-1  flex justify-center items-centerml-1/4 p-8 bg-pink-900 overflow-auto'>
         <section className="w-5/6 h-5/5 bg-white flex flex-col justify-center items-center rounded-3xl overflow-auto">
        
          <EventForm /> 
        </section>
      </main>
    </div>
  );
}

export default EventCreate;
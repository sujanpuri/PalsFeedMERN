import './App.css';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import Home from './Routes/Home';

function App() {
  return (
    <div className="bg-black h-screen w-screen overflow-y-scroll">
      <NavBar />
      <div className='flex h-full'>
        <SideBar />
        <div className='w-full h-full rounded-md'>
          <Home />
        </div>
      </div>
    </div>
  );
}

export default App;

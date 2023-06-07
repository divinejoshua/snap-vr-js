// import logo from './logo.svg';
import './App.css';

function App() {
  return (
     // Main box 
    <main className="App mx-auto">

      {/* Navbar */}
      <nav className="nav-header border-b font-bold ">   
        <div className='pb-4 pl-5 pr-5 logo-text font-bold'>
          Wearkit VR app   
          {/* Link to twitter account  */}
          <a href='https://twitter.com/Divine_Er' rel="noreferrer" target="_blank" > 
            <span className='float-right'> <i className="fa fa-brands fa-twitter text-gray-400"></i></span>
          </a>
          {/* Link to codebase  */}
          <a href='https://github.com/divinejoshua/ten-wonders-react-js' rel="noreferrer" target="_blank" >
            <span className='float-right mr-4'> <i className="fa fa-brands fa-github text-gray-400"></i></span>
          </a>
        </div>
      </nav>

      {/* Camera canva  */}
      <section className='max-w-7xl'>
        <div className='camera-canva'></div>
      </section>

    </main>
  );
}

export default App;

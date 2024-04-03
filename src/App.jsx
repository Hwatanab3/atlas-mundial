import './App.css'
import SearchCountry from './components/SearchCountry';

function App() {


  return (
    <div className='container'>
      <SearchCountry />
      <div>
        <a href="https://portafolio-hwatanabe.netlify.app/" target='blank'>
          <img className='logo' src='../logo.png' alt='Logo' />
        </a>
      </div>
    </div>
  )
}

export default App

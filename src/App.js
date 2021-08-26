import './App.css';
import Gallery from './Gallery.js';
import {useState, useEffect} from 'react'

function App() {
  const [user, setUser] = useState({email: "b@test.com", id: 2})
  const [works, setWorks] = useState([])

  useEffect(() =>{
        
    fetch(`http://localhost:9292/works`) //${process.env.REACT_APP_API_URL}
    .then(resp => resp.json())
    .then(worksJson => {
        console.log(worksJson)
        setWorks(worksJson)
    })
}, [])


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Gallery user={user} setUser={setUser} works= {works} setWorks={setWorks}></Gallery>
    </div>
  );
}

export default App;

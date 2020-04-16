import React, {useState, useEffect } from 'react';
import api from "./services/api";
import "./styles.css";


//const { uuid } = require("uuidv4");

function App() {

  const [repositories, setRepositories] = useState([])


  useEffect(() => {
    api.get('repositories').then(response =>{

      setRepositories(response.data)
      console.log(response.data)
      
    });
  },[])

  async function handleAddRepository() {

   const response = await api.post('repositories',{
    title: "novo repositorio",
  });
  
  const repositorio = response.data;

  setRepositories([...repositories, repositorio]);    
  }

  async function handleRemoveRepository(id) {
    
    
    await api.delete(`repositories/${id}`)
    let repositorioAtualiza = repositories.filter(repositorio => repositorio.id !== id)

    setRepositories(repositorioAtualiza)
  
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repositorio => <li key={repositorio.id}>{repositorio.title}
          <button onClick={() => handleRemoveRepository(repositorio.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

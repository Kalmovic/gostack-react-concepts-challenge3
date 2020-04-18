import React, { useState } from "react";

import "./styles.css";
import api from "./services/api";
import { useEffect } from "react";

function App() {

  const [repositories, setRepositories]= useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: "Desafio Node.js", 
 	    url: "http://github.com/...",
	    techs: ["Node.js", "..."]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    const response = repositories.filter(repo => repo.id !== id);

    setRepositories(response);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length === 0
          ? <h1>Adicione seu projeto!</h1>
          : repositories.map(repo => (
            <li key={repo}>
              <span>{repo.title}</span>
              {repo ? 
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button> : null  }  
            </li>)
          )
        }
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import './App.css';

const FormComponent: React.FC = () => {
  const { sessionKey } = useParams<{ sessionKey: string }>();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [environment, setEnvironment] = useState('local');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let baseURL;
    switch (environment) {
      case 'local':
        baseURL = `http://localhost:3334/webchat/continue-flow/${sessionKey}`;
        break;
      case 'hml':
        baseURL = `https://wapphml.boteria.com.br/webchat/continue-flow/${sessionKey}`;
        break;
      case 'prod':
        baseURL = `https://wapp.boteria.com.br/webchat/continue-flow/${sessionKey}`;
        break;
      default:
        baseURL = '';
    }

    console.log('baseURL', baseURL)

    const data = {
      name,
      age,
    };

    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Dados enviados com sucesso!');
      } else {
        alert('Erro ao enviar os dados');
      }
    } catch (error) {
      alert('Erro na requisição');
      console.error('Erro:', error);
    }
  };

  return (
    <div className="App">
      <h1>Formulário de Envio</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Idade:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="environment">Escolha o ambiente:</label>
          <select
            id="environment"
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
          >
            <option value="local">Local</option>
            <option value="hml">HML</option>
            <option value="prod">PROD</option>
          </select>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Definindo a rota que captura a sessionKey da URL */}
        <Route path="/:sessionKey" element={<FormComponent />} />
      </Routes>
    </Router>
  );
};

export default App;

import { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { auth, firebase } from './services/firebase';

import { AuthContextProvider } from './contexts/AuthContext'

function App() {

  return (
    //para cada página coloca um componente chamado route
    //aqui compartilha as informações(o contexto) com todas as paginas 
    //como as rotas não são especificas do contexto de autenticação, podem ficar aqui
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;

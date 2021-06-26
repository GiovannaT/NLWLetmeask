import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/AuthContext'
import { AdminRoom } from './pages/AdminRoom';


function App() {

  return (
    //para cada página coloca um componente chamado route
    //aqui compartilha as informações(o contexto) com todas as paginas 
    //como as rotas não são especificas do contexto de autenticação, podem ficar aqui
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;

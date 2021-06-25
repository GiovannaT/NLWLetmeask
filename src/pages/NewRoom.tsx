import { Link, useHistory } from 'react-router-dom'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import { FormEvent } from 'react'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { useState } from 'react';
import { database } from '../services/firebase';

export function NewRoom() {
    // const { value, setValue } = useContext(TestContext)
    const history = useHistory();
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');

    //função de criara sala
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        //trim remove os espaços em branco de um texto
        if (newRoom.trim() === '') {
            return;
        }
        //entidade do BD. Lá no BD vai ter uma categoria Rooms
        const roomRef = database.ref('rooms');

        //coloca info dentro de rooms. Aqui coloca uma nova sala dentro de rooms.
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })
        history.push(`/rooms/&{firebaseRoom.key}`)
        //key é o id que foi inserido
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Question Illustration" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p></aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Gerar sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Entrar em sala existente: <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}
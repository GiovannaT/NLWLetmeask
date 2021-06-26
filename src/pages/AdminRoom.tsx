import { useHistory, useParams } from 'react-router-dom'

import { Button } from '../components/Button';
import { Question } from '../components/Question/Questions';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';

import '../styles/room-code.scss'
import '../styles/room.scss';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import { database } from '../services/firebase';
type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })
    history.push('/');
  }
  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que quer excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }
  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar a sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {/* if sem else */}
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>


        {/* percorre o array e retorna cada item como um componente */}
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}>
                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>

            )
          })}
        </div>
      </main>
    </div>
  )
}

import './styles.css'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import background from '../../assets/background.png'

function App() {
  
  const handleClick = () => {
    console.log("Botão clicado!");
  };

  return (
    <div className="App">
      <Header />
      <div className='content'> 
        <img src={background} className='background' alt='background app'/>
        <div className='info'>

          <div>
            <Input name="user" placeholder="@username"/>
            <Button text="Buscar" onClick={handleClick} />
          </div>

          <div className="profile">
            <img src="https://avatars.githubusercontent.com/u/146017558?s=400&v=4" className="profile-img" alt="profile git"/>

            <div>
              <h3>Michelle Gomes</h3>
              <span>@michelleGomes85</span>
              <p className="description">Cursando graduação em Sistemas para Internet, com um olhar voltado para o futuro da tecnologia. Sempre em busca de novos desafios e aprendizados para crescer como profissional e inovadora.</p>
            </div>

          </div>

          <hr/>
          
        </div>
      </div>
    </div>
  );
}

export default App;
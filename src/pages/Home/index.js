
import { useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import ItemList from "../../components/ItemList";
import background from "../../assets/background.png";

import "./styles.css";

function App() {

  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repository, setRepository] = useState(null);
  const [showContent, setShowContent] = useState(false); // Estado para animação

  const handleGetData = async () => {

    if (!user.trim()) return;

    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {

      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const repositoryData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepositories = await repositoryData.json();

      if (newRepositories.length)
        setRepository(newRepositories);
      else
        setRepository([]);

      setShowContent(true);
      setUser(""); 
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGetData();
    }
  };

  return (
    <div className="App">
      <Header />

      <div className="content">
        <img src={background} className="background" alt="background app" />

        <div className="info">

          <div>
            <Input
              value={user}
              onChange={(event) => setUser(event.target.value)}
              onKeyDown={handleKeyDown}
              name="user"
              placeholder="@username"
            />

            <Button text="Buscar" onClick={handleGetData} />
          </div>

          {showContent && currentUser && (

            <div className="fade-in"> 
            
              <div className="profile">
                <img src={currentUser.avatar_url} className="profile-img" alt="profile git" />

                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p className="description">{currentUser.bio}</p>
                </div>
              </div>

              <hr />

              <div>
                <h4>Repositórios</h4>
                {repository.length > 0 ? (
                  repository.map((repo) => (
                    <ItemList 
                      key={repo.id} 
                      title={repo.name} 
                      description={repo.description || "Sem descrição"} 
                      url={repo.html_url} 
                    />
                  ))
                ) : (
                  <p>Nenhum repositório encontrado.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

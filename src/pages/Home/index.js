import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import ItemList from "../../components/ItemList";
import background from "../../assets/background.png";
import logo from "../../assets/logo.png";

import "./styles.css";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repository, setRepository] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [showContent, setShowContent] = useState(false);

  const handleGetData = async () => {

    if (!user.trim()) return;

    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const repositoryData = await fetch(
        `https://api.github.com/users/${user}/repos`
      );

      const newRepositories = await repositoryData.json();

      if (newRepositories.length) {
        setRepository(newRepositories);

        // Inicializa com todos os repositórios
        setFilteredRepos(newRepositories); 
      } else {
        setRepository([]);
        setFilteredRepos([]);
      }

      setShowContent(true);
      setUser("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGetData();
    }
  };

  const handleSearchChange = (event) => {

    const query = event.target.value;
    setSearchTerm(query);

    // Filtra os repositórios com base no nome ou descrição
    const filtered = repository.filter((repo) =>
      repo.name.toLowerCase().includes(query.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(query.toLowerCase()))
    );

    setFilteredRepos(filtered);
  };

  // Se o campo de busca estiver vazio, mostra todos os repositórios
  useEffect(() => {
    if (!searchTerm)
      setFilteredRepos(repository);
    
  }, [searchTerm, repository]);

  return (

    <div className="App">
      <Header />

      <div className="content">
        <img src={background} className="background" alt="background app" />

        <div className="info">
          <div className="logo-input">
            <img src={logo} className="logo" alt="logo app" />
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
                <img
                  src={currentUser.avatar_url}
                  className="profile-img"
                  alt="profile git"
                />

                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p className="description">{currentUser.bio}</p>
                </div>
              </div>

              <hr />

              <div>
                <h4>Repositórios</h4>
                
                <Input
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Buscar repositório..."
                />

                {filteredRepos.length > 0 ? (
                  filteredRepos.map((repo) => (
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

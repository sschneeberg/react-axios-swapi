import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import StarshipPage from './Components/StarshipPage';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <h1 className="header">STARWARS STAR SHIPS</h1>
                <Route path="/" exact component={Home} />
                <Route
                    path="/:id"
                    render={(routeInfo) => {
                        let id = routeInfo.match.params.id;
                        return <StarshipPage id={id} />;
                    }}
                />
            </div>
        </BrowserRouter>
    );
}

export default App;

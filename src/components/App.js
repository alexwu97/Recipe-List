import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from './Home';
import Favorites from './Favorites';
import NotFound from './NotFound';
import Header from './Header';
import Recipe from './Recipe';


class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            recipes: [],
            favorites: []
        };
    }

    componentDidMount(){
        fetch(`${API_URL}/v1/recipes`)
        .then(res => res.json())
        .then(recipes => {
            this.setState({ recipes });
            console.log(this.state.recipes);
        });
    }

    toggleFavorite = id => {
        this.setState(
            ({favorites, ...state}) => {
                console.log(id);
                const idx = favorites.indexOf(id);
                console.log(idx, favorites);

                if(idx !== -1) {
                    return {...state, favorites: favorites.filter(f => f !== id)};
                }
                return {...state, favorites: [...favorites, id]};
            }
        );
    };

    render() {
        return(
            <BrowserRouter>
                <main>
                    <Header />
                    <Switch>
                        <Redirect from="/home" to="/" />
                        <Route exact path="/" render={() => (
                            <Home state={this.state} toggleFavorite={this.toggleFavorite} />
                        )} />
                        <Route path="/favorites" render={() => (
                            <Favorites state={this.state} toggleFavorite={this.toggleFavorite} />
                        )} />
                        <Route path="/recipe/:id" component={Recipe} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </BrowserRouter>
        );
    }
};

export default App;
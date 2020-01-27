import React from 'react';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import PropTypes from 'prop-types';


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentRecipe: null
        };
    }

    onRecipeClick = (id) => {
        fetch(`${API_URL}/v1/recipes/${id}`)
        .then(res => res.json())
        .then(recipes => {
            this.setState({ currentRecipe: recipes });
        });
    }

    render(){
        const {recipes, favorites} = this.props.state;
        const {currentRecipe} = this.state;
        return(
            <div>
                <main className="px4 flex">
                    <div style={{flex: 3}}>
                        <h2 className="h2">Recipes</h2>
                        <RecipeList
                            recipes={recipes}
                            favorites={favorites}
                            onClick={this.onRecipeClick}
                            onFavorited={this.props.toggleFavorite}
                        />
                    </div>
                        <RecipeDetail
                            recipe={currentRecipe}
                            className= "ml4"
                            style={{flex: 5}}
                        />
                </main>
            </div>
        );
    }
};

Home.propTypes= {
    toggleFavorite: PropTypes.func,
    state: PropTypes.object
};

export default Home;
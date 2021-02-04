import React from 'react'
import { connect } from "react-redux";
import Pokemon from './Pokemon';

class PokemonContainer extends React.Component {

    render() {
        return (
            <Pokemon pokemons={this.props.pokemons} />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        pokemons : state.mainPage.pokemonsData
    }
}

export default connect ( mapStateToProps, {}) (PokemonContainer)
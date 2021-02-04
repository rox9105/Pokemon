import React from 'react'
import { connect } from "react-redux";
import { getPokemons, getInotherPage, getPokemonsByType, 
    setPageSize, setNextPage, setPreviousPage, 
    setPokemonsType } from '../reduxStore/mainReducer'
import MainPage from "./MainPage";

class MainPageContainer extends React.Component {
    componentDidMount() {
        if (this.props.pokemons.length <= 0 ) {this.props.getPokemons()}
    }

    render() {
        return (
            <MainPage pokemons={this.props.pokemons}
            state={this.props.state}
            nextPage={this.props.setNextPage}
            previousPage={this.props.setPreviousPage}
            getInotherPage={this.props.getInotherPage}
            getPokemons={this.props.getPokemons}
            setPageSize={this.props.setPageSize}
            setType={this.props.setPokemonsType}
            getPokemonsByType={this.props.getPokemonsByType}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        state : state.mainPage,
        pokemons : state.mainPage.pokemonsData
    }
}

export default connect ( mapStateToProps, { getPokemons, getInotherPage, getPokemonsByType, setPageSize, setNextPage, 
    setPreviousPage, setPokemonsType }) (MainPageContainer)
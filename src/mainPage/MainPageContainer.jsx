import React from 'react'
import { connect } from "react-redux";
import {
    getPokemons, getInotherPage, getPokemonsByType,
    setPageSize, setNextPage, setPreviousPage,
    setPokemonsType, getPokemonsFromSearch, setValueForSearching,
    setCurrentPage, setPages, setErrorMessage, setPokemons
} from '../reduxStore/mainReducer'
import MainPage from "./MainPage";

class MainPageContainer extends React.Component {
    componentDidMount() {
        if (this.props.pokemons.length <= 0) { this.props.getPokemons() }
    }

    render() {
        return (
            <MainPage
                pokemons={this.props.pokemons}
                state={this.props.state}
                pokemonsToSearch={this.props.state.pokemonsToSearch}
                type={this.props.state.type}
                totalCount={this.props.state.totalPokemonsCount}
                pageSize={this.props.state.pageSize}
                currentType={this.props.state.type}
                currentPage={this.props.state.currentPage}
                pages={this.props.state.arrayOfPages}
                getInotherPage={this.props.getInotherPage}
                getPokemons={this.props.getPokemons}
                getPokemonsByType={this.props.getPokemonsByType}
                setNextPage={this.props.setNextPage}
                setPreviousPage={this.props.setPreviousPage}
                setPageSize={this.props.setPageSize}
                setCurrentPage={this.props.setCurrentPage}
                setPages={this.props.setPages}
                setType={this.props.setPokemonsType}
                setText={this.props.setValueForSearching}
                setErrorMessage={this.props.setErrorMessage}
                setPokemons={this.props.setPokemons}
                searchingPokemons={this.props.getPokemonsFromSearch}
                textToSearch={this.props.state.textToSearch}
                errorMessage={this.props.state.errorMessage}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        state: state.mainPage,
        pokemons: state.mainPage.pokemonsData
    }
}

export default connect(mapStateToProps, {
    getPokemons, getInotherPage, getPokemonsByType,
    setPageSize, setNextPage, setPreviousPage,
    setPokemonsType, getPokemonsFromSearch, setValueForSearching,
    setCurrentPage, setPages, setErrorMessage, setPokemons
})(MainPageContainer)
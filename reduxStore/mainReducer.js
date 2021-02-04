import axios from "axios"
import { getPageSizeFromLS } from '../localStorage/localStorage'

const SET_POKEMONS = 'SET_POKEMONS'
const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
const SET_NEXT_PAGE = 'SET_NEXT_PAGE'
const SET_PREVIOS_PAGE = 'SET_PREVIOS_PAGE'
const SET_POKEMONS_TYPE = 'SET_POKEMONS_TYPE'

const initialState = {
    pokemonsData: [],
    totalPokemonsCount: 100,
    pageSize: getPageSizeFromLS() || 15,
    nextPage: null,
    previousPage: null,
    type: null
}

const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POKEMONS:
            return {
                ...state, pokemonsData: action.pokemon
            }
        case SET_PAGE_SIZE:
            return {
                ...state, pageSize: action.size
            }
        case SET_NEXT_PAGE:
            return {
                ...state, nextPage: action.next
            }
        case SET_PREVIOS_PAGE:
            return {
                ...state, previousPage: action.previos
            }
        case SET_POKEMONS_TYPE:
            return {
                ...state, type: action.pType
            }
        default:
            return state
    }
}

export const setPokemons = (pokemon) => ({ type: SET_POKEMONS, pokemon })
export const setPageSize = (size) => ({ type: SET_PAGE_SIZE, size })
export const setNextPage = (next) => ({ type: SET_NEXT_PAGE, next })
export const setPreviousPage = (previos) => ({ type: SET_PREVIOS_PAGE, previos })
export const setPokemonsType = (pType) => ({ type: SET_POKEMONS_TYPE, pType })

export const getPokemons = (pageSize = initialState.pageSize || 15, offset = 0) => {
    let pokemons = []
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`)
            const array = await response.data
            dispatch(setNextPage(array.next))
            Promise.all(array.results.map(async pokemon => {
                const result = await getPokemonInfo(pokemon)
                pokemons.push(result)
                dispatch(setPokemons(pokemons))
            }))
        } catch (error) {
            throw new Error('getting pokemons went wrong')
        }
    }
}

export const getInotherPage = (nextPage = initialState.nextPage, previousPage = initialState.previousPage) => {
    let pokemons = []
    return async (dispatch) => {
        try {
            const response = await axios.get(nextPage || previousPage)
            const array = await response.data
            dispatch(setNextPage(array.next))
            dispatch(setPreviousPage(array.previous))
            Promise.all(array.results.map(async pokemon => {
                const result = await getPokemonInfo(pokemon)
                pokemons.push(result)
                dispatch(setPokemons(pokemons))
            }))
        } catch (e) {
            throw new Error(e)
        }
    }
}
export const getPokemonsByType = (type = initialState.type) => {
    let pokemons = []
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`)
            const array = await response.data.pokemon
            Promise.all(array.map(async pokemon => {
                const result = await getPokemonInfo(pokemon.pokemon)
                pokemons.push(result)                
            })).then ( () => {
                dispatch(setPokemons(pokemons))
            })
        } catch (error) {
            throw new Error('getting pokemons went wrong')
        }
    }
}

export const getPokemonInfo = async (pokemon) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        return response.data
    }
    catch (e) { }
}

export default MainReducer

/* for await (let promise of array.results) {
    const result = await getPokemonInfo(promise)
    pokemons.push(result)
    dispatch(setPokemons(pokemons))
} */
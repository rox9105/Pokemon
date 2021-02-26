import axios from "axios"
import { getPageSizeFromLS } from '../localStorage/localStorage'

const SET_POKEMONS = 'SET_POKEMONS'
const SET_POKEMONS_TO_SEARCH = 'SET_POKEMONS_TO_SEARCH'
const SET_POKEMONS_TOTAL_COUNT = 'SET_POKEMONS_TOTAL_COUNT'
const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_NEXT_PAGE = 'SET_NEXT_PAGE'
const SET_PREVIOUS_PAGE = 'SET_PREVIOUS_PAGE'
const SET_PAGES = 'SET_PAGES'
const SET_POKEMONS_TYPE = 'SET_POKEMONS_TYPE'
const SET_TEXT_TO_SEARCH = 'SET_TEXT_TO_SEARCH'
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'

const initialState = {
    pokemonsData: [],
    pokemonsToSearch: [],
    totalPokemonsCount: null,
    pageSize: getPageSizeFromLS() || 10,
    currentPage: 1,
    nextPage: null,
    previousPage: null,
    arrayOfPages: null,
    type: '',
    textToSearch: '',
    errorMessage: ''
}

const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POKEMONS:
            return {
                ...state, pokemonsData: action.pokemon
            }
        case SET_POKEMONS_TO_SEARCH:
            return {
                ...state, pokemonsToSearch: action.srcPoks
            }
        case SET_POKEMONS_TOTAL_COUNT:
            return {
                ...state, totalPokemonsCount: action.totalCount
            }
        case SET_PAGE_SIZE:
            return {
                ...state, pageSize: action.size
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            }
        case SET_NEXT_PAGE:
            return {
                ...state, nextPage: action.next
            }
        case SET_PREVIOUS_PAGE:
            return {
                ...state, previousPage: action.previos
            }
        case SET_PAGES:
            return {
                ...state, arrayOfPages: action.pages
            }
        case SET_POKEMONS_TYPE:
            return {
                ...state, type: action.pType
            }
        case SET_TEXT_TO_SEARCH:
            return {
                ...state, textToSearch: action.text
            }
        case SET_ERROR_MESSAGE:
            return {
                ...state, errorMessage: action.message
            }
        default:
            return state
    }
}

export const setPokemons = (pokemon) => ({ type: SET_POKEMONS, pokemon })
export const setPokemonsToSearch = (srcPoks) => ({ type: SET_POKEMONS_TO_SEARCH, srcPoks })
export const setPokemonsTotalCount = (totalCount) => ({ type: SET_POKEMONS_TOTAL_COUNT, totalCount })
export const setPageSize = (size) => ({ type: SET_PAGE_SIZE, size })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setNextPage = (next) => ({ type: SET_NEXT_PAGE, next })
export const setPreviousPage = (previos) => ({ type: SET_PREVIOUS_PAGE, previos })
export const setPages = (pages) => ({ type: SET_PAGES, pages })
export const setPokemonsType = (pType) => ({ type: SET_POKEMONS_TYPE, pType })
export const setValueForSearching = (text) => ({ type: SET_TEXT_TO_SEARCH, text })
export const setErrorMessage = (message) => ({ type: SET_ERROR_MESSAGE, message })

export const getPokemons = (pageSize = initialState.pageSize || 15, offset = 0) => {
    let pokemons = []
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`)
            const array = await response.data
            if (initialState.totalPokemonsCount === null) {
                dispatch(setPokemonsTotalCount(array.count))
            }
            dispatch(setNextPage(array.next))
            dispatch(setPreviousPage(array.previous))
            Promise.all(array.results.map(async pokemon => {
                const result = await getPokemonInfo(pokemon)
                pokemons.push(result)
                dispatch(setPokemons(pokemons))
            })) 
            const responsePokToSearch = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0`)
            dispatch(setPokemonsToSearch(responsePokToSearch.data.results))
        } catch (error) {
            throw new Error('getting pokemons went wrong' + error.message)
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
                let result = await getPokemonInfo(pokemon)
                pokemons.push(result)
                dispatch(setPokemons(pokemons))
            }))
            
        } catch (error) {
            throw new Error(error.message)
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
                dispatch(setPokemons(pokemons))
            }))
        } catch (error) {
            throw new Error('getting pokemons went wrong' + error.message)
        }
    }
}

export const getPokemonsFromSearch = (result) => {
    let pokemons = []
    return (dispatch) => {
        try {
            Promise.all(result.map(async pokemon => {
                const response = await getPokemonInfo(pokemon)
                pokemons.push(response)
                dispatch(setPokemons(pokemons))
            }))
        } catch (error) { }
    }
}

export const getPokemonInfo = async (pokemon) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        return response.data
    }
    catch (error) { console.log(`getting ${pokemon.name}'s info went wrong /` + error.message) }
}

export default MainReducer

/*  for await (let promise of array.results) {
    const result = await getPokemonInfo(promise)
    pokemons.push(result)
    dispatch(setPokemons(pokemons))
} */
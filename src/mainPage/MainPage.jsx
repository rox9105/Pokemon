import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './MainPage.module.css'

const MainPage = (props) => {

    React.useEffect(() => {
        localStorage.setItem('pageSize', JSON.stringify(props.state.pageSize))
    })

    let goToPreviousPage = () => {
        props.getInotherPage(props.state.previousPage)
    }
    let goToNextPage = () => {
        props.getInotherPage(props.state.nextPage)
    }
    let setPageSize = (event) => {
        let pageSize = event.target.value
        props.setPageSize(pageSize)
        console.log(props.state.pageSize);
        console.log(pageSize);
        if (pageSize === props.state.pageSize) { }
        else { props.getPokemons(pageSize) }
    }
    let setPType = (e) => {
        debugger
        let type = e.target.value
        props.setType(type)
        props.getPokemonsByType(type)
        console.log(type);
        console.log(props.state.type);
    }

    return (
        <div className={s.mainBlock}>
            <div className={s.changePageBlock}>
                <span className={s.inotherPageText}>Go to inother page : </span>
                <button disabled={props.state.previousPage === null ? true : false}
                    className={s.changePageButtons} onClick={goToPreviousPage}>Previous Page</button>
                <button className={s.changePageButtons} onClick={goToNextPage}>Next Page</button>
            </div>
            <div className={s.changePageSizeBlock}>
                <span className={s.pokAtMomentText}>Pokemons per page : </span>
                <button value={10} className={s.changeSizeButtons} onClick={setPageSize}>10</button>
                <button value={20} className={s.changeSizeButtons} onClick={setPageSize}>20</button>
                <button value={50} className={s.changeSizeButtons} onClick={setPageSize}>50</button>
                <span className={s.pokAtMomentText}>
                    Pokemons at the moment : <span className={s.pokAtMomentNumber}> {props.pokemons.length} </span>
                </span>
            </div>
            <div className={s.setTypeBlock}>
                <button value={'physical'} className={s.butTypes} onClick={setPType}>physical</button>
                <button value={'ice'} className={s.butTypes} onClick={setPType}>ice</button>
                <button value={'dark'} className={s.butTypes} onClick={setPType}>dark</button>
                <button value={'ground'} className={s.butTypes} onClick={setPType}>ground</button>
                <button value={'ghost'} className={s.butTypes} onClick={setPType}>ghost</button>
            </div>
            <div className={s.pokemonsBlock}>
                {props.pokemons.map(el =>
                    <NavLink to={`/pokemon?id=` + el.name} key={el.id}>
                        <div className={s.loadedPokemonsBlock} key={el.id}>
                            <img src={el.sprites.front_default ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRVlTkTLDcSkjPg91sB9ncrjvcOyDIJpxgcg&usqp=CAU'}
                                className={s.pIcon} alt='img' />
                            <div className={s.pokemonsInfoValues}>
                                <div className={s.pokemonsStats1}>Name : {el.name}</div>
                                <div className={s.pokemonsStats2}>Base Exp : {el.base_experience}</div>
                                <div className={s.pokemonsStats3}>Height : {el.height}</div>
                                <div className={s.pokemonsStats4}>Weight : {el.weight}</div>
                            </div>
                            {el.types.map(t => <div className={s.pTypes} key={t.type.url}>{t.type.name}</div>)}
                        </div>
                    </NavLink>
                )}
            </div>
        </div>
    )
}

export default MainPage
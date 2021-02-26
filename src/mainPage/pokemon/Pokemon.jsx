import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Pokemon.module.css'

const Pokemon = (props) => {

    const queryId = document.location.search.split('=')

    return (
        <div className={s.mainBlock}>
            <div>
                {props.pokemons.length <= 0 ?
                    <NavLink to='/' exact>
                        <div className={s.ifPageReloaded}>
                            <h1>Go back</h1>
                        </div>
                    </NavLink>
                    :
                    props.pokemons.filter(el => el !== undefined && el.name === queryId[1]).map(el =>
                        <div key={el.sprites} className={s.mainLoadedBlock}>
                            <img src={el.sprites.front_default} className={s.pIcon} alt='img' />
                            <img src={el.sprites.back_default} className={s.pIcon} alt='img' />
                            <div>
                                {el.types.map(t =>
                                    <div className={s.pTypes} key={t.type.url}>{t.type.name}</div>
                                )}
                                <div className={s.pokemonsStats1}>
                                    Name : <span className={s.pokemonName}>{el.name}</span>
                                </div>
                                <div className={s.pokemonsStats2}>Base Exp : {el.base_experience}</div>
                                <div className={s.pokemonsStats3}>Height Exp : {el.height}</div>
                                <div className={s.pokemonsStats4}>Weight : {el.weight}</div>
                                <div className={s.wordStats}>Main Stats : </div>
                                <div className={s.mainStats}>
                                    {el.stats.map(s =>
                                        <div key={s.stat.url}> {s.stat.name} : {s.base_stat}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
            </div>

        </div >
    )
}

export default Pokemon

/* let pagesCount = props.totalCount / +props.pageSize
    let pages = new Array(Math.ceil(pagesCount)).fill().map((_, i) => i+1)

    React.useEffect(() => {
        pagesCount = +props.totalCount / +props.pageSize
        pages = new Array(Math.ceil(pagesCount)).fill().map((_, i) => i+1)
        if (pages.length >= 1 || props.pages === null) {
            debugger
            props.setPages(pages)
        }

    }, [props.pageSize]) */
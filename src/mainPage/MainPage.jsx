import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import s from './MainPage.module.css'
import alt_P_Icon from '../assets/alt_P_Icon.bmp'

const MainPage = (props) => {
    let [sliceBegin, setSliceBegin] = useState(+props.currentPage >= 3 ? +props.currentPage - 3 : 0)
    let [sliceEnd, setSliceEnd] = useState(+props.currentPage >= 3 ? +props.currentPage + 2 : 5)
    let [isDisabled, setIsDisabled] = useState(false)

    React.useEffect(() => {
        localStorage.setItem('pageSize', JSON.stringify(props.pageSize))
    })

    let pagesArrayLocal = []
    let pagesCount = props.totalCount / props.pageSize
    for (let i = 1; i <= Math.ceil(pagesCount); i++)
        pagesArrayLocal.push(i)

    React.useEffect(() => {
        pagesCount = props.totalCount / props.pageSize
        pagesArrayLocal = new Array(Math.ceil(pagesCount)).fill().map((_, i) => i + 1)
        if (pagesArrayLocal.length >= 1 || props.pages === null) {
            props.setPages(pagesArrayLocal)
        }
    }, [props.pageSize, props.totalCount])

    let showNextPageBut = () => {
        setSliceBegin(sliceBegin + 1)
        setSliceEnd(sliceEnd + 1)
    }
    let showPreviousPageBut = () => {
        if (sliceBegin > 0) { setSliceBegin(sliceBegin - 1) }
        if (sliceEnd > 5) { setSliceEnd(sliceEnd - 1) }
    }
    let onChangePage = (event) => {
        let pageNumber = event.target.value
        let offset = pageNumber * props.pageSize - props.pageSize
        let pageSize = props.pageSize
        props.setCurrentPage(+pageNumber)
        props.getPokemons(pageSize, offset)
        funcDisableTimer()
    }
    let goToPreviousPage = () => {
        props.getInotherPage(props.state.previousPage)
        props.setCurrentPage((props.currentPage - 1))
        showPreviousPageBut()
        funcDisableTimer()
    }
    let goToNextPage = () => {
        props.getInotherPage(props.state.nextPage)
        props.setCurrentPage((props.currentPage + 1))
        showNextPageBut()
        funcDisableTimer()
    }
    let goToFirstPage = () => {
        if (props.currentPage !== 1) {
            props.getPokemons(props.pageSize)
            props.setCurrentPage(1)
            setSliceBegin(0)
            setSliceEnd(5)
        }
    }
    let goToLastPage = () => {
        if (props.currentPage !== props.pages.length) {
            let pageNumber = props.pages.length
            let offset = pageNumber * props.pageSize - props.pageSize
            let pageSize = props.pageSize
            props.getPokemons(pageSize, offset)
            props.setCurrentPage(pageNumber)
            setSliceBegin(pageNumber - 5)
            setSliceEnd(pageNumber)
        }
    }
    let funcDisableTimer = () => {
        setIsDisabled(true)
        console.log(isDisabled)
        setTimeout(() => {
            setIsDisabled(false)
        }, 1000)
    }
    let pageSizeButtonsArray = [
        { value: 5 },
        { value: 10 },
        { value: 20 },
    ]
    let onChangePageSize = (event) => {
        let pageSize = event.target.value
        props.setPageSize(pageSize)
        props.setPages(props.pages)
        props.setCurrentPage(1)
        if (props.state.pageSize === pageSize && props.pokemons.length === +props.state.pageSize) { }
        else {
            props.getPokemons(pageSize)
            setSliceBegin(0)
            setSliceEnd(5)
        }
    }
    let setValueForSearching = (event) => {
        let value = event.target.value
        props.setText(value)
    }
    let searchPokemons = () => {
        let result = props.pokemonsToSearch.filter(el => el.name.includes(props.textToSearch))
        if (props.textToSearch.length >= 2) {
            props.setText('')
            props.setType('')
            props.setCurrentPage(1)
            props.setNextPage(null)
            props.setPreviousPage(null)
            props.setPages(0)
            props.searchingPokemons(result)
        }
        if (result.length <= 0) {
            props.setPokemons(0)
        }
    }
    let setPType = (e) => {
        let type = e.target.value
        props.setType(type)
        props.setPages(0)
        props.setNextPage(null)
        props.setPreviousPage(null)
        if (type === '') { props.getPokemons(props.pageSize) }
        else { props.getPokemonsByType(type) }
    }
    let setDefaultType = () => {
        props.setType('')
        if (props.pokemons.length !== parseInt(props.pageSize)) {
            props.setPages(pagesArrayLocal);
            props.setCurrentPage(1)
            props.getPokemons(props.pageSize)
            setSliceBegin(0)
            setSliceEnd(5)
        }
    }
    let reloadPage = () => {
        props.setText('')
        props.setType('')
        props.setPages(pagesArrayLocal)
        props.setCurrentPage(1)
        setSliceBegin(0)
        setSliceEnd(5)
        props.getPokemons(props.pageSize)
    }
    let currentPage = props.state.currentPage

    return (
        <div className={s.contentMainBlock}>
            <div className={s.paginationBlock}>
                <span className={s.inotherPageText}>Go to inother page : </span>
                <button disabled={+props.currentPage === 1 ? true : false || isDisabled}
                    className={s.pageBtnsFirstLast} onClick={goToFirstPage}>first</button>
                <button disabled={props.state.previousPage === null
                    || props.type !== '' ? true : false || isDisabled}
                    className={s.btnsNextPrev} onClick={goToPreviousPage}>prev</button>
                {props.pages !== null && props.pages !== 0 && props.pages.slice(sliceBegin, sliceEnd)
                    .map(p =>
                        <button value={p} key={p} onClick={onChangePage}
                            disabled={+currentPage === +p ? true : false || isDisabled}
                            className={currentPage === p ? s.selectedButton : s.paginationButtons}>
                            {p}
                        </button>
                    )}
                <button disabled={props.state.nextPage === null ? true : false || isDisabled}
                    className={s.btnsNextPrev} onClick={goToNextPage}>next</button>
                <button disabled={+props.pageSize !== +props.pokemons.length ? true : false || isDisabled}
                    className={s.pageBtnsFirstLast} onClick={goToLastPage}>last</button>
            </div>
            <div className={s.changePageSizeBlock}>
                <span className={s.pokPerPageText}>Pokemons per page : </span>
                {pageSizeButtonsArray.map(el =>
                    <button value={el.value} key={el.value} onClick={onChangePageSize}
                        className={
                            +props.pageSize === +el.value ? s.changePSizeBtnsActive : s.changePSizeBtns}
                        disabled={+el.value === +props.pageSize ? true : false || isDisabled} >
                        {el.value}
                    </button>
                )}
                <span className={s.pokAtMomentText}>
                    Pokemons at the moment :
                    <span className={s.pokAtMomentNumber}>
                        {props.pokemons.length}
                    </span>
                </span>
            </div>
            <div className={s.searchingBlock}>
                <span className={s.searchByNameText}>Search by name : </span>
                <div className={s.searchByTextBlock}>
                    <input className={s.inputSearch} placeholder={'minimum two letters...'}
                        onChange={setValueForSearching} value={props.textToSearch} />
                    <button onClick={searchPokemons} className={s.buttonSearch}>Search</button>
                    <button onClick={reloadPage} className={s.buttonReload}>Reload</button>
                </div>
                <div className={s.searchByTypeBlock} style={{ display: 'inline' }}>
                    <span className={s.searchByTypeText}>Search By Type : </span>
                    <select className={s.selectType} onChange={setPType} value={props.currentType}>
                        <option className={s.optionTypeAll} disabled={true} value=''>All Types</option>
                        <option className={s.optionTypeFighting} value={'fighting'}>Fighting</option>
                        <option className={s.optionTypeIce} value={'ice'}>Ice</option>
                        <option className={s.optionTypeDark} value={'dark'}>Dark</option>
                        <option className={s.optionTypeGround} value={'ground'}>Ground</option>
                        <option className={s.optionTypeGhost} value={'ghost'}>Ghost</option>
                        <option className={s.optionTypeDragon} value={'dragon'}>Dragon</option>
                        <option className={s.optionTypeRock} value={'rock'}>Rock</option>
                        <option className={s.optionTypeSteel} value={'steel'}>Steel</option>
                        <option className={s.optionTypeBug} value={'bug'}>Bug</option>
                        <option className={s.optionTypeFire} value={'fire'}>Fire</option>
                        <option className={s.optionTypePoison} value={'poison'}>Poison</option>
                        <option className={s.optionTypeGrass} value={'grass'}>Grass</option>
                    </select>
                    <button onClick={setDefaultType} className={s.clearSearchButton}>X</button>
                </div>
            </div>
            <div className={s.pokemonsBlock}>
                {props.pokemons === 0 || null
                    ?
                    <div className={s.errorNoResults}>
                        <span className={s.errMessage}>
                            No results, please try again
                        </span>
                    </div>
                    :
                    props.pokemons.filter(el => el !== undefined || null).map(el =>
                        <NavLink to={`/pokemon?id=` + el.name} key={el.id}>
                            <div className={s.loadedPokemonsBlock} key={el.id}>
                                <img src={el.sprites.front_default || alt_P_Icon}
                                    className={s.pIcon} alt='img' />
                                <div className={s.pokemonsInfoValues}>
                                    <div className={s.textName}>Name</div>
                                    <div className={s.pokemonsStats1}>{el.name}</div>
                                    <div className={s.pokemonsStats2}>Base Exp : {el.base_experience}</div>
                                    <div className={s.pokemonsStats3}>Height : {el.height}</div>
                                    <div className={s.pokemonsStats4}>Weight : {el.weight}</div>
                                </div>
                                {el.types.map(t =>
                                    <div className={s.pTypes} key={t.type.url}>{t.type.name}</div>)}
                            </div>
                        </NavLink>
                    )
                }
            </div>
        </div>
    )
}

export default MainPage
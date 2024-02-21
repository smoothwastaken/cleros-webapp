"use client";

import React from 'react'
import FooterFilmCard from './FooterFilmCard'

import { FilmData } from '@/app/lib/firestore/films'

const FooterFilms = (props: { enable: boolean, films: FilmData[], filmNumber: number, setFilmNumber: Function, filmSelected: FilmData, setFilmSelected: Function }) => {

  return (
    <div className={`z-50 overflow-hidden grid grid-cols-3 grid-row-2 sm:grid-cols-5 items-center absolute bottom-1 left-0 w-screen h-1/4 transition-all duration-500 select-none cursor-pointer ${!props.enable ? "translate-y-20" : ""}`}>
        {props.films.map((film, index) => {
            const currentFilm = props.filmNumber + index - 2;
            return (
            <div onClick={() => {
                props.setFilmNumber(currentFilm);
            }} key={currentFilm} className={`${currentFilm==props.filmNumber ? "" : "translate-y-10 hover:translate-y-0 opacity-65"} hover:opacity-100 transition-all duration-500 h-full ${(index == 0 || index == 4) ? "hidden sm:block" : null}`}>
                <FooterFilmCard  film={film} />
            </div>
            )
        })}
        
    </div>
  )
}

export default FooterFilms
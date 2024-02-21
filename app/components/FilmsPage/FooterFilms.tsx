"use client";

import React from 'react'
import FooterFilmCard from './FooterFilmCard'

import { FilmData } from '@/app/lib/firestore/films'

const FooterFilms = (props: { enable: boolean, films: FilmData[], filmNumber: number, setFilmNumber: Function, filmSelected: FilmData, setFilmSelected: Function }) => {

  return (
    <div className={`z-50 grid grid-cols-5 items-center absolute bottom-1 left-0 w-screen h-1/4 ${!props.enable ? "translate-y-20" : ""}`}>
        {props.films.map((film, index) => {
            return (
            <div onClick={() => {
                props.setFilmNumber(index);
            }} key={index} className={`${index==props.filmNumber ? "" : "translate-y-10 hover:translate-y-0 opacity-65"} hover:opacity-100 transition-all duration-500 h-full`}>
                <FooterFilmCard  film={film} />
            </div>
            )
        })}
        
    </div>
  )
}

export default FooterFilms
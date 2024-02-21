"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/app/components/Header";
import { FilmData, getLatestFilms, getMostPopularFilms, getRandomFilms } from "../lib/firestore/films";
import HeroFilms from "../components/FilmsPage/HeroFilm";
import FooterFilms from "../components/FilmsPage/FooterFilms";
import { limit } from "firebase/firestore";

export default function Films() {
  const [films, setFilms] = useState<FilmData[]>([]);
  const [filmNumber, setFilmNumber] = useState<number>(3);
  const [filmSelected, setFilmSelected] = useState<FilmData>(films[filmNumber]);

  const [enableFooter, setEnableFooter] = useState<boolean>(true);

  useEffect(() => {
    const limitNombreFilms = 50;
    getRandomFilms(limitNombreFilms, (films: FilmData[]) => {
      setFilms(films);
    });

  }, []);

  useEffect(() => {
    setFilmSelected(films[filmNumber % films.length]);
  }, [filmNumber, films])

  return (
    <>
      {/* Left Side Infos */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-1/3 w-screen bg-gradient-to-b from-transparent to-black" />
      {filmSelected ? (
          <>
      <div className="scale-90 transition-all duration-300 ease-in-out hover:scale-95 ">
          <div
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original${filmSelected?.infos?.backdrop_path}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="mt-5 min-h-screen rounded-3xl bg-gradient-to-br from-gray-700 via-black to-gray-500 p-[1.5px] shadow-xl"
          >
            <div
              className="min-h-screen w-full rounded-3xl bg-black bg-opacity-50 bg-clip-padding p-5"
              style={
                {
                  // backdropFilter: "blur(px)",
                }
              }
            >
              <div onMouseEnter={() => setEnableFooter(false)} onMouseLeave={() => setEnableFooter(true)} className="scale-95 hover:scale-100 transition-all duration-300">
                <HeroFilms film={filmSelected} enableFooter={enableFooter} setEnableFooter={setEnableFooter}/>
              </div>
            </div>
          </div>
      </div>
      <FooterFilms enable={enableFooter} films={films.slice((filmNumber - 2) % films.length, (filmNumber + 3) % films.length)} filmNumber={filmNumber} setFilmNumber={setFilmNumber} filmSelected={filmSelected} setFilmSelected={setFilmNumber}/>
        </>
        ) : null}
    </>
  );
}

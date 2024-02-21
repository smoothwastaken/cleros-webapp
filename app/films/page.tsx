"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/app/components/Header";
import { FilmData, getLatestFilms, getRandomFilms } from "../lib/firestore/films";
import HeroFilms from "../components/FilmsPage/HeroFilm";

export default function Films() {
  const [films, setFilms] = useState<FilmData[]>([]);
  const [filmNumber, setFilmNumber] = useState<number>(4);
  useEffect(() => {
    getLatestFilms(10, (films: FilmData[]) => {
      setFilms(films);
    });
  }, []);

  return (
    <>
      {/* Left Side Infos */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-[5] h-1/3 w-screen bg-gradient-to-b from-transparent to-black" />
      <div className="scale-90 transition-all duration-300 ease-in-out hover:scale-95 ">
        {films[filmNumber] ? (
          <div
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original${films[filmNumber]?.infos.backdrop_path}')`,
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
              <HeroFilms film={films[filmNumber]} />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

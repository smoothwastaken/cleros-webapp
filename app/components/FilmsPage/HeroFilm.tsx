"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { FilmData, FilmDetails, FilmImages, getFilmDetails, getFilmImages } from "@/app/lib/firestore/films";

import { HeartIcon } from "@heroicons/react/24/solid"; 

function HeroFilms(props: { film: FilmData }) {
  const [film, setFilm] = React.useState<FilmData>(props.film);
  const [filmDetails, setFilmDetails] = React.useState<FilmDetails>();
  const [filmImages, setFilmImages] = React.useState<FilmImages>();

  useEffect(() => {
    getFilmImages(film?.infos.id, (filmImages: FilmImages) => {
      setFilmImages(filmImages);
    });
    getFilmDetails(film?.infos.id, (filmDetails: FilmDetails) => {
      setFilmDetails(filmDetails);
    });
  }, []);

  return (
    <div key={film?.infos.id} className="grid grid-cols-2">
      <div className="mt-20">
        {/* Title Artwork */}
        {filmImages?.logos[0]?.file_path ? (
          <div className="flex items-center w-full">
            <Image
              className=""
              // className="rounded-lg"
              src={`https://image.tmdb.org/t/p/original${filmImages?.logos[0]?.file_path}`}
              alt={film?.infos.title}
              width={filmImages?.logos[0]?.aspect_ratio ? 250 * filmImages?.logos[0]?.aspect_ratio : 250 / 1.9}
              height={250}
            />
          </div>
        ) : (
          <>
            <h2 className="text-9xl text-white font-extrabold">{film?.infos.original_title}</h2>
            {film?.infos.title !== film?.infos.original_title ? (<p className="mt-5 text-white text-xl font-semibold italic"><span className="font-normal">ou</span> « {film?.infos.title} »</p>) : null}
          </>
        )}
        
        {/* Infos */}
        <div className="mt-3 py-1 px-2 w-fit flex gap-2 items-center bg-opacity-35 bg-black border-[1px] border-gray-500 rounded-xl select-none">
          <div className="flex items-center gap-1">
            <HeartIcon className="h-5 text-red-500" />
            <p className="text-red-500 font-semibold">{(film?.infos.vote_average*10).toPrecision(3)}%</p>
          </div>
            <p className="text-gray-400 text-xl">•</p>
            <p className="text-gray-200 font-bold">{film?.infos.release_date.split("-")[0]}</p>
            <p className="text-gray-400 text-xl">•</p>
            <div className="flex items-center gap-1">
              {filmDetails?.genres ? filmDetails?.genres.map((genre, index) => {
                return  <p key={index} className="text-gray-200">{genre.name}{(index + 1) == filmDetails?.genres.length ? "" : ","}</p>
              }) : null}
            </div>
        </div>
        {/* Overview */}
        <p className="mt-1 py-2 px-3 w-fit flex gap-2 text-gray-200 items-center hover:bg-opacity-35 bg-opacity-0 border-[1px] border-transparent hover:border-gray-500 transition-all duration-300 bg-black hover:shadow-xl rounded-xl">{film?.infos.overview}</p>
        {/* Buttons */}
        <div className="flex items-center gap-5">
          {/* Watch button */}
          <Link href={film?.versions.hd_vf ? `${film?.versions.hd_vf}` : `${film?.versions.vf}`}>
            <p className="mt-3 py-1 px-2 w-fit flex gap-2 items-center text-gray-200 hover:scale-105 bg-opacity-35 bg-black border-[1px] border-gray-500 transition-all duration-300 rounded-xl select-none">
              Regarder
            </p>
          </Link>
          {/* More details button */}
          <Link href={film?.versions.hd_vo ? `${film?.versions.hd_vo}` : `${film?.versions.vo}`}>
            <p className="mt-3 py-1 px-2 w-fit flex gap-2 items-center text-gray-200 hover:scale-105 bg-opacity-35 bg-black border-[1px] border-gray-500 transition-all duration-300 rounded-xl select-none">
              Plus de détails
            </p>
          </Link>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}

export default HeroFilms;

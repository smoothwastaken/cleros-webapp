'use client';

import React from 'react'
import { FilmData, getFilmById, getFilmDetails } from '@/app/lib/firestore/films';
import { FilmDetails } from '../../../lib/firestore/films';;
import ReactPlayer from 'react-player';
const WatchFilmID = ({ params }: { params: { filmId: number } }) => {

    const [film, setFilm] = React.useState<FilmData | null>(null);
    const [filmDetails, setFilmDetails] = React.useState<FilmDetails | null>(null);

    React.useEffect(() => {
        getFilmById(params.filmId, (filmData: FilmData[]) => {
            setFilm(filmData[0]);
            getFilmDetails(params.filmId, (filmDetails: FilmDetails) => {
                setFilmDetails(filmDetails);
            });
        });
    });

  return (
    <div>
        <p>WatchFilmID: {params.filmId}</p>
        <p>Film title : {film?.title}</p>
        <div>
            <ReactPlayer
                url={`${film?.versions?.vf}`}
                controls
                width="100%"
                height="100%"
                pip
                playing

            />
        </div>
    </div>
  )
}

export default WatchFilmID
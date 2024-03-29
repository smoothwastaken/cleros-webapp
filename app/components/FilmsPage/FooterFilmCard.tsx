import React, { use } from 'react'

import { FilmData, FilmImages, getFilmImages } from '@/app/lib/firestore/films'
import { get } from 'http';
import Image from 'next/image';
import Link from 'next/link';

const FooterFilmCard = (props: { film: FilmData }) => {

    const [film, setFilm] = React.useState<FilmData>(props.film);
    const [filmImages, setFilmImages] = React.useState<FilmImages>();

    React.useEffect(() => {
        setFilm(props.film);

        getFilmImages(film?.id, (filmImages: FilmImages) => {
            setFilmImages(filmImages);
        });

    }, []);

  return (
        <div className='sm:p-1 p-[2px] w-full h-full'>
            <div className='sm:p-[1.5px] h-full w-full rounded-lg shadow-xl transition-all duration-300 scale-95 hover:scale-100'
                    style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/original${film?.backdrop_path}')`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                    >
                <div
                className="h-full w-full p-1 sm:p-5 bg-clip-padding bg-black bg-opacity-30 rounded-lg shadow-xl transition-all duration-300">
                    <div className={`scale-95 hover:scale-100 transition-all duration-300 w-full h-full ${filmImages?.logos[0]?.file_path ? "flex flex-col items-center p-3" : null}`}>
                        {filmImages?.logos[0]?.file_path ? (
                            <Image
                            src={`https://image.tmdb.org/t/p/original${filmImages?.logos[0]?.file_path}`}
                            alt={film?.title}
                            width={100}
                            height={100}
                            />
                        ) : (
                            <h2 className="sm:text-2xl text-sm sm:text-left justify-center text-white font-extrabold">{film?.original_title}</h2>
                        )}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default FooterFilmCard
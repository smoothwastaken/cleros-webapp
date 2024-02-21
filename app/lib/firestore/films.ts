import db from "@/app/lib/firestore/firestore";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
} from "firebase/firestore";

export interface FilmData {
  infos: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  };
  versions: {
    full_hd_vf?: string;
    hd_vf?: string;
    hd_vo?: string;
    vf?: string;
    vo?: string;
  };
}

export interface FilmDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | object;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    },
  ];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
    },
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    },
  ];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    },
  ];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface FilmImages {
  backdrops: [{
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }] | [];
  id: number;
  logos: [{
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }] | [];
  posters: [{
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }] | [];
}

export async function getAllFilms(callback: Function) {
  const q = query(collection(db, "films"), limit(1));
  const querySnapshot = await getDocs(q);
  callback(querySnapshot.docs.map((doc) => doc.data()));
}

export async function getFilmById(id: number, callback: Function) {
  const q = query(collection(db, "films"), where("infos.id", "==", id));
  const querySnapshot = await getDocs(q);
  callback(querySnapshot.docs.map((doc) => doc.data()));
}

export async function getFilmByTitle(title: string, callback: Function) {
  const q = query(collection(db, "films"), where("infos.title", "==", title));
  const querySnapshot = await getDocs(q);
  callback(querySnapshot.docs.map((doc) => doc.data()));
}

export async function getBestRatedFilms(
  maxFilmsLimit: number,
  callback: Function,
) {
  const q = query(
    collection(db, "films"),
    orderBy("infos.vote_average", "desc"),
    limit(maxFilmsLimit),
  );
  const querySnapshot = await getDocs(q);
  callback(querySnapshot.docs.map((doc) => doc.data()));
}

export async function getMostPopularFilms(
  maxFilmsLimit: number,
  callback: Function,
) {
  const q = query(
    collection(db, "films"),
    orderBy("infos.popularity", "desc"),
    limit(maxFilmsLimit),
  );
  const querySnapshot = await getDocs(q);
  callback(querySnapshot.docs.map((doc) => doc.data()));
}

export async function getLatestFilms(
  maxFilmsLimit: number,
  callback: Function,
) {
  const q = query(
    collection(db, "films"),
    orderBy("infos.release_date", "desc"),
    limit(maxFilmsLimit),
  );
  const querySnapshot = await getDocs(q);
  callback(querySnapshot.docs.map((doc) => doc.data()));
}

export async function getFilmsByGenre(
  genreId: number,
  maxFilmsLimit: number,
  callback: Function,
) {
  const q = query(
    collection(db, "films"),
    where("infos.genre_ids", "array-contains", genreId),
    limit(maxFilmsLimit),
  );
  const querySnapshot = await getDocs(q);
  callback(querySnapshot.docs.map((doc) => doc.data()));
}

export async function getRandomFilms(maxFilmsLimit: number, callback: Function) {
  const q = query(collection(db, "films"), limit(maxFilmsLimit));
  const querySnapshot = await getDocs(q);
  const films = querySnapshot.docs.map((doc) => doc.data());
  const randomFilms = films.sort(() => Math.random() - 0.5).slice(0, maxFilmsLimit);
  callback(randomFilms);
}

export async function getFilmImages(filmId: number, callback: Function) {
  const url = `https://api.themoviedb.org/3/movie/${filmId}/images?include_image_language=fr`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTAzNTc1NGUxODExOGFkOTQzZDA0ZWRhMWM1NGU3MSIsInN1YiI6IjYzYjdkOThhZjQ0ZjI3MDA4YTIxM2NlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q8MIP0PWyXHpdpxXWWMJaEqoUyOu4Kq-sDQKY6EQJ8c",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      if (json.logos.length > 0) {
        callback(json);
      } else {
        const url = `https://api.themoviedb.org/3/movie/${filmId}/images?include_image_language=en`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTAzNTc1NGUxODExOGFkOTQzZDA0ZWRhMWM1NGU3MSIsInN1YiI6IjYzYjdkOThhZjQ0ZjI3MDA4YTIxM2NlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q8MIP0PWyXHpdpxXWWMJaEqoUyOu4Kq-sDQKY6EQJ8c",
          },
        };

        fetch(url, options)
          .then((res) => res.json())
          .then((json) => {
            callback(json);
          });
      }
    })
    .catch((err) => console.error("error:" + err));
}

export async function getFilmDetails(filmId: number, callback: Function) {
  const url = `https://api.themoviedb.org/3/movie/${filmId}?language=fr-FR`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTAzNTc1NGUxODExOGFkOTQzZDA0ZWRhMWM1NGU3MSIsInN1YiI6IjYzYjdkOThhZjQ0ZjI3MDA4YTIxM2NlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q8MIP0PWyXHpdpxXWWMJaEqoUyOu4Kq-sDQKY6EQJ8c'
    }
  };
  
  fetch(url, options)
  .then(res => res.json())
  .then(json => {
    callback(json);
  })
};
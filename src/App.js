import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavorites';
import RemoveFavourites from './components/RemoveFavourites';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `https://dummyapi.online/api/movie?search=${searchValue}`;
		console.log('Fetching movies with URL:', url);

		const response = await fetch(url);
		const responseJson = await response.json();

		console.log('API response:', responseJson);

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		} else {
			setMovies([]); 
		}
	};

	useEffect(() => {
		if (searchValue) {
			getMovieRequest(searchValue);
		}
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<Router>
			<div className='container-fluid movie-app'>
				<Routes>
					<Route
						path='/'
						element={
							<>
								<div className='row d-flex align-items-center mt-4 mb-4'>
									<MovieListHeading heading='Movies' />
									<SearchBox
										searchValue={searchValue}
										setSearchValue={setSearchValue}
									/>
									<Link to='/favourites' className='btn btn-primary ml-4'>
										View Favourites
									</Link>
								</div>
								<div className='row movie-list'>
									<MovieList
										movies={movies}
										handleFavouritesClick={addFavouriteMovie}
										favouriteComponent={AddFavourite}
									/>
								</div>
							</>
						}
					/>
					<Route
						path='/favourites'
						element={
							<>
								<div className='row d-flex align-items-center mt-4 mb-4'>
									<MovieListHeading heading='Favourites' />
									<Link to='/' className='btn btn-primary ml-4'>
										Back to Movies
									</Link>
								</div>
								<div className='row movie-list'>
									<MovieList
										movies={favourites}
										handleFavouritesClick={removeFavouriteMovie}
										favouriteComponent={RemoveFavourites}
									/>
								</div>
							</>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;

import React from 'react';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	const movies = props.movies || [];

	return (
		<>
			{movies.length > 0 ? (
				movies.map((movie, index) => (
					<div key={index} className='image-container d-flex justify-content-start m-3'>
						<img src={movie.Poster} alt='movie'></img>
						<div
							onClick={() => props.handleFavouritesClick(movie)}
							className='overlay d-flex align-items-center justify-content-center'
						>
							<FavouriteComponent />
						</div>
					</div>
				))
			) : (
				<p>No movies to display</p>
			)}
		</>
	);
};

export default MovieList;

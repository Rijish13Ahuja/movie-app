import React, { useEffect, useState } from 'react'
import Loader from "../components/Loader"
import MovieCard from '../components/MovieCard'
import { useDispatch } from 'react-redux'
import { addMoviesList } from '../redux/slices/favSlice'

const Home = () => {
  const [movieData, setMovieData] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  // Fetching .env variable, movie data API URL
  const apiUrl = process.env.REACT_APP_MOVIE_URL

  const getMoviesData = async () => {
    setLoading(true)
    try {
      console.log('Fetching movies from URL:', apiUrl); // Log the API URL
      const response = await fetch(apiUrl)
      const data = await response.json()
      console.log('Fetched data:', data); // Log the fetched data

      // Sorting data in decreasing order of rating
      const sortedData = data.sort((a, b) => b.rating - a.rating)
      setMovieData(sortedData)
      dispatch(addMoviesList(sortedData))
    } catch (error) {
      console.log('Error fetching movies data from API:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getMoviesData()
  }, [])

  return (
    <div className='w-full min-h-[calc(100vh-5rem)] flex justify-center items-center'>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {movieData.length ? (
            <div>
              {movieData.map((item) => (
                <MovieCard key={item.id} data={item} />
              ))}
            </div>
          ) : (
            <div>
              Data Not Found
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home

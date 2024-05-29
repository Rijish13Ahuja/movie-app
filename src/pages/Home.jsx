import React, { useEffect, useState } from 'react'
import Loader from "../components/Loader"
import MovieCard from '../components/MovieCard'
import { useDispatch } from 'react-redux'
import { addMoviesList } from '../redux/slices/favSlice'

const Home = () => {
  const [movieData, setMovieData] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const apiUrl = "https://dummyapi.online/api/movies"

  const getMoviesData = async () => {
    setLoading(true)
    try {
      console.log('Fetching movies from URL:', apiUrl)
      const response = await fetch(apiUrl)
      const data = await response.json()
      console.log('Fetched data:', data)

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
    <div className="w-full min-h-screen bg-gradient-to-br from-green-700 to-blue-800 flex justify-center items-center py-10">
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {movieData.length ? (
            <div className="flex flex-wrap justify-center gap-6">
              {movieData.map((item) => (
                <MovieCard key={item.id} data={item} />
              ))}
            </div>
          ) : (
            <div className="text-white text-xl">Data Not Found</div>
          )}
        </>
      )}
    </div>
  )
}

export default Home

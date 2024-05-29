import React from 'react'
import { useSelector } from 'react-redux'
import MovieCard from '../components/MovieCard'
import { useNavigate } from 'react-router-dom'

const Favourites = () => {
  const { favouritesList } = useSelector((state) => state.fav)
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-800 to-purple-900 py-10">
      {favouritesList.length ? (
        <div className="flex flex-wrap justify-center gap-6">
          {favouritesList.map((item) => (
            <MovieCard key={item.id} data={item} type={2} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="md:text-3xl text-xl font-semibold mb-4">No movies added to favourites yet</h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold bg-yellow-400 rounded-md border-1 border-black p-2 hover:scale-110 transition-transform duration-300"
          >
            Add Now
          </button>
        </div>
      )}
    </div>
  )
}

export default Favourites

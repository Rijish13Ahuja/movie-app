import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { addToFavourites, removeFromFavourites } from '../redux/slices/favSlice';

const MovieCard = (props) => {
    const dispatch = useDispatch();
    const data = props.data;
    const type = props.type || 0;
    const { favouritesList } = useSelector((state) => state.fav);

    const alreadyExist = favouritesList.some((item) => item.id === data.id);

    const favouriteHandler = () => {
        dispatch(addToFavourites(data));
        console.log("Added to favourites", data);
    };

    const deleteHandler = () => {
        dispatch(removeFromFavourites(data));
        console.log("Removed from favourites", data);
    };

    return (
        <div className='w-[400px] rounded-md mx-auto border-b-4 border-green-800 md:px-12 px-4 md:h-[150px] min-h-[200px] py-6 md:py-12 bg-[#f5f5f5] my-8 md:w-[650px] lg:w-[1000px] flex flex-col md:flex-row items-start justify-between shadow-lg'>
            <div className='text-3xl w-full text-gray-800 flex flex-row md:flex-col justify-between gap-y-4'>
                <div className='text-left font-bold md:text-3xl text-xl'>{data.movie}</div>
                <div className='w-[50px]'>
                    {!alreadyExist && (
                        <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center bg-green-400'>
                            <button onClick={favouriteHandler}><FaStar className='text-white' /></button>
                        </div>
                    )}
                    {type === 2 && (
                        <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center bg-red-400'>
                            <button onClick={deleteHandler}><RiDeleteBinLine className='text-white' /></button>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex md:w-[150px] flex-col md:gap-y-4 gap-y-2 items-start'>
                <div className='text-gray-700'>Rating: {data.rating}</div>
                <a href={data.imdb_url} target="_blank" rel="noopener noreferrer">
                    <div className='flex text-sm gap-x-2 items-center bg-blue-500 rounded-md border-1 border-black p-2 w-fit hover:scale-110 transition-all duration-300'>
                        <p className='text-white'>More Info</p>
                        <MdKeyboardDoubleArrowRight className='text-white text-xl' />
                    </div>
                </a>
            </div>
        </div>
    );
};

export default MovieCard;

'use client'
import { SetStateAction, useState } from 'react';

export const Rating = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (value: SetStateAction<number>) => {
    setRating(value);
  };

  const handleCommentChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setComment(event.target.value);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 relative">
      <div className="text-center">
        <h2 className="font-bold text-xl">Calificaciones y Reseñas</h2>
        <div className="flex justify-center items-center mt-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={`text-xl ${value <= rating ? 'text-yellow-500' : 'text-gray-300'} focus:outline-none`}
              onClick={() => handleRatingChange(value)}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          className="w-full mt-4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
         
          placeholder="Comentario"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded focus:outline-none">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};



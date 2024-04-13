'use client'
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import clsx from 'clsx';
import { upDateOrderById } from '../../actions';

type FormInputs = {
  comment?: string; // Hacer el campo comentario opcional
  rating?: number; // Hacer el campo rating opcional
  client?: string; // Hacer el campo client opcional
};

export const Rating = ({ orderId }: { orderId: string }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const [rating, setRating] = useState<number>(0);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false); // Estado para controlar la visualización del mensaje de agradecimiento

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await upDateOrderById(orderId, data.comment, rating.toString(), data.client);
      setUpdateSuccess(true); // Marca la actualización como exitosa
      setShowThankYou(true); // Mostrar el mensaje de agradecimiento
    } catch (error) {
      console.error("Error al actualizar el pedido:", error);
    }
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 relative mx-10 ">
      <div className="text-center">
        <h2 className="font-bold text-xl">Calificaciones y Reseñas</h2>
        {!updateSuccess && (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex justify-center items-center mt-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`text-xl ${value <= rating ? 'text-yellow-500' : 'text-gray-300'} focus:outline-none`}
                  onClick={() => handleStarClick(value)} // Setea el rating al hacer clic en una estrella
                  type="button" // Agrega el tipo de botón para evitar el comportamiento predeterminado de enviar formulario
                >
                  ★
                </button>
              ))}
            </div>
            <input
              type="text"
              className={clsx(
                "w-full mt-4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500",
                { 'border-red-500': errors.client }
              )}
              placeholder="Cliente (opcional)"
              {...register('client')} // Campo opcional
            />
            <textarea
              className={clsx(
                "w-full mt-4 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500",
                { 'border-red-500': errors.comment }
              )}
              placeholder="Comentario"
              {...register('comment')}
            ></textarea>
            {errors.comment && <span className="text-red-500">* El comentario es obligatorio</span>}
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 w-full rounded focus:outline-none"
              >
                Enviar
              </button>
            </div>
          </form>
        )}
        {updateSuccess && showThankYou && ( // Mostrar el mensaje de agradecimiento si la actualización fue exitosa y la bandera showThankYou es verdadera
          <p className="text-green-600 font-bold mt-4">¡Gracias Por Su Colaboración!</p>
        )}
      </div>
    </div>
  );
};

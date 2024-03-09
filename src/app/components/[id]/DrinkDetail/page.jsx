'use client'
import { Box, Container, Typography } from '@mui/material';
import { useParams} from 'next/navigation';
import React, { useState } from 'react'
import "./detail.css"
import { useEffect } from 'react';
import axios from 'axios';
const Detalles = () => {
  const {id} = useParams();
  const[bebida,setBebida]=useState([]);
  const [idDrinks, setIdDrinks] = useState([]);
 

  const obtenerBebida = async () => {
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = response.data.drinks; 
        setBebida(result);
 
    }catch (error) {
      console.log(error);
    }
  }
  const getIdDrinks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/bebida",{withCredentials:true});
      const result = response.data;
     
      setIdDrinks(result);
      
    } catch (error) {
      console.log(error);
    }
  };
  const deleteOneDrink = async (drinkId) => {
    let idBaseDatos = null;
    for (let i = 0; i < idDrinks.length; i++) {
      if(drinkId === idDrinks[i].bebida_id){
        idBaseDatos = idDrinks[i]._id;
        break;  
      }
    }
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/bebida/${idBaseDatos}`
      );
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  useEffect(() => {
    obtenerBebida(),getIdDrinks()
  }, []);
 
  return (
    <Container>
    <h1>Drink details</h1>
 
    <Box className='contenedor'>
       {bebida && bebida.length > 0 ?
          bebida.map((item,idx) => (
            <Container className='container-elementos'>
                <img className='imagen' src={item.strDrinkThumb} alt={item.strDrink} />
                 <div className='textos'>
                    <Typography variant='h5'> {item.strDrink}</Typography>
                    <Typography>Ingredientes:
                    <ul>
                      <li>{item.strIngredient1}</li>
                      <li>{item.strIngredient2}</li>
                      <li>{item.strIngredient3}</li>
                      <li>{item.strIngredient4}</li>
                      <li>{item.strIngredient5}</li>
                    </ul>
                    </Typography>
                    <Typography> Instrucciones: {item.strInstructions}</Typography>
                 </div>
                 <button className='btn' onClick={deleteOneDrink}>Delete</button>
                 <button className='btn' >Back</button>
            </Container>
                 
          )) : <h5>No se encontraron resultados</h5>}

       
    </Box>
    </Container>
  )
}

export default Detalles;

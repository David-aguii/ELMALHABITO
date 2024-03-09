'use client'
import { useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
 
import "./favorite.css";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const DrinksFavorite = () => {
  const [idDrinks, setIdDrinks] = useState([]);
  const[favorites,setFavorites]=useState([]);
  const router = useRouter();
 
  const getIdDrinks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/bebida",{withCredentials:true});
      const result = response.data;
      console.log(response.data);
      setIdDrinks(result);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  const obtenerBebidaEspecifica = async () => {
    try {
      let tempFavorites = [];
      for (let i = 0; i < idDrinks.length; i++) {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrinks[i].bebida_id}`);
        const result = response.data.drinks;
        tempFavorites = [...tempFavorites, ...result];
      }
      setFavorites(tempFavorites);
    } catch (error) {
      console.log(error);
    }
  }
 
  const viewDetail = async (drinkId) => {
    router.push(`components/${drinkId}/DrinkDetail`)
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
    getIdDrinks();
  }, []);
  
  useEffect(() => {
    if (idDrinks.length > 0) {
      obtenerBebidaEspecifica();
    }
  }, [idDrinks]);
  return (
    <Box className="container-search">
      <h4>Si deseas ver los detalles de la bebida, solamente haz click sobre ella.</h4>
      <div className='targeta'>
        {favorites && favorites.length > 0 ?
          favorites.map((item,idx) => (
            <Card key={idx} sx={{ maxWidth: 200 }} onClick={() => viewDetail(item.idDrink)}>
              <CardActionArea >
                <CardMedia
                  className='front'
                  component="img"
                  height="170"
                  image={item.strDrinkThumb}
                  alt="green iguana"
                  
                />
                <CardContent>
                  <Typography  className='front' gutterBottom variant="h5" component="div">
                    {item.strDrink}
                  </Typography>
                  <Typography  className='front' variant="body2" color="text.secondary">
                     Category: {item.strCategory}  
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )) : <h5>No se encontraron resultados</h5>}
      </div>
    </Box>
  );
};

export default DrinksFavorite;
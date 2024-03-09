'use client'
import { useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "../components/navfiltro.css"

 
const FiltradoBusqueda = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
 
  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      setResults(response.data.drinks); 
    } catch (error) {
       console.log('no se encontro la bebida')
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };
  const addToFavorites = async (e,idDrink) => {
    e.preventDefault();
    try {
      const data = {
        bebida_id:idDrink
      };
  
      const response = await axios.post("http://localhost:8000/api/bebida", data,{withCredentials:true});
 
      if (response.status === 201) {
         window.alert("Bebida agregada exitosamente.");
      }
    } catch (error) {
       
      alert("La bebida ya esta agregado en la lista de favoritos");
    }
  };

  return (
    <Box className="container-search">
      <div className='search-container'>
        <input 
          className='search-input'
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Buscar bebida..."
        />
        
      </div>
      <div className='cardbebida'>
        {results && results.length > 0 ?
          results.map((item,idx) => (
            <Card key={idx} sx={{ maxWidth: 200 }} onClick={(e) => addToFavorites(e,item.idDrink)}   >
              <CardActionArea >
                <CardMedia
                  component="img"
                  height="170"
                  image={item.strDrinkThumb}
                  alt="green iguana"
                  
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.strDrink}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                     Category: {item.strCategory}  
                  </Typography>
                  
        
                </CardContent>
              </CardActionArea>
            </Card>
          )) : <h3>No se encontraron resultados</h3>}
      </div>
    </Box>
  );
};

export default FiltradoBusqueda;
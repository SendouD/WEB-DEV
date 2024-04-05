    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import "./App.css"
    import searchIcon from "./searc.svg"; 
    import MovieCard from "./MovieCard.jsx";

    const App = () => {
        const [movies,setMovie]=useState([]);
        const [searchTerm,setSearchTerm]=useState('');
        const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=fdb11c14';

    

        const searchMovies = async (title) => {
            try {
                const response = await axios.get(`${API_URL}&s=${title}`);
                const data = response.data;
                setMovie(data.Search||[]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        useEffect(() => {
            
            searchMovies("spiderman");
        
        }, []);

        return (
        <div className="App">
                <h1>MOVIE FINDER</h1>
                <div className="search">
                    <input placeholder="search for movies" value={searchTerm} onChange={(e)=>{
                        setSearchTerm(e.target.value)
                    }}/>
                    <img src={searchIcon} alt="search" onClick={()=>{ searchMovies(searchTerm)}}/>
                </div>
                {
                    movies.length>0?(
                        <div className="container">
                            {
                                movies.map((movie)=><MovieCard movie1={movie}/>)
                            }
                    
                    </div>):(
                        <div className="empty">
                            <h2>No Movie Found</h2>
                        </div>
                    )
                }
                
        </div> 
        );
    };

    export default App;

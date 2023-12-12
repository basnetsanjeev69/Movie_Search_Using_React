
import React, { useState } from 'react'

import './App.css'
import { Col, Container, Row } from 'react-bootstrap'
import SearchForm from './components/SearchForm';
import MovieList from './components/MovieList';

function App() {
  const [movieList, setMovieList] = useState([])
  let [errorMessage, setErrorMessage] = useState('')

  const removeFromMovieList = (movie) => {
    console.log("I am removing....", movie)
    const updatedMovie = movieList.filter(mov => mov.imdbID !== movie.imdbID);
    setMovieList(updatedMovie)
  }
  const addMovieToList = (movie, choice) => {
    const movieWithChoice = { ...movie, choice }
    const IsMovieOnList = movieList.filter(mov => mov.imdbID === movie.imdbID);
    if (IsMovieOnList.length >0 && IsMovieOnList.choice != choice) {
      setErrorMessage('Sorry the movie '+movie.Title+" is already on the list")
      console.log(errorMessage)
    } else {
      setMovieList([...movieList, movieWithChoice])
    }
    
  }
  const removeErrorMessage = () =>{
    setErrorMessage('')
  }

  const changeMovieChoice = (movie, choice) =>{
    console.log(movie.imdbID)
    const movieWithNewChoice = { ...movie, choice }
    const updatedMovieList = movieList.map(item => {
      
      if (item.imdbID === movie.imdbID) {

        return movieWithNewChoice;
      }
      return item;
    });



    setMovieList(updatedMovieList)
  }

  // 1 Remove from movielist
  return (<>
    <div className="wrapper bg-dark text-warning">
      <Container>
        <Row>
          <Col className='text-center mt-3'>
            <h1>My Movie API App</h1>
            <hr />
            <h1 style={{color: "red"}} >{errorMessage}</h1>
          </Col>
        </Row>
        {/* Search Form */}
        <SearchForm addMovieToList={addMovieToList} removeErrorMessage={removeErrorMessage} />
        
        
    
        {/* Movie List */}
        <MovieList movieList={movieList} removeFromMovieList={removeFromMovieList} changeMovieChoice={changeMovieChoice} />
        {/* <MovieList movieList={movieList} removeFromlist={} /> */}

      </Container>
    </div>
  </>
  )
}

export default App;
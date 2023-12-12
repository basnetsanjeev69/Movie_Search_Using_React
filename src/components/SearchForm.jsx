import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import MovieCard from './MovieCard';
import axios from 'axios';
import { getRandomMovieName } from '../utils';
const MOVIE_URL = "https://www.omdbapi.com/?apikey=66aecd64&t=";

function SearchForm({ addMovieToList, removeErrorMessage }) {

    const [searchValue, setSearchValue] = useState("");
    const [movieDetail, setMovieDetail] = useState({});
    const removeMovieDetail = () => {
        setMovieDetail({})
    }
    const fetchRandomMovie = async () => {
        try {
            const randomMovie = getRandomMovieName()
            const { data } = await axios.get(`${MOVIE_URL}${randomMovie}`)
            setMovieDetail(data);
        } catch (e) {
            console.log("error", e)
        }
    }
    // useEffect(() => {}, [dependencies])
    useEffect(() => {
        fetchRandomMovie()
    }, [])
    const handleOnSubmit = async (e) => {
        removeErrorMessage()
        e.preventDefault();

        // TODO: Make API call to actually search the movie
        // https://www.omdbapi.com/?t=titanic&apikey=66aecd64
        try {
            const { data } = await axios.get(`${MOVIE_URL}${searchValue}`)
            
            setMovieDetail(data);
            setSearchValue("")
        } catch (e) {
            console.log("Error", e)
        }

    }
    const addToListAndRemoveMovie = (movie, choice) => {
        addMovieToList(movie, choice)
        setMovieDetail({})
    }

    const handleOnChange = (e) => {
        const { value } = e.target;
        setSearchValue(value);
    }
    return (
        <div>
            <Form onSubmit={handleOnSubmit}>
                <Row>
                    <Col className='col-9'>
                        <Form.Control value={searchValue} onChange={handleOnChange} required type="text" placeholder="Search by Movie" />
                    </Col>
                    <Col className='col-3 d-grid'>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>

                </Row>
            </Form>
            {/* TODO Render the movie detail once it comes from api */}
            {movieDetail?.imdbID && <MovieCard movie={movieDetail} addMovieToList={addToListAndRemoveMovie} removeMovie={removeMovieDetail} />}
        </div>
    )
}

export default SearchForm
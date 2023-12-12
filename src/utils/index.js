export const getRandomMovieName = () => {
    const movies = ['titanic', 'saw', 'avatar', 'avengers',
        'inception']
    const randomIndex = Math.floor(Math.random() * movies.length);

    return movies[randomIndex]
}
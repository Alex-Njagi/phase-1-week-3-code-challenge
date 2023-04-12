const baseURL = `http://localhost:3000`;

document.addEventListener(`DOMContentLoaded`, ()=>{
    getMovies()
})

function getMovies (){
    fetch (`${baseURL}/films`, {               //Fetches the movies' data from the API
        method: `GET`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then (res =>res.json())                        //Obtains the data from the .JSON file
    .then (outputMovies)                        //Invokes the function that handles outputting data
}

function outputMovies(movies){
    const movieListDiv = document.getElementById(`movieList`);

    movies.forEach(movies => {
        const list = document.createElement(`div`);
        list.innerText = movies.title;
        list.classList.add(`movieList`);

        list.addEventListener(`click`, ()=>{
            outputInfo(movies)
        })
        movieListDiv.appendChild(list);
    });
}

async function outputInfo(movies){
    const list = document.createElement(`div`);
    const movieInfoDiv = document.getElementById(`displayMovies`);

    const movieTitle = document.createElement(`h2`);
    movieTitle.innerText = `Name: ${movies.title}`    
    movieTitle.classList.add(`movieTitle`)

    const movieRuntime = document.createElement(`p`);
    movieRuntime.innerText = `Runtime: ${movies.runtime} minutes`
    movieRuntime.classList.add(`movieTitle`)

    const movieDesc = document.createElement(`h3`);
    movieDesc.innerText = `Description: ${movies.description}`
    movieDesc.classList.add(`movieTitle`)

    const movieCapacity = document.createElement('p');
    movieCapacity.innerText = `Capacity: ${movies.capacity}`
    movieCapacity.classList.add(`movieTitle`)

    const movieTime = document.createElement(`h4`);
    movieTime.innerText = `Showtime: ${movies.showtime}`
    movieTime.classList.add(`movieTitle`)

    const movieTickets = document.createElement(`h5`);
    movieTickets.innerText = `Tickets sold: ${movies.tickets_sold}`
    movieTickets.classList.add(`movieTitle`)

    movieInfoDiv.appendChild(movieTitle)
    movieInfoDiv.appendChild(movieRuntime)
    movieInfoDiv.appendChild(movieDesc)
    movieInfoDiv.appendChild(movieCapacity)
    movieInfoDiv.appendChild(movieTime)
    movieInfoDiv.appendChild(movieTickets)
    console.log(movies.title);
}
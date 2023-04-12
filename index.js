const baseURL = `http://localhost:3000`;        //Assigns the base URL to a variable

//This event loads the processes for the entire website
document.addEventListener(`DOMContentLoaded`, ()=>{
    getMovies()                                 //Invokes the main function for fetching movies
})

//This function fetches the movies and invokes a function that outputs them
function getMovies (){
    //Fetches the movies' data from the API
    fetch (`${baseURL}/films`, {
        method: `GET`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then (res =>res.json())                     //Obtains the data from the .JSON file
    .then (outputMovies)                        //Invokes the function that handles outputting movies
}

//This function handles the outputting of movies
function outputMovies(movies){
    const movieListDiv = document.getElementById(`movieList`);      //Creates a variable element to the .HTML file

    movies.forEach(movies => {
        //Creates the list of movies on the left hand side
        const list = document.createElement(`div`);         //Creates the list
        list.innerText = movies.title;                      //Assigns it a value
        list.classList.add(`movieList`);                    //Links it to the .HTML file

        //This event handles the clicking of any movie title
        list.addEventListener(`click`, ()=>{
            outputInfo(movies)                              //Invokes the function for outputting movie information
        })
        movieListDiv.appendChild(list);                     //Appends the created list to the created div
    });
}

//This function is responsible for outputting movies
async function outputInfo(movies){            
    const movieInfoDiv = document.getElementById(`displayMovies`);  //Creates the variable element

    //This handles outputting the movie poster
    const moviePoster = document.createElement(`img`);      //Creates the image element
    moviePoster.src = movies.poster;                        //Assigns the element a value
    moviePoster.classList.add(`moviePoster`)                //Links it to a class

    //This handles outputting the movie name
    const movieTitle = document.createElement(`h2`);        //Creates the header element
    movieTitle.innerText = `Name: ${movies.title}`          //Assigns the element a value
    movieTitle.classList.add(`movieTitle`)                  //Links it to a class

    //This handles outputting the movie runtime
    const movieRuntime = document.createElement(`p`);               //Creates the paragraph element
    movieRuntime.innerText = `Runtime: ${movies.runtime} minutes`   //Assigns the element a value
    movieRuntime.classList.add(`movieTitle`)                        //Links it to a class

    //This handles outoutting the movie description
    const movieDesc = document.createElement(`h3`);                 //Creates the header element
    movieDesc.innerText = `Description: ${movies.description}`      //Assigns the element a value
    movieDesc.classList.add(`movieTitle`)                           //Links it to a class

    //This handles outputting the movie seating capacity
    const movieCapacity = document.createElement('p');              //Creates the paragraph element
    movieCapacity.innerText = `Capacity: ${movies.capacity}`        //Assigns the element a value
    movieCapacity.classList.add(`movieTitle`)                       //Links it to a class

    //This handles outputting the movie showtime
    const movieTime = document.createElement(`h4`);                 //Creates the header element
    movieTime.innerText = `Showtime: ${movies.showtime}`            //Assigns the element a value
    movieTime.classList.add(`movieTitle`)                           //Links it to a class

    //This handles outputting the tickets sold
    const movieTickets = document.createElement(`h5`);              //Creates the header element
    movieTickets.innerText = `Tickets sold: ${movies.tickets_sold}` //Assigns the element a value
    movieTickets.classList.add(`movieTitle`)                        //Links it to a class

    //This handles outputting the available tickets
    const availableTickets = document.createElement(`h5`);              //Creates the header element
    let currentTickets = (movies.capacity)-(movies.tickets_sold)
    //Creates a variable for holding the available tickets
    availableTickets.innerText = `Available tickets: ${currentTickets}` //Assigns the element a value
    availableTickets.classList.add(`movieTitle`)                        //Links it to a class

    //This handles outputting the button for buying tickets
    const buyTickets = document.createElement(`button`);                //Creates the button element
    buyTickets.innerText = `Buy tickets`                                //Assigns the element a value
    buyTickets.classList.add(`buyTickets`)                              //Links it to a class

    //This event handles the buying of tickets
    buyTickets.addEventListener(`click`, (event)=>{                 //On clicking
        const newTickets = movies.tickets_sold += 1;                //Add to the sold tickets
        const newAvailableTickets = currentTickets -=1;             //Subtract from the available tickets
        if (newTickets <= movies.capacity) {                        //If all tickets are sold
            movieTickets.innerText = `Tickets sold: ${newTickets}`  //Output a new value for the sold tickets
            availableTickets.innerText = `Available tickets: ${newAvailableTickets}`    //Output a new value for the available tickets
        } else if (newTickets > movies.capacity) {                  //Else
            event.target.style[`display`]=`none`;                   //Remove the button once the limit is reached
        }       
    })

    //This handles adding all the creating elements
    movieInfoDiv.appendChild(moviePoster)           //Append the movie poster
    movieInfoDiv.appendChild(movieTitle)            //Append the movie name
    movieInfoDiv.appendChild(movieRuntime)          //Append the movie runtime
    movieInfoDiv.appendChild(movieDesc)             //Append the movie description
    movieInfoDiv.appendChild(movieCapacity)         //Append the movie seating capacity
    movieInfoDiv.appendChild(movieTime)             //Append the movie start time
    movieInfoDiv.appendChild(movieTickets)          //Append the sold tickets
    movieInfoDiv.appendChild(availableTickets)      //Append the available tickets
    movieInfoDiv.appendChild(buyTickets)            //Append the button to buy tickets
}
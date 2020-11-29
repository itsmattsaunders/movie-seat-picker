const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI();

// the + in front of movieSelect variable parses
// the string value of '10' into an interger
// this does the same as parseInt.

let ticketPrice = +movieSelect.value;

//get data from local storage and populate UI
//JSON Parse does the opposite of JSON Stringify
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) =>{
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selctedMovieIndex');

  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  console.log(e.target.selectedIndex, e.target.value)
  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelectedCount();
})

//save selected movie index and price
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}


//seat click event
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  // [...selectedSeats] is saving the nodelist of seats as an array
  const seatsIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat));

  //using local storage to save slected seats to the browser
  //json.stringify is conversting the array into a string
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value)
}

container.addEventListener('click', (e) =>{
  if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected')

    updateSelectedCount();
  }
})

//Initial Count and total set
updateSelectedCount();
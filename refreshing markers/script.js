// query selectors
const userSearch = document.querySelector('#userSearch');


// global variables
let map;
let markers =[];


// start of maps function

function initMap(){
    let queenstown = {lat: -45.0302, lng: 168.6615};
    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 10,
        center: queenstown
    });
};

// end of maps function




// acommodation object array

let acommodation = [
    {
        id: 101,
        name: 'heritage hotel',
        type: 'hotel',
        price: 157,
        minGuests: 1,
        maxGuests: 2,
        minNights: 1,
        maxNights: 5,
        latitiude: -45.037182831214075, 
        longitude: 168.64224871904386
    },
    {
        id: 102,
        name: 'adventure hostel',
        type: 'hostel',
        price: 30,
        minGuests: 1,
        maxGuests: 1,
        minNights: 1,
        maxNights: 10,
        latitiude: -45.03108190370169, 
        longitude: 168.66083937135346
    },
    {
        id: 103,
        name: 'motel',
        type: 'motel',
        price: 90,
        minGuests: 2,
        maxGuests: 4,
        minNights: 3,
        maxNights: 10,
        latitiude: -45.02594301711322, 
        longitude: 168.66118873961358
    },
    {
        id: 104,
        name: 'mod-box house',
        type: 'house',
        price: 240,
        minGuests: 1,
        maxGuests: 4,
        minNights: 2,
        maxNights: 15,
        latitiude: -45.0362934492103, 
        longitude: 168.64386721907528
    }
]

// end of object array


// start of user input form

function filterOptions(event){
    event.preventDefault();
    console.log('clicked');

    let msday = 1000 * 3600 * 24;

    let checkInDate = new Date($('#checkInDate').val());
    let checkOutDate = new Date($('#checkOutDate').val());

    console.log(checkInDate);
    console.log(checkOutDate);

    let dateDifference = checkOutDate.getTime() - checkInDate.getTime();
    let numberOfDays = dateDifference/msday;
    console.log(numberOfDays);

    let numberOfPeople = $('#numberOfPeople').val();
    console.log(numberOfPeople);


    displayOptions(numberOfDays, numberOfPeople)
}

// end of user input form


// start of user input display options

function displayOptions(nights, guests){
    reloadMarkers(); 
    console.log(nights);
    console.log(guests);
    $('#acommodationCardContainer').empty();
    for (let i = 0; i < acommodation.length; i++){
        if( ((nights >= acommodation[i].minNights) && (nights <= acommodation[i].maxNights) && (guests >= acommodation[i].minGuests) && (guests <= acommodation[i].maxGuests)) ){
            generateCard(i)

            let location = {lat: acommodation[i].latitiude, lng:acommodation[i].longitude}
            console.log(location);

            let marker = new google.maps.Marker({
                position: location,
                map: map
            });
            markers.push(marker);
        }
    }
}
// console.log(markers);

// end of user input display options




// start of reload markers

function reloadMarkers(){
    // loop through our array and set the map to null value
    for(let i =0; i<markers.length; i++){
        markers[i].setMap(null);
    }
    markers=[];
}
// end of reload markers








// start of generate card function

function generateCard(x){
    $('#acommodationCardContainer').append(
        `
        <div id="acommodationCardContainer"></div>
            <div class="card" style="width: 18rem;">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${acommodation[x].name}</h5>
                    <p class="card-text">price per night is $${acommodation[x].price}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `
    )
}







// event listeners
userSearch.addEventListener('click', filterOptions);
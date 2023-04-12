const apiKey = '235bfae9a77f01372c79720bbdbd549a'
const limit = 5;
let $resultsList = $('#results');

$('#submit-form').on('submit', handleGetData);

function handleGetData(event) {
    event.preventDefault();
       // calling preventDefault() on a 'submit' event will prevent a page refresh  
    let $userInput = $('#search-input').val();
    
    console.log('entered')
      // getting the user input
    $.ajax({
        url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${$userInput}&limit=${limit}&offset=0&sort=-population`,
        headers: {
            'x-rapidapi-key': 'ad4dc71239mshc5a1fd6d4883f1dp11d351jsnb9203a044396',
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
    }).then(
        (data) => {
            console.log(data);
            $resultsList.empty();
            
            data.forEach(entry => {
                const li = document.createElement('li');
                li.outerHTML = `<li data-object="{id: 1, name: 'Object 1'}">Object 1</li>`
                if (entry.state) {    
                    li.textContent = `${entry.name}, ${entry.state}, ${entry.country}`;
                } else {
                    li.textContent = `${entry.name}, ${entry.country}`; 
                }
          
                // append the list element to the unordered list
                $resultsList.append(li);
              });
        },
        (error) => {
            console.log('bad request', error);
        }
    );    
}

// Get the list element
const myList = document.getElementById("results");

// Add a click event listener to the list element
myList.addEventListener("click", function(event) {
  // Check if the clicked element is a list item
  if (event.target.nodeName === "LI") {
    // Retrieve the object from the "data-object" attribute
    const object = JSON.parse(event.target.getAttribute("data-object"));
    console.log(object);
  }
});

// export { apiKey, limit, handleGetData };
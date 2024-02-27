// Get JSON data
let jsonData
(async function getJsonData() {
     try {
        const response = await fetch("https://alexanderdombroski.github.io/personal/cardgames/sr-calculator/data/abilities.json");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        jsonData = await response.json();
     } catch (error) {
        console.error('Error fetching data:', error);
     }
})();


// Add event listeners
(function cardInputsListenerSetup() {
    const cardSelectors = document.getElementsByClassName("card-dropdown");
    for (let i=0; i < cardSelectors.length; i++) {
        cardSelectors[i].addEventListener('change', handleCardChange);
    }
})();

function getColor(id) {
    switch (id) {
        case "1":
            return "#0000aa" // Blue
        case "2":
            return "#006600" // Green
        case "3":
            return "#cc9900" // Yellow
        case "4":
            return "#990000" // Red
        case "11":
            return "black"
        case "12": // All factions
            return "#fc5e03" // red-orange
        default:
            console.log("error in color selection id=", id)
    }
}

function getFaction(id) {
    switch (id) {
        case "1":
            return "trade" // Blue
        case "2":
            return "blob" // Green
        case "3":
            return "star" // Yellow
        case "4":
            return "mech" // Red
        case "11":
            return "none"
        case "12": // All factions
            return "multi" // red-orange
        default:
            console.log("error in faction selection id=", id)
            return "IDK"
    }
}

function transferDataFromDatalist(target, targetValue, cells) {
    // Check if the ship is in either datalist, if so, transfer the data attributes of the selected option
    const shipDataList = document.getElementById("filtered-card-list");
    const removedDataList = document.getElementById("removed-card-list");

    var optionNotFound = true;
    function checkDatalist(datalist) {
        const options = datalist.querySelectorAll('option')
        options.forEach(option => {
            if (option.value === targetValue) {
                target.setAttribute("card-id", option.getAttribute("card-id"));
                target.setAttribute("faction", option.getAttribute("faction"));
                cells[0].innerHTML = getFaction(option.getAttribute("faction"));
                cells[1].innerHTML = option.getAttribute("cost");
                cells[9].innerHTML = option.getAttribute("defense");
                optionNotFound = false;
            }
        });
    }
    checkDatalist(shipDataList)
    optionNotFound && checkDatalist(removedDataList);
    // Remove the card if it doesn't exist in the datalists
    if (optionNotFound) {
        target.value = "";
    }
}

function insertAbilities(cardId, cells) {
    // reset abilities
    cells.forEach(cell => {
        cell.innerHTML = 0
    })

    // get card data
    const cardAbilites = jsonData[cardId];
    // console.log(cardAbilites);
    
    // Update card data
    // cardAbilites[]
}

function handleCardChange(event) {
    // Access the selected value using event.target.value
    const selectedValue = event.target.value;
    const rowNumber = event.target.className.split(' ')[1];
    const cells = document.querySelectorAll(`.${rowNumber} td`);
    
    // Verify user input, delete if nonexisting card
    transferDataFromDatalist(event.target, selectedValue, cells);

    // Finish adding card data
    const cardId = event.target.getAttribute("card-id");
    insertAbilities(cardId, [...cells].slice(3, 10));

    // Change color
    const factionId = event.target.getAttribute("faction");
    const color = getColor(factionId);
    event.target.style.color = color;
    cells.forEach(cell => {
        cell.style.color = color;
    });    
};


window.onload = () => {
    document.getElementById('answer-submit').onTouchStart = ans;
    
    go();
}

let problemSolution;
let problemString;

const PROPERTIES = {

    name: ["Bob", "Sue", "Johnny", "Chris", "Amber", "Kristen", "Paul", "Makenzie", "Albert", "Francisco", "Juan", "Chan", "Lee"],
    fruit: ["an apple", "a banana", "a bunch of grapes", "a pineapple", "a mango", "a bucket of strawberries"],
    affirmation: [
        "Good Job!",
        "Nice Work!",
        "Well Done!",
        "Amazing!",
        "Look at you go!",
        "Incredible!"
    ]
}

//Begin program
let go = () => {
    return addition_generateProblems();
}

// Return a random integer in the range of the passed values.
let getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Select a property from an array and omits duplicated properties
let getProperty = (propList, excludedProp) => {
    let propertyList = propList;
    let selectedProperty = excludedProp;

    while (selectedProperty == excludedProp) {
        selectedProperty = propertyList[getRandomInteger(0, propertyList.length - 1)];
    }

    return selectedProperty;

};

// Place decimal point and determine if dollar sign or cent sign should be used.
let getDollarAmount = (val) => {
    let moneyValue;
    let int = `${val}`;
    if (val >= 100) {
        moneyValue = "$" + int.slice(-4, -2,) + "." + int.slice(-2);
    } else {
        moneyValue = int + "¢"
    }
    return moneyValue;
}

// Return a randomized assortment of coins based on a passed value.
// let makeChange = (val) => {

//     let coinObject = {};

//     coinObject.dollars = getRandomInteger(0, Math.floor(val / 100) - 1);
//     coinObject.quarters = getRandomInteger(0, Math.floor((val - 100 * coinObject.dollars) / 25));
//     coinObject.dimes = getRandomInteger(0, Math.floor((val - 100 * coinObject.dollars - 25 * coinObject.quarters) / 10));
//     coinObject.nickels = (val - 100 * coinObject.dollars - 25 * coinObject.quarters - 10 * coinObject.dimes) / 5;

//     return (coinObject);

// }

// Return a weighted randomized assortment of coins based on a passed value.
let makeChange = (val) => {
    let coinObject = {};

    coinObject.dollars =  getRandomInteger(Math.floor(val / 300), Math.floor(val / 100));
    coinObject.quarters = getRandomInteger(Math.floor((val - 100 * coinObject.dollars) / 50), Math.floor((val - 100 * coinObject.dollars) / 25));
    coinObject.dimes = getRandomInteger(Math.floor((val - 100 * coinObject.dollars - 25 * coinObject.quarters) / 30), Math.floor((val - 100 * coinObject.dollars - 25 * coinObject.quarters) / 10));
    coinObject.nickels = (val - 100 * coinObject.dollars - 25 * coinObject.quarters - 10 * coinObject.dimes) / 5;

    return (coinObject);

}

// Convert object of coin quantities into a descriptive string using plain english.
let generateCoinString = (coinObject) => {

    let coinString = "";

    //Determine the appropriate separator string by evaluating if coins denominations before and after are at zero quantity
    let makeSeparator = (denomination) => {

        if ((denomination == "quarters" && coinObject.dimes == 0 && coinObject.nickels == 0 && coinString.length > 0) || (denomination == "dimes" && coinObject.nickels == 0 && coinString.length > 0) || (denomination == "nickels" && coinString.length > 0)) {
            return ", and "
        } else if (coinString.length > 0) {
            return ", "
        } else {
            return "";
        }
    }

    //Assemble final coin string
    if (coinObject.dollars > 0) {
        coinString += coinObject.dollars + " dollars";
    }
    if (coinObject.quarters > 0) {
        coinString += makeSeparator("quarters") + coinObject.quarters + " quarters";
    }
    if (coinObject.dimes > 0) {
        coinString += makeSeparator("dimes") + coinObject.dimes + " dimes";
    }
    if (coinObject.nickels > 0) {
        coinString += makeSeparator("nickels") + coinObject.nickels + " nickels"
    }

    return coinString;

}

let renderCoins = (coinObject, name) => {
    let walletGroupString;
    console.log(coinObject);
    let renderCoinString = "";

    for (let i = 0; i < coinObject.dollars; i++) {
        renderCoinString += `<div id="${name}-dollar-${i + 1}" data-value="100" class="money bill dollar">$1</div>`
    }
    for (let i = 0; i < coinObject.quarters; i++) {
        renderCoinString += `<div id="${name}-quarter-${i + 1}" data-value="25" class="money coin quarter">25</div>`
    }
    for (let i = 0; i < coinObject.dimes; i++) {
        renderCoinString += `<div id="${name}-dime-${i + 1}" data-value="10" class="money coin dime">10</div>`
    }
    for (let i = 0; i < coinObject.nickels; i++) {
        renderCoinString += `<div id="${name}-nickel-${i + 1}" data-value="10" class="money coin nickel">5</div>`
    }

    walletGroupString = `<div id="${name}-wallet" class="wallet"><div class="wallet-title">${name}</div>${renderCoinString}</div>`

    return (walletGroupString);
    
}

let renderWallets = (string) => {
    document.getElementById("wallet-container").innerHTML = string;
}

let animateCoins = ()=>{
    let counter = 0;
    const coins = document.querySelectorAll("div.money");
    coins.forEach(function(el) {
        console.log(el + "+" + el.item);
        setTimeout(() => {
            el.classList.add("visible");
        }, counter * 50)
        counter++;
        
    });
    
}

let updateProblem = (string) => {
    document.getElementById("problem-container").innerHTML = string;
    animateCoins();
}

let addition_generateProblems = () => {
    let problemSelect = getRandomInteger(1, 2);
    if (problemSelect == 1) {
        return addition_buyingFruit();
    } else if (problemSelect == 2) {
        return addition_sharingFriends();
    }
}

let addition_buyingFruit = () => {

    let problemSum = getRandomInteger(1, 100) * 5;
    let problemFactorOne = getRandomInteger(1, problemSum / 5) * 5;
    let problemFactorTwo = problemSum - problemFactorOne;
    let nameOne = getProperty(PROPERTIES.name);
    let fruitName = getProperty(PROPERTIES.fruit);

    let coinObjectOne = makeChange(problemFactorOne);

    problemSolution = problemFactorTwo;

    problemString = `${nameOne} wants to buy ${fruitName} that costs ${getDollarAmount(problemSum)}. ${nameOne} has ${generateCoinString(coinObjectOne)}. How much more money does ${nameOne} need to buy ${fruitName}?`;

    const walletString = renderCoins(coinObjectOne, nameOne);
    renderWallets(walletString);


    updateProblem(problemString);

}

let addition_sharingFriends = () => {

    let problemFactorOne = getRandomInteger(1, 40) * 5;
    let problemFactorTwo = getRandomInteger(1, 40) * 5;
    let problemFactorSum = problemFactorOne + problemFactorTwo;
    let nameOne = getProperty(PROPERTIES.name);
    let nameTwo = getProperty(PROPERTIES.name, nameOne);

    let coinObjectOne = makeChange(problemFactorOne);
    let coinObjectTwo = makeChange(problemFactorTwo);

    problemSolution = problemFactorSum;

    problemString = `${nameOne} has ${generateCoinString(coinObjectOne)}, and ${nameTwo} has ${generateCoinString(coinObjectTwo)}. How much money do they have together?`;

    let walletString = renderCoins(coinObjectOne, nameOne);
    walletString += renderCoins(coinObjectTwo, nameTwo);
    renderWallets(walletString);


    updateProblem(problemString);

}

//Return user answer and compare it to the solution of the current problem.



let ans = () => {
    let val = document.getElementById('answer-field').value;
    if (val == problemSolution) {
        console.log(getProperty(PROPERTIES.affirmation) + " That's correct! The answer is " + getDollarAmount(problemSolution));
        document.getElementById('answer-field').value = null;
    } else {
        console.log("Try Again!");
        return problemString;
    }
    return go();
}
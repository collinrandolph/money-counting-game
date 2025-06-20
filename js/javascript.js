let currentSolution;
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
        selectedProperty = propertyList[getRandomInteger(0, propertyList.length)];
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
let makeChange = (val) => {

    let changeObject = {};

    changeObject.dollars = getRandomInteger(0, Math.floor(val / 100) - 1);
    changeObject.quarters = getRandomInteger(0, Math.floor((val - 100 * changeObject.dollars) / 25));
    changeObject.dimes = getRandomInteger(0, Math.floor((val - 100 * changeObject.dollars - 25 * changeObject.quarters) / 10));
    changeObject.nickles = (val - 100 * changeObject.dollars - 25 * changeObject.quarters - 10 * changeObject.dimes) / 5;

    return generateCoinString(changeObject);

}

// Convert object of coin quantities into a descriptive string using plain english.
let generateCoinString = (changeObject) => {

    let coinString = "";

    //Determine the appropriate separator string by evaluating if coins denominations before and after are at zero quantity
    let makeSeparator = (denomination) => {

        if ((denomination == "quarters" && changeObject.dimes == 0 && changeObject.nickles == 0 && coinString.length > 0) || (denomination == "dimes" && changeObject.nickles == 0 && coinString.length > 0) || (denomination == "nickles" && coinString.length > 0)) {
            return ", and "
        } else if (coinString.length > 0) {
            return ", "
        } else {
            return "";
        }
    }

    //Assemble final coin string
    if (changeObject.dollars > 0) {
        coinString += changeObject.dollars + " dollars";
    }
    if (changeObject.quarters > 0) {
        coinString += makeSeparator("quarters") + changeObject.quarters + " quarters";
    }
    if (changeObject.dimes > 0) {
        coinString += makeSeparator("dimes") + changeObject.dimes + " dimes";
    }
    if (changeObject.nickles > 0) {
        coinString += makeSeparator("nickles") + changeObject.nickles + " nickles"
    }

    return coinString;

}

let addition_generateProblems = () => {
    let problemSelect = getRandomInteger(1, 2);
    if (problemSelect == 1) {
        return addition_buyingFruit();
    }else if (problemSelect ==2){
        return addition_sharingFriends();
    }
}

let addition_buyingFruit = () => {

    let problemSum = getRandomInteger(1, 200) * 5;
    let problemFactorOne = getRandomInteger(1, problemSum / 5) * 5;
    let problemFactorTwo = problemSum - problemFactorOne;
    let nameOne = getProperty(PROPERTIES.name);
    let fruitName = getProperty(PROPERTIES.fruit);

    problemSolution = problemFactorTwo;

    problemString = `${nameOne} wants to buy a ${fruitName} that costs ${getDollarAmount(problemSum)}. ${nameOne} has ${makeChange(problemFactorOne)}. How much more money does ${nameOne} need to buy ${fruitName}?`

    return problemString;

}

let addition_sharingFriends = () => {

    let problemFactorOne = getRandomInteger(1, 60) * 5;
    let problemFactorTwo = getRandomInteger(1, 60) * 5;
    let problemFactorSum = problemFactorOne + problemFactorTwo;
    let nameOne = getProperty(PROPERTIES.name);
    let nameTwo = getProperty(PROPERTIES.name, nameOne);
    
    problemSolution = problemFactorSum;    

    problemString = `${nameOne} has ${makeChange(problemFactorOne)}, and ${nameTwo} has ${makeChange(problemFactorTwo)}. How much money do they have together?`

    return problemString;

}

//Return user answer and compare it to the solution of the current problem.
let ans = (val) => {
    if (val == problemSolution) {
        console.log(getProperty(PROPERTIES.affirmation) + " That's correct! The answer is " + getDollarAmount(problemSolution));
        return go();
    } else {
        console.log("Try Again!");
        return problemString;
    }
}
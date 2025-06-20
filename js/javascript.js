let problemSolution;
let problemString;

const PROPERTIES = {

    name: ["Bob", "Sue", "Johnny", "Chris", "Amber", "Kristen", "Paul", "Makenzie", "Albert", "Francisco", "Juan", "Chan", "Lee"],
    fruit: ["an apple", "a banana", "a bunch of grapes", "a pineapple", "a mango", "a bucket of strawberries"],
    affirmation: ["Good Job!", "Nice Work!", "Well Done!", "Amazing!", "Look at you go!", "Incredible!"]

}

//Begin program
let go = () => {

    document.getElementById('answer-submit').ontouchstart = ans;
    return addition_generateProblems();

}

// Return a random integer in the range of the passed values.
let getRandomInteger = (min, max) => {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

//Select a property from an array and omits duplicated properties
let getRandomProperty = (propList, excludedProp) => {

    let propertyList = propList;
    let selectedProperty = excludedProp;

    while (selectedProperty == excludedProp) {
        selectedProperty = propertyList[getRandomInteger(0, propertyList.length - 1)];
    }

    return selectedProperty;

};

// Place decimal point and determine if dollar sign or cent sign should be used.
let convertToCurrency = (val) => {

    let moneyValue;
    let int = `${val}`;
    if (val >= 100) {
        moneyValue = "$" + int.slice(-4, -2,) + "." + int.slice(-2);
    } else {
        moneyValue = int + "¢"
    }
    return moneyValue;

}

// Return a weighted randomized assortment of coins based on a passed value.
let makeChange = (val) => {

    let walletArray = [];

    if (getCurrentWalletValue(walletArray) < val) {
        const dollarObject = addCoinsToWallet(walletArray, val, "dollar", 100, 3, false);
        if (dollarObject) {
            walletArray.push(dollarObject);
        }
    }
    if (getCurrentWalletValue(walletArray) < val) {
        const quarterObject = addCoinsToWallet(walletArray, val, "quarter", 25, 2, false);
        if (quarterObject) {
            walletArray.push(quarterObject);
        }
    }
    if (getCurrentWalletValue(walletArray) < val) {
        const dimeObject = addCoinsToWallet(walletArray, val, "dime", 10, 3, false);
        if (dimeObject) {
            walletArray.push(dimeObject);
        }
    }
    if (getCurrentWalletValue(walletArray) < val) {
        const nickelObject = addCoinsToWallet(walletArray, val, "nickel", 5, 5, true);
        if (nickelObject) {
            walletArray.push(nickelObject);
        }
    }

    return walletArray;

}

let getCurrentWalletValue = (walletArray) => {

    let currentWalletValue = 0;

    if (walletArray.length > 0) {
        walletArray.forEach((el) => {
            currentWalletValue += el.value * el.quantity;

        });
    } return currentWalletValue;

}


let addCoinsToWallet = (walletArray, totalVal, coinName, coinVal, weight, smallestDenomination) => {

    let currentWalletValue = getCurrentWalletValue(walletArray);
    let coinQuantity;

    if (currentWalletValue < totalVal) {
        if (smallestDenomination) {
            coinQuantity = ((totalVal - currentWalletValue) / coinVal); //Distribute coins amongst the full remainder
        } else {
            coinQuantity = getRandomInteger(Math.floor((totalVal - currentWalletValue) / (coinVal * weight)), Math.floor((totalVal - currentWalletValue) / coinVal));
        }
        if (coinQuantity > 0) {
            return { name: coinName, value: coinVal, quantity: coinQuantity };
        }

    } return false;

}

// Convert object of coin quantities into a descriptive string using plain english.
let generateCoinString = (walletArray) => {

    let coinString = ''

    let pluralCheck = (coinName, coinQuantity) => {
        if (coinQuantity == 1) {
            return coinName;
        } else {
            return `${coinName}s`
        }
    }

    for (i = 0; i < walletArray.length; i++) {
        if (i > 0) {
            if (i < walletArray.length - 1) {
                coinString += ", ";
            } else {
                if (walletArray.length > 2) {
                    coinString += ",";
                }
                coinString += " and ";
            }
        }

        coinString += `${walletArray[i].quantity} ${pluralCheck(walletArray[i].name, walletArray[i].quantity)}`
    }

    return coinString;

}

let positiveNegativeSwitch = () => {

    let coinflip = getRandomInteger(1, 2);

    if (coinflip == 1) {
        return "-"
    } else {
        return ""
    }

}

let renderCoins = (walletArray, name) => {

    let walletGroupString;
    console.log(walletArray);
    let renderCoinString = "";

    walletArray.forEach((el) => {
        for (let i = 0; i < el.quantity; i++) {
            renderCoinString += `<div id="${name}-${el.name}-${i + 1}" data-value="${el.value}" class="money ${el.name}" style="transform: translate(${positiveNegativeSwitch()}${getRandomInteger(40, 70)}px,${positiveNegativeSwitch()}${getRandomInteger(40, 70)}px) rotate(${getRandomInteger(30, 120)}deg) scale(${getRandomInteger(8, 10) / 10})">${convertToCurrency(el.value)}</div>`
        }
    });

    walletGroupString = `<div id="${name}-wallet" class="wallet"><div class="wallet-title">${name}</div>${renderCoinString}</div>`

    return (walletGroupString);

}

let renderWallets = (string) => {

    document.getElementById("wallet-container").innerHTML = string;

}

let animateCoins = () => {

    let counter = 0;
    const coins = document.querySelectorAll("div.money");
    coins.forEach(function (el) {
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
    let nameOne = getRandomProperty(PROPERTIES.name);
    let fruitName = getRandomProperty(PROPERTIES.fruit);
    problemSolution = problemFactorTwo;

    let walletArrayOne = makeChange(problemFactorOne);

    problemString = `${nameOne} wants to buy ${fruitName} that costs ${convertToCurrency(problemSum)}. ${nameOne} has ${generateCoinString(walletArrayOne)}. How much more money does ${nameOne} need to buy ${fruitName}?`;

    const walletString = renderCoins(walletArrayOne, nameOne);
    renderWallets(walletString);

    updateProblem(problemString);
    console.log(problemFactorOne + "+" + problemFactorTwo + "=" + problemSum)

}

let addition_sharingFriends = () => {


    let problemFactorOne = getRandomInteger(1, 40) * 5;
    let problemFactorTwo = getRandomInteger(1, 40) * 5;
    let problemSum = problemFactorOne + problemFactorTwo;
    let nameOne = getRandomProperty(PROPERTIES.name);
    let nameTwo = getRandomProperty(PROPERTIES.name, nameOne);
    problemSolution = problemSum;

    let walletArrayOne = makeChange(problemFactorOne);
    let walletArrayTwo = makeChange(problemFactorTwo);

    problemString = `${nameOne} has ${generateCoinString(walletArrayOne)}, and ${nameTwo} has ${generateCoinString(walletArrayTwo)}. How much money do they have together?`;

    let walletString = renderCoins(walletArrayOne, nameOne);
    walletString += renderCoins(walletArrayTwo, nameTwo);
    renderWallets(walletString);

    updateProblem(problemString);
    console.log(problemFactorOne + "+" + problemFactorTwo + "=" + problemSum)

}

//Return user answer and compare it to the solution of the current problem.
let ans = () => {

    let val = document.getElementById('answer-field').value;
    if (val == problemSolution) {
        console.log(getRandomProperty(PROPERTIES.affirmation) + " That's correct! The answer is " + convertToCurrency(problemSolution));
        document.getElementById('answer-field').value = null;
    } else {
        console.log("Try Again!");
        return problemString;
    }
    return go();

}

window.onload = () => {

    go();

}
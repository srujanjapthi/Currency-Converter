const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form > button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

/*
for (code in countryList) {
    console.log(code, countryList[code]);
}
*/

for (let select of dropDowns) {
    for (currCode in countryList) {
        let newOpt = document.createElement('option');
        newOpt.innerText = newOpt.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOpt.selected = 'selected';
        }

        if (select.name === "to" && currCode === "INR") {
            newOpt.selected = 'selected';
        }
        select.append(newOpt);
    }

    select.addEventListener('click', (event) => {
        updateFlag(event.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener('click', async (event) => {
    event.preventDefault();
    exchangeRate();
});

const exchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amntVal = amount.value;
    // console.log(amntVal);

    if (amntVal === "" || amntVal < 1) {
        amntVal = 1;
        amount.value = "1";
    }

    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    // console.log(url);
    let response = await fetch(url);
    // console.log(response);
    let data = await response.json();
    // console.log(data);

    let rate = data[toCurr.value.toLowerCase()];
    let finalAmt = rate * amntVal;
    console.log(finalAmt);
    msg.innerText = `${amntVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

window.addEventListener('load', () => {
    exchangeRate();
})
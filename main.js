const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// let dummyTrans = [
//     {id:1, text: 'Flower', amount: 100},
//     {id:2, text: 'Monitor', amount: -10000},
//     {id:3, text: 'Headphones', amount: +500},
//     {id:4, text: 'LED', amount: +200},

// ]

// let transactions = dummyTrans;
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
// /ADD transactions to DOM List////

function addTransactionDOM(transaction) {
    //Get Sign 
    console.log('ejejej');
    const sign = transaction.amount > 0 ? '+' : '-';
    const item = document.createElement('li');
    item.classList.add(`${transaction.amount > 0 ? 'minus' : 'plus'}`);

    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick = "removeTransaction(${transaction.id})">x </button>
    `;

    list.appendChild(item);

}


/////////=========Update Values ===========//////////
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const sumOfAll = amounts.reduce((a,b) => (a += b),0);
    balance.innerHTML = sumOfAll;
    console.log(sumOfAll,amounts);

    const income = amounts.filter(amt => amt > 0)
    .reduce((a,b) => (a +=b),0);

    const expense = amounts.filter(amt => amt < 0)
    .reduce((a,b) => (a +=b),0) *-1;

    
    money_plus.innerText = `+${income}`;
    money_minus.innerText = `-${expense}`;
    
}

function updateLocalSotrage() {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
///////=====FORMIK SPECIAL ========////
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if((text.value.trim() === '') || (amount.value.trim() === '')){
        alert('Please enter text and amount')
    }
    else {
        let transText = text.value;
        let transAmount = +amount.value;
        console.log(transText,transAmount);

        let newTransID = generateId();
        let transItem = {id: newTransID,text: transText,amount: transAmount};
        transactions.push(transItem);

        addTransactionDOM(transItem);

        updateValues();
        updateLocalSotrage();
        text.value = '';
        amount.value = '';
    }
})


//////Remove transaction 

function removeTransaction(id) {
    transactions = transactions.filter(tran => !(tran.id === id));
    updateLocalSotrage();

    init();
}
//FUNCTION INIT

function generateId() {
    return Math.floor(Math.random() * 100000);
}
function init() {
    console.log('init');
    list.innerHTML = '';
    transactions.forEach(item => addTransactionDOM(item));
    updateValues();
}

init();
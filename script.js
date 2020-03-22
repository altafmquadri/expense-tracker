const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

/* const dummyTransactions = [
    { id: 1, text: 'Flower', amount: -20 },
    { id: 2, text: 'Salary', amount: 300 },
    { id: 3, text: 'Book', amount: -10 },
    { id: 4, text: 'Camera', amount: -150 }
] */

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

//add transaction
const addTransaction = (e) => {
    e.preventDefault()
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount')
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction)
        addTransactionDOM(transaction)
        updateValues()
        updateLocalStorage()
        text.value = ''
        amount.value = ''
    }
}

//generate random ID
const generateID = () => {
    return Math.floor(Math.random() * 1000000)
}

// add transactions to DOM list
const addTransactionDOM = (transaction) => {
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+'
    const item = document.createElement('li')
    //add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')
    item.innerHTML =
        `${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`
    list.appendChild(item)
}

//update the balance, income and expense 
const updateValues = () => {
    const amounts = transactions.map(transaction => transaction.amount)

    const total = amounts.reduce((acc, item) => (acc + item), 0).toFixed(2)
    const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0)
    const expense = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1

    balance.innerText = `$${total}`
    money_plus.innerText = `$${income}`
    money_minus.innerText = `$${expense}`
}

//remove transaction by ID
const removeTransaction = (id) => {
    transactions = transactions.filter(t => t.id !== id)
    updateLocalStorage()
    init()
}

//update local storage transactions
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

//Init app
const init = () => {
    list.innerHTML = ''
    transactions.forEach(addTransactionDOM)
    updateValues()
}

//event listeners 
form.addEventListener('submit', addTransaction)



init()
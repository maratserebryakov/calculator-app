// Исходные данные
const data = [
    { value: 5000, type: 'купюра', count: 0, total: 0 },
    { value: 2000, type: 'купюра', count: 0, total: 0 },
    { value: 1000, type: 'купюра', count: 0, total: 0 },
    { value: 500, type: 'купюра', count: 0, total: 0 },
    { value: 100, type: 'купюра', count: 0, total: 0 },
    { value: 50, type: 'купюра', count: 0, total: 0 },
    { value: 10, type: 'купюра', count: 0, total: 0 },
    { value: 10, type: 'монета', count: 0, total: 0 },
    { value: 5, type: 'монета', count: 0, total: 0 },
    { value: 2, type: 'монета', count: 0, total: 0 },
    { value: 1, type: 'монета', count: 0, total: 0 }
];

let totalSum = 0;
let billsSum = 0;
let coinsSum = 0;
let targetAmount = 0; // Целевая сумма
let difference = 0;   // Разница

// Функция подсчета сумм
function calculateTotals() {
    totalSum = 0;
    billsSum = 0;
    coinsSum = 0;
    
    data.forEach(item => {
        item.total = item.value * item.count;
        totalSum += item.total;
        
        if (item.type === 'купюра') {
            billsSum += item.total;
        } else {
            coinsSum += item.total;
        }
    });
    
    // Расчет разницы между общей суммой и целевой суммой
    difference = totalSum - targetAmount;
}

// Функция создания таблицы
function createTable() {
    const tableBody = document.querySelector('#cashTable tbody');
    
    data.forEach(item => {
        const row = document.createElement('tr');
        
        // Номинал
        const cellNominal = document.createElement('td');
        cellNominal.textContent = item.value;
        
        // Количество
        const cellCount = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'number';
        input.value = item.count;
        input.addEventListener('input', () => {
            item.count = parseInt(input.value);
            calculateTotals();
            updateTable();
        });
        cellCount.appendChild(input);
        
        // Сумма
        const cellTotal = document.createElement('td');
        cellTotal.textContent = item.total;
        
        row.appendChild(cellNominal);
        row.appendChild(cellCount);
        row.appendChild(cellTotal);
        tableBody.appendChild(row);
    });
}

// Обновление таблицы
function updateTable() {
    const tableBody = document.querySelector('#cashTable tbody');
    tableBody.innerHTML = '';
    createTable();
    
    // Обновляем итоги под таблицей
    document.getElementById('total').textContent = totalSum;
    document.getElementById('bills').textContent = billsSum;
    document.getElementById('coins').textContent = coinsSum;
    document.getElementById('target').textContent = targetAmount;
    document.getElementById('difference').textContent = difference;
}

// Инициализация
window.addEventListener('DOMContentLoaded', () => {
    createTable();
    calculateTotals();
    updateTable();
    
    // Обработчик для поля целевой суммы
    document.getElementById('targetAmount').addEventListener('input', () => {
        targetAmount = parseInt(document.getElementById('targetAmount').value);
        calculateTotals();
        updateTable();
    });
});


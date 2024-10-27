// Step 1: Declare variables
const expenseForm = document.getElementById("expense-form");  // Form for adding expenses
const expenseList = document.getElementById("expense-list");  // Table body where expenses will be displayed
const totalAmount = document.getElementById("total-amount");  // Display for the total expense amount

let expenses = [];  // Array to store expense entries

// Step 2: Add expense on form submission
expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Gather input values and create an expense object
    const expense = {
        id: Date.now(),  // Unique ID for each expense
        name: document.getElementById("expense-name").value,  // Expense name
        amount: parseFloat(document.getElementById("expense-amount").value),  // Expense amount
        category: document.getElementById("expense-category").value,  // Expense category
        date: document.getElementById("expense-date").value  // Expense date
    };

    expenses.push(expense);  // Add the expense to the array
    displayExpenses();  // Update the table with new expense
    updateTotalAmount();  // Update the total amount

    expenseForm.reset();  // Clear the form inputs
});

// Step 3: Display expenses in the table
function displayExpenses() {
    expenseList.innerHTML = "";  // Clear current table rows
    expenses.forEach((expense) => {
        // Create a row for each expense and add it to the table
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${expense.name}</td>
            <td>₹${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button class="edit-btn" data-id="${expense.id}">Edit</button>
                <button class="delete-btn" data-id="${expense.id}">Delete</button>
            </td>
        `;
        expenseList.appendChild(row);
    });
}

// Step 4: Edit and delete expenses
expenseList.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);  // Get the expense ID from the button
    if (e.target.classList.contains("delete-btn")) {
        // Delete the expense from the array
        expenses = expenses.filter((expense) => expense.id !== id);
    } else if (e.target.classList.contains("edit-btn")) {
        // Find the expense and fill the form with its details for editing
        const expense = expenses.find((exp) => exp.id === id);
        document.getElementById("expense-name").value = expense.name;
        document.getElementById("expense-amount").value = expense.amount;
        document.getElementById("expense-category").value = expense.category;
        document.getElementById("expense-date").value = expense.date;

        // Remove the old expense from the array
        expenses = expenses.filter((exp) => exp.id !== id);
    }
    displayExpenses();  // Refresh the table display
    updateTotalAmount();  // Update the total amount
});

// Step 5: Calculate and update the total amount
function updateTotalAmount() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);  // Calculate total
    totalAmount.textContent = total.toFixed(2);  // Update display
}

#!/usr/bin/node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");

const expenseFilePath = path.join(__dirname, "expenses.json");

function loadExpenses() {
  try {
    const expenses = fs.readFileSync(expenseFilePath, { encoding: "utf-8" });
    return JSON.parse(expenses);
  } catch {
    return [];
  }
}

function writeExpenses(expenses) {
  fs.writeFileSync(expenseFilePath, JSON.stringify(expenses, null, 2));
}

function addExpense(description, amount) {
  if (!description || isNaN(amount)) {
    console.log("> Provide description and amount");
    return;
  }
  const expenses = loadExpenses();
  const newExpense = {
    id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
    description,
    amount,
    date: new Date(),
  };
  expenses.push(newExpense);
  writeExpenses(expenses);
  console.log(`> You have added new expense ID(${newExpense.id})`);
}

function getExpenses() {
  const expenses = loadExpenses();
  console.table(expenses);
}

function sumExpenses(month) {
  const expenses = loadExpenses();
  let filtered = expenses;
  if (month) {
    filtered = filtered.filter(
      (exp) => new Date(exp.date).getMonth() + 1 == month
    );
  }
  const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);
  console.log(`> Total expenses: $${total}`);
}

function deleteExpense(id) {
  if (isNaN(id)) {
    console.log("Please provide proper ID");
    return;
  }
  const expenses = loadExpenses();
  const filtered = expenses.filter((exp) => exp.id != id);
  writeExpenses(filtered);
  console.log(`You have deleted expense with ID(${id})`);
}

program
  .command("list")
  .description("get list of expenses")
  .action(() => {
    getExpenses();
  });

program
  .option("-d,--description <description>", "add description")
  .option("-a,--amount <amount>", "add amount", parseInt)
  .command("add")
  .description("add new expense")
  .action(() => {
    const options = program.opts();
    const { description, amount } = options;
    addExpense(description, amount);
  });

program
  .option("-m,--month <month>", "get expenses in this month", parseInt)
  .command("summary")
  .description("get summary of expenses")
  .action(() => {
    const { month } = program.opts();
    sumExpenses(month);
  });

program
  .option("-i,--id <id>", "get expense", parseInt)
  .command("delete")
  .description("delete expense")
  .action(() => {
    const { id } = program.opts();
    deleteExpense(id);
  });

program.parse(process.argv);

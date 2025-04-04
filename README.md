# ExpenseTrackerCLI
Sample solution for the [expense-tracker](https://roadmap.sh/projects/expense-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

ExpenseTrackerCLI is a command-line tool for managing expenses, written in JavaScript. It allows users to easily create, list, and delete expenses.

## Installation

To use ExpenseTrackerCLI, first, clone the repository. After that, you can use the npm link command to make the expense-tracker command available globally on your system.

```bash
git clone https://github.com/NurmuhammadovHojiakbar/expense-tracker-cli
cd expense-tracker-cli
npm link
```

## Usage

### List all expenses

To list all expenses, you can use the following command. If the database does not exist, it will be created automatically.

```bash
expense-tracker list
```
This command will return all stored expenses. 

### Create a new expense
To create a new expense, use the add command followed by the expense description in quotes after --description or -d options and expense amount after --amount or -a options.

```bash
expense-tracker add -d "expense description" -a 250
```

### Get summary of expenses
You can view a summary of all expenses or a summary of expenses for a specific month (of current year).


```bash
expense-tracker summary
# Total expenses: $30
```

```bash
expense-tracker summary --month 8
# Total expenses for August: $20
```

### Delete an expense
To delete an expense, use the following command with the expense ID:

```bash
expense-tracker delete --id 2
```

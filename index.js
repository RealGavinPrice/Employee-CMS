const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const sql = require("./Assets/db/SQLqueries");

function viewDepartments() {
  sql
    .getDepartments()
    .then(([rows]) => {
      console.log("\n");
      console.log((cTable.getTable(rows)));
    })
    .then(() => {
      viewOptions();
    })
    .catch((err) => console.log(("Error : ", err)));
}

function viewAllEmployees() {
  sql
    .getAllEmployees()
    .then(([rows]) => {
      console.log("\n");
      console.log((cTable.getTable(rows)));
    })
    .then(() => {
      viewOptions();
    })
    .catch((err) => console.log(("Error : ", err)));
}

function viewRoles() {
  sql
    .getRoles()
    .then(([rows]) => {
      console.log("\n");
      console.log((cTable.getTable(rows)));
    })
    .then((result) => {
      viewOptions();
      return result;
    })
    .catch((err) => console.log(("Error : ", err)));
}

async function addDepartment() {
  const department = await inquirer.prompt([
    {
      name: "name",
      message: "Please enter a Department Title",
      validate: (name) => {
        if (name) {
          return true;
        } else {
          console.log(("A Department Title must be entered!!"));
          return false;
        }
      },
    },
  ]);

  await sql.addDepartment(department);

  viewOptions();
}

async function addRole() {
  const role = await inquirer.prompt([
    {
      name: "title",
      message: "Please enter a Job Title",
      validate: (title) => {
        if (title) {
          return true;
        } else {
          console.log(("A Job Title must exist!!"));
          return false;
        }
      },
    },
    {
      name: "salary",
      message: "Please enter a salary",
      validate: (salary) => {
        if (salary) {
          return true;
        } else {
          console.log(("A Salary must exist!!"));
          return false;
        }
      },
    },
    {
      name: "department_id",
      message: "Please enter the department of this role (1 - 6)",
      validate: (department_id) => {
        if (department_id) {
          return true;
        } else {
          console.log(("This Role must belong to a Department!!"));
          return false;
        }
      },
    },
  ]);
  await sql.addRole(role);

  viewOptions();
}

async function addEmployee() {
  const employee = await inquirer.prompt([
    {
      name: "first_name",
      message: "Please enter the employee's First Name",
      validate: (first_name) => {
        if (first_name) {
          return true;
        } else {
          console.log(("This Employee must have a First Name!!"));
          return false;
        }
      },
    },
    {
      name: "last_name",
      message: "Please enter the employee's Last Name",
      validate: (last_name) => {
        if (last_name) {
          return true;
        } else {
          console.log(("This Employee must have a Last Name!!"));
          return false;
        }
      },
    },
    {
      name: "role_id",
      message: "Please select a role (1 - 5)",

      validate: (role_id) => {
        if (role_id) {
          return true;
        } else {
          console.log(("A Role must be selected!!"));
          return false;
        }
      },
    },

    {
      name: "manager_id",
      message: "Please select a manager for the employee (1 - 5)",

      validate: (manager_id) => {
        if (manager_id) {
          return true;
        } else {
          console.log(("You need to enter a Manager"));
          return false;
        }
      },
    },
  ]);
  await sql.addEmployee(employee);

  viewOptions();
}

async function updateEmployeeRole() {
  const employee = await inquirer.prompt([
    {
      name: "id",
      message: "Please enter the Employee ID",
      validate: (id) => {
        if (id) {
          return true;
        } else {
          console.log(("An Employee ID must be entered!!"));
          return false;
        }
      },
    },
    {
      name: "role_id",
      message: "Please select a role (1 - 5)",

      validate: (role_id) => {
        if (role_id) {
          return true;
        } else {
          console.log(("A Role must be selected!!"));
          return false;
        }
      },
    },
  ]);
  await sql.updateEmployeeRole(employee);

  viewOptions();
}

async function deleteEmployee() {
  const employee = await inquirer.prompt([
    {
      name: "id",
      message: "Please enter the ID of the Deleted Employee",
      validate: (id) => {
        if (id) {
          return true;
        } else {
          console.log(("An Employee's ID must be entered to delete!!"));
          return false;
        }
      },
    },
  ]);
  await sql.deleteEmployee(employee);

  viewOptions();
}

async function updateEmployeeManager() {
  const employee = await inquirer.prompt([
    {
      name: "id",
      message: "Please enter Employee ID to update",
      validate: (id) => {
        if (id) {
          return true;
        } else {
          console.log(("An Employee ID must be entered!!"));
          return false;
        }
      },
    },
    {
      name: "manager_id",
      message: "Please select a Manager  (1 - 5)",

      validate: (manager_id) => {
        if (manager_id) {
          return true;
        } else {
          console.log(("A Role must be selected!!"));
          return false;
        }
      },
    },
  ]);
  await sql.updateEmployeeManager(employee);

  viewOptions();
}

const viewOptions = () => {
  inquirer
    .prompt({
      type: "list",
      message: "Choose from the list of options",
      name: "options",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Remove an Employee",
        "Update Employee Manager",
      ],
    })
    .then((data) => {
      switch (data.options) {
        case "View all departments": {
          viewDepartments();
          break;
        }
        case "View all roles": {
          viewRoles();
          break;
        }
        case "View all employees": {
          viewAllEmployees();
          break;
        }
        case "Add a department": {
          addDepartment();
          break;
        }
        case "Add a role": {
          addRole();
          break;
        }
        case "Add an employee": {
          addEmployee();
          break;
        }
        case "Update an employee role": {
          updateEmployeeRole();
          break;
        }
        case "Remove an Employee": {
          deleteEmployee();
          break;
        }
        case "Update Employee Manager": {
          updateEmployeeManager();
          break;
        }
        default:
          return console.log("No selection.");
      }
    })
    .catch((err) => console.log(("Error : ", err)));
};
viewOptions();
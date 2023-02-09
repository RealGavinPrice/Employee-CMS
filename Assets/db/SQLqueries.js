const db = require('./connection');

class DBConnection {
  constructor(db) {
    this.db = db;
  }

  getAllEmployees() {
    return this.db
      .promise()
      .query(
        "SELECT employee.id AS 'Employee ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name,' ',manager.last_name )  AS Manager, role.title AS Role FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id"
      );
  }

  getRoles() {
    return this.db
      .promise()
      .query(
        "SELECT role.id as ID, role.title as 'Job Title', department.name as Department, role.salary as Salary  FROM role LEFT JOIN department ON role.department_id = department.id"
      );
  }

  getDepartments() {
    return this.db.promise().query("SELECT * from department");
  }

  addDepartment(data) {
    const deptName = [data.name];
    return this.db
      .promise()
      .query("INSERT INTO department (name) VALUES(?)", deptName);
  }

  addRole(data) {
    const newRole = [data.title, data.salary, data.department_id];
    return this.db
      .promise()
      .query(
        "INSERT INTO role (title,salary,department_id) VALUES(?,?,?)",
        newRole
      );
  }

  addEmployee(data) {
    const newHire = [
      data.first_name,
      data.last_name,
      data.role_id,
      data.manager_id,
    ];
    return this.db
      .promise()
      .query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)",
        newHire
      );
  }

  updateEmployeeRole(data) {
    const jobPromotion = [data.role_id, data.id];
    return this.db
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", jobPromotion);
  }

  deleteEmployee(data) {
    const gotQuit = [data.id];
    return this.db.promise().query("DELETE FROM employee WHERE id = ?", gotQuit);
  }

  updateEmployeeManager(data) {
    const midLevel = [data.manager_id, data.id];
    return this.db
      .promise()
      .query("UPDATE employee SET manager_id = ? WHERE id = ?", midLevel);
  }
}
//
module.exports = new DBConnection(db);
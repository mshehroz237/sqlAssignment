var inquirer = require('inquirer');

const cTable = require('console.table');

const mysql = require('mysql2');

const db = require('./db/connection');

function prompts() {
    inquirer.prompt({
        type: 'list',
        name: 'prompts',
        message: 'Would you like to add anything else?',
        choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role',

        ]
    })
        .then(answers => {
            if (answers.prompts === 'view all departments') {
                viewDepartments();
            }
            if (answers.prompts === 'view all roles') {
                viewRoles();
            }
            if (answers.prompts === 'view all employees') {
                viewEmployees();
            }
            if (answers.prompts === 'add a department') {
                addDepartment();
            }
            if (answers.prompts === 'add a role') {
                addRole();
            }
            if (answers.prompts === 'add an employee') {
                addEmployee();
            }
            if (answers.prompts === 'update an employee role') {
              updateEmployeeRole();
            }
        })

}

function viewDepartments(){
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows)=>{
        if(err){
            throw err;
        }
        console.table(rows);
    })
    prompts();
}
function viewRoles(){
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows)=>{
        if(err){
            throw err;
        }
        console.table(rows);
    })
    prompts();

}
function viewEmployees(){
    const sql = `SELECT employee.id,employee.first_name, employee.last_name, manager.first_name AS manager FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id `;
    db.query(sql, (err, rows)=>{
        if(err){
            throw err;
        }
        console.table(rows);
    })
    prompts();

}

function addDepartment(){
inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'what should be the name of your department'
})
.then(answers=>{
    const params = [answers.name];
    const sql = `INSERT INTO department(name)
    VALUES("${params}")
    `
    db.query(sql,(err, rows)=>{
        if(err){
            throw err;
        }
        console.log(rows.affectedRows);
    })
}).then(rows => {
    const sql = 'select * from department'
    db.query(sql, (err, rows) =>{
    console.table(rows);
    })
})
};

function addRole(){
    inquirer
  .prompt([
    {
      name: 'name',
      type : 'input',
      message: 'What is the name?',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary?',
    },    {
        name: 'department',
        type : 'input',
        message: 'What is the department?',
      },
  ])
  .then(answers => {
    const params = [answers.name,answers.salary,answers.department];
    const sql = `INSERT INTO role(title, salary, department_id)
    VALUES("${params[0]}",${params[1]},${params[2]})`
    db.query(sql,(err,rows)=>{
        if(err){
            throw err;
        }
        console.log(rows.affectedRows);
        const sql = `SELECT * FROM role`
        db.query(sql,(err,rows)=>{
        console.table(rows);
        })
    })
  });
}


function addEmployee(){
    inquirer
  .prompt([
    {
      name: 'firstname',
      type : 'input',
      message: 'What is the first name?',
    },
    {
      name: 'lastname',
      type: 'input',
      message: 'What is the last name?',
    },    {
        name: 'role',
        type : 'input',
        message: 'What is the role?',
      },
      {
        name: 'manager',
        type : 'input',
        message: 'Who is the manager?',
      }
  ])
  .then(answers => {
    const params = [answers.firstname,answers.lastname,answers.role,answers.manager];
    const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES("${params[0]}","${params[1]}","${params[2]}","${params[3]}")`
    db.query(sql,(err,rows)=>{
        if(err){
            throw err;
        }
        console.log(rows.affectedRows);
        const sql = `SELECT * FROM employee`
        db.query(sql,(err,rows)=>{
        console.table(rows);
        })
    })
  });
}

const updateEmployeeRole = () => {
    let sql = `SELECT id, first_name, last_name, role_id AS "role.id", FROM employee`;
    db.promise().query(sql, (error, response) => {
      if (error) throw error;
      let employeeNamesArray = [];
      response.forEach((employee) => {employeeNamesArray.push(`${first_name} ,${last_name}`);});

        inquirer
          .prompt([
            {
              name: 'chosenEmployee',
              type: 'list',
              message: 'All the employees',
              choices: employeeNamesArray
            },
            {
              name: 'chosenRole',
              type: 'list',
              message: 'What is their new role?',
              choices: rolesArray
            }
          ])
          .then((answer) => {
            let newTitleId, employeeId;

            response.forEach((role) => {
              if (answer.chosenRole === title) {
                newTitleId = id;
              }
            });

            response.forEach((employee) => {
              if (
                answer.chosenEmployee ===
                `${first_name} ${last_name}`
              ) {
                employeeId = id;
              }
            });

            let sqls =    `UPDATE employee SET role_id = ? WHERE id = ?`;
            db.query(
              sqls,
              [newTitleId, employeeId],
              (error) => {
                if (error) throw error;
                console.log(chalk.greenBright(`Employee Role Updated`));
                promptUser();
              }
            );
          });
      });


    }

prompts();


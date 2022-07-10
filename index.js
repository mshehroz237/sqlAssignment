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
            }
            if (answers.prompts === 'add an employee') {
            }
            if (answers.prompts === 'update an employee role') {
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
            console.log(answers.name);
            const sql = `INSERT INTO department(name)
            VALUES('shehroz');`
            db.query(sql,(err, rows)=>{
                if(err){
                    throw err;
                }
                console.table(rows.affectedRows);
            })
        })
    }


prompts();


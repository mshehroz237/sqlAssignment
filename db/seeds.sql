USE election;
-- //inserting into department
INSERT INTO department(name)
VALUES('sales'),('finance'),('it');
-- //inserting into role
INSERT INTO role(title, salary, department_id)
VALUES('banker',60000,1),
('accoutant',60000,2),
('developer',60000,3);
-- //inserting into employee
INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES('mo','shehroz',1, NULL),
('shehroz','sandhu',2, 1),
('ahtar','mehdi',3,2);

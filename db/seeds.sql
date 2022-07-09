USE election;

INSERT INTO department(name)
VALUES('sales'),('finance'),('it');

INSERT INTO role(title, salary, department_id)
VALUES('sales',60000,1),
('finance',60000,2),
('it',60000,3);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES('mo','shehroz',1, NULL),
('shehroz','sandhu',2, 1),
('ahtar','mehdi',3,2);

INSERT INTO department
  (name)
VALUES 
  ('Research & Development'),
  ('Quality Assurance'),  
  ('Law' ),
  ('Board of Directors'),
  ('Engineering');
  
INSERT INTO role
  (title, salary,department_id)
VALUES
  ('Product Developer',120000,1),
  ('Telephone Specialist',40000,2),
  ('Lawyer',200000,3),
  ('Trustee',1000000,4),
  ('Software Engineer',150000,5);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Otrera', 'Normandy',1,NULL),
  ('Adelheide', 'Dent', 1,1),
  ('Florence', 'Hippolyta', 3,2),
  ('Boron', 'Wessex', 2,2),
  ('Algernon', 'Beards',2,1);

  

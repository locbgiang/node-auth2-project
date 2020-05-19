
exports.seed = function(knex) {
  //000-cleanup.js already cleaned out all tables
  const users = [
    {
      username: "John",
      password: "password123",
      department: "Engineer", //will get id 1
    },
    {
      username: "Jessica",
      password: "321password",
      department: "Marketing",  //will get id 2
    },
    {
      username: "Jack",
      password: "pass123word",
      department: "Business",  //will get id 3
    }
  ]

  return knex('users').insert(users).then(()=>console.log('\n Seed data for the user table added \n'));
};

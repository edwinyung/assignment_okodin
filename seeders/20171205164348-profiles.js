'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    var profiles = [];
    for (let i = 0; i < 10; i++) {
      profiles.push({
        aboutme: `${i}`,
        talents: `${i}`,
        favorites: `${i}`,
        whymessage: `${i}`,
        gender: `${i}`,
        martial: `${i}`,
        height: `${i}`,
        body: `${i}`,
        children: `${i}`,
        occupation: `${i}`
      });
    }
    return queryInterface.bulkInsert('Profiles', profiles);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

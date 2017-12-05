const repl = require('repl').start({});
const lodash = require('lodash');
const helpers = require('./helpers');

var models = require('./models');

// Make the `models` object
// a global variable in the
// REPL
repl.context.models = models;

// Make each model a global
// object in the REPL
Object.keys(models).forEach(modelName => {
  repl.context[modelName] = models[modelName];
});

// Provide a convenience function `lg`
// to pass to `then()` and `catch()`
// to output less verbose values for
// sequelize model query results
repl.context.lg = data => {
  if (Array.isArray(data)) {
    if (data.length && data[0].dataValues) {
      data = data.map(item => item.dataValues);
    }
  } else {
    if (data.dataValues) {
      data = data.dataValues;
    }
  }
  console.log(data);
};

// ----------------------------------------
// Libs
// ----------------------------------------
repl.context.lodash = lodash;

// ----------------------------------------
// Helpers
// ----------------------------------------
repl.context.helpers = helpers;
Object.keys(helpers).forEach(key => {
  repl.context[key] = helpers[key];
});

// ----------------------------------------
// Logging
// ----------------------------------------
repl.context.lg = console.log;

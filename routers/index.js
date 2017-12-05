var express = require('express');
var router = express.Router();
var models = require('./../models');
var User = models.User;
var Profile = models.Profile;
var h = require('./../helpers');
var sequelize = models.sequelize;

// ----------------------------------------
// Index
// ----------------------------------------
var onIndex = (req, res) => {
  User.findAll()
    .then(users => {
      res.render('application', { users: users });
    })
    .catch(e => res.status(500).send(e.stack));
};
router.get('/', onIndex);
router.get('/users', onIndex);

// ----------------------------------------
// New
// ----------------------------------------
router.get('/users/new', (req, res) => {
  res.render('new');
});

// ----------------------------------------
// Edit
// ----------------------------------------
router.get('/users/:id/edit', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render('users/edit', { user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.render('users/show', { user });
      } else {
        res.send(404);
      }
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post('/users', (req, res) => {
  var body = req.body;
  var user;
  var profile;

  var userParams = {
    fname: body.user.fname,
    lname: body.user.lname,
    username: body.user.username,
    email: body.user.email
  };

  var profileParams = {
    aboutme: req.body.user.profile.aboutme,
    talents: req.body.user.profile.talents,
    favorites: req.body.user.profile.favorites,
    whymessage: req.body.user.profile.whymessage,
    gender: req.body.user.profile.gender,
    martial: req.body.user.profile.martial,
    height: parseInt(req.body.user.profile.height),
    body: req.body.user.profile.body,
    children: parseInt(req.body.user.profile.children),
    occupation: req.body.user.profile.occupation
  };

  // Begin transaction
  sequelize.transaction(t => {
    // Don't create a user if
    // already exists
    return (
      User.findOrCreate({
        defaults: userParams,
        where: { email: userParams.email },
        transaction: t
      })

        // Array returned from findOrCreate
        // so must use `spread`
        .spread(result => {
          // Set user
          user = result;

          // Add userId to associated models
          profileParams.userId = user.id;

          // Find or create user profile
          return Profile.findOrCreate({
            defaults: profileParams,
            where: { userId: user.id },
            transaction: t
          });
        })

        .spread(result => {
          // Set profile
          profile = result;
          // Set profileId for associations
          user.profileId = profile.id;

          // Update user with profileId
          return User.update(
            { profileId: profile.id },
            {
              where: { id: user.id },
              limit: 1,
              transaction: t
            }
          );
        })
        // Redirect to profile
        .then(result => {
          req.flash('success', 'Profile created!');
          res.redirect(`/user/${user.id}`);
        })
        .catch(e => {
          console.log(e);
          if (e.errors) {
            e.errors.forEach(err => req.flash('error', err.message));
            res.render('users/new');
          } else {
            res.status(500).send(e.stack);
          }
        })
    );
  });
});

//
//   User.create(userParams)
//     .then(user => {
//       res.redirect(`/users/${user.id}`);
//     })
//     .catch(e => res.status(500).send(e.stack));
// });

// ----------------------------------------
// Update
// ----------------------------------------
router.put('/users/:id', (req, res) => {
  var userParams = req.body.user;

  User.update(
    {
      fname: userParams.fname,
      lname: userParams.lname,
      username: userParams.username,
      email: userParams.email
    },
    {
      where: { id: req.params.id },
      limit: 1
    }
  )
    .then(() => {
      req.method = 'GET';
      res.redirect(`/users/${req.params.id}`);
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Destroy
// ----------------------------------------
router.delete('/users/:id', (req, res) => {
  User.destroy({
    where: { id: req.params.id },
    limit: 1
  })
    .then(() => {
      req.method = 'GET';
      res.redirect('/users');
    })
    .catch(e => res.status(500).send(e.stack));
});

// ----------------------------------------
// Profile Routers
// ----------------------------------------

module.exports = router;

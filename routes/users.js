// users.js
import Cosmic from 'cosmicjs'
import async from 'async'
import _ from 'lodash'
import bcrypt from 'bcrypt'
const saltRounds = 10
module.exports = (app, config, partials) => {
  app.get('/users', (req, res) => {
    if(!req.session.user)
      return res.redirect('/?message=unauthorized')
    res.locals.user = req.session.user
    async.series([
      callback => {
        Cosmic.getObjectType({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.COSMIC_READ_KEY } }, { type_slug: 'users' }, (err, response) => {
          res.locals.users = response.objects.all
          callback()
        })
      },
      callback => {
        Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET, read_key: config.COSMIC_READ_KEY } }, (err, response) => {
          res.locals.cosmic = response
          return res.render('users.html', {
            partials
          })
        })
      }
    ])
  })

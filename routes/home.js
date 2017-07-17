// home.js
import Cosmic from 'cosmicjs'
module.exports = (app, config, partials) => {
  app.get('/', (req, res) => {
    Cosmic.getObjects({ bucket: { slug: config.COSMIC_BUCKET } }, (err, response) => {
      res.locals.cosmic = response
      if (req.query.message === 'unauthorized')
        res.locals.unauthorized_message = true
      return res.render('index.html', {
        partials
      })
    })
  })
}

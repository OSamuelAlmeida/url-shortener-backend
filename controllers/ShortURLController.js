const ShortURL = require('../database/models/ShortURL')
const { body, query, validationResult } = require('express-validator')
const getNextShortCode = require('../shortening')

function shortURLJson(shortURL) {
  this.id = shortURL._id
  this.code = shortURL.code
  this.fullURL = shortURL.fullURL
  this.createdAt = shortURL.createdAt
  this.numberOfClicks = shortURL.numberOfClicks
}

exports.getShortURLByCode = function(req, res) {
  try {
    ShortURL.findOne({code: req.params.code}, '_id code fullURL createdAt numberOfClicks').then(
      (shortURL) => {
        if (shortURL !== null) {
          shortURL.numberOfClicks += 1

          shortURL.save().then(shortURL => {
            const responseData = new shortURLJson(shortURL)

            return res.status(200).json(responseData)
          })
        } else {
          return res.status(404).json({})
        }
      }
    )
  } catch (err) {
    return res.status(500).json({
      error: err
    })
  }
}

exports.createShortURL = [
  body('fullURL', 'fullURL must be a valid URL').isURL(),
  function(req, res) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    if (!req.body.fullURL.startsWith('http')) {
      req.body.fullURL = `https://${req.body.fullURL}`
    }

    try {
      ShortURL.findOne({fullURL: req.body.fullURL}, '_id code fullURL createdAt numberOfClicks').then(
        (shortURL) => {
          if (shortURL) {
            var responseData = new shortURLJson(shortURL)

            return res.status(200).json(responseData)
          } else {
            ShortURL.find().sort({createdAt: -1}).limit(1).then(
              (shortURLs) => {
                let lastCode = null

                if (shortURLs.length > 0) {
                  lastCode = shortURLs[0].code
                }

                const code = getNextShortCode(lastCode)

                const shortURL = new ShortURL({
                  code: code,
                  fullURL: req.body.fullURL,
                })

                shortURL.save((err) => {
                  if (err) {
                    return res.status(500).json({
                      error: err
                    })
                  }

                  var responseData = new shortURLJson(shortURL)

                  return res.status(200).json(responseData)
                })
              }
            )
         }
        }
      ).catch()
    } catch (err) {
      return res.status(500).json({
        error: err
      })
    }
  }
]

exports.listTopShortURLs = [
  query('length').isNumeric(),
  function(req, res) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    ShortURL.find().sort({numberOfClicks: -1}).limit(req.query.length).then(
      (shortURLs) => {
        if (shortURLs.length > 0) {
          return res.status(200).json(shortURLs)
        } else {
          return res.status(200).json([])
        }
      }
    )
  }
]

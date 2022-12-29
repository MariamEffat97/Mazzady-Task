
import './commands'
import 'cypress-plugin-api'
require('cypress-xpath')


const cucumber = require("@badeball/cypress-cucumber-preprocessor").default
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}
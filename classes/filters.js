const { getDaysFromToday } = require("./common")

const DPASRATING_FILTER = 'M'
const SHIPMETHOD_FILTER = 'S'
const DAYSTILCOMPLETION_FILTER = 'D'
const QUOTEREF_FILTER = 'Q'
const MATERIALSPEC_FILTER = 'R'
const CUSTOMER_FILTER = 'C'
const FURNISHEDMATERIAL_FILTER = 'F'

class Filters {
  constructor () {
    this.poType = ''
    this.customer = ''
    this.prime = ''
    this.aircraft = ''
    this.dpasRating = ''
    this.shipMethod = ''
    this.returnDate = ''
    this.daysTilCompletion = ''
    this.quoteRef = ''
    this.materialSpec = ''
    this.furnishedMaterial = ''
  }

  reset () {
    for (var prop in this) {
      this[prop] = ''
    }
  }

  copyTo (obj) {
    for (var prop in this) {
      obj[prop] = this[prop]
    }
  }

  copyFrom (obj) {
    for (var prop in this) {
      this[prop] = obj[prop]
    }
  }

  getDpasRatingFilter () {
    return this.dpasRating ? DPASRATING_FILTER : ''
  }

  getShipMethodFilter () {
    return this.shipMethod ? SHIPMETHOD_FILTER : ''
  }

  getReturnDateFilter() {
    return this.returnDate ? DAYSTILCOMPLETION_FILTER : ''
  }

  getDaysTilCompletionFilter () {
    this.daysTilCompletion = getDaysFromToday(this.returnDate) + ' DAYS'
    return this.daysTilCompletion ? DAYSTILCOMPLETION_FILTER : ''
  }

  getQuoteRefFilter () {
    return this.quoteRef ? QUOTEREF_FILTER : ''
  }

  getMaterialSpecFilter () {
    return this.materialSpec ? MATERIALSPEC_FILTER : ''
  }

  getCustomerFilter () {
    return (
      this.customer &&
       this.prime &&
       this.aircraft
    )
    ? CUSTOMER_FILTER
    : ''
  }

  getPoTypeFilter () {
    return this.poType.charAt(0)
  }

  getFurnishedMaterialFilter () {
    return this.furnishedMaterial ? FURNISHEDMATERIAL_FILTER : ''
  }

  getAllFilters () {
    return this.getDpasRatingFilter() +
      this.getShipMethodFilter() +
      this.getReturnDateFilter() +
      this.getDaysTilCompletionFilter() +
      this.getQuoteRefFilter() +
      this.getMaterialSpecFilter() +
      this.getCustomerFilter() +
      this.getFurnishedMaterialFilter()
  }

  filterText (text) {
    for (var prop in this) {
      let reg = new RegExp('{' + prop + '}', 'gi')
      text = text.replace(reg, this[prop])
    }
    return text
  }

  parseFilter (code) {
    let filter = this.getAllFilters()
    return filter.includes(code.trim())
  }
}

module.exports = Filters

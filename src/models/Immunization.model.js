(function () {
'use strict';

  var Agent = require('./Agent.model.js')();
  var Trade = require('./Trade.model.js')();
  var Lot   = require('./Lot.model.js')();

  module.exports = function () { return Immunization; };

  /**
   * @param {string} [date=''] - date immunization was administered
   * @param {boolean} [isDateApproximate=false] - flag for approximate date
   * @param {Agent} [agent=Agent] - agent in immunization administered
   * @param {string} [provider=''] - health-care provider (doctor, nurese, PHU etc.)
   * @param {string} [location=''] - geographic location where immunization occured
   * @param {Lot} [lot=Lot] - agent / trade lot number & expiry
   * @param {String} [vaccineCode=''] - snomed value used to convert from FHIR message (NOTE: optional in newly constructed Immunization objects)
   * @constructor
   * @returns {Immunization}
   */
  function Immunization (
    date,
    isDateApproximate,
    agent,
    trade,
    provider,
    location,
    lot,
    vaccineCode
  ) {
    this.date = date || '';
    this.isDateApproximate = isDateApproximate || false;
    this.agent = agent || new Agent();
    this.trade = trade || new Trade();
    this.provider = provider || '';
    this.location = location || '';
    this.lot = lot || new Lot();
    this.vaccineCode = vaccineCode || '';

    this.clone = clone;

    /**
     * Creates a deep clone of this object.
     * @memberof Immunization
     * @returns {Immunization}
     */
    function clone () {
      return new Immunization(
        this.date,
        this.isDateApproximate,
        this.agent.clone(),
        this.trade.clone(),
        this.provider,
        this.location,
        this.lot.clone(),
        this.vaccineCode
      );
    }
  }

}());

(function () {
'use strict';

    module.exports = function () { return ImmunizationGroup; };

    /**
     * @param {string} [title=''] - group title
     * @param {Array<Immunization>} [immunizations=Array] - array of immunizations
     * @constructor
     * @returns {ImmunizationGroup}
     */
    function ImmunizationGroup (
        title,
        immunizations
    ) {
        this.title = title || '';
        this.immunizations = immunizations || [];

        this.clone = clone;

        /**
         * Creates a deep clone of this object.
         * @memberof ImmunizationGroup
         * @returns {ImmunizationGroup}
         */
        function clone () {
            return new ImmunizationGroup(
                this.title,
                this.immunizations.map(function (child) { return child.clone(); })
            );
        }
    }

}());

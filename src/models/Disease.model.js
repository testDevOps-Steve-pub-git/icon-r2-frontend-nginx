(function () {
'use strict';

    module.exports = function () { return Disease; };

    /**
     * @param {string} [name=''] - disease name
     * @param {string} [snomed=''] - disease snomed code
     * @constructor
     * @returns {Disease}
     */
    function Disease (
        name,
        snomed
    ) {
        this.name = name || '';
        this.snomed = snomed || '';

        this.clone = clone;

        /**
         * Creates a deep clone of this object.
         * @memberof Disease
         * @returns {Disease}
         */
        function clone () {
            return new Disease(
                this.name,
                this.snomed
            );
        }
    }

}());

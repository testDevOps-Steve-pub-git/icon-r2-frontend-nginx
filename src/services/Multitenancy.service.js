/**
 * Facilitates loading customized PHU data, as served via NGINX configuration.
 * @namespace multitenancyService
 * @memberOf Services
 */
/* @ngInject */
  function Multitenancy ($http, $q) {
/* Private members of this service ******************************************/

    var DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './phu/phu.json'
    // Uncomment overrides below to test different multitenancy configurations...
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/aph/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/bchu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/ckphu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/drhd/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/eohu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/esthu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/gbhu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/hchu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/hkpr/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/hnhu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/hpechu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/hph/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/kfla/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/lph/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/mlhu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/nbpsdhu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/nrph/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/nwhu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/ocph/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/pdhu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/peel/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/po/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/rowph/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/sdhu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/smdhu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/tbdhu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/timhu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/tph/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/wechu/phu.json';
    // DEFAULT_RELATIVE_PATH_TO_PHU_JSON = './multitenancy/wdgph/phu.json';

    let phuAssets = null

    /** Sets the PHU assets variable
    * @param {Promise} response - the PHU asset data
    * @returns {Promise => phuAssets} - promise with the PHU assets
    */
    function setPhuAssets (response) {
      phuAssets = response.data
      return $q.when(phuAssets)
    }

    /**
     * Returns a promise for asynchronous loading of custom PHU data.
     * @returns {Promise => {}}} - the PHU asset data
     */
    function getPhuKeys () {
      // If we already have PHU assets, return them.
      if (phuAssets !== null) return $q.when(phuAssets)

      // Otherwise get PHU assets.
      return (!phuAssets)
                ? $http.get(DEFAULT_RELATIVE_PATH_TO_PHU_JSON)
                       .then(setPhuAssets)
                : $q.when(phuAssets)
    }

/* Public interface for this service ******************************************/
    return { getPhuKeys: getPhuKeys }
  }

  export default {
    name: 'Multitenancy',
    service: Multitenancy
  }

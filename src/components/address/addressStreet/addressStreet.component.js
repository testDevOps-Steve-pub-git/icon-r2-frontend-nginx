/**
 * Created on 2017-01-18.
 * Address section for type street
 */
/* @ngInject */
function addressStreet$ctrl (ICON_RGX) {
  this.$onInit = () => {
    /**
     * Checks the street address inputs for input values.
     * @memberof addressStreetController
    */
    this.hasUserInput = () => {
      const ignoredProperties = ['clone', 'addressType', 'province', 'postalCode', 'city']

      return (Object.keys(this.localAddress)
                        .filter((a) => ignoredProperties.indexOf(a) < 0)
                        .map((a) => this.localAddress[a])
                        .join('').length > 0)
    }

    /** Libraries */
    this.isAddressFormDisplayed = false

    /** Regex Libraries */
    this.rgx = ICON_RGX.rgx

    /** Array init for typeaheads */
    this.streetDirections = [
      'North',
      'Northeast',
      'East',
      'Southeast',
      'South',
      'Southwest',
      'West',
      'Northwest',

      'Nord',
      'Nord-Est',
      'Est',
      'Sud-Est',
      'Sud',
      'Sud-Ouest',
      'Ouest',
      'Nord-Ouest'
    ]
    this.streetTypes = [
      'Abbey',
      'Acres',
      'Allée',
      'Alley',
      'Autoroute',
      'Avenue', /* Same in French & English, removed duplicate. */

      'Bay',
      'Beach',
      'Bend',
      'Boulevard', /* Same in French & English, removed duplicate. */
      'By-pass',
      'Byway',

      'Centre',
      'Campus',
      'Cape',
      'Carré',
      'Carrefour',
      'Cul-de-sac',
      'Cercle',
      'Chemin',
      'Chase',
      'Circle',
      'Circuit',
      'Close',
      'Common',
      'Concession',
      'Côte',
      'Cour',
      'Cours',
      'Cove',
      'Corners',
      'Crescent',
      'Croissant',
      'Crossing',
      'Court',
      'Centre',

      'Dale',
      'Dell',
      'Diversion',
      'Downs',
      'Drive',

      'Échangeur',
      'End',
      'Esplanade',
      'Estates',
      'Expressway',
      'Extension',

      'Farm',
      'Field',
      'Forest',
      'Front',
      'Freeway',

      'Gate',
      'Gardens',
      'Glade',
      'Glen',
      'Green',
      'Grounds',
      'Grove',

      'Harbour',
      'Heath',
      'Heights',
      'Highlands',
      'Hill',
      'Hollow',
      'Highway',

      'Île',
      'Impasse',
      'Inlet',
      'Island',

      'Key',
      'Knoll',

      'Landing',
      'Lane',
      'Line',
      'Link',
      'Lookout',
      'Limits',
      'Loop',

      'Mall',
      'Manor',
      'Maze',
      'Meadow',
      'Mews',
      'Montée',
      'Moor',
      'Mount',
      'Mountain',

      'Orchard',

      'Parade',
      'Parc',
      'Park',
      'Passage',
      'Path',
      'Pines',
      'Parkway',
      'Pathway',
      'Place', /* Same in French & English, removed duplicate. */
      'Plateau',
      'Plaza',
      'Point',
      'Pointe',
      'Port',
      'Private',
      'Promenade',

      'Quai',
      'Quay',

      'Ramp',
      'Rang',
      'Range',
      'Road',
      'Rond-point',
      'Ridge',
      'Rise',
      'Ruelle',
      'Route',
      'Row',
      'Rue',
      'Run',

      'Sentier',
      'Square',
      'Street',
      'Subdivision',

      'Terrace',
      'Terrasse',
      'Thicket',
      'Townline',
      'Towers',
      'Trail',
      'Turnabout',

      'Vale',
      'Via',
      'View',
      'Villas',
      'Village',
      'Vista',
      'Voie',

      'Walk',
      'Way',
      'Wharf',
      'Wood',
      'Wynd'
    ]
  }
}

export default {
  name: 'addressStreet',
  component: {
    bindings: {
      localAddress: '=',
      form: '='
    },
    templateUrl: './components/address/addressStreet/addressStreet.template.html',
    controller: addressStreet$ctrl
  }
}

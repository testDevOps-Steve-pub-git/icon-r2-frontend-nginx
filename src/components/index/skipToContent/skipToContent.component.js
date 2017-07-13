/* @ngInject */
function skipToContent$ctrl ($window, $location, $anchorScroll) {
  this.$onInit = () => {
    this.scrollToContent = (event) => {
      // A list of interactive elements
      let tags = [ 'input', 'button', 'a' ]

      // The first of all elements of the selected tags
      let selectableObjects = tags
                              .map((a) => getObjectPositions(a))
                              .filter((a) => a !== undefined)

      // The first of all interactive elements
      let selectedObject = selectableObjects[getMinimumDistanceObjectKey(selectableObjects)]

      // Focus on the first element
      selectedObject.element.focus()

      function getMinimumDistanceObjectKey (elements) {
        return Object.keys(elements)
                     .filter((a) => elements[a].distance === Math.min.apply(Math, (elements.map((a) => a.distance))))
      }

      /**
       * This function iterates through input objects and calculates if they are the first object of their type on the page.
       * @memberof scrollToContent
       * @param {String} tag: element tag
       * @returns element, element - The an object containing the selected element and the distance that element is from the scrollToContent element
       */
      function getObjectPositions (tag) {
        let element = Object.keys(document.getElementsByTagName(tag))
                            .map((a) => { return {element: document.getElementsByTagName(tag)[a], distance: document.getElementsByTagName(tag)[a].getBoundingClientRect().top - event.currentTarget.getBoundingClientRect().top} })
                            .filter((element) => element.distance > 0 && !element.element.classList.contains('skip'))

        return element[0]
      }
    }
  }
}

export default {
  name: 'skipToContent',
  component: {
    controller: skipToContent$ctrl,
    templateUrl: './components/index/skipToContent/skipToContent.template.html'
  }
}

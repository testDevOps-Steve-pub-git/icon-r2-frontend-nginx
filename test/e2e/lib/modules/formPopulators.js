(function () {
'use strict';
  var wait = require('./waitForElements.js');
  /* Enumeration of available form input types. */
  var inputType = {
    CHECKBOX: 0,
    RADIO: 1,
    SELECT: 2,
    TEXT: 3,
    TYPEAHEAD: 4 
  };

  // Values to be user by external functions.
  module.exports = {
    CHECKBOX: inputType.CHECKBOX,
    RADIO: inputType.CLICK,
    SELECT: inputType.SELECT,
    TEXT: inputType.TEXT,
    TYPEAHEAD: inputType.TYPEAHEAD,
    Field: Field,
    populate: populate
  };

  /**
   * @desc Manipulates a group of form inputs using protractor commands.
   * @param formValues an array of form values.
   * @see Field constructor.
  */
  function populate (formValues) {
    formValues.forEach(function (field) {
      switch (field.type) {

        case inputType.CHECKBOX:
          wait.waitForElements([field.selector])
            .then(() => {
              element.all(by.css(field.selector))
                .then((checkboxes) => {
                  checkboxes.forEach((checkbox) => {
                    if (field.value) checkbox.click();
                  });
                });
            });
          break;

        case inputType.CLICK:
          wait.waitForElements([field.selector])
            .then(() => {
              browser.executeScript('arguments[0].click()', element(by.css(field.selector)));
            });
          break;

        case inputType.SELECT:
          wait.waitForElements([field.selector])
            .then(() => {
              element.all(by.css(field.selector + ' option[value=\"' + field.value + '\"]'))
                .click();
            });
          break;

        case inputType.TEXT:
          checkValidation(field.selector)
            .then(() => {
              // Populate the input with a valid value.
              for (var char = 0; char < field.value.length; char++) {
                element(by.css(field.selector)).sendKeys(field.value.charAt(char));
              }
              // Ensure an error message is not present.
              browser.wait(() => {
                return element(by.css(field.selector + '-error')).getText()
                  .then((value) => {
                    return value === '';
                  });
              }, wait.TIMEOUT_TIME);
            });
          break;

        case inputType.TYPEAHEAD:
          // Input invalid data into the input and check for an error message.
          checkValidation(field.selector)
            .then(() => {
              // Input value into type ahead input.
              for (var char = 0; char < field.value.length - 1; char++) {
                browser.sleep(500);
                element(by.css(field.selector)).sendKeys(field.value.charAt(char));
              }
              browser.sleep(2000);
              browser.actions().sendKeys(protractor.Key.ENTER).perform();
              // Validate the the full description in the type ahead selection.
              element(by.css(field.selector)).getAttribute('value')
                .then((value) => {
                  expect(value.toLowerCase())
                    .toContain(field.value.toLowerCase());
                });
              // Ensure an error message is not present.
              browser.wait(() => {
                return element(by.css(field.selector + '-error')).getText()
                  .then((value) => {
                    return value === ''; 
                  });
              }, wait.TIMEOUT_TIME);
            });
          break;

        default:
          console.log('Error: \"' + field.type + '\" is not a supported field type.');
          break;
      }
    });
  }

  /**
   * @desc Constructs an object representing a field, for consumption by methods of this module.
   * @param type a type constant from this module (example: SELECT).
   * @param selector unique CSS selector to locate the element.
   * @param value the value to set for the input (note: for all non-text values, use the HTML value attribute).
   * @returns {{type: *, selector: *, value: *}}
   * @constructor
   */
  function Field(type, selector, value) {
    return {
      type: type,
      selector: selector,
      value: value
    };
  }

  /**
   * @desc Inputs an invalid value into an input and checks to ensure an error is provided. 
   * @param selector The element ID of the input to be assessed. 
  */
  function checkValidation (selector) {
    var ERROR_VALUE = '12345678$+#%!%^&*';
    // Wait for element to appear on page.
    return wait.waitForElements([selector])
      .then(() => {
        // Input invalid value into input.
        for (var char = 0; char < ERROR_VALUE.length; char++) {
          element(by.css(selector)).sendKeys(ERROR_VALUE.charAt(char));
        }
        // Click the next button to ensure the input is dirty.
        element(by.css('#pager-next-button'))
          .click();
        // Ensure an error message is present.
        return browser.wait(() => {
          return element(by.css(selector + '-error')).getText()
            .then((value) => {
              return value != '';
            });
        }, wait.TIMEOUT_TIME)
          .then(() => {
            // Clear the input.
            return element(by.css(selector))
              .clear();
          });
    });
  }
}());

/**
 * Service for checking browser and browser version.
 * @namespace BrowserChecker
 * @memberOf Services
*/
/* @ngInject */
function BrowserChecker (deviceDetector) {
  const allBrowsers = {
    CHROME: {
      minVersion: 55,
      browser: 'chrome',
      browserName: 'Chrome',
      isSupported: true
    },
    FIREFOX: {
      minVersion: 45,
      browser: 'firefox',
      browserName: 'Firefox',
      isSupported: true
    },
    IE: {
      minVersion: 10,
      browser: 'ie',
      browserName: 'Explorer',
      isSupported: true
    },
    EDGE: {
      minVersion: 14,
      browser: 'ms-edge',
      browserName: 'Edge',
      isSupported: true
    },
    SAFARI: {
      minVersion: 10,
      browser: 'safari',
      browserName: 'Safari',
      isSupported: true
    },
    OPERA: {
      minVersion: 42,
      browser: 'opera',
      browserName: 'Opera',
      isSupported: false
    },
    FB_MESSANGER: {
      minVersion: 0,
      browser: 'fb-messanger',
      browserName: 'Facebook Messanger',
      isSupported: false
    },
    UNKNOWN: {
      minVersion: 0,
      browser: 'unknown',
      browserName: 'Unknown',
      isSupported: false
    }

  }

  let browser = getBrowser()

  /**
   * Gets the browser the user is current viewing the website in.
   * @memberOf BrowserChecker
   * @return {browser} - An object containing the detected browser and it's relevant attributes
  */
  function getBrowser () {
    let browser = allBrowsers[Object.keys(allBrowsers).filter((a) => deviceDetector.browser === allBrowsers[a].browser)]
    browser.version = deviceDetector.browser_version.split('.')[0]
    return browser
  }

  /**
   * Gets all supported browsers by thier names.
   * @memberOf BrowserChecker
   * @return {browserNames} - An object containing the names of all the supported browsers as strings
  */
  function getSupportedBrowsers () {
    return Object.keys(allBrowsers)
                 .filter((a) => allBrowsers[a].isSupported)
                 .map((a) => allBrowsers[a].browserName)
  }

  /**
   * Returns a true or false value indicating if the browser is supported or not.
   * @memberOf BrowserChecker
   * @return {bool}
  */
  function isBrowserSupported () {
    return browser.isSupported && browser.version >= browser.minVersion
  }

  return {
    getSupportedBrowsers: getSupportedBrowsers,
    isBrowserSupported: isBrowserSupported,
    browser: browser
  }
}

export default {
  name: 'BrowserChecker',
  service: BrowserChecker
}

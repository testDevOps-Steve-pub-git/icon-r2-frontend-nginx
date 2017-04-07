(function () {
'use strict';
  /* Gives context to CSS / ID selectors facilitating manipulation of various inputs required to mock user interaction. */
  module.exports = {
    /* Welcome page specific. */
    home : {
      immunizationsSchoolsActLink: '#home-link-one',
      childCareActLink: '#home-link-two',
      oiidLinkOne: '#home-oiid-link-one',
      oiidLinkTwo: '#home-oiid-link-two',
      oiidLinkClose: '#home-info-link-close',
      anon: '#home-anon-button',
      auth: '#home-auth-button'
    },
    role: {
      myself: '#role-myself-button',
      other: '#role-other-button'
    },
    acceptUsePolicy: {
      termsOfUseLink: '#aup-terms-of-use-link',
      continueReading: '#aup-continue-reading-link',
      accept: '#aup-accept-button',
      decline: '#aup-decline-button'
    },
   /* Index specific. */
    index : {
      home: '#home-button',
      languageSelector: '#language-selector',
      goToTop: '#icon-scroll-to-top'
    },
    /* Pager specific. */
    pager : {
      previous: '#pager-previous-button',
      next: '#pager-next-button',
      saveAndReturn: '#pager-return-button'
    },
    /* Progress Bar specific. */
    progressBar: {
      mobileMenu: '#mobile-drop-down-menu'
    }
};
}());

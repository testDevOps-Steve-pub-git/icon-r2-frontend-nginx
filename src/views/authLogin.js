/**
 * Created on 2017-02-21.
 * View for auth login route
 */
authLoginController.$inject = [];
function authLoginController () {}

module.exports = {
  bindings: { data: '<' },
  controller: authLoginController,
  template: `
    <div class="container">
      <login></login>
    </div>
  `
};
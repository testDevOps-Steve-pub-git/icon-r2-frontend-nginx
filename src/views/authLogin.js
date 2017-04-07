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
    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
         <login></login>
      </div>
    </div>
  `
};
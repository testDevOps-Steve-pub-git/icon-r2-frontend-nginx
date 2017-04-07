/**
 * Created on 2017-03-10.
 * Sub component of yellowcard display, for more info data
 * @Input - moreInfo- the moreInfo array in the particular row
*            Each element in the array---
 *          Currently contains the trade name (if there is a trade),
 *          agent name (agent short name), and agent long name
 *          The LOT object for the row
 *          And the provider
 */
(function(){
  'use strict';

  module.exports = {
    bindings: { moreInfo: '<' },
    controller: yellowCardMoreInfoController,
    template: `
      <div ng-repeat="info in $ctrl.moreInfo" style="margin-bottom: 5px;">
        <div class="col-xs-12">
          <span ng-if="info.trade.name !== ''"><strong>{{info.trade}}</strong></span>
          <span ng-if="info.trade.name === ''"><strong>{{info.agent}}</strong></span>
        </div>
        
        <div class="col-xs-12">
          <span>{{info.agentLong}}</span>
        </div>
        
        <div class="col-xs-12">
          <span ng-if="info.lot.number != ''"><strong>{{info.lot.number}}</strong></span>
        </div>
        
        <div class="col-xs-12">
          <span ng-if="info.isDateApproximate">Date is Estimated</span>
        </div>
        
        <div class="col-xs-12">
          <span ng-if="info.provider != ''">{{info.provider}}</span>
        </div>
      </div>

    `
  };

  yellowCardMoreInfoController.$inject = [];
  function yellowCardMoreInfoController () {}

}());
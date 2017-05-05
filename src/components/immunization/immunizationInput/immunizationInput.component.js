(function () {
'use strict';

  module.exports = {
    controller: immunizationInputController,
    templateUrl: './components/immunization/immunizationInput/immunizationInput.template.html',
    bindings: {
      displayMode : '<'
    },
  };

  immunizationInputController.$inject = [
    '$state',
    'moment', '$uibModal',
    'GroupsOf', 'ImmunizationRecordService',
    'Immunization'
  ];
  function immunizationInputController (
    $state,
    moment, $uibModal,
    GroupsOf, ImmunizationRecordService,
    Immunization
  ) {

    const GROUP_BY_TYPE = {
      DATE:   'date',
      AGENT:  'agent',
    };

    this.$onInit = () => {
      this.noImmunizations = false; //Flag to display error message

      this.patient = ImmunizationRecordService.getPatient();
      this.immunizationDisplayMode = this.displayMode;
      this.immunizationDisplayType = GROUP_BY_TYPE;
      this.immunizations = ImmunizationRecordService.getNewImmunizations();
      this.retrievedImmunizations = ImmunizationRecordService.getRetrievedImmunizations();

      this.immunizationsGroupedByDate = GroupsOf.immunization.byDate(this.immunizations);

      this.immunizationsGroupedByAgentTrade = GroupsOf.immunization.byAgentTrade(this.immunizations);


      let updateImmunizationGroups = () => {
        this.immunizationsGroupedByDate = GroupsOf.immunization.byDate(this.immunizations);
        this.immunizationsGroupedByAgentTrade = GroupsOf.immunization.byAgentTrade(this.immunizations);
      }

      let areSameImmunization = (left, right) => {
        let isDateCheckSafe = (!!left.date && !!right.date);
        let isSnomedCheckSafe = (!!left.agent.snomed && !!right.agent.snomed);

        return (
          isDateCheckSafe
          && new moment(left.date).format('YYYY-MM-DD') === new moment(right.date).format('YYYY-MM-DD')
          && isSnomedCheckSafe
          && left.agent.snomed === right.agent.snomed
        );
      }

      this.isDuplicateImmunization = (immunization) => {
        return (this.immunizations
               .concat(this.retrievedImmunizations)
               .filter(i => { return areSameImmunization(i, immunization) })
               .length > 0);
      }

      this.addImmunization = (immunization) => {
        this.immunizations.push(immunization);
        updateImmunizationGroups();
      };

      this.removeImmunization = (immunization) => {
        this.immunizations = this.immunizations
                             .filter(i => (
                                  i.date !== immunization.date
                               || i.agent.snomed !== immunization.agent.snomed
                               || i.trade.snomed !== immunization.trade.snomed
                             ));
        updateImmunizationGroups();
      };

      this.removeImmunizationGroupByDate = (immunization) => {
        this.immunizations = this.immunizations
                             .filter(i => i.date !== immunization.date);
       updateImmunizationGroups();
     };

      this.removeImmunizationGroupBySnomed = (immunization) => {
        this.immunizations = this.immunizations
                             .filter(i => (
                                  i.agent.snomed !== immunization.agent.snomed
                               || i.trade.snomed !== immunization.trade.snomed
                             ));
        updateImmunizationGroups();
      };


      /**
       * Validate that the user has entered at least one immunization, set immunizations to model
       * @returns {boolean}: Returns true if user has entered at least one immunization
       */
      this.validateImmunizations = () => {
        if (this.immunizations.length > 0) {
          ImmunizationRecordService.setNewImmunizations(this.immunizations);
          this.noImmunizations = false;
        }
        else {
          this.noImmunizations = true;
        }

        return (this.immunizations.length > 0);
      };

      let immunizationInputModal = null;
      this.openEditImmunizationModal = (immunization) => {
        let candidateImmunization = (!!immunization)
              ? immunization.clone()
              : new Immunization();

        // Close and nullify the old modal if another function left it open.
        if (!!immunizationInputModal) this.closeImmunizationInputModal();
        immunizationInputModal = null;

        immunizationInputModal = $uibModal
        .open({
          component: `editImmunization`,
          resolve: {
            immunization: () => candidateImmunization,
            onClose: () => () => { this.closeImmunizationInputModal.apply(this) },
            onSave: () => (newImmunization) => {
              this.removeImmunization.apply(this, [immunization]);
              this.addImmunization.apply(this, [newImmunization]);
              this.closeImmunizationInputModal.apply(this);
            },
            onIsDuplicateImmunization: () => (newImmunization) => {
              let isDuplicate = (areSameImmunization(newImmunization, immunization))
                        /* Ignore when new matches old, since old can't be a duplicate. */
                        ? false
                        /* Otherwise return the result applied to local this keyword. */
                        : this.isDuplicateImmunization.apply(this, [newImmunization])

              return isDuplicate;
            },
          },
          size: 'lg',
          backdrop: 'static',
        });
      };

      this.openNewImmunizationModal = () => {
        // Create an empy immunization, and populate just the date.
        let candidateImmunization = new Immunization();

        // Close and nullify the old modal if another function left it open.
        if (!!immunizationInputModal) this.closeImmunizationInputModal();
        immunizationInputModal = null;

        immunizationInputModal = $uibModal
        .open({
          component: `editImmunization`,
          resolve: {
            immunization: () => candidateImmunization,
            onClose: () => this.closeImmunizationInputModal,
            onSave: () => this.addImmunization,
            onIsDuplicateImmunization: () => this.isDuplicateImmunization,
          },
          size: 'lg',
          backdrop: 'static',
        });
      };

      this.openNewImmunizationSameDateModal = (immunization) => {
        // Create an empy immunization, and populate just the date.
        let candidateImmunization = new Immunization();
        if (!!immunization.date) candidateImmunization.date = immunization.date;

        // Close and nullify the old modal if another function left it open.
        if (!!immunizationInputModal) this.closeImmunizationInputModal();
        immunizationInputModal = null;

        immunizationInputModal = $uibModal
        .open({
          component: `editImmunization`,
          resolve: {
            immunization: () => candidateImmunization,
            onClose: () => this.closeImmunizationInputModal,
            onSave: () => this.addImmunization,
            onIsDuplicateImmunization: () => this.isDuplicateImmunization,
          },
          size: 'lg',
          backdrop: 'static',
        });
      };

      this.openNewImmunizationSameAgentModal = (immunization) => {
        // Create an empy immunization, and populate just the agent and trade.
        let candidateImmunization = new Immunization();
        if (!!immunization.agent) candidateImmunization.agent = immunization.agent.clone();
        if (!!immunization.trade) candidateImmunization.trade = immunization.trade.clone();

        // Close and nullify the old modal if another function left it open.
        if (!!immunizationInputModal) this.closeImmunizationInputModal();
        immunizationInputModal = null;

        immunizationInputModal = $uibModal
        .open({
          component: `editImmunization`,
          resolve: {
            immunization: () => candidateImmunization,
            onClose: () => this.closeImmunizationInputModal,
            onSave: () => this.addImmunization,
            onIsDuplicateImmunization: () => this.isDuplicateImmunization,
          },
          size: 'lg',
          backdrop: 'static',
        });
      };

      this.closeImmunizationInputModal = () => {
        if (!!immunizationInputModal) immunizationInputModal.close();
        immunizationInputModal = null;
      };
    };


    /**
     * Watch for input changes, mainly used for display mode (group by agents or date)
     * @param change: Change to watch
     */
    this.$onChanges = (changes) => {
      this.immunizationDisplayMode = changes.displayMode.currentValue;
    }
  }
}());

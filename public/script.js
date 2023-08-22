document.addEventListener('alpine:init', () => {
  Alpine.data('pricePlanWithAPIWidget', function () {
    return {
      pricePlans: [],
      planName: '',
      inputAction: '',
      message: '',
      errorMessage: '',
      newPlan: '',
      newPlanCall: '',
      newPlanSMS: '',
      planMessage: '',
      planDetails: '',
      newPricePlanError: '',
      updateMessage: '',
      updateDetails: '',
      updateError: '',
      updatePlan: '',
      updateSMSCost: '',
      updateCallCost: '',
      updateID: '',
      deleteMessage: '',
      deleteError: '',
      deletePlan: '',
      // clearTotalTable: '',
      totalHistory: [],
      clearMessage: '',
      open: false,
      show: false,

      refresh(){
        window.location.reload();
      },

      totalPhoneBill(planName, inputAction) {
        return axios
          .post('/api/phonebill/', {
            "plan_name": planName,
            "actions": inputAction
          }).then(result => {
            this.message = result.data.message;

            setTimeout(() => {
              this.message = '';
              window.location.reload();
            }, 3000);
          }).catch(error => {
            this.errorMessage = error.response.data.message;

            setTimeout(() => {
              this.errorMessage = '';
            }, 5000)
          });
      },

      createPricePlan(newPlan, newPlanSMS, newPlanCall) {
        axios
          .post('/api/price_plan/create', {
            "plan_name": newPlan,
            "sms_price": newPlanSMS,
            "call_price": newPlanCall
          }).then(result => {
            this.planMessage = result.data.message;
            this.planDetails = result.data.plan_details;

            setTimeout(() => {
              this.planMessage = '';
              this.planDetails = '';
            }, 3000)

          }).catch(error => {
            this.newPricePlanError = error.response.data.message;
          setTimeout(() => {
            this.newPricePlanError = '';
          }, 5000)
      })
        },

        updatePricePlan(updatePlan, updateSMSCost, updateCallCost, id){
          axios
                .post('/api/price_plan/update', {
                  "plan_name": updatePlan,
                  "sms_price": updateSMSCost,
                  "call_price": updateCallCost,
                  "id": id
                }).then(result => {
                  // console.log(result.data)
                  this.updateMessage = result.data.message;
                  this.updateDetails = result.data.updated_details
                }).catch(error => {
                  this.updateError = error.response.data.message;
                })

                setTimeout(() => {
                  this.updateDetails = '';
                  this.updateMessage = '';
                  this.updateError = '';
                }, 5000)
        },

        deletePricePlan(deletePlan) {
          axios
                .post('/api/price_plan/delete', {
                  "plan_name": deletePlan
                }).then(result => {
                  this.deleteMessage = result.data.message;
                }).catch(error => {
                  this.deleteError = error.response.data.message;
                })

                setTimeout(() => {
                  this.deleteMessage = '';
                  this.deleteError = '';
                }, 5000)
        },

        deleteTotals(clearTotalTable) {
          axios
                .post('/api/price_plan/clear_totals', {
                  "clear_totals": clearTotalTable
                }).then(result => {
                  this.clearMessage = result.data.message;
                })
                setTimeout(() => {
                  this.clearMessage = '';
                  window.location.reload();
                }, 2000)
        },

        totals(){
          axios
              .get('/api/price_plan/totals')
              .then(result => {
                console.log(result.data)
                this.totalHistory = result.data.totals;
              })
        },

      init() {
        axios.get('/api/price_plans/')
          .then(result => {
            this.pricePlans = result.data.plans;
          })
        this.totals();
      }
    }
  })
})
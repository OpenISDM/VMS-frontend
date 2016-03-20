(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('elementsProvider', elementsProvider);

  function elementsProvider() {
    var services = {
      getNewExperience: getNewExperience
    };

    function getNewExperience() {
      // var html = `<div class="experience-section">
      //   <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12">
      //           <div class="row">
      //               <label for="company" class="control-label col-md-4 col-lg-4">公司名稱</label>
      //               <div class="col-md-8 col-lg-8">
      //                   <input type="text" class="form-control" id="company" placeholder="公司名稱" ng-model="vm.experience.name" required>
      //               </div>
      //           </div>
      //       </div>
      //       <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12">
      //           <div class="row">
      //               <label for="job-title" class="control-label col-md-4 col-lg-4">工作職稱</label>
      //               <div class="col-md-8 col-lg-8">
      //                   <input type="text" class="form-control" id="job-title" placeholder="工作職稱" ng-model="vm.experience.job_title" required>
      //               </div>
      //           </div>
      //       </div>
      //       <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12">
      //           <div class="row">
      //               <label for="start-year" class="control-label col-md-4 col-lg-4">開始期間</label>
      //               <div class="col-md-8 col-lg-8">
      //                   <input type="text" name="start-years" minlength="6" class="form-control" id="start-year" placeholder="起始年" ng-model="vm.experience.start_year" required>
      //               </div>
      //           </div>
      //       </div>
      //       <div class="form-group col-md-6 col-lg-6 col-sm-6 col-xs-12">
      //           <div class="row">
      //               <label for="end-year" class="control-label col-md-4 col-lg-4">結束期間</label>
      //               <div class="col-md-8 col-lg-8">
      //                   <input type="text" name="end-year" minlength="6" class="form-control" id="end-year" placeholder="結束年" ng-model="vm.experience.end_year">
      //               </div>
      //           </div>
      //       </div>
      //       </div>`;
      // return angular.element(html);
    }
  }
})();

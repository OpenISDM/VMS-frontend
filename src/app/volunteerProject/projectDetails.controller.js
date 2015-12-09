(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('projectController', projectController);


    function projectController() {
        var vm = this;
        vm.projects = "Earthquake Hazards";
        vm.volunteers = "43";
        vm.manager = "IES,Academia Sinica";
        vm.managerMail = "ies@sinica.edu.tw";
        vm.createdDate = "2015/8/24";
        vm.description = "Earthquake hazards include any physical Earthquake hazards include any physical Earthquake hazards include any physical Earthquake hazards include any physical Earthquake hazards include any physical Earthquake hazards include any physical Earthquake hazards include any physical ";
        vm.link = "http://www.earth.sinica.edu.tw/earthquake-hazards";
        vm.position = "Teacher";
        vm.students = "15";
        vm.school = "Taipei Municipal Chenggong High School";
        vm.participated = {


            "process": [{
                "Date": "2015/07/03",
                "Name": "Earthquake hazards in Taipei",
                "Location": "Taipei City"
            }, {
                "Date": "2015/04/24",
                "Name": "Earthquake situations",
                "Location": "Xizhi District, New Taipei City"
            }]


        };
    }
})();

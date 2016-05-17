(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('site', {
        abstract: true,
        resolve: {
          authorize: function(auth, $log, $state) {
            $log.debug("=== authorize === ");
            var successCallback = function() {
              $log.debug('successCallback()');
            // $state.go(toState.name, toStateParams);
            };
            var failureCallback = function() {
              $log.debug("failureCallback()");
              // event.preventDefault();
              $state.go('login');
            };

            return auth.authorize()
              .then(successCallback)
              .catch(failureCallback);
          }
        }
      })
      .state('login', {
        parent: 'site',
        url: '/login',
        data: {
          needAuth: false
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
          }
        }
      })
      .state('registerPrivacy', {
        url: '/register-privacy',
        data: {
          needAuth: false
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/registerPrivacy/registerPrivacy.html',
            controller: 'RegisterPrivacyController',
            controllerAs: 'vm'
          }
        }
      })
      .state('register', {
        url: '/register',
        data: {
          needAuth: false
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/register/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
          }
        }
      })
      .state('registerSuccess', {
        parent: 'site',
        url: '/register/success?last_name&email', // NEED to add paramters
        params: {
          last_name: {
            value: "志工" // default value
          },
          email: {
            value: "註冊" // default value
          }
        },
        data: {
          needAuth: false
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/registerSuccess/registerSuccess.html',
            controller: 'RegisterSuccessController',
            controllerAs: 'vm'
          }
        }
      })
      .state('profile', {
        parent: 'site',
        url: '/profile',
        data: {
          needAuth: true
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/volunteerProfile/volunteerProfile.html',
            controller: 'ProfileController',
            controllerAs: 'vm'
          }
        }
      })
      .state('rootEditProfile', {
        parent: 'site',
        url: '/profile',
        views: {
          'mainContent@': {
            templateUrl: 'app/editVolunteerProfile/editVolunteerProfile.html'
          }
        }
      })
      .state('rootEditProfile.edit', {
        url: '/edit',
        data: {
          needAuth: true
        },
        views: {
          'profileContent': {
            templateUrl: 'app/editVolunteerProfile/aboutAndContact.html',
            controller: 'EditVolunteerProfileController',
            controllerAs: 'vm'
          }
        }
      })
      .state('rootEditProfile.aboutContact', {
        url: '/edit/about',
        data: {
          needAuth: true
        },
        views: {
          'profileContent': {
            templateUrl: 'app/editVolunteerProfile/aboutAndContact.html',
            controller: 'EditVolunteerProfileController',
            controllerAs: 'vm'
          }
        }
      })
      .state('rootEditProfile.experienceEducation', {
        url: '/edit/experience_education',
        data: {
          needAuth: true
        },
        views: {
          'profileContent': {
            templateUrl: 'app/volunteerExperienceEducation/experienceAndEducation.html',
          },
          'experienceContent@rootEditProfile.experienceEducation': {
            templateUrl: 'app/volunteerExperience/experience.html',
            controller: 'VolunteerExperienceController',
            controllerAs: 'vm'
          },
          'educationContent@rootEditProfile.experienceEducation': {
            templateUrl: 'app/volunteerEducation/education.html',
            controller: 'VolunteerEduationController',
            controllerAs: 'vm'
          }
        }
      })
      .state('rootEditProfile.skillEquipment', {
        url: '/edit/skill_equipment',
        data: {
          needAuth: true
        },
        views: {
          'profileContent': {
            templateUrl: 'app/editSkillEquipment/editSkillEquipment.html',
            controller: 'EditSkillEquipmentController',
            controllerAs: 'vm'
          }
        }
      })
      .state('emailVerification', {
        parent: 'site',
        url: '/email_verification?email&verification_token',
        params: {
          email: {
            value: ""
          },
          verification_token: {
            value: ""
          }
        },
        data: {
          needAuth: true
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/emailVerification/emailVerification.html',
            controller: 'EmailVerificationController',
            controllerAs: 'vm'
          }
        }
      })
      .state('introduction', {
        parent: 'site',
        url: '/',
        data: {
          needAuth: false
        },
        views: {
          'introductionContent@': {
            templateUrl: 'app/about/about.html',
            controller: 'AboutController',
            controllerAs: 'vm'
          }
        }
      })
      .state('copyright', {
        parent: 'site',
        url: '/copyright',
        data: {
          needAuth: false
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/copyrightPage/copyright.html'
          }
        }
      })
      .state('createProject', {
        parent: 'site',
        url: '/projects/create',
        data: {
          needAuth: true
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/project/createProject.html',
            controller: 'CreateProjectController',
            controllerAs: 'vm'
          }
        }
      })
      .state('managedProjectList', {
        parent: 'site',
        url: '/projects/show/managed',
        data: {
          needAuth: true
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/project/managedProjectList.html',
            controller: 'ManagedProjectListController',
            controllerAs: 'vm'
          }
        }
      })
      .state('attendingProjectList', {
        parent: 'site',
        url: '/projects/show/attending',
        data: {
          needAuth: true
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/project/attendingProjectList.html',
            controller: 'AttendingProjectListController',
            controllerAs: 'vm'
          }
        }
      })
      .state('editProject', {
        parent: 'site',
        url: '/projects/:id/edit',
        data: {
          needAuth: true
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/project/editProject.html',
            controller: 'EditProjectController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          project: function($stateParams, $log, vmsClient) {

            var id = $stateParams.id;
            var onSuccess = function(response) {
              return response.data;
            };

            return vmsClient.getProject(id).then(onSuccess);
          }
        }
      })
      .state('project', {
        parent: 'site',
        url: '/manage-project',
        views: {
          'mainContent@': {
            templateUrl: 'app/project/projectTplPage.html'
          }
        }
      })
      .state('project.show', {
        url: '/show/:projectId',
        data: {
          needAuth: true
        },
        views: {
          'panel': {
            templateUrl: 'app/project/projectPanel.html',
            controller: 'ProjectPanelController',
            controllerAs: 'vm'
          },
          'container': {
            templateUrl: 'app/project/projectDetailTpl.html',
            controller: 'MyProjectDetailController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          project: getProject,
          members: function($stateParams, vmsClient) {
            var id = $stateParams.projectId;
            var onSuccess = function(response) {
              return response.data;
            };

            return vmsClient.getProjectMembers(id)
              .then(onSuccess);
          }
        }
      })
      .state('project.edit', {
        url: '/edit/:projectId',
        data: {
          needAuth: true
        },
        views: {
          'panel': {
            templateUrl: 'app/project/projectPanel.html',
            controller: 'ProjectPanelController',
            controllerAs: 'vm'
          },
          'container': {
            templateUrl: 'app/project/editProjectTpl.html',
            controller: 'MyEditProjectController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          project: getProject,
          members: function($stateParams, vmsClient) {
            var id = $stateParams.projectId;
            var onSuccess = function(response) {
              return response.data;
            };

            return vmsClient.getProjectMembers(id)
              .then(onSuccess);
          }
        }
      })
      .state('project.manageCustomField', {
        url: '/:projectId/manage-custom-field',
        data: {
          needAuth: true
        },
        views: {
          'panel': {
            templateUrl: 'app/project/projectPanel.html',
            controller: 'ProjectPanelController',
            controllerAs: 'vm'
          },
          'container': {
            templateUrl: 'app/projectCustomFields/manageProjectCustomFieldsTpl.html',
            controller: 'MyManageProjectCustomFieldsController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          project: getProject,
          members: function($stateParams, vmsClient) {
            var id = $stateParams.projectId;
            var onSuccess = function(response) {
              return response.data;
            };

            return vmsClient.getProjectMembers(id)
              .then(onSuccess);
          }
        }
      })
      .state('project.manageMembers', {
        url: '/:projectId/manage-members',
        data: {
          needAuth: true
        },
        views: {
          'panel': {
            templateUrl: 'app/project/projectPanel.html',
            controller: 'ProjectPanelController',
            controllerAs: 'vm'
          },
          'container': {
            templateUrl: 'app/projectMember/manageProjectMemberList.html',
            controller: 'ManageProjectMemberController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          project: getProject,
          membersData: function($stateParams, vmsClient) {
            var id = $stateParams.projectId;
            var onSuccess = function(response) {
              return response.data;
            };

            return vmsClient.getAllMembersCustomFieldData(id)
              .then(onSuccess);
          }
        }
      })
      .state('showAllProjects', {
        parent: 'site',
        url: '/projects/show/all',
        data: {
          needAuth: true
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/project/showProjectList.html',
            controller: 'ShowProjectListController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          projectList: function(vmsClient, $log) {
            $log.debug("projectList resolve");

            var onSuccess = function(response) {
              $log.debug("projectList onSuccess()");
              return response.data;
            };
            var onError = function() {
              $log.debug("projectList onError()");
            };

            return vmsClient.getAllProjects()
              .then(onSuccess)
              .catch(onError);
          }
        }
      })
      .state('projectDetail', {
        parent: 'site',
        url: '/projects/:id/show',
        data: {
          needAuth: true
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/project/projectDetail.html',
            controller: 'ProjectDetailController',
            controllerAs: 'vm'
          }
        }
      })
      .state('manageProjectCustomField', {
        parent: 'site',
        url: '/projects/:projectId/custom_fields',
        data: {
          needAuth: true
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/projectCustomFields/manageProjectCustomFields.html',
            controller: 'ManageProjectCustomFieldsController',
            controllerAs: 'vm'
          }
        }
      })
      .state('fillProjectCustomFieldData', {
        parent: 'site',
        url: '/projects/:projectId/fill_custom_fields',
        data: {
          needAuth: true
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/projectCustomFields/fillCustomFields.html',
            controller: 'FillCustomFieldsController',
            controllerAs: 'vm'
          },
        }
      })
      .state('showAllMembersCustomFieldData', {
        parent: 'site',
        url: '/projects/:projectId/all_members_custom_fields_data',
        data: {
          needAuth: true
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/projectCustomFields/viewAllCustomFieldData.html',
            controller: 'ViewAllCustomFieldDataController',
            controllerAs: 'vm'
          },
        }
      });

    $urlRouterProvider.otherwise('/');

    function getProject($stateParams, $log, vmsClient) {
      var id = $stateParams.projectId;
      var onSuccess = function(response) {
        return response.data;
      };

      return vmsClient.getProject(id).then(onSuccess);
    }
  }

})();

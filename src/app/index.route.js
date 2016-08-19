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
          authorize: function(userAuthentication, $log, $state) {
            $log.debug("=== authorize === ");
            var successCallback = function() {
              $log.debug('successCallback()');
            };
            var failureCallback = function() {
              $log.debug("failureCallback()");
              $state.go('login');
            };

            return userAuthentication.authorize()
              .then(successCallback)
              .catch(failureCallback);
          }
        }
      })
      .state('user', {
        parent: 'site',
        url: '/user',
      })
      .state('login', {
        url: '/login',
        views: {
          'mainContent@': {
            templateUrl: 'app/user/login/userLogin.html',
            controller: 'UserLoginController',
            controllerAs: 'vm'
          }
        }
      })
      .state('registerPrivacy', {
        url: '/register-privacy',
        views: {
          'mainContent@': {
            templateUrl: 'app/user/register/registerPrivacy.html'
          }
        }
      })
      .state('register', {
        url: '/register',
        views: {
          'mainContent@': {
            templateUrl: 'app/user/register/userRegister.html',
            controller: 'UserRegisterController',
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
        views: {
          'mainContent@': {
            templateUrl: 'app/user/register/success/userRegisterSuccess.html',
            controller: 'UserRegisterSuccessController',
            controllerAs: 'vm'
          }
        }
      })
      .state('forgotPassword', {
        url: '/forgot-password',
        views: {
          'mainContent@': {
            templateUrl: 'app/user/forgotPassword/forgotPassword.html',
            controller: 'ForgotPasswordController',
            controllerAs: 'vm'
          }
        }
      })
      .state('resetPassword', {
        url: '/reset-password?token&email',
        params: {
          token: {
            value: "none"
          },
          email: {
            value: "none"
          }
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/user/resetPassword/resetPassword.html',
            controller: 'ResetPasswordController',
            controllerAs: 'vm'
          }
        }
      })
      .state('profile', {
        parent: 'site',
        url: '/profile',
        views: {
          'mainContent@': {
            templateUrl: 'app/user/profile/show/showUserProfile.html',
            controller: 'ShowUserProfileController',
            controllerAs: 'vm'
          }
        }
      })
      .state('rootEditProfile', {
        parent: 'site',
        url: '/profile',
        views: {
          'mainContent@': {
            templateUrl: 'app/user/profile/update/updateUserProfile.html'
          }
        }
      })
      .state('rootEditProfile.edit', {
        url: '/edit',
        views: {
          'profileContent': {
            templateUrl: 'app/user/profile/update/updateAboutAndContact.html',
            controller: 'UpdateUserProfileController',
            controllerAs: 'vm'
          }
        }
      })
      .state('rootEditProfile.aboutContact', {
        url: '/edit/about',
        views: {
          'profileContent': {
            templateUrl: 'app/user/profile/update/updateAboutAndContact.html',
            controller: 'UpdateUserProfileController',
            controllerAs: 'vm'
          }
        }
      })
      .state('rootEditProfile.experienceEducation', {
        url: '/edit/experience-education',
        views: {
          'profileContent': {
            templateUrl: 'app/user/experienceAndEducation.html',
          },
          'experienceContent@rootEditProfile.experienceEducation': {
            templateUrl: 'app/user/experience/userExperience.html',
            controller: 'UserExperienceController',
            controllerAs: 'vm'
          },
          'educationContent@rootEditProfile.experienceEducation': {
            templateUrl: 'app/user/education/userEducation.html',
            controller: 'UserEducationController',
            controllerAs: 'vm'
          }
        }
      })
      .state('rootEditProfile.skillEquipment', {
        url: '/edit/skill-equipment',
        views: {
          'profileContent': {
            templateUrl: 'app/user/skillEquipment/edit/userEditSkillEquipment.html',
            controller: 'UserEditSkillEquipmentController',
            controllerAs: 'vm'
          }
        }
      })
      .state('rootEditProfile.changePassword', {
        url: '/change-password',
        views: {
          'profileContent': {
            templateUrl: 'app/user/changePassword/changePassword.html',
            controller: 'ChangePasswordController',
            controllerAs: 'vm'
          }
        }
      })
      .state('emailVerification', {
        parent: 'site',
        url: '/email-verification?email&verification_token',
        params: {
          email: {
            value: ""
          },
          verification_token: {
            value: ""
          }
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/user/email/verify/verifyUserEmail.html',
            controller: 'VerifyUserEmailController',
            controllerAs: 'vm'
          }
        }
      })
      .state('introduction', {
        url: '/',
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
        views: {
          'mainContent@': {
            templateUrl: 'app/copyrightPage/copyright.html'
          }
        }
      })
      .state('createProject', {
        parent: 'site',
        url: '/projects/create',
        views: {
          'mainContent@': {
            templateUrl: 'app/project/create/createProject.html',
            controller: 'CreateProjectController',
            controllerAs: 'vm'
          }
        }
      })
      .state('managedProjectList', {
        parent: 'site',
        url: '/projects/show/managed',
        views: {
          'mainContent@': {
            templateUrl: 'app/project/list/managed/managedProjectList.html',
            controller: 'ManagedProjectListController',
            controllerAs: 'vm'
          }
        }
      })
      .state('attendingProjectList', {
        parent: 'site',
        url: '/projects/show/attending',
        views: {
          'mainContent@': {
            templateUrl: 'app/project/list/attending/attendingProjectList.html',
            controller: 'AttendingProjectListController',
            controllerAs: 'vm'
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
        views: {
          'panel': {
            templateUrl: 'app/project/panel/projectPanel.html',
            controller: 'ProjectPanelController',
            controllerAs: 'vm'
          },
          'container': {
            templateUrl: 'app/project/detail/managed/managedProjectDetail.html',
            controller: 'ManagedProjectDetailController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          projectData: getProject,
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
        views: {
          'panel': {
            templateUrl: 'app/project/panel/projectPanel.html',
            controller: 'ProjectPanelController',
            controllerAs: 'vm'
          },
          'container': {
            templateUrl: 'app/project/edit/editProject.html',
            controller: 'EditProjectController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          projectData: getProject,
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
        views: {
          'panel': {
            templateUrl: 'app/project/panel/projectPanel.html',
            controller: 'ProjectPanelController',
            controllerAs: 'vm'
          },
          'container': {
            templateUrl: 'app/project/customField/manage/manageProjectCustomField.html',
            controller: 'ManageProjectCustomFieldsController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          projectData: getProject,
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
        views: {
          'panel': {
            templateUrl: 'app/project/panel/projectPanel.html',
            controller: 'ProjectPanelController',
            controllerAs: 'vm'
          },
          'container': {
            templateUrl: 'app/project/member/list/projectMemberList.html',
            controller: 'ProjectMemberListController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          projectData: getProject,
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
        views: {
          'mainContent@': {
            templateUrl: 'app/project/list/all/allProjectList.html',
            controller: 'AllProjectListController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          projects: function(project, $log) {
            $log.debug("projectList resolve");

            var onSuccess = function(value) {
              $log.debug("projectList onSuccess()");
              $log.debug(value);

              return value.data;
            };
            var onError = function() {
              $log.debug("projectList onError()");
            };

            return project.getAll()
              .then(onSuccess)
              .catch(onError);
          }
        }
      })
      .state('projectDetail', {
        parent: 'site',
        url: '/projects/:id/show',
        views: {
          'mainContent@': {
            templateUrl: 'app/project/detail/public/projectDetail.html',
            controller: 'ProjectDetailController',
            controllerAs: 'vm'
          }
        }
      })
      .state('fillProjectCustomFieldData', {
        parent: 'site',
        url: '/projects/:projectId/fill-custom-fields',
        views: {
          'mainContent@': {
            templateUrl: 'app/project/customField/fill/fillCustomFields.html',
            controller: 'FillCustomFieldsController',
            controllerAs: 'vm'
          },
        }
      });

    $urlRouterProvider.otherwise('/');

    function getProject($stateParams, $log, project) {
      var id = $stateParams.projectId;
      var onSuccess = function(value) {
        return value;
      };

      return project.getById(id).then(onSuccess);
    }
  }

})();

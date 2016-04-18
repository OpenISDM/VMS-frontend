(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('site', {
        abstract: true
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
      .state('editProject', {
        parent: 'site',
        url: '/projects/edit?id',
        data: {
          needAuth: true
        },
        views: {
          'mainContent@': {
            templateUrl: 'app/project/editProject.html',
            controller: 'EditProjectController',
            controllerAs: 'vm'
          }
        }
      })
      .state('projectDetail', {
        parent: 'site',
        url: '/projects/show?id',
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
      });

    $urlRouterProvider.otherwise('/');
  }

})();

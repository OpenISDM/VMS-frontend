/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    //.constant('apiBaseUrl', 'https://vms-dev.herokuapp.com/api')
    .constant('apiBaseUrl', 'http://vms.app/api')
    .constant('apiKey', '581dba93a4dbafa42a682d36b015d8484622f8e3543623bec5a291f67f5ddff1')
    .constant('fieldName', {
      first_name: '姓氏',
      last_name: '名字',
      username: '帳號',
      password: '密碼',
      email: '電子郵件'
    })
    .constant('defaultAvatarPath', './assets/images/profile-default-avatar.png')
    .constant('LOCAL_STORAGE_CONFIG', {
      keys: {
        jwt: 'jwt_token',
        userName: 'user_name',
        lastName: 'last_name',
        role: 'role',
        avatarPath: 'avatar_path'
      }
    })
    .constant('BROADCAST_EVENTS_LIST', {
      AUTHENTICATED_SUCCESS_EVENT: '$authenticatedSuccessEvent',
      AUTHENTICATED_FAILURE_EVENT: '$authenticatedFailureEvent'
    })
    .constant('cities', [{
      id: 2,
      name_zh_tw: '臺北市'
    }, {
      id: 12,
      name_zh_tw: '新北市'
    }, {
      id: 22,
      name_zh_tw: '桃園縣'
    }, {
      id: 32,
      name_zh_tw: '臺中市'
    }, {
      id: 42,
      name_zh_tw: '高雄市'
    }, {
      id: 52,
      name_zh_tw: '臺南市'
    }, {
      id: 62,
      name_zh_tw: '新竹市'
    }, {
      id: 72,
      name_zh_tw: '嘉義市'
    }, {
      id: 82,
      name_zh_tw: '基隆市'
    }, {
      id: 92,
      name_zh_tw: '新竹市'
    }, {
      id: 102,
      name_zh_tw: '苗栗市'
    }, {
      id: 112,
      name_zh_tw: '彰化縣'
    }, {
      id: 122,
      name_zh_tw: '南投縣'
    }, {
      id: 132,
      name_zh_tw: '雲林縣'
    }, {
      id: 142,
      name_zh_tw: '嘉義縣'
    }, {
      id: 152,
      name_zh_tw: '屏東縣'
    }, {
      id: 162,
      name_zh_tw: '宜蘭縣'
    }, {
      id: 172,
      name_zh_tw: '花蓮縣'
    }, {
      id: 182,
      name_zh_tw: '臺東線'
    }, {
      id: 192,
      name_zh_tw: '金門縣'
    }, {
      id: 202,
      name_zh_tw: '連江縣'
    }, {
      id: 212,
      name_zh_tw: '澎湖縣'
    }

    ])
    .constant('PERMISSION_OPTIONS', [
      {
        name: 'project.permissions.choose_permission',
        value: ''
      },
      {
        name: 'project.permissions.all_users',
        value: 0
      },
      {
        name: 'project.permissions.registered_users',
        value: 1
      },
      {
        name: 'project.permissions.members',
        value: 2
      }
    ])
    .constant('EDUCATION_DEGREES', [
      {
        value: 1,
        text: 'education.degrees.elementary'
      },
      {
        value: 2,
        text: 'education.degrees.junior'
      },
      {
        value: 3,
        text: 'education.degrees.high'
      },
      {
        value: 4,
        text: 'education.degrees.bachelor'
      },
      {
        value: 5,
        text: 'education.degrees.master'
      },
      {
        value: 6,
        text: 'education.degrees.phd'
      }
    ])
    .constant('CUSTOM_FIELD_TYPES', [
      {
        label: '文字',
        typeName: 'text',
        value: 'TEXT'
      },
      {
        label: '單選按鈕',
        typeName: 'radioButton',
        value: 'RADIO_BUTTON'
      }
    ])
    .constant('FROALA_OPTIONS', {
      language: 'en_gb',
      heightMin: 200,
      heightMax: 500
    });

})();

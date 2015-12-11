(function() {
    'use strict';
    angular.module('vmsFrontend.mock', []).value('registerVolunteerPostMock', {
        'username': 'jimlin',
        'password': 'MYPASSW0RD',
        'first_name': 'Lin',
        'last_name': 'Jim',
        'birth_year': 2015,
        'gender': 'male',
        'city': {
            'id': 1,
            'name_zh_tw': '臺北市',
            'name_en': 'Taipei City'
        },
        'address': '128 Academia Road, Section 2, Nankang Dist.',
        'phone_number': '0912345678',
        'email': 'jimlin@citi.sinica.edu.tw',
        'emergency_contact': 'Jeremy Lin',
        'emergency_phone': '0919119119',
        'introduction': 'I\'m genius and work on Julia programming language.',
        'avatar': 'data:image/jpg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wB'
    }).value('registerSuccessfulResponseMock', {
        'href': 'https://vms.app/api/users/me',
        'username': 'jimlin',
        'auth_access_token': '56f4da226eb22caa0633023bfdd402658e5c6501c972e83bfb2866f2112b103f'
    }).value('unauthorizedHeaderMock', {
        'X-VMS-API-Key': '581dba93a4dbafa42a682d36b015d8484622f8e3543623bec5a291f67f5ddff1',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8'
    }).value('authorizedHeaderMock', {
        'X-VMS-API-Key': '581dba93a4dbafa42a682d36b015d8484622f8e3543623bec5a291f67f5ddff1',
        'Accept': 'application/json, text/plain, */*'
    }).value('volunteerProfileMock', {
        'username': 'jimlin',
        'first_name': 'Lin',
        'last_name': 'Jim',
        'birth_year': 2015,
        'gender': 'male',
        'city': {
            'id': 1,
            'name_zh_tw': '臺北市',
            'name_en': 'Taipei City'
        },
        'address': '128 Academia Road, Section 2, Nankang Dist.',
        'phone_number': '0912345678',
        'email': 'jimlin@citi.sinica.edu.tw',
        'emergency_contact': 'Jeremy Lin',
        'emergency_phone': '0919119119',
        'introduction': 'I’m a genius. I Work on Data science/analytics and have excellent skills with Matlab and Ruby programming. My hobbies is sporting.',
        'experiences': {
            'href': 'https://vms.app/api/users/me/experiences'
        },
        'educations': {
            'href': 'https://vms.app/api/users/me/educations'
        },
        'skills': [{
            'name': 'Swimming',
            'id': 82
        }, {
            'name': 'Programming',
            'id': 73
        }],
        'equipment': [{
            'name': 'Car',
            'id': 21
        }, {
            'name': 'Scooter',
            'id': 28
        }, {
            'name': 'Camera',
            'id': 43
        }],
        'projects': {
            'href': 'https://vms.app/api/users/me/projects'
        },
        'processes': {
            'participating_number': 3,
            'participated_number': 8,
            'href': 'https://vms.app/api/users/me/proccesses'
        },
        'avatar_url': 'https://vms.app/upload/image/avatar/jimlin_366b4c757bff8643b9f97441a974d94d42f5877b.jpeg',
        'updated_at': '2015-09-22 11:38:04',
        'created_at': '2015-09-20 22:30:47'
    });
})();
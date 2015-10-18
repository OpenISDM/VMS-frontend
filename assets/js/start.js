require.config({
    baseUrl: '/assets/js',
    paths: {
		'angular': '/bower_components/angular/angular',
		'angular-ui-router': 'angular-ui-router.min',
		'bootstrap': 'bootstrap',
		'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min'
    },
	shim: {
		'app': {
			deps: ['angular', 'angular-ui-router', 'bootstrap']
		},
		'angular-ui-router': {
			deps: ['angular']
		},
		'bootstrap': {
			deps: ['jquery']
		}
	}
});

require
(
    [
        'app'
    ],
    function(app)
    {
        angular.bootstrap(document, ['app']);
    }
);
app.controller('MainController', ['$scope', function($scope) {
    $scope.vms = 'VMS';
    $scope.login = 'Login';
    $scope.register = 'Register';
    $scope.privacy = 'Privacy (/prɪvəsi/ or /praɪvəsi/; from Latin: privatus) is the ability of an individual or group to seclude themselves, or information about themselves, and thereby express themselves selectively. The boundaries and content of what is considered private differ among cultures and individuals, but share common themes. When something is private to a person, it usually means that something is inherently special or sensitive to them. The domain of privacy partially overlaps security (confidentiality), which can include the concepts of appropriate use, as well as protection of information. Privacy may also take the form of bodily integrity.';
    $scope.user = 'jimlin@citi.sinica.edu.tw';
    $scope.reContent='To complete the register process, an email confirmation was sent to your email address, '+$scope.user+'. You can confirm your email address by clicking on the URL that was provided in the confirmation email sent you.';
    $scope.reContent1='If you have not received an email confirmation message be sent to your email address, please click the resent button to request a new one.';


}]);

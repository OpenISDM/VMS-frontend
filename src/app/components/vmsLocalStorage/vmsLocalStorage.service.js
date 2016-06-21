(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('vmsLocalStorage', vmsLocalStorage);

  /** @ngInject */
  function vmsLocalStorage($log, localStorageService, LOCAL_STORAGE_CONFIG) {
    var service = {
      setJwt: setJwt,
      getJwt: getJwt,
      removeJwt: removeJwt,
      jwtExists: jwtExists,
      setLastName: setLastName,
      getLastName: getLastName,
      removeLastName: removeLastName,
      setUsername: setUsername,
      getUsername: getUsername,
      removeUsername: removeUsername,
      getRole: getRole,
      setRole: setRole,
      removeRole: removeRole,
      getAvatarPath: getAvatarPath,
      setAvatarPath: setAvatarPath,
      removeAvatarPath: removeAvatarPath,
    };

    return service;

    function setJwt(token) {
      return localStorageService.set(LOCAL_STORAGE_CONFIG.keys.jwt, token);
    }

    function getJwt() {
      return localStorageService.get(LOCAL_STORAGE_CONFIG.keys.jwt);
    }

    function removeJwt() {
      return localStorageService.remove(LOCAL_STORAGE_CONFIG.keys.jwt);
    }

    function jwtExists() {
      return keyExists(LOCAL_STORAGE_CONFIG.keys.jwt);
    }

    function setLastName(lastName) {
      return localStorageService.set(LOCAL_STORAGE_CONFIG.keys.lastName, lastName);
    }

    function getLastName() {
      return localStorageService.get(LOCAL_STORAGE_CONFIG.keys.lastName);
    }

    function removeLastName() {
      return localStorageService.remove(LOCAL_STORAGE_CONFIG.keys.lastName);
    }

    function setUsername(userName) {
      return localStorageService.set(LOCAL_STORAGE_CONFIG.keys.userName, userName);
    }

    function getUsername() {
      return localStorageService.get(LOCAL_STORAGE_CONFIG.keys.userName);
    }

    function removeUsername() {
      return localStorageService.remove(LOCAL_STORAGE_CONFIG.keys.userName);
    }

    function setRole(token) {
      return localStorageService.set(LOCAL_STORAGE_CONFIG.keys.role, token);
    }

    function getRole() {
      return localStorageService.get(LOCAL_STORAGE_CONFIG.keys.role);
    }

    function removeRole() {
      return localStorageService.remove(LOCAL_STORAGE_CONFIG.keys.role);
    }

    function keyExists(keyName) {
      var lsKeys = localStorageService.keys();

      if (lsKeys.indexOf(keyName) != -1) {
        return true;
      }

      return false;
    }

    function getAvatarPath() {
      return localStorageService.get(LOCAL_STORAGE_CONFIG.keys.avatarPath);
    }

    function setAvatarPath(path) {
      return localStorageService.set(LOCAL_STORAGE_CONFIG.keys.avatarPath, path);
    }

    function removeAvatarPath() {
      return localStorageService.remove(LOCAL_STORAGE_CONFIG.keys.avatarPath);
    }
  }
})();

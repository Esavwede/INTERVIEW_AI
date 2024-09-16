var Http = (() => {

  // Setup request for json
  var getOptions = (verb, data) => {
    var options = {
      dataType: 'json',
      method: verb,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };
    if (!!data) {
      options.body = JSON.stringify(data);
    }
    return options;
  };

  // Set Http methods
  return {
    get: (path) => fetch(path, getOptions('GET')),
    post: (path, data) => fetch(path, getOptions('POST', data)),
    put: (path, data) => fetch(path, getOptions('PUT', data)),
    delete: (path) => fetch(path, getOptions('DELETE')),
  };
})();
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9f7c48c9-6e71-50e7-95a7-ee6cdedbf9d0")}catch(e){}}();
//# debugId=9f7c48c9-6e71-50e7-95a7-ee6cdedbf9d0

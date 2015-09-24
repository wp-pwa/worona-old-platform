// This function  is used by Worona.addAction and Worona.addFilter.
addHook = function (hookType, functionList, hookName, func, priority) {
  var priority = priority || 10;
  check(functionList, Object);
  check(hookName, String);
  check(priority, Number);

  // If the hookName list is not initializated yet, we create a new one.
  if (functionList[hookName] === undefined) {

    functionList[hookName] = { };

    // This is an array of priorities to know exactly which priorities have
    // function s. It's useful when the do_action of this hook is launched.
    functionList[hookName].priorities = [];
  }

  // Make it local.
  var hookNameList = functionList[hookName];

  // Now we create a new sublist for each priorities. This way, when we launch
  // the corresponding do_action we execute the registered function  starting
  // with priority[1] and finishing with priority[999] easily.
  if (hookNameList[priority] === undefined) {

    // First, we create the empty object.
    hookNameList[ priority ] = [];

    // Then, we add the new priority to the special "priorities" list. We
    // populate this list so when we launch the corresponding do_action we
    // know exactly which priorities have function s and we don't have to go
    // through each one of them.
    hookNameList.priorities[hookNameList.priorities.length] = priority;

    // Finally we them so we can use it later easily.
    var sortNumber = function (a,b) { return a - b; };
    hookNameList.priorities.sort(sortNumber);
  }

  // New we actually add the function  to the list, inside the priority.
  hookNameList[priority][hookNameList[priority].length] = func;
};

// This function  is used by Worona.doAction and Worona.doFilter.
doHook = function (hookType, functionList, hookName) {
  check(hookName, String);
  check(functionList, Object);

  // We are going to extract the arguments and convert them to an array.
  // Then, we are going to remove the first three arguments.
  var args = Array.prototype.slice.call(arguments);
  args.shift(); args.shift(); args.shift();

  if (functionList[hookName] !== undefined) {

    // Make it local.
    var hookNameList = functionList[hookName];
    var prioritiesList = hookNameList.priorities;

    // From priority 1, execute the registered function s.
    for (var i = 0; i < prioritiesList.length; i++) {

      // Localise the function s list
      var funcList = hookNameList[prioritiesList[i]];

      // Execute each function
      for (var j = 0; j < funcList.length; j++) {
        // If the function  is an array (instead of a function ) it means it is
        // inside of an instance (created with 'new') and we have to execute
        // using its own instance to get a correct binding.
        var func = funcList[j];
        if (Array.isArray(func)) {
          if (hookType === 'filter') {
            args[0] = func[0][func[1]].apply(func[0], args);
          } else {
            func[0][func[1]].apply(func[0], args);
          }
        } else {
          if (hookType === 'filter') {
            args[0] = func.apply(func, args);
          } else {
            func.apply(func, args);
          }
        }
      }
    }
  }

  if (hookType === 'filter') {
    return args[0];
  }
};

// This function  is used by Worona.removeAction and Worona.removeFilter.
removeHook = function (hookType, functionList, hookName, func) {

  // Make it local.
  var hookNameList = functionList[hookName];

  // Check if the hook exists.
  if (hookNameList !== undefined) {

    // Make it local.
    var prioritiesList = hookNameList.priorities;

    // Look for all the priorities.
    for (var i = 0; i < prioritiesList.length; i++) {

      // If it is an array, we have to match both the instance and the function
      // name.
      if (Array.isArray(func)) {
        for (var j = 0;
          j < functionList[hookName][prioritiesList[i]].length;
          j++) {
          var f = functionList[hookName][prioritiesList[i]][j];
          if ((Array.isArray(f)) && (f[0] === func[0]) && (f[1] === func[1])) {
            functionList[hookName][prioritiesList[i]].splice(j, 1);
          }
        }

      // If it is a function , just compare it.
      } else {
        functionList[hookName][prioritiesList[i]] = _.without(
          functionList[hookName][prioritiesList[i]],
          func
        );
      }
    }
  }
};

// Actions and Filters are quite similar so we have a general class called
// Hook. It contains three public methods, addHook, doHook and removeHook.
// They work very similar to how Wordpress hooks work.
class Hook {
  constructor() {
    // This list is used to save all the functions for each hook.
    // When a addHook is called, we create a new object inside
    // the list to store all the functions and their priorities.
    // Then, when doHook is called, we look for it in the list and
    // run all the functions inside, ordered by their priorities.
    this.list = { };
  }

  // This function  works like Wordpress "add_action()" function. In the first
  // parameter it receives the name of the hook (which is a string). The second
  // parameter is the function. It can be only a function or a function inside
  // a class, like className.funcName(). In that case, we have to use an array:
  // [className, 'funcName']. The third parameter is the priority, which is
  // optional. Smaller priorities get executed first, starting with 1.
  addHook(hookName, func, priority = 10) {
    var self = this;
    check(hookName, String);
    check(priority, Number);

    // If the hookName list is not initializated yet, we create a new one.
    if (self.list[hookName] === undefined) {

      // Initialize the object.
      self.list[hookName] = { };

      // This is an array of priorities to know exactly which priorities have
      // function s. It's useful when the do_action of this hook is launched.
      self.list[hookName].priorities = [];
    }

    // Make it local.
    var hookNameList = self.list[hookName];

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

      // Finally we sort them so we can use it later easily.
      var sortNumber = function (a,b) { return a - b; };
      hookNameList.priorities.sort(sortNumber);
    }

    // New we actually add the function  to the list, inside the priority.
    hookNameList[priority][hookNameList[priority].length] = func;
  }

  // This function works like the "do_action" Wordpress function. The first
  // parameter should be boolean indication if it should pass the filtered
  // variable to the next function or not. Used to differenciate Actions from
  // Filters. The second parameter is a string with the hook name. The other
  // parameters (any number of them) are passed to the executed function as
  // arguments.
  doHook(filteredVar, hookName, ...args) {
    var self = this;
    check(hookName, String);

    // Check if the hookName list has been initializated.
    if (self.list[hookName] !== undefined) {

      // Make it local.
      var hookNameList = self.list[hookName];
      var prioritiesList = self.list[hookName].priorities;

      // From priority 1, execute the registered functions.
      for (var i = 0; i < prioritiesList.length; i++) {

        // Localise the functions list
        var funcList = hookNameList[prioritiesList[i]];

        // Execute each function
        for (var j = 0; j < funcList.length; j++) {
          // If the function  is an array (instead of a function ) it means it's
          // inside of an instance (created with 'new') and we have to execute
          // using its own instance to get a correct binding.
          var func = funcList[j];
          if (Array.isArray(func)) {
            if (filteredVar) {
              args[0] = func[0][func[1]].apply(func[0], args);
            } else {
              func[0][func[1]].apply(func[0], args);
            }
          } else {
            if (filteredVar) {
              args[0] = func.apply(func, args);
            } else {
              func.apply(func, args);
            }
          }
        }
      }
    }

    // Finally we return the first argument. This is used later by the Filter
    // class, which returns it as well. Actions do not return.
    return args[0];
  }

  // Remove a function previously added with addHook. The func parameter can
  // be a function or an array of instance and function name.
  removeHook(hookName, func) {
    var self = this;
    check(hookName, String);

    // Make it local.
    var hookNameList = self.list[hookName];

    // Check if the hook exists.
    if (hookNameList !== undefined) {

      // Make it local.
      var prioritiesList = hookNameList.priorities;

      // Look for all the priorities.
      for (var i = 0; i < prioritiesList.length; i++) {

        // If it's an array, we have to match both the instance and the function
        // name.
        if (Array.isArray(func)) {
          for (var j = 0;
            j < self.list[hookName][prioritiesList[i]].length;
            j++) {
            var f = self.list[hookName][prioritiesList[i]][j];
            if (
              (Array.isArray(f)) &&
              (f[0] === func[0]) &&
              (f[1] === func[1]))
            {
              self.list[hookName][prioritiesList[i]].splice(j, 1);
            }
          }

        // If it is a function , just compare it.
        } else {
          self.list[hookName][prioritiesList[i]] = _.without(
            self.list[hookName][prioritiesList[i]],
            func
          );
        }
      }
    }
  }

  // This function is used internally only for testing purposes.
  _reset() {
    var self = this;
    self.list = { };
  }
}

// The Action class is just a Hook class which doesn't return anything in its
// doHook method.
class Action extends Hook {
  doHook(hookName, ...args) {
    // Actions should not return the result. First paremeter is false to avoid
    // using the filtered variable.
    super.doHook(false, hookName, ...args);
  }
}

// The Filter class is just a Hook class which returns the first arg in its
// doHook method.
class Filter extends Hook {
  // Filters should return the filtered variable. The first paremeter is true
  // to use the first argument of the hook as the filtered variable.
  doHook(hookName, ...args) {
    return super.doHook(true, hookName, ...args);
  }
}

// We create a new class and asign its methods to the final Worona namespace.
// We have to bind them so they use the correct class this, instead of Worona's.
var action = new Action();
Worona.doAction      = action.doHook.bind(action);
Worona.addAction     = action.addHook.bind(action);
Worona.removeAction  = action.removeHook.bind(action);
Worona._resetActions = action._reset.bind(action);

// We create a new class and asign its methods to the final Worona namespace.
// We have to bind them so they use the correct class this, instead of Worona's.
var filter = new Filter();
Worona.doFilter      = filter.doHook.bind(filter);
Worona.addFilter     = filter.addHook.bind(filter);
Worona.removeFilter  = filter.removeHook.bind(filter);
Worona._resetFilters = filter._reset.bind(filter);

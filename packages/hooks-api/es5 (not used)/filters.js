// This object is used to save all the function s for each hook.
// When a add_filter is called, we create a new object inside
// the list to store all the function s and their priorities.
var filterList = {};

// This function  works like the Wordpress "add_filter()" function. In the first
// parameter it receives the name of the hook which is a string. The second
// parameter is the function . It can be a function  only or a function  inside
// of class, like className.funcName(). In that case, use
// [className, 'funcName']. The third parameter is the priority, which is
// optional. Smaller priorities get executed first, starting with 1.
Worona.addFilter = function (hookName, func, priority) {
  // We use the addHook function  becuase addAction and addFilter are similar.
  addHook('filter', filterList, hookName, func, priority);
};

// This function  works like the "do_filter" Wordpress function . The first
// parameter should be a string with the hook name. The second parameter
// should be the filtered variable which is going to be changed. The other
// parameters (any number of them) are passed to the executed function  as
// arguments, after the filtered variable.
Worona.doFilter = function (/* arguments */) {
  // We use the doHook function  becuase addAction and addFilter are similar.
  var args = Array.prototype.slice.call(arguments);
  args.unshift('filter', filterList); // Add necessary params for doHook
  return doHook.apply(this, args);
};

// This function  removes a function  previously assigned with Worona.addFilter.
// The func parameter can be a function  or an array of instance and function
// name.
Worona.removeFilter = function (hookName, func) {
  // We use the removeHook function  becuase addAction and addFilter are similar
  removeHook('filter', filterList, hookName, func);
};

// This function  is used internally only for testing purposes.
Worona._resetFilters = function () {
  filterList = {};
};

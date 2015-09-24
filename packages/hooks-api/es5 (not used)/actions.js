// This object is used to save all the function s for each hook.
// When a add_action is called, we create a new object inside
// the list to store all the function s and their priorities.
var actionList = {};

// This function  works like the Wordpress "add_action()" function. In the first
// parameter it receives the name of the hook which is a string. The second
// parameter is the function . It can be a function  only or a function  inside
// of class, like className.funcName(). In that case, use
// [className, 'funcName']. The third parameter is the priority, which is
// optional. Smaller priorities get executed first, starting with 1.
Worona.addAction = function (hookName, func, priority) {
  // We use the addHook function  becuase addAction and addFilter are similar.
  addHook('action', actionList, hookName, func, priority);
};

// This function  works like the "do_action" Wordpress function . The first
// parameter should be a string with the hook name. The other parameters (any
// number of them) are passed to the executed function  as arguments.
Worona.doAction = function (/*arguments*/) {
  // We use the doHook function  becuase addAction and addFilter are similar.
  var args = Array.prototype.slice.call(arguments);
  args.unshift('action', actionList); // Add necessary params for doHook
  doHook.apply(this, args);
};

// This function  removes a function  previously assigned with Worona.addAction.
// The func parameter can be a function  or an array of instance and function
// name.
Worona.removeAction = function (hookName, func) {
  // We use the removeHook function  becuase addAction and addFilter are similar
  removeHook('action', actionList, hookName, func);
};

// This function  is used internally only for testing purposes.
Worona._resetActions = function () {
  actionList = {};
};

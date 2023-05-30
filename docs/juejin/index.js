function myInstanceof (obj, constructor) {
  while (obj !== null) {
    if (obj.__proto__ === constructor.prototype) {
      return true
    }
    obj = obj.__proto__
  }
}
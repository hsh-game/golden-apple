(function (arr, arrProto, someArr) {
  arrProto.includes || (arrProto.includes = function (searchElement, fromIndex) {
    let a = this;
    fromIndex = parseInt(fromIndex) || 0;
    if (!a.length || fromIndex < 0) return false;

    for (let i = fromIndex; i < a.length; i++)
      if (
        a[i] === searchElement ||
        (
          //check NaN
          typeof a[i] == 'number' &&
          typeof searchElement == 'number' &&
          isNaN(a[i]) && isNaN(searchElement)
        )
      ) return true;

    return false;
  });

  arrProto.primary = function (getPrimaryKeyFunction) {
    let returnArr = [],
        that = this;

    getPrimaryKeyFunction =
        getPrimaryKeyFunction ||
        function (e) { return e };

    for (let i = 0; i < that.length; i++) {
      if (-1 === returnArr.findIndex(function (elem) {
        return getPrimaryKeyFunction(elem) === getPrimaryKeyFunction(that[i]);
      })) returnArr.push(that[i]);
    }

    return returnArr;
  }

  arrProto.apart = function (elemLength) {
    let result = Array(Math.floor(this.length / elemLength) + 1)
                 .fill().map(function () {
                   return [];
                 });
    this.forEach(function (elem, idx) {
      result[Math.floor(idx / elemLength)].push(elem);
    });
    return result.filter(function (arr) {
      return arr.length;
    });
  }
})(Array, Array.prototype, []);

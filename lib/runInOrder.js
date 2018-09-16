const runInOrder = (fn, arguments = []) => {

  return new Promise((resolve, reject) => {

    const recur = () => {
      
      const thisArgument = arguments.shift();

      const continueRun = () => {

        if (arguments.length > 0) {
          recur();
        } else {
          resolve();
        }

      };

      const fnReturned = fn(thisArgument);

      if (fnReturned instanceof Promise) {

        fnReturned
          .then(continueRun)
          .catch((err) => reject(err));

      } else {

        continueRun();

      }

    };

    recur();

  });

};

module.exports = runInOrder;

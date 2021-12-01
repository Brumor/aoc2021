// add logic to get input as an array of intergers

depthsValues.reduce((acc, el, index, arr) => el > arr[index - 1] ? acc + 1 : acc, 0)
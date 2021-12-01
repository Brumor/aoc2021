// add logic to get input as an array of intergers

const threeSum = depthsValues.reduce((acc, el, index, arr) => el && arr[index + 1] && arr[index + 2] ? [...acc, el + arr[index + 1] + arr[index + 2]] : acc, [])
threeSum.reduce((acc, el, index, arr) => el > arr[index - 1] ? acc + 1 : acc, 0)
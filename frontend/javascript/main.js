function isEqual(pixelArt, pixelPic) {
  //Get the value type
  let type = Object.prototype.toString.call(pixelArt);

  //If the two objects are not the same type return false
  if (type !== Object.prototype.toString.call(pixelPic)) {
    console.log('Not same type');
    return false;
  }

  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) {
    console.log('Not an array or object');
    return false;
  }

  // Compare the length of the length of the two items
  let pixelArtLen =
    type === '[object Array]' ? pixelArt.length : Object.keys(pixelArt).length;
  let pixelPicLen =
    type === '[object Array]' ? pixelPic.length : Object.keys(pixelPic).length;
  if (pixelArtLen !== pixelPicLen) {
    console.log('Not same length');
    return false;
  }

  // Compare two items
  function compare(item1, item2) {
    // Get the object type
    let itemType = Object.prototype.toString.call(item1);

    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) {
        console.log('Not equal items');
        return false;
      }
    }
    // Otherwise, do a simple comparison
    else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) {
        console.log('Items are not the same type');
        return false;
      }

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
    }
  }

  // Compare properties
  if (type === '[object Array]') {
    for (let i = 0; i < pixelArtLen; i++) {
      if (compare(pixelArt[i], pixelPic[i]) === false) return false;
    }
  } else {
    for (let key in pixelArt) {
      if (pixelArt.hasOwnProperty(key)) {
        if (compare(pixelArt[key], pixelPic[key]) === false) return false;
      }
    }
  }

  //If nothing failed, return true
  return true;
}

function comparePixelArts(arrOne, arrTwo) {
  if (JSON.stringify(arrOne) === JSON.stringify(arrTwo)) {
    return true;
  } else {
    return false;
  }
}
const createdPixels = [
  ['b', 'y', 'b'],
  ['r', 'g', 'b'],
  ['b', 'r', 'r'],
];

const originalPixels = [
  ['b', 'y', 'b'],
  ['r', 'g', 'b'],
  ['b', 'r', 'r'],
];

// console.log(isEqual(createdPixels, originalPixels));
console.log(comparePixelArts(createdPixels, originalPixels));

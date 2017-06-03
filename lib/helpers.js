/** ------------------------- Helper Methods ------------------------------- **/

/**
* isArray - check if valid array
*
* @param  {Array} a the value to test
* @return {boolean}  returns true if parameter is an array, false otherwise
*/
function isArray(a) {
  return Array.isArray(a)
}

/**
 * isString - check if valid string
 *
 * @param  {String} s the value to test
 * @return {boolean}  returns true if parameter is string, false otherwise
 */
function isString(s) {
  return (typeof s === 'string' || s instanceof String);
}

/**
* isString - check if valid string
*
* @param  {boolean} b the value to test
* @return {boolean}  returns true if parameter is boolean, false otherwise
*/
function isBoolean(b) {
  return typeof(b) === "boolean";
}

/**
 * isString - check if valid string
 *
 * @param  {String} s the value to test
 * @return {boolean}  returns true if parameter is string, false otherwise
 */
function isString(s) {
  return (typeof s === 'string' || s instanceof String);
}


/**
 * isJsonObject - description
 *
 * @param  {type} obj description
 * @return {type}     description
 */
function isJsonObject(obj) {
  return isJsonString(JSON.stringify(obj));
}


/**
 * isJsonString - check if string is valid json
 *
 * @param  {String} jsonString the string to check
 * @return {boolean}           true if valid json, false otherwise
 */
function isJsonString(jsonString) {
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return true;
        }
    }
    catch (e) { }

    return false;
};



/**
 * removeHashtags - remove hashtags from a string
 *
 * @param  {String} text the string to remove hashtags from
 * @return {String}      the string with hashtags removed
 */
removeHashtags = function(text) {
  var regexp = new RegExp('#([^\\s]*)','g');
  return text.replace(regexp, '').trim();
}

/**
 * findHashtags - extract all hashtags from a string
 *
 * @param  {String} text the text to extract hashtags from
 * @return {list}   list of hashtags found in string
 */
findHashtags = function(text) {
  var regexp = /(\s|^)\#\w\w+\b/gm
  text = text + " ";
  result = text.match(regexp);
  if (result) {
    result = result.map(function(s){ return s.trim().substring(1);});
    return result;
  } else {
    return [];
  }
}


module.exports.isArray = isArray;
module.exports.isString = isString;
module.exports.isBoolean = isBoolean;
module.exports.isJsonObject = isJsonObject;
module.exports.isJsonString = isJsonString;
module.exports.removeHashtags = removeHashtags;
module.exports.findHashtags   = findHashtags;

// Return array of string values, or NULL if CSV string not well formed.
module.exports = (text) => {
  const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(text)) return null;
  const fields = [];                     // Initialize array to receive values.

  text.replace(re_value, // "Walk" the string using replace with callback.
      function(m0, m1, m2, m3) {
          // Remove backslash from \' in single quoted values.
          if      (m1 !== undefined) fields.push(m1.replace(/\\'/g, "'"));
          // Remove backslash from \" in double quoted values.  Preserve double quotes
          else if (m2 !== undefined) fields.push('"' + m2.replace(/\\"/g, '"') + '"');
          else if (m3 !== undefined) fields.push(m3);
          return ''; // Return empty string.
      });
  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) fields.push('');
  return fields;
};
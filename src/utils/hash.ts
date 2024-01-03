export function encodeString(inputString: string) {
  let encodedString = '';
  for (let i = 0; i < inputString.length; i++) {
    const charCode = inputString.charCodeAt(i);
    const encodedCharCode = charCode + 1;
    const encodedChar = String.fromCharCode(encodedCharCode);
    encodedString += encodedChar;
  }
  return encodedString;
}

export function decodeString(encodedString: string) {
  let decodedString = '';
  for (let i = 0; i < encodedString.length; i++) {
    const encodedCharCode = encodedString.charCodeAt(i);
    const decodedCharCode = encodedCharCode - 1;
    const decodedChar = String.fromCharCode(decodedCharCode);
    decodedString += decodedChar;
  }
  return decodedString;
}

let length = 10;
let char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let num = "0123456789";
let allChar = num + char;

exports.getTrancactionReference = () => {
  let result = "";
  for(var i = 0; i < length; i++)
    result += allChar.charAt(Math.floor(Math.random() * allChar.length));
  return { result: result };
}


/*
let length = 10;
let result = "";
const char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const num = "0123456789";
const allChar = num + char;
    
    for(var i = 0; i < length; i++)
        result += allChar.charAt(Math.floor(Math.random() * allChar.length));

exports.getTrancactionReference = {
       // console.log("first acc: " + result);
        result: result
}
*/
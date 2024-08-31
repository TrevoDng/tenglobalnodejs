
const length = 10;

let result = "";
const num = "0123456789";
const allChar = num;
    
    for(var i = 0; i < length; i++)
        result += allChar.charAt(Math.floor(Math.random() * allChar.length));

exports.getAcountNumber = {
       // console.log("first acc: " + result);
        result: result
}
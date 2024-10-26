function igpayAtinlay(str) {

  var wordArray = str.split(" ");
  var returnArray = [];

  for (var i = 0; i < wordArray.length; i++) {
      var word = wordArray[i];
      var beginning = "";
      
      if (/[aeiouAEIOU]/.test(word.charAt(0))) {
          returnArray.push(word + "way");
          continue;
      }

      for (var ii = 0; ii < word.length; ii++) {
          if (/[aeiouAEIOU]/.test(word.charAt(ii))) {
              returnArray.push(word.slice(ii) + beginning + "ay");
              break;
          } else {
              beginning += word.charAt(ii);
          }
      }
  }

  return returnArray.join(" ");
}

function displayPigLatin() {
  const textInput = document.getElementById("textInput").value;
  const resultElement = document.getElementById("result");

  const pigLatinText = igpayAtinlay(textInput);
  
  resultElement.textContent = pigLatinText;
}

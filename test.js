let interval = null;
console.log(document.fonts.check('12px "BalooThambi2"'))
function fontLoadListener() {
  var hasLoaded = false
      /* 
       * If anything goes wrong with the font loading API, 
       * just change styles to the web font without handling FOUT 
       */
      try {
        hasLoaded = document.fonts.check('12px "BalooThambi2"')
      } catch (error) {
        console.info(`document.fonts API error: ${error}`)
        fontLoadedSuccess();
        return
      }
  
  if(hasLoaded) {
    fontLoadedSuccess();
  }
}

function fontLoadedSuccess() {
  if(interval) {
    clearInterval(interval);
  }
  
  document.getElementById("js-font-status").innerHTML = "finished loading";
  document.getElementsByTagName("body")[0].classList.add("wf-merriweather--loaded");
}

/*
 * We'll start the interval on button click so 
 * we don't run it all the time in the background 
 * when no loading is happening. 
 * You can uncomment the line on your project.
 *
 * interval = setInterval(fontLoadListener, 500)
 */

/* Button click code - not relevant to the example */

function loadFontCSS() {
  interval = setInterval(fontLoadListener, 500)
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href="https://fonts.googleapis.com/css2?family=Baloo+Thambi+2:wght@500&display=swap";
  
  document.getElementsByTagName("head")[0].appendChild(link);
}
console.log(document.fonts.check('12px "BalooThambi2"'))

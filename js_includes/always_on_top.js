/**
 * Purpose/Usage
 * The following snippet ensures that select pages are always loaded "on top",
 * i.e. that the browser window displays the page from the top as opposed to
 * wherever the previous page left off.
 * To implement this snippet, the user needs to ensure that the html code for the
 * relevant pages contains a div with the id "top".
 *
 * Rationale/Implementation/Rant
 * This solution is hacky because the initial setup is a bit unusual: technically
 * no new webpages are loaded from the server. Instead, each new page is generated
 * by modifying the html of the previous page. This makes the more conventional
 * checks for element loading/readiness somewhat useless. The existing solution,
 * however, (checking for image loading) was also hacky (e.what if the user
 * wanted to have a page with no images to scroll up?). In order to improve this,
 * I added an event listener to the document that reacts whenever the document
 * gets modified. This, I think, is both faster than waiting for images to load
 * and also conceptually better fits "the point" of the whole operation.
 * When the listener gets triggered
 *
 * Issues
 * This gets triggered many times during page change because the changes happen
 * incrementally and this event listener is low-level enough to pick up on that.
 * This also means that sometimes the function gets triggered before the previous
 * page had been fully replaced; it picks up on the "top" div and moves the browser
 * window to the top. This can lead to undesirable behavior as
 */
$(document).bind("DOMSubtreeModified", function() {
  // first check if the document contains any elements with the id "top"
  // this is an indication that it is necessary to scroll up
  if ($('#top').length != 0) {
    // if we do need to ensure the page displays on top we check if we are already there
    if ($(document).scrollTop() != 0) {
      // if we aren't at the top, move window to there
      $(document).scrollTop(0)
    }
    console.log('ran')
  }
})

$(() => {

  //Counts how many characters the user is allowed to type
  $('#tweet-text').keyup(function() {
    const characterCount = $(this).val().length;
    const $counter = $(this).parent().children('div').children('.counter');
    const counter = $counter.val();
    const characterLeft = 140 - characterCount;
    $counter.text(characterLeft);

    if (characterLeft < 0) {
      $counter.addClass('negative-counter');
    } else {
      $counter.removeClass('negative-counter');
    }
  });

  // Makes scroll to top button appear when user scrolls
  $(document).scroll(function() {
    const scrollLocation = $(this).scrollTop();

    if (scrollLocation !== 0) {
      $('#top-button').fadeIn(800);
    } else {
      $('#top-button').fadeOut(800);
    }
  });

  // Brings user back to top of page
  $('#top-button').click(function() {
    window.scrollTo(0, 0);
    $('#tweet-text').focus();
  });
});
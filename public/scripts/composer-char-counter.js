$(() => {
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
});
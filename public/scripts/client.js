$(() => {
  
  const createTweetElement = (tweetData) => {
    const $tweet = $(`<article class="tweet"></article>`);
    const $header = $(`<header></header>`);
    const $div = $('<div></div>');
    const $avatar = $('<img>').attr('src', tweetData.user.avatars);
    const $username = $('<p></p>').text(`${tweetData.user.name}`);
    const $handle = $('<p></p>').text(`${tweetData.user.handle}`);
    const $content = $('<p></p>').text(`${tweetData.content.text}`);
    const $footer = $(`<footer></footer>`);
    const $date = $('<p></p>').text(`${moment(tweetData.created_at).fromNow()}`);
    const $icons = $('<img>').attr('src', '/images/icons.png');

    $div.append($avatar, $username);
    $header.append($div, $handle);
    $footer.append($date, $icons);
    $tweet.append($header, $content, $footer);
    
    return $tweet;
  };

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = () => {
    $.get('/tweets')
    .then((response) => {
      $('#tweets-container').empty();
      renderTweets(response);
    });
  };

  // Assertion error onloadwff.js:71 when pressing enter in textarea
  $('form').submit(function(event) {
    event.preventDefault();

    const $text = $(this).children('textarea');
    const serializedText = $text.serialize();
    const textValue = $text.val();
    const isCharacterCountValid = $text.val().length <= 140;
    const $emptyFieldError = $($('.new-tweet').children()[0]);
    const $tooLongError = $($('.new-tweet').children()[1]);

    $emptyFieldError.slideUp(800);
    $tooLongError.slideUp(800);

    if (textValue && isCharacterCountValid) {
      $.post('/tweets', serializedText)
      .then(() => {
        $text.val('');
        $('.counter').text('140');
        loadTweets();
      });
    } else if (!textValue) {
      $emptyFieldError.slideDown(800);
    } else if (!isCharacterCountValid) {
      $tooLongError.slideDown(800);
    }
  });

  $('#compose').click(function () {
      $('.new-tweet').slideToggle(800);
  }); 

  loadTweets();
});
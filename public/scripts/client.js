$(() => {
  
  // This creates a new tweet article node when given a corresponding object
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

  //Form did not submit on enter (how dare you) so I did it myself
  $('#tweet-text').keydown(function(event) {
    if (event.which === 13) {
      $(this).blur();
      $(this).parent().children('div').children('button').focus().click();
    }
  });

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

    //Validation checks for empty field and character count
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

  //Toggles the compose tweet area to be visible or hidden
  $('#compose').click(function () {
      $('.new-tweet').slideToggle(800);
      $('#tweet-text').focus();
  }); 

  loadTweets();
});
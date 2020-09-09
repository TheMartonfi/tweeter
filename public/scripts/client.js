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

  $('form').submit(function(event) {
    event.preventDefault();

    const $text = $(this).children('textarea');
    const serializedText = $text.serialize();

    $.post('/tweets', serializedText)
    .then(() => {
      loadTweets();
    });
  });

  loadTweets();
});
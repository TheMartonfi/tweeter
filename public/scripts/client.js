$(() => {

  const tweets = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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
      $('#tweets-container').append(createTweetElement(tweet));
    }
  };
  renderTweets(tweets);
});
const posts = [
  {
    "post": "So excited to welcome everyone to this year's #emberfest. I hope you love Amsterdam!",
    "date": "October 11, 2018",
    "source": null,
    "user_id": "19"
  },

  {
    "post": "Come hang out with all #emberliners at the Ember Berlin meetup next time you're in town.",
    "date": "October 8, 2018",
    "source": null,
    "user_id": "9"
  },

  {
    "post": "Ember CLI is really cool. Autodiscovery of dependencies and no config: React community could learn from this.",
    "date": "July 12, 2016",
    "source": "https://twitter.com/dan_abramov/status/752863664290553856",
    "user_id": "62"
  },

  {
    "post": "And in most cases you probably don’t need an observer anyways, so try to think how you would solve the same thing without one!",
    "date": "December 10, 2015",
    "source": "https://twitter.com/chadian/status/675019538631557120",
    "user_id": "63"
  },

  {
    "post": "So excited for the 5th EmberConf in Portland",
    "date": "March 13, 2018",
    "source": null,
    "user_id": "0"
  },

  {
    "post": "Welcome everyone to beautiful Portland, Oregon for EmberConf! Don't forget to tweet your feet #pdx.",
    "date": "March 13, 2018",
    "source": null,
    "user_id": "29"
  },

  {
    "post": "Just released @babeljs 6 live on the stage of @embercamp. Get it while it's hot! <a href=\"https://t.co/Rbl888659U\">https://babeljs.io/blog/2015/10/29/6.0.0/…</a>",
    "date": "October 29, 2015",
    "source": "https://twitter.com/sebmck/status/659791814212378624",
    "user_id": "65"
  },

  {
    "post": "Nerd crush. #embercamp <img src=\"https://pbs.twimg.com/media/CnKRO_OWYAA4iry.jpg\">",
    "date": "July 12, 2016",
    "source": "https://twitter.com/tomdale/status/752823781857558528",
    "user_id": "64"
  }

].map((post, i) => {
  post.id = i.toString();
  return post;
}).sort((a, b) => new Date(a.date).getTime() < new Date(b.date).getTime())

module.exports = { posts };

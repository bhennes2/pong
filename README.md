# Pong

An app to track games and scoring for the LaunchPad Lab Pong Table. [Check out the live app](http://www.rocketpaddle.com).

![A little inspiration](http://f.cl.ly/items/0J3X2k0i0u3b0F2T3W33/inspiration.jpg "A little inspiration")

Launched 5/21/2015

## Running locally

`npm start`

## Deployment

**Staging**

`npm run-script deploy:staging`

**Production**

`npm run-script deploy:production`

## Database Maintainance

From your project directory, assuming you are logged into Meteor, you can connect to the mongo instance of your choice using

`meteor mongo <host>`

For example, to connect to the staging database:

`meteor mongo staging.rocketpaddle.com`

This shell allows some javascript, for example, I updated the win percentage for all players with:
```
db.players.find().snapshot().forEach(
  function(p) {
    if (p.wins === 0 && p.losses === 0) {
      p.winPct = -1;
    } else {
      p.winPct = p.wins / (p.wins + p.losses);
    }
    db.players.save(p);
  }
)
```

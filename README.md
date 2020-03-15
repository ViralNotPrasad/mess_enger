## 0] Templates (Blaze), Iron Router and Publications and Subscriptions
* `meteor add iron:router` - Routing specifically designed for Meteor

## 1] Routes and Templates
* created routes for Home & Channel in `lib/route.js`
* create a template for 'home-listing channels' & 'channel listing messages'

## 2] Add Channels
* created Mongo Collection to store Channels
* Added form to input more channels to `home.html`
* Created event handler in `home.js` to insert channels
channel switching, creating links from home (`home.html`) to channels
showing channels in home and in a channel itself using Template helpers (`home.js`)

## 3] Add Messages
* created Mongo Collection to store Messages
* Added form to input more messsages to `channel.html`
* Created event handler in `channel.js` to insert messages (on Enter keypress)
-- added helper to find messages for a given `channel.js`

> add markdown to enable rendering of newlines and paragraphs (more) in messages
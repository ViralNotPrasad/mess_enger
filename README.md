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

> add markdown to enable rendering of newlines and paragraphs (more) in messages - `meteor add markdown`
> `meteor add accounts-password`, `meteor add accounts-ui` 
> `meteor add momentjs:moment` , meteor remove momentjs:moment - [STDERR] TinyTest not found, `meteor add momentjs:moment@=2.10.3`

## 4] Add Users and Timestamp
* reference to the user on a message 
* show the username, use a helper
* print time only if not today, use `moment.js` to localize time to tday/yday

> `meteor remove auto publish`
* created publication for 'channels' and publish them all
* created publication for 'messages' for a channel
* creating publication for 'usernames' that we just created 
* subscribed to each of them as required

> `meteor remove insecure`
* allow only logged in users to input msgs or channels

## 5] Adding layouts
* addded a  layout with a yield for header, body, footer and aside
* set it as default in the router
* Move content into yields, i.e. the title should go in the header, messageForm in the footer and channels in aside.

## 6] Adding SASS Styles
* `meteor add fourseven:scss`
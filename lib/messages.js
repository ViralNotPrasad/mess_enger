Messages = new Mongo.Collection('messages');

// publication for 'messages' for a channel
if (Meteor.isServer)
{
    Meteor.publish
    (
        'messages',
        function(channel)
        {
            return Messages.find({_channel : channel});
        }
    );
}
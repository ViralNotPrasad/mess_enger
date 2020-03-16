Channels = new Mongo.Collection('channels');

// publication for 'channels'
if (Meteor.isServer)
{
    Meteor.publish
    (
        'channels', 
        function()
        {
            return Channels.find();
        }
    );
}
Channels = new Mongo.Collection('channels');

// publication for 'channels'
if (Meteor.isServer)
{
    // Allowing only logged in users to insert channels
    Channels.allow
    (
        {
            insert: function(userId,doc)
            {
                if (userId)
                {
                    return true;
                }
            }
        }
    );
    // Allowing only logged in users to insert channels

    Meteor.publish
    (
        'channels', 
        function()
        {
            return Channels.find();
        }
    );
}
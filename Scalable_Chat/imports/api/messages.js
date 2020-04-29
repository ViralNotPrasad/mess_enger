import { Mongo } from 'meteor/mongo';

export const Messages = new Mongo.Collection('messages');

// publication for 'messages' for a channel
if (Meteor.isServer)
{

    //allow only logged in users to insert messages
    Messages.allow
    (
        {
            insert : function (userId,doc)
            {
                if (userId && doc._channel)
                {
                    return true;
                }
            }
        }
    );
    //allow only logged in users to insert messages

    Meteor.publish
    (
        'messages',
        function(channel)
        {
            return Messages.find({_channel : channel});
        }
    );
}
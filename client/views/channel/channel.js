
Template.channel.helpers
(
    {
        // helper that finds messages for the current channel
        messages : function()
        {
            var _id = Router.current().params._id;
            return Messages.find({_channel : _id});
        },

        // showing the channel name in the channel
        channel : function()
        {
            var _id = Router.current().params._id;
            return ChannelSplitterNode.findOne({_id : _id});
        }
    }
);

// event handler that insert a message on enter (but not when shift is pressed) 
// make sure the message has a reference to the current channel too
Template.channel.events
(
    {
        'keyup textarea' : function(event, instance)
        {
            // checking if event was pressed without the shift 
            if (event.keyCode == 13 & !event.shift)
            {
                var _id = Router.current().params._id;
                var value = instance.find('textarea').value;
                
                // Markdown requires double spaces at the end of the line to force line-breaks.
                value = value.replace("\n", "  \n");
                
                instance.find('textarea').value = '';
                Messages.insert({channel : _id, message : value});
            }
        }
    }
)
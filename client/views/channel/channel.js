
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
        },

        // helper to show the username
        user : function() 
        {
            return Meteor.users.findOne({_id: this._userId});
        },

        time : function() 
        {
            return moment(this.timestamp).format('h:mm a');
        },

        // helper to tell what date it is, 
        // but only print the date if it differs from the last printed date 
        //(use Template.instance())
        date : function(messages)
        {
            var dateNow = moment(this.timestamp).calendar();
            var instance = Template.instance();
            if (!instance.date || instance.date != dateNow)
            {
                return instance.date = dateNow;
            }
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
                Messages.insert({_channel : _id, message : value, _userId : Meteor.userId(), timestamp: new Date() });
                // reference to the user on a message
            }
        }
    }
)
// subscription to the 'messages' publication in the channel template
Template.channel.onCreated
(
    function()
    {
        var instance = this;

        // Listen for changes to reactive variables (such as Router.current()).
        instance.autorun
        (
            function()
            {
                var channel = Router.current().params._id;
                instance.subscribe('messages',channel);
            }
        );
    }
);

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
// Template.channel.events

// We've moved the message form into a new template 
// (messageForm), now we need to move the event map.
msg_old = "";
current_id =  null;
Template.messageForm.events
(
    {
        
        'keyup textarea' : function(event, instance)
        {
            if(msg_old == "")
            {
                var _id = Router.current().params._id;
                var value = instance.find('textarea').value;
                    
                // Markdown requires double spaces at the end of the line to force line-breaks.
                value = value.replace("\n", "  \n");
                    
                // instance.find('textarea').value = '';
                Messages.insert({_channel : _id, message : value, _userId : Meteor.userId(), timestamp: new Date() },
                function(err, docsInserted){ 
                    // debugger;
                    console.log(docsInserted); 
                    alert(docsInserted); 
                    current_id = docsInserted;
                });
                msg_old = value;
                console.log("if 1 - -"+msg_old);
            }
            else
            {
                console.log("else - 1     "+msg_old);
                var _id = Router.current().params._id;
                var value = instance.find('textarea').value;
                    
                // Markdown requires double spaces at the end of the line to force line-breaks.
                value = value.replace("\n", "  \n");
               /* if( current_id == null) // befroe getting the _ID
                {
                    stringSoFar = ? 
                }
                else{*/
                // instance.find('textarea').value = '';

                // https://docs.mongodb.com/manual/reference/operator/update/
                    Messages.update({_id : current_id},{$set:{message : value, timestamp: new Date()}});
            }
                    msg_old = value;

                if (event.keyCode == 13 & !event.shift)
                {
                    instance.find('textarea').value = '';
                    msg_old = ""; 
                }

            }
        }
);
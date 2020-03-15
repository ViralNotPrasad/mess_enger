//helper to show (find) all channels in home 
Template.home.helpers
(
    {
        channels : function()
        {
            return Channels.find();
        }
    }
);

// event handler to insert a channel
Template.home.events
(
    {
        'submit form' : function(event, instance)
        {
            event.preventDefault();
            var name = instance.find('input').value;
            instance.find('input').value = '';

            Channels.insert({name : name});
        }
    }
);
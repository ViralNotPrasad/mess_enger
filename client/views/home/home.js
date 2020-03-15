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
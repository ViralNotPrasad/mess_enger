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
                instance.subscribe('allUserNames');
            }
        );
    }
);

//Modify this to include words
function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
};

Template.channel.helpers
(
    {
        // helper that finds messages for the current channel
        messages : function()
        {
            console.log('34');
            window.scrollTo(0,document.body.scrollHeight);
            // $('.list-group li:last-child')[0].scrollIntoView();
            var _id = Router.current().params._id;
            // $('#div_messages').scrollTop($('#div_messages').prop('scrollHeight'));
            
            // return Messages.find({_channel : _id}, {sort: { last_update_time: 1 }});
            return Messages.find({_channel : _id}, {sort: { timestamp: 1 }});
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
            var _id = Router.current().params._id;
            console.log("inside the user function:" + this._userId);
            console.log("msg:" + this.message);
            //console.log(Messages.find({_channel : _id}));
            //return Meteor.users.findOne({_id: this._userId});
            return this.username;
            // return Meteor.users.find();
        },

        time : function() 
        {
            return moment(this.timestamp).format('h:mm a');
        },

        // autoscorll function, return empty content, called everytime a new msg is loaded
        auto_s : function() 
        {
            console.log("auto_s logged");
            if($('.list-group li').length != 0 )
            {
                $('.list-group li:last-child')[0].scrollIntoView();
            }
            return null;
        },

        // helper to tell what date it is, 
        // but only print the date if it differs from the last printed date 
        //(use Template.instance())
        date : function(messages)
        {
            var dateNow = moment(this.timestamp).calendar();
            console.log();
            var instance = Template.instance();
            if (!instance.date || instance.date != dateNow)
            {
                // return instance.date = dateNow;
                return instance.date = getFormattedDate();
                // add code to convert from GMT to EST 
                // add code to conver to words
                // add code to reduce redundancy
            }
        }
    }
);
// event handler that insert a message on enter (but not when shift is pressed) 
// make sure the message has a reference to the current channel too
// Template.channel.events 
// moved the message form into a new template 
// (messageForm), now we need to move the event map.

var msg_id = ""; // = "";
var val = ""; // = "";

Template.messageForm.events
(
    {
        
        'keyup textarea' : function(event, instance)
        {
            event.preventDefault();

            var _id = Router.current().params._id;
            var time = new Date();
            var value = instance.find('textarea').value;
            value = value.replace("\n", "  \n"); // Markdown requires double spaces at the end of the line to force line-breaks.
            window.scrollTo(0,document.body.scrollHeight);
            if($('.list-group li').length != 0 )
            {
                $('.list-group li:last-child')[0].scrollIntoView();
            }
            if (msg_id === "" && val === "")
            {
                try 
                {
                    msg_id = Messages.insert({_channel : _id, message : value, _userId : Meteor.userId(), 
                        username:Meteor.users.findOne({_id:  Meteor.userId()}).username, timestamp: time, last_update_time: time});
                    val = value;
                } 
                catch (error)
                {
                    alert("this did not work");
                }
            }
            else //(id !== null && val != null)
            {
                
                try 
                {
                    // Messages.update(id, {$set : {message : value, timestamp : time}});
                    // console.log("value -"+ value);

                    if(value === "")
                    {
                        Messages.remove(msg_id);
                        msg_id = '';
                        val = '';
                    }
                    else
                        var change = Messages.update({_id : msg_id}, {$set : {message : value, last_update_time: time}});
                    console.log("2) OK: return = " + change);
                    //Msg.update returns the 'number' 0 inside of boo,
                    //Not sure if _id should be returned, but this is incorrect for sure
                }
                catch (error)
                {
                    alert("this did not work -- 2");
                }
            }
            
            if (event.keyCode == 13 & !event.shift) // checking if event was pressed without the shift 
            {
                instance.find('textarea').value = '';
                msg_id = '';
                val = '';
                
            }
            
            /*
            if (event.keyCode == 13 & !event.shift) // checking if event was pressed without the shift 
            {
                var _id = Router.current().params._id;
                var value = instance.find('textarea').value;
                value = value.replace("\n", "  \n");// Markdown requires double spaces at the end of the line to force line-breaks.

                instance.find('textarea').value = '';
                
                var time = new Date();
                try {
                    const id = Messages.insert({_channel : _id, message : value, _userId : Meteor.userId(), 
                        username:Meteor.users.findOne({_id:  Meteor.userId()}).username, timestamp: time });
                    console.log(typeof(id) + " - " + id);
                    console.log("okay this works");
                } catch (error){
                    alert("this did not work");
                }

                // Messages.insert({_channel : _id, message : value, _userId : Meteor.userId(), 
                //     username:Meteor.users.findOne({_id:  Meteor.userId()}).username, timestamp: time }).then(function(id){
                //         console.log(id);
                //     }).catch(function(error){
                //         alert("MAY NEED METEOR _ NEW")
                //     });
                // console.log(Messages.findOne({timestamp:time}));
                // var arrar = Messages.findOne({timestamp:time}).fetch();
                // console.log(arrar);

                window.scrollTo(0,document.body.scrollHeight);
                instance.find('textarea').value = '';
            }*/
        }
    }
);
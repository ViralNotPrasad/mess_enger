import { Template } from 'meteor/templating';
import './channel.html'; 
import '../api/channels.js'; 
import '../api/messages.js'; 
import '../api/accounts.js'; 

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
            var _id = Router.current().params._id;
            // $('#div_messages').scrollTop($('#div_messages').prop('scrollHeight'));
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

// KEYSTROKE LEVEL CODE, UNCOMMENT AND DEBUG LATER
// msg_old = "";
// current_id =  null;
// KEYSTROKE LEVEL CODE, UNCOMMENT AND DEBUG LATER



Template.messageForm.events
(
    {
        'keyup textarea' : function(event, instance)
        {
            event.preventDefault();

            // checking if event was pressed without the shift 
            if (event.keyCode == 13 & !event.shift)
            {
                var _id = Router.current().params._id;
                var value = instance.find('textarea').value;
                // Markdown requires double spaces at the end of the line to force line-breaks.
                // if (value !== null)
                // {
                    value = value.replace("\n", "  \n");
                    instance.find('textarea').value = '';
                    Messages.insert({_channel : _id, message : value, _userId : Meteor.userId(), username:Meteor.users.findOne({_id:  Meteor.userId()}).username, timestamp: new Date() });
                    // Messages.insert({_channel : _id, message : value, _name : Meteor.userId(), timestamp: new Date() });
                    //Todo - replace

                    window.scrollTo(0,document.body.scrollHeight);
                    // var objDiv = document.getElementById("div_messages");
                    // objDiv.scrollTop = objDiv.scrollHeight;

                // }
                instance.find('textarea').value = '';
                // console.log("new msg, so i should auto scroll")
                // $('#div_messages').scrollTop($('#div_messages').prop('scrollHeight'));

                
            }
        }
    }
);
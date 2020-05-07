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

const id = null;
var val = null;

Template.messageForm.events
(
    {
        'keyup textarea' : function(event, instance)
        {
            event.preventDefault();
            console.log(" enter "+id);

            var _id = Router.current().params._id;
            var value = instance.find('textarea').value;
            var time = new Date();
            // Markdown requires double spaces at the end of the line to force line-breaks.

            // the user has just started typing, 
            //a new entry for the message is yet to be made in the collection
            if (id == null && val == "")
            {
                console.log ("If(1)");
                value = value.replace("\n", "  \n");
                //Collection.Insert 
                //Update ID so that you can reference the msg later;
                try 
                {
                    const id = Messages.insert({_channel : _id, message : value, _userId : Meteor.userId(), 
                        username:Meteor.users.findOne({_id:  Meteor.userId()}).username, timestamp: time });
                        // console.log("1) " + id);
                    val = value;
                } 
                catch (error)
                {
                    alert("this did not work");
                }
            }
            else (id != null && val != "")
            {
                console.log("If(2)");
                value = value.replace("\n", "  \n");
                //Collection.Update
                //Use id 
                try 
                {
                    Messages.update({_id : id}, {$set : {message : value, timestamp : time}});
                    
                    // ({_channel : _id, message : value, _userId : Meteor.userId(), 
                        // username:Meteor.users.findOne({_id:  Meteor.userId()}).username, timestamp: time });
                    console.log("2) OK");
                } 
                catch (error)
                {
                    alert("this did not work -- 2");
                }
            }
            // else if()
            // {}
            // else
            // {
            //     alert("check all");
            // }

            if (event.keyCode == 13 & !event.shift) // checking if event was pressed without the shift 
            {
                id = null;
                instance.find('textarea').value = '';
            }
            window.scrollTo(0,document.body.scrollHeight);
            //MAKE ID and VAL null again omg!

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
import {
    Meteor
} from 'meteor/meteor';
import {
    Template
} from 'meteor/templating';
import './home.html';
import {
    Channels
} from '../api/channels.js';



// subscription to the 'channels' publication in the home template
Template.home.onCreated(
    function () {
        this.subscribe('channels');
        this.subscribe('allUserNames');
    }
);

//helper to show (find) all channels in home 
Template.home.helpers({
    channels: function () {
        return Channels.find();
    }
});

// event handler to insert a channel
Template.channelForm.events({
    'submit form': function (event, instance) {
        event.preventDefault();
        var name = instance.find('input').value;
        instance.find('input').value = '';
        if (name != '')
            Channels.insert({
                name: name
            });
    }
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});
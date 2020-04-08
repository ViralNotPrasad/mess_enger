// Adding a username field to the sign-up form
//So that we can publish usernames
if (Meteor.isClient)
{
    Accounts.ui.config
    (
        {
            passwordSignupFields : 'USERNAME_AND_EMAIL'
        }
    );
}
// Creating publication for 'allUserNames'
// but only sending the username to logged in users
else
{

    Meteor.publish
    (
        "allUserNames",
        function()
        {
            // if (this.UserId)
            // {
            return Meteor.users.find({},{fields : {'profile.username': 1}});
            // }
        }
    );
}
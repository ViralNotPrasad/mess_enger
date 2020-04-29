if (Meteor.isServer) {

    Meteor.publish(
        "allUserNames",
        function () {
            // if (this.UserId)
            // {
            return Meteor.users.find({}, {
                fields: {
                    'profile.username': 1
                }
            });
            // }
        }
    );

}
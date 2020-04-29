// Default Layout for header, body, footer, etc

Router.configure({
    layoutTemplate: 'layout'
  });

// home route
Router.map
(
    function ()
    {
        this.route
        (
            'home',
            {
                path : '/'
            }
        );

        this.route
        (
            'channel',
            {
                path : '/channel/:_id'
            }
        );
    }
);


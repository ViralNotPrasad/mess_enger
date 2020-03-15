// localize it to show 'today' or 'yesterday'
moment.locale
(
    'en', 
    {
        calendar: 
        {
            lastDay : '[Yesterday]',
            sameDay : '[Today]',
            sameElse : 'MMMM Do, YYYY'
        }
    }
);
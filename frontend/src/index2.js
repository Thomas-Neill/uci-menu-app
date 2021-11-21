$('.basicAutoComplete').autoComplete({
    events: {
        searchPost: function (x) {
            return x['body'];
        }
    }
});
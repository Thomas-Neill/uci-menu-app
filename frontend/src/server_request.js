async function json_search(event)
{
    event.preventDefault();
    const searchdata = new FormData();
    console.log("asdas")
    // keyword: keyword used for searching
    // vegan: whether or not you are vegan
    // calories
    // vegetarian
    // types

    const response = await fetch("http://127.0.0.1:5000/",{
        method: 'GET',
    });
    const return_json = await response.text();
    console.log(return_json)
    var mealdata = new Vue({
        el: '#meal_data',
        data: {
            message: return_json
        }
        });
};



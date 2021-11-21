function get_type()
{
    types_return = []
    if (document.getElementById("type1").checked == true){ types_return.push("Entree")}
    if (document.getElementById("type2").checked == true){ types_return.push("Sides")}
    if (document.getElementById("type3").checked == true){ types_return.push("Pizza")}
    if (document.getElementById("type4").checked == true){ types_return.push("Dessert")}
    if (document.getElementById("type5").checked == true){types_return.push("Deli")}
    return types_return.join(",");
}
function get_meal(){
    meal_return = []
    if (document.getElementById("meal1").checked == true){ meal_return.push("Breakfast")}
    if (document.getElementById("meal2").checked == true){ meal_return.push("Brunch")}
    if (document.getElementById("meal3").checked == true){ meal_return.push("Lunch")}
    if (document.getElementById("meal4").checked == true){ meal_return.push("Dinner")}
    return meal_return.join(",")
}
async function json_search(event)
{
    event.preventDefault();
    const searchdata = new FormData();
    // keyword: keyword used for searching
    // vegan: whether or not you are vegan
    // calories
    // vegetarian
    // types
    searchdata.append('keyword',document.getElementById('keyword').value)
    searchdata.append('vegan',(document.getElementById('vegan').checked).toString())
    if (document.getElementById('calories').value == ""){
        searchdata.append('calories',"-1")
    }
    else{
        searchdata.append('calories',"document.getElementById('calories').value")
    }
    searchdata.append('vegetarian',(document.getElementById('vegetarian').checked).toString())
    searchdata.append('types',get_type())
    searchdata.append('place',"")
    searchdata.append('meal',get_meal())
    /*
    searchdata.append('keyword',"eggs")
    searchdata.append('vegan',"false")
    searchdata.append('calories',"-1")
    searchdata.append('vegetarian',"false")
    searchdata.append('types',"")
    searchdata.append('place',"")
    searchdata.append('meal',"breakfast")
    */
    const params = new URLSearchParams(searchdata);
    console.log("http://127.0.0.1:5000/search?" + params)
    const response = await fetch("http://127.0.0.1:5000/search?" + params.toString(),{
        method: 'GET',
    });
    const return_json = JSON.parse(await response.text())["body"];
    console.log(return_json.toString())
    var mealdata = new Vue({
        el: '#meal_data',
        data: {
            meals: return_json
        }
        });
};
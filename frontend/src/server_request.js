

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


    const response = await fetch("/search/?" + params.toString(),{
        method: 'GET',
    });

    const return_json = JSON.parse(await response.text())["body"];

    const breakfast_meal = []
    const lunch_meal = []
    const brunch_meal = []
    const dinner_meal = []

    for( let  i = 0; i < return_json.length; ++i)
    {
        if(return_json[i].meal = "breakfast")
        {
            breakfast_meal.push(return_json[i])
        }

        if(return_json[i].meal = "lunch")
        {
            lunch_meal.push(return_json[i])
        }

        if(return_json[i].meal = "brunch")
        {
            brunch_meal.push(return_json[i])
        }

        if(return_json[i].meal = "dinner")
        {
            dinner_meal.push(return_json[i])
        }
    }

    var mealdata = new Vue({
        el: '#meal_data',
        data: {
            meals: return_json,
            breakfast: breakfast_meal,
            lunch: lunch_meal,
            brunch: brunch_meal,
            dinner: dinner_meal
        }
        })

    document.getElementById("meal_data").style.display = "block"
};

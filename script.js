



// function to search for and display 
function searchRecipes(searchItem) {
    $('.displayList').empty();
    $('.displayList').removeClass('hide')
    $('.jumbotron-fluid').remove();
    var foodItem = encodeURI(searchItem);
    var recipesURL = 'https://api.spoonacular.com/recipes/search?query=' + foodItem + '&instructionsRequired=true&apiKey=aefe372afd5741e38ead99f0c5a57515'
    $.ajax({
        url: recipesURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response)
        var resultArray = response.results;
        console.log(resultArray)
        for (i = 0; i < resultArray.length; i++) {

            var newItem = $('<li>');
            newItem.addClass('resultItem')
            var newItemTitle = $('<h2>');
            newItemTitle.addClass('resultItemTitle');
            newItemTitle.attr('data-id', resultArray[i].id)
            newItemTitle.text(resultArray[i].title)
            var newItemImage = $('<img>');
            newItemImage.addClass('resultItemImg');
            newItemImage.attr('src', 'https://spoonacular.com/recipeImages/' + resultArray[i].id + '-312x150.jpg')
            var newItemDescription = $('<p>')
            newItemDescription.addClass('resultItemDescription')
            newItemDescription.html('Ready in: ' + resultArray[i].readyInMinutes + '<br><br> Serves: ' + resultArray[i].servings);
            var newItemBtn = $('<button>');
            newItemBtn.addClass('btn btn-primary recipeBtn').html('Get Recipe').attr('data-id', resultArray[i].id)
            newItem.append(newItemTitle, newItemImage, newItemDescription, newItemBtn);
            newItem.appendTo($('.displayList'))
        }
        $('.recipeBtn').on('click', function () {
            console.log($(this).attr('data-id'));
            loadRecipe($(this).attr('data-id'))
        })
    })

}

function loadRecipe(id) {
    $('.displayList').addClass('hide');
    $('.recipeInformation').removeClass('hide')
    var recipeInfoURL = 'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=aefe372afd5741e38ead99f0c5a57515'

    $.ajax({
        url: recipeInfoURL,
        method: 'GET'
    }).then(function (recipeResponse) {
        console.log(recipeResponse);
        $('.recipeInstructionsImage').attr('src', recipeResponse.image)

        for (i = 0; i < recipeResponse.extendedIngredients.length; i++) {
            $('<li>').addClass('ingredient').html(recipeResponse.extendedIngredients[i].name + '(' + recipeResponse.extendedIngredients[i].amount + ' ' + recipeResponse.extendedIngredients[i].unit + ')').appendTo($('.ingredientList'))
        }

        for (i = 0; i < recipeResponse.analyzedInstructions[0].steps.length; i++) {
            $('<li>').addClass('recipeInstructionSteps').html(recipeResponse.analyzedInstructions[0].steps[i].step).appendTo($('.recipeInstructions'))
        }
    })
}

// on form submission
$('.form-inline').on('submit', function (event) {
    event.preventDefault();
    var searchInput = $('.form-control').val();
    searchRecipes(searchInput);

})


$('.categoryItem').on('click', function () {
    var categoryItem = $(this).html();
    searchRecipes(categoryItem)
})


// function change(){
//     $('.jumbotron').css('background-image', 'url(images/2.jpeg)')
// }

// change()
var dayImage = {
    Monday:'images/meatless_monday2.jpg',
    Tuesday: 'images/taco_tuesday.jpg',
    Wednesday: 'images/wing_wednesday.jpg',
    Thursday: 'images/cocktail_thursday3.jpg',
    Friday: 'images/fried_food_friday.jpg',
    Saturday: 'images/salad_saturday.jpg',
    Sunday: 'images/simple_sunday2.jpg'
}

function imageChange(){
    if((moment().format('dddd'))==="Monday"){
        $(".jumbotron").css("background-image", "url(" + dayImage.Monday)
    }
    else if((moment().format('dddd'))==="Tuesday"){
        $(".jumbotron").css("background-image", "url(" + dayImage.Tuesday)
    }
    else if((moment().format('dddd'))==="Wednesday"){
        $(".jumbotron").css("background-image", "url(" + dayImage.Wednesday)
    }
    else if((moment().format('dddd'))==="Thursday"){
        $(".jumbotron").css("background-image", "url(" + dayImage.Thursday)
    }
    else if((moment().format('dddd'))==="Friday"){
        $(".jumbotron").css("background-image", "url(" + dayImage.Friday)
    }
    else if((moment().format('dddd'))==="Saturday"){
        $(".jumbotron").css("background-image", "url(" + dayImage.Saturday)
    }
    else if((moment().format('dddd'))==="Sunday"){
        $(".jumbotron").css("background-image", "url(" + dayImage.Sunday)
    }

}


imageChange();
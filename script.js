



// function to search for and display 
function searchRecipes(searchItem) {
    $('.displayList').empty();
    $('.displayList').removeClass('hide')
    $('.jumbotron-fluid').remove();
    $('.recipeInformation').addClass('hide')
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

            var newCard = $('<div>').addClass('card mb-3 m-2 mx-auto');
            var newRow = $('<div>').addClass('row cardRow');
            var imgCol = $('<div>').addClass('col-md-8');
            var newImg = $('<img>').addClass('card-img');
            var contentCol = $('<div>').addClass('col-md-4');
            var cardBody = $('<div>').addClass('card-body');
            var cardTitle = $('<h5>').addClass('card-title');
            var cardText = $('<p>').addClass('card-text');

            var newItemBtn = $('<button>');
            newItemBtn.addClass('btn btn-primary recipeBtn').html('Get Recipe').attr('data-id', resultArray[i].id);

            newImg.attr('src', 'https://spoonacular.com/recipeImages/' + resultArray[i].id + '-312x150.jpg');
            cardTitle.html(resultArray[i].title);
            cardText.html('Ready in: ' + resultArray[i].readyInMinutes + '<br> Serves: ' + resultArray[i].servings)

            newCard.append(newRow);
            newRow.append(imgCol, contentCol);
            imgCol.append(newImg);
            contentCol.append(cardBody);
            cardBody.append(cardTitle, cardText, newItemBtn);
            newItem.append(newCard)
            
            // var newItemTitle = $('<h2>');
            // newItemTitle.addClass('resultItemTitle');
            // newItemTitle.attr('data-id', resultArray[i].id)
            // newItemTitle.text(resultArray[i].title)
            // var newItemImage = $('<img>');
            // newItemImage.addClass('resultItemImg');
            // newItemImage.attr('src', 'https://spoonacular.com/recipeImages/' + resultArray[i].id + '-312x150.jpg')
            // var newItemDescription = $('<p>')
            // newItemDescription.addClass('resultItemDescription')
            // newItemDescription.html('Ready in: ' + resultArray[i].readyInMinutes + '<br><br> Serves: ' + resultArray[i].servings);
            // var newItemBtn = $('<button>');
            // newItemBtn.addClass('btn btn-primary recipeBtn').html('Get Recipe').attr('data-id', resultArray[i].id)
            // newItem.append(newItemTitle, newItemImage, newItemDescription, newItemBtn);
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
    $('.recipeInformation').removeClass('hide');
    $('.ingredientList').empty();
    $('.recipeInstructions').empty()
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

        whisk.queue.push(function() {
            whisk.listeners.addClickListener('whisk-basket', 'shoppingList.addRecipeToBasket', {
              recipeUrl: recipeResponse.sourceUrl,
            });
          });
        });
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
    Monday: 'images/meatless_monday2.jpg',
    Tuesday: 'images/taco_tuesday.jpg',
    Wednesday: 'images/wing_wednesday.jpg',
    Thursday: 'images/cocktail_thursday3.jpg',
    Friday: 'images/fried_food_friday.jpg',
    Saturday: 'images/salad_saturday.jpg',
    Sunday: 'images/simple_sunday2.jpg'
}

var monday = {
    background: 'images/meatless_monday2.jpg',
    theme: 'Meatless Monday'
}

var tuesday = {
    background: 'images/taco_tuesday.jpg',
    theme: 'Taco Tuesday'
}

var wednesday = {
    background: 'images/wing_wednesday.jpg',
    theme: 'Wing Wednesday'
}

var thursday = {
    background: 'images/cocktail_thursday3.jpg',
    theme: 'Thirsty Thursday'
}

var friday = {
    background: 'images/fried_food_friday.jpg',
    theme: 'Fried Friday'
}

var saturday = {
    background: 'images/salad_saturday.jpg',
    theme: 'Salad Saturday'
}

var sunday = {
    background: 'images/simple_sunday2.jpg',
    theme: 'Simple Sunday'
}

function imageChange() {
    if ((moment().format('dddd')) === "Monday") {
        $(".jumbotron-fluid").css("background-image", "url(" + monday.background);
        $('.dayTheme').html(monday.theme);
        $('.learnMore').attr('data-value', 'vegetarian')
    }
    else if ((moment().format('dddd')) === "Tuesday") {
        $(".jumbotron-fluid").css("background-image", "url(" + tuesday.background);
        $('.dayTheme').html(tuesday.theme);
        $('.learnMore').attr('data-value', 'tacos')
    }
    else if ((moment().format('dddd')) === "Wednesday") {
        $(".jumbotron-fluid").css("background-image", "url(" + wednesday.background);
        $('.dayTheme').html(wednesday.theme);
        $('.learnMore').attr('data-value', 'wings')
    }
    else if ((moment().format('dddd')) === "Thursday") {
        $(".jumbotron-fluid").css("background-image", "url(" + thursday.background);
        $('.dayTheme').html(thursday.theme);
        $('.learnMore').attr('data-value', 'cocktails')
    }
    else if ((moment().format('dddd')) === "Friday") {
        $(".jumbotron.fluid").css("background-image", "url(" + friday.background);
        $('.dayTheme').html(friday.theme);
        $('.learnMore').attr('data-value', 'fried')
    }
    else if ((moment().format('dddd')) === "Saturday") {
        $(".jumbotron.fluid").css("background-image", "url(" + saturday.background);
        $('.dayTheme').html(saturday.theme);
        $('.learnMore').attr('data-value', 'salad')
    }
    else if ((moment().format('dddd')) === "Sunday") {
        $(".jumbotron.fluid").css("background-image", "url(" + sunday.background);
        $('.dayTheme').html(sunday.theme);
        $('.learnMore').attr('data-value', 'simple')
    }
}
imageChange();

$('.learnMore').on('click', function(){
    console.log($(this).attr('data-value'))
    searchRecipes($(this).attr('data-value'))
})
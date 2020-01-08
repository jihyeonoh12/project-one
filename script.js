// function to search for and display 
function searchRecipes(searchItem) {
    $('.displayList').empty();
    $('.displayList').removeClass('hide')
    $('.jumbotron').remove();
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
    $('.recipeInfomation').removeClass('hide')
    var recipeInfoURL = 'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=aefe372afd5741e38ead99f0c5a57515'

    $.ajax({
        url: recipeInfoURL,
        method: 'GET'
    }).then(function (recipeResponse) {
        console.log(recipeResponse);
        $('.recipeInstructionsImage').attr('src', recipeResponse.image)
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


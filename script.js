// function to search for and display 
function searchRecipes(searchItem){
    $('.displayList').empty();
    $('.displayList').removeClass('hide')
    $('.jumbotron').remove();
    var foodItem = encodeURI(searchItem);
    var recipesURL = 'https://api.spoonacular.com/recipes/search?query=' + foodItem + '&instructionsRequired=true&apiKey=aefe372afd5741e38ead99f0c5a57515'
    $.ajax({
        url: recipesURL,
        method: 'GET'
    }).then(function(response){
        console.log(response)
        var resultArray = response.results;
        console.log(resultArray)
        for (i=0; i<resultArray.length; i++){
            var newItem = $('<li>');
            newItem.addClass('resultItem')
            var newItemTitle = $('<h2>');
            newItemTitle.addClass('resultItemTitle')
            newItemTitle.text(resultArray[i].title)
            var newItemImage = $('<img>');
            newItemImage.addClass('resultItemImg');
            newItemImage.attr('src', 'https://spoonacular.com/recipeImages/' + resultArray[i].id +'-312x150.jpg')
            var newItemDescription = $('<p>')
            newItemDescription.addClass('resultItemDescription')
            newItemDescription.html('Ready in: ' + resultArray[i].readyInMinutes + '<br><br> Serves: ' + resultArray[i].servings)
            newItem.append(newItemTitle, newItemImage, newItemDescription);
            newItem.appendTo($('.displayList'))
        }
    })
}

// on form submission
$('.form-inline').on('submit', function(event){
    event.preventDefault();
    var searchInput = $('.form-control').val();
    searchRecipes(searchInput);

})


$('.categoryItem').on('click', function(){
    var categoryItem = $(this).html();
    searchRecipes(categoryItem)
})

// function change(){
//     $('.jumbotron').css('background-image', 'url(images/2.jpeg)')
// }

// change()


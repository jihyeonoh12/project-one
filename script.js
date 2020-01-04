


function searchRecipes(searchItem){
    var foodItem = encodeURI(searchItem);
    var recipesURL = 'https://api.spoonacular.com/recipes/search?query=' + foodItem + '&instructionsRequired=true&apiKey=aefe372afd5741e38ead99f0c5a57515'
    $.ajax({
        url: recipesURL,
        method: 'GET'
    }).then(function(response){
        console.log(response)
        var resultArray = response.results;
        console.log(resultArray)
        $('.displayList').empty()
        for (i=0; i<resultArray; i++){
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


searchRecipes('burgers')



$('.form-inline').on('submit', function(event){
    event.preventDefault()
    $('.jumbotron').remove();
    var searchInput = $('.form-control').val();
    searchRecipes(searchInput);

})
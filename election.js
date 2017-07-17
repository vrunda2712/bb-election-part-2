document.addEventListener("DOMContentLoaded", function() {
  var dispCandidates = document.querySelector('#candidate-list');
  var votes = document.querySelector('#votes');
  var refresh = document.querySelector('#refresh');

  votes.addEventListener('click',function() {
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET',
      dataType: 'json',
    }).done(function(responseData) {

      var candidate = responseData.candidates;

      for(var i = 0; i < candidate.length; i++) {
        var listItem = document.createElement('li');
        listItem.innerHTML = candidate[i].name + ' : ' + candidate[i].votes;
        dispCandidates.append(listItem);

        var voteForm = document.createElement('form');
        voteForm.setAttribute('method','POST');
        voteForm.setAttribute('action','https://bb-election-api.herokuapp.com/vote');
        listItem.append(voteForm);

        var hiddenField = document.createElement('input');
        hiddenField.setAttribute('type','hidden');
        hiddenField.setAttribute('name','id');
        hiddenField.setAttribute('value', candidate[i].id);
        voteForm.append(hiddenField);

        var submit = document.createElement('button');
        submit.setAttribute('type','submit');
        submit.setAttribute('class','submit');
        submit.innerHTML = "Vote";
        voteForm.append(submit);

        document.querySelectorAll('form')[i].addEventListener('submit',function(e){
          e.preventDefault();

          var vote = $(this).children('input[type=hidden]').val();
          $.ajax({
            url: 'https://bb-election-api.herokuapp.com/vote?id=' + vote,
            method: 'POST',
            dataType: 'json',
          }).done(function(responseData) {
            console.log('Voted');
          }).fail(function(responseData) {
            console.log('Oops.. Try harder..!');
          });
        });
      }
    });
  });

  $('#refresh').click(function() {
    location.reload();
  });

});

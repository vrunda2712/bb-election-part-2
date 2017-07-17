document.addEventListener("DOMContentLoaded", function() {
  var dispCandidates = document.querySelector('#candidate-list');
  var votes = document.querySelector('button');

  votes.addEventListener('click',function() {
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET',
      dataType: 'json',
    }).done(function(responseData) {
      // console.log(responseData);
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

        var submit = document.createElement('input');
        submit.setAttribute('type','submit');
        submit.innerHTML = 'vote';
        voteForm.append(submit);
      }
    });
  });
});

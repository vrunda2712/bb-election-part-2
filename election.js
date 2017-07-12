document.addEventListener("DOMContentLoaded", function() {
  var dispCandidates = document.getElementById('unordered-list');

  document.addEventListener('click',function(event) {
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET',
      dataType: 'json',
    }).done(function(responseData) {
      console.log(responseData);

      responseData.candidates.forEach(function(candidateInfo) {
        var voter = document.createElement('li');
        voter.innerHTML = 'NAME: ' + candidateInfo.name + ' VOTES: ' + candidateInfo.votes;
        dispCandidates.append(voter);
      });
    });
  });
});

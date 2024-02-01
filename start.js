document.getElementById('start-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var player1Name = document.getElementById('player1-name').value;
    var player2Name = document.getElementById('player2-name').value;

    localStorage.setItem('player1Name', player1Name);
    localStorage.setItem('player2Name', player2Name);

    window.location.href = 'index1.html';
});

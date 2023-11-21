document.addEventListener('DOMContentLoaded', async function () {

    globalLeaderboard = document.getElementById("globalLeaderboard");
    userStats = document.getElementById("userStats");

    // check login
    fetch('/session-data')
    .then(response => response.json())
    .then(data => {
        // If logged in, display global and local stats

        console.log("Displaying stats...")
        
        if (data.isAuthenticated == true) {
            displayLocalStats();
            displayGlobalStats();
        }
        // If not logged in, only display global stats
        else{
            displayGlobalStats();
        }
    })
    .catch(error => {
        console.log('Error fetching session data: ', error);
    })
})

async function displayGlobalStats()
{
    let tableHTML = ''

    // Fetch data from user
    fetch('/globalStats')
    .then(response => response.json())
    .then(data => {
        // Create table with different stats
        data.forEach((stat, index) => {
            const tableRow = `<tr>
            <td>${index + 1}</td>
            <td>${stat.username}</td>
            <td>${stat.timesWon}</td>
            <td>${stat.timesPlayed}</td>
            </tr>`;

            tableHTML += tableRow;
        });
    })
    .catch(error => {
        console.log('Error fetching session data: ', error);
    })
    .finally(() =>
    {
        globalLeaderboard.innerHTML += tableHTML;
    })

}                               

async function displayLocalStats()
{

    let tableHTML = ''

    fetch('/userStats')
    .then(response => response.json())
    .then(data => {
        // Create table with different stats        
        tableHTML += `<tr><td>${data.username}</td><td>${data.timesWon}</td><td>${data.timesPlayed}</td></tr>`;
    })
    .catch(error => {
        console.log('Error fetching session data: ', error);
    })
    .finally (() => {
        userStats.innerHTML += tableHTML;
    });
}
const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", e => {
  e.preventDefault();
  let username = document.querySelector("#search").value;
  let displayName = document.querySelector("#player-search-one");
  let data;
  fetch(`https://r6tab.com/api/search.php?platform=uplay&search=${username}`)
    .then(res => res.json())
    .then(res => (data = res))
    .then(() => getPlayerId(data))
    .then(() => (displayName.innerHTML = username.toUpperCase()));
});

function getPlayerId(data) {
  let playerId = data.results[0].p_id;
  let playerData;
  fetch(`https://r6tab.com/api/player.php?p_id=${playerId}`)
    .then(res => res.json())
    .then(res => (playerData = res))
    .then(() => playerStats(playerData));
}

function playerStats(playerData) {
  let operatorStats = playerData.operators;
  let playerFavDefender = playerData.favdefender;
  console.log(playerFavDefender);
  let favDefenderStats;
  let operatorStatsOBJ = eval("(" + operatorStats + ")");
  favDefenderStats = operatorStatsOBJ.filter(element => element);
  let favOperatorWins = favDefenderStats[0];
  let favOperatorLosses = favDefenderStats[1];
  let favOperatorKills = favDefenderStats[2];
  let favOperatorDeaths = favDefenderStats[3];

  let statsLeft = document.querySelector(".stats-left");
  let statsRight = document.querySelector(".stats-right");
  statsLeft.innerHTML += `
  <h2>${(
    favOperatorKills[playerFavDefender] / favOperatorDeaths[playerFavDefender]
  ).toFixed(2)}</h2>
  <h2>${favOperatorKills[playerFavDefender]}</h2>
  <h2>${favOperatorDeaths[playerFavDefender]}</h2>
  <h2>${favOperatorWins[playerFavDefender]}</h2>
  <h2>${favOperatorLosses[playerFavDefender]}</h2>
  `;

  statsRight.innerHTML += statsLeft.innerHTML;

  console.log(favDefenderStats[3][playerFavDefender]);
}

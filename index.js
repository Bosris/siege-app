const submitBtn = document.querySelector("#submit");

let playerData;
let playerData2;

submitBtn.addEventListener("click", e => {
  playerData = null;
  let nodeList = document.querySelectorAll(".stat-toggle");
  nodeList.forEach(element => (element.style.display = "flex"));
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

submitBtn.addEventListener("click", e => {
  playerData2 = null;
  let nodeList = document.querySelectorAll(".stat-toggle");
  nodeList.forEach(element => (element.style.display = "flex"));
  e.preventDefault();
  let username2 = document.querySelector("#search-two").value;
  console.log(username2);
  let displayName2 = document.querySelector("#player-search-two");
  let data2;
  fetch(`https://r6tab.com/api/search.php?platform=uplay&search=${username2}`)
    .then(res => res.json())
    .then(res => (data2 = res))
    .then(() => getPlayerId2(data2))
    .then(() => (displayName2.innerHTML = username2.toUpperCase()));
});

function getPlayerId(data) {
  let playerId = data.results[0].p_id;

  fetch(`https://r6tab.com/api/player.php?p_id=${playerId}`)
    .then(res => res.json())
    .then(res => (playerData = res))
    .then(() => playerStats(playerData));
}

function getPlayerId2(data2) {
  let playerId = data2.results[0].p_id;

  fetch(`https://r6tab.com/api/player.php?p_id=${playerId}`)
    .then(res => res.json())
    .then(res => (playerData2 = res))
    .then(() => playerStats2(playerData2));
}

function playerStats(playerData, currentOperator) {
  console.log(playerData);
  let operatorStats = playerData.operators;
  let playerFavDefender = currentOperator || playerData.favdefender;
  console.log(playerFavDefender);
  let favDefenderStats;
  let operatorStatsOBJ = eval("(" + operatorStats + ")");
  favDefenderStats = operatorStatsOBJ.filter(element => element);
  let favOperatorWins = favDefenderStats[0];
  let favOperatorLosses = favDefenderStats[1];
  let favOperatorKills = favDefenderStats[2];
  let favOperatorDeaths = favDefenderStats[3];

  let imageTag = document.querySelector(".left-op");
  if (!imageTag.hasAttribute("src")) {
    let imageOp = playerData.favdefender.replace(":", "");
    imageTag.src = `./images/${imageOp}.png`;
  }

  let statsLeft = document.querySelector(".stats-left");
  statsLeft.innerHTML = ``;
  statsLeft.innerHTML += `
  <h2 >${(
    favOperatorKills[playerFavDefender] / favOperatorDeaths[playerFavDefender]
  ).toFixed(2) || 0}</h2>
  <h2>${favOperatorKills[playerFavDefender] || 0}</h2>
  <h2 >${favOperatorDeaths[playerFavDefender] || 0}</h2>
  <h2 >${favOperatorWins[playerFavDefender] || 0}</h2>
  <h2>${favOperatorLosses[playerFavDefender] || 0}</h2>
  `;

  //statsRight.innerHTML += statsLeft.innerHTML;

  return playerData;
}

function playerStats2(playerData2, currentOperator) {
  console.log(playerData2);
  let operatorStats = playerData2.operators;
  let playerFavDefender = currentOperator || playerData2.favdefender;
  console.log(playerFavDefender);
  let favDefenderStats;
  let operatorStatsOBJ = eval("(" + operatorStats + ")");
  favDefenderStats = operatorStatsOBJ.filter(element => element);
  let favOperatorWins = favDefenderStats[0];
  let favOperatorLosses = favDefenderStats[1];
  let favOperatorKills = favDefenderStats[2];
  let favOperatorDeaths = favDefenderStats[3];
  //keeps putting defender

  let imageTag = document.querySelector(".right-op");
  if (!imageTag.hasAttribute("src")) {
    let imageOp = playerData2.favdefender.replace(":", "");
    imageTag.src = `./images/${imageOp}.png`;
  }

  let statsRight = document.querySelector(".stats-right");

  statsRight.innerHTML = ``;
  statsRight.innerHTML += `
  <h2>${(
    favOperatorKills[playerFavDefender] / favOperatorDeaths[playerFavDefender]
  ).toFixed(2) || 0}</h2>
  <h2>${favOperatorKills[playerFavDefender] || 0}</h2>
  <h2>${favOperatorDeaths[playerFavDefender] || 0}</h2>
  <h2>${favOperatorWins[playerFavDefender] || 0}</h2>
  <h2>${favOperatorLosses[playerFavDefender] || 0}</h2>
  `;

  //statsRight.innerHTML += statsLeft.innerHTML;
  compareStats();
  return playerData2;
}

function iconClick(e) {
  currentOperator = e.getAttribute("name");
  let imageTag = document.querySelector(".left-op");
  let imageOp = currentOperator.replace(":", "");
  console.log(imageOp);
  imageTag.src = `./images/${imageOp}.png`;
  playerStats(playerData, currentOperator);
  compareStats();
}

function iconClick2(e) {
  currentOperator = e.getAttribute("name");
  let imageTag = document.querySelector(".right-op");
  let imageOp = currentOperator.replace(":", "");
  console.log(imageOp);
  imageTag.src = `./images/${imageOp}.png`;
  playerStats2(playerData2, currentOperator);
  compareStats();
}

function compareStats() {
  let compareLeftStats = document.querySelectorAll(".stats-left h2");
  let compareRightStats = document.querySelectorAll(".stats-right h2");
  console.log(compareLeftStats);

  for (let i = 0; i < compareLeftStats.length; i++) {
    if (i === 2) {
      if (
        Number(compareLeftStats[2].innerHTML) >
        Number(compareRightStats[2].innerHTML)
      ) {
        compareRightStats[2].classList.add("correct");
        compareLeftStats[2].classList.add("wrong");

        compareRightStats[2].classList.remove("wrong");
        compareLeftStats[2].classList.remove("correct");
      } else {
        compareLeftStats[2].classList.add("correct");
        compareRightStats[2].classList.add("wrong");

        compareLeftStats[2].classList.remove("wrong");
        compareRightStats[2].classList.remove("correct");
      }
    } else if (i === 4) {
      if (
        Number(compareLeftStats[4].innerHTML) >
        Number(compareRightStats[4].innerHTML)
      ) {
        compareRightStats[4].classList.add("correct");
        compareLeftStats[4].classList.add("wrong");

        compareRightStats[4].classList.remove("wrong");
        compareLeftStats[4].classList.remove("correct");
      } else {
        compareLeftStats[4].classList.add("correct");
        compareRightStats[4].classList.add("wrong");

        compareLeftStats[4].classList.remove("wrong");
        compareRightStats[4].classList.remove("correct");
      }
    } else if (i == 0 || i == 1 || i == 3) {
      if (
        Number(compareLeftStats[i].innerHTML) >
        Number(compareRightStats[i].innerHTML)
      ) {
        compareLeftStats[i].classList.add("correct");
        compareRightStats[i].classList.add("wrong");

        compareLeftStats[i].classList.remove("wrong");
        compareRightStats[i].classList.remove("correct");
      } else {
        compareRightStats[i].classList.add("correct");
        compareLeftStats[i].classList.add("wrong");

        compareRightStats[i].classList.remove("wrong");
        compareLeftStats[i].classList.remove("correct");
      }
    }
  }
}

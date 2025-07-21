let player = { hp: 100, atk: 10 }
let enemyList = [
  { name: "Slime", hp: 50, atk: 5 },
  { name: "Goblin", hp: 60, atk: 7 },
  { name: "Bat", hp: 40, atk: 4 }
]
let enemy = {}

function log(text) {
  const logBox = document.getElementById("log-box")
  logBox.innerHTML += `<p>${text}</p>`
  logBox.scrollTop = logBox.scrollHeight
}

function updateUI() {
  document.getElementById("player-hp").textContent = player.hp
  document.getElementById("enemy-name").textContent = enemy.name
  document.getElementById("enemy-hp").textContent = enemy.hp
}

function playerAttack() {
  if (player.hp <= 0 || enemy.hp <= 0) return

  let damage = Math.floor(Math.random() * player.atk) + 1
  enemy.hp -= damage
  log(`Kamu menyerang ${enemy.name} sebesar ${damage} damage!`)

  if (enemy.hp <= 0) {
    enemy.hp = 0
    updateUI()
    log(`${enemy.name} kalah! 🎉`)
    showVictoryPopup()
    return
  }

  updateUI()
  setTimeout(enemyAttack, 1000)
}

function enemyAttack() {
  let damage = Math.floor(Math.random() * enemy.atk) + 1
  player.hp -= damage
  if (player.hp < 0) player.hp = 0

  log(`${enemy.name} menyerangmu sebesar ${damage} damage!`)
  updateUI()

  if (player.hp <= 0) {
    log(`Kamu kalah... 💀`)
    showDefeatPopup() // bisa ditambah nanti
  }
}

function showVictoryPopup() {
  const popup = document.getElementById("victory-popup")
  popup.style.display = "flex"
}

function startBattle() {
  // Reset popup menang kalau sebelumnya muncul
  const popup = document.getElementById("victory-popup")
  if (popup) popup.style.display = "none"

  // Tampilkan searching UI
  const searching = document.getElementById("searching")
  const battleUI = document.getElementById("battle-ui")

  if (searching && battleUI) {
    searching.style.display = "block"
    battleUI.style.display = "none"
    document.getElementById("log-box").innerHTML = "<p>Pertarungan dimulai!</p>"

    setTimeout(() => {
      // Pilih musuh random
      enemy = JSON.parse(JSON.stringify(enemyList[Math.floor(Math.random() * enemyList.length)]))
      player.hp = 100

      updateUI()
      searching.style.display = "none"
      battleUI.style.display = "block"
    }, 3000)
  }
}


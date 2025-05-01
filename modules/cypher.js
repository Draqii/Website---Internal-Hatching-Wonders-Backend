const pool = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const create_ids = () => {
    const result = []
    for(let i=0; i<20; i++) result.push(pool[getRandomInt(pool.length)]) 
    return result.join("")
}

module.exports = {
    create_id: create_ids
}
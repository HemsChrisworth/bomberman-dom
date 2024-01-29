package handlers

import (
    "math/rand"
    "time"
)

//baseMap is the initial map for the random map generator to run off of
// 11 rows, 17 columns
///SPAWN - S - normal GRASS, not allowed to spawn anything else but grass tile
//SOLID - B - blocks you can not destroy, like game edge
//GRASS - G - grass block, can spawn other things on top of it
const BaseMap = (
"BBBBBBBBBBBBBBBBB" +
"BSSGGGGGGGGGGGSSB" + 
"BSBGBGBGBGBGBGBSB" +
"BGBGBGBGBGBGBGBGB" +
"BGBGBGBGBGBGBGBGB" +
"BGBGBGBGBGBGBGBGB" +
"BGBGBGBGBGBGBGBGB" +
"BGBGBGBGBGBGBGBGB" +
"BSBGBGBGBGBGBGBSB" +
"BSSGGGGGGGGGGGSSB" + 
"BBBBBBBBBBBBBBBBB")

/*
DBLOCK - D - normal destroyable block
DBLOCKBOMB - O - destroyable block with a bomb powerup spawned when destroyed (O -> looks like a bomb)
DBLOCKFLAME - F - destroyable block with flame powerup spawned when destroyed
DBLOCKSPEED - M - destroyable block with player speed increase powerup spawned when destroyed (M -> movement speed)
*/
const CharSet = "GGDOFM" // characters that we use for different spawnable block types, we can add characters to it if we want something to be more common!

func RandomMapGenerator(baseMap string, charSet string) (randomMap string) {
	randomMap = ""
	for i := 0; i < len(baseMap); i++ {
		currentChar := string(baseMap[i])
		if currentChar == "G" {
			randomMap += stringWithCharset(1, charSet)
		} else {
			randomMap += currentChar
		}
	}
	return randomMap
}

/* https://www.calhoun.io/creating-random-strings-in-go/ */
var seededRand *rand.Rand = rand.New(
	rand.NewSource(time.Now().UnixNano()))

func stringWithCharset(length int, charset string) string {
	b := make([]byte, length)
	for i := range b {
	  b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}

import { getSpriteSheetXYbyIndex } from "../../utils/spriteSheetCalc.js";



export const PLAYER_NAME_FORM_INPUT = "playerName",
  CHAT_MESSAGE_FORM_INPUT_NAME = "chatMessage",
  WS_REQUEST_TYPE_PLAYER_ACTION = "playerAction",
  WAIT_FOR_PLAYERS = 5, //TODO set to 20 and 10
  START_IN = 2,
  // map tiles
  MAP_TILE_SIZE = 32,
  SPRITESHEET_ROWS = 23,
  SPRITESHEET_COLUMNS = 14, // important value for calculating sprite positions
  // map size
  MAP_ROWS = 11,
  MAP_COLUMNS = 17,
  // z-indexes, used in class constructors
  EXPLOSION_Z_INDEX = 15, //for bomb explosion fire animation (player caught in the fire)
  BOMB_Z_INDEX = 5, //player places the bomb under themselves
  PLAYER_Z_INDEX = 10,
  // blocks
  SPRITE_SHEET_URL = "src/assets/images/spritesheets/spritesheet.png",
  GRASS = 70,
  SOLID = 45,
  DBLOCK = 46,
  BOMBPUP = 196,
  FIREPUP = 197,
  SPEEDPUP = 199,
  BOMB = 43,
  EXPLOSION_CENTER = 47, // TODO set right number
  EXPLOSION_LEFT = 48,// TODO set right number
  EXPLOSION_RIGHT = 49,// TODO set right number
  EXPLOSION_UP = 50,// TODO set right number
  EXPLOSION_DOWN = 51,// TODO set right number
  EXPLOSION_EDGES = {
    [EXPLOSION_LEFT]: 55,// TODO set right number
    [EXPLOSION_RIGHT]: 56,// TODO set right number
    [EXPLOSION_UP]: 57,// TODO set right number
    [EXPLOSION_DOWN]: 58,// TODO set right number

  },
  SPRITE_POS = {
    [GRASS]: getSpriteSheetXYbyIndex(GRASS),
    [SOLID]: getSpriteSheetXYbyIndex(SOLID),
    [DBLOCK]: getSpriteSheetXYbyIndex(DBLOCK),
    [BOMBPUP]: getSpriteSheetXYbyIndex(BOMBPUP),
    [SPEEDPUP]: getSpriteSheetXYbyIndex(SPEEDPUP),
    [BOMB]: getSpriteSheetXYbyIndex(BOMB),
    [EXPLOSION_CENTER]: getSpriteSheetXYbyIndex(EXPLOSION_CENTER),
    [EXPLOSION_LEFT]: getSpriteSheetXYbyIndex(EXPLOSION_LEFT),
    [EXPLOSION_RIGHT]: getSpriteSheetXYbyIndex(EXPLOSION_RIGHT),
    [EXPLOSION_UP]: getSpriteSheetXYbyIndex(EXPLOSION_UP),
    [EXPLOSION_DOWN]: getSpriteSheetXYbyIndex(EXPLOSION_DOWN),
    [EXPLOSION_EDGES[EXPLOSION_LEFT]]: getSpriteSheetXYbyIndex([EXPLOSION_EDGES[EXPLOSION_LEFT]]),
    [EXPLOSION_EDGES[EXPLOSION_RIGHT]]: getSpriteSheetXYbyIndex([EXPLOSION_EDGES[EXPLOSION_RIGHT]]),
    [EXPLOSION_EDGES[EXPLOSION_UP]]: getSpriteSheetXYbyIndex([EXPLOSION_EDGES[EXPLOSION_UP]]),
    [EXPLOSION_EDGES[EXPLOSION_DOWN]]: getSpriteSheetXYbyIndex([EXPLOSION_EDGES[EXPLOSION_DOWN]]),
  },
  BACKEND_TILE_TYPE_CODES = {
    B: { TileIndex: SOLID, IntitialSpritePos: SPRITE_POS[SOLID] },
    G: { TileIndex: GRASS, IntitialSpritePos: SPRITE_POS[GRASS] },
    D: { TileIndex: DBLOCK, IntitialSpritePos: SPRITE_POS[DBLOCK] },
    O: { TileIndex: BOMBPUP, IntitialSpritePos: SPRITE_POS[DBLOCK] },
    F: { TileIndex: FIREPUP, IntitialSpritePos: SPRITE_POS[DBLOCK] },
    M: { TileIndex: SPEEDPUP, IntitialSpritePos: SPRITE_POS[DBLOCK] },
  },
  // player start
  PLAYER_START_POSITIONS = [
    { row: 1, column: 1 },
    { row: 1, column: MAP_COLUMNS - 2 },
    { row: MAP_ROWS - 2, column: 1 },
    { row: MAP_ROWS - 2, column: MAP_COLUMNS - 2 },
  ],
  // player actions

  PLAYER_MOVEMENT_SPEED = 2,


  // bomb
  BOMB_EXPLOSION_TIMER = 3000, // time between placing bomb and explosion
  EXPLOSION_LASTING_TIMER = 3000, // explosion lasts 
  BOMB_PLACEMENT_DELAY = 3000

//directions





export const PLAYER_NAME_FORM_INPUT = 'playerName',
    CHAT_MESSAGE_FORM_INPUT_NAME = 'chatMessage',

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
    EXPLOSION_Z_INDEX = 2, //for bomb explosion fire animation (player caught in the fire)
    BOMB_Z_INDEX = 0, //player places the bomb under themselves
    PLAYER_Z_INDEX = 1,

    // blocks
    GRASS = 70,
    SOLID = 45,
    DBLOCK = 46,
    BOMBPUP = 196,
    FIREPUP = 197,
    SPEEDPUP = 199,

    SPRITE_POS = {
        [GRASS]: [(GRASS % SPRITESHEET_COLUMNS) * MAP_TILE_SIZE, Math.floor(GRASS / SPRITESHEET_COLUMNS) * MAP_TILE_SIZE],
        [SOLID]: [(SOLID % SPRITESHEET_COLUMNS) * MAP_TILE_SIZE, Math.floor(SOLID / SPRITESHEET_COLUMNS) * MAP_TILE_SIZE],
        [DBLOCK]: [(DBLOCK % SPRITESHEET_COLUMNS) * MAP_TILE_SIZE, Math.floor(DBLOCK / SPRITESHEET_COLUMNS) * MAP_TILE_SIZE],
        [BOMBPUP]: [(BOMBPUP % SPRITESHEET_COLUMNS) * MAP_TILE_SIZE, Math.floor(BOMBPUP / SPRITESHEET_COLUMNS) * MAP_TILE_SIZE],
        [SPEEDPUP]: [(SPEEDPUP % SPRITESHEET_COLUMNS) * MAP_TILE_SIZE, Math.floor(SPEEDPUP / SPRITESHEET_COLUMNS) * MAP_TILE_SIZE],
    },

    BACKEND_TILE_TYPE_CODES = {
        "B": { TileIndex: SOLID, IntitialSpritePos: SPRITE_POS[SOLID], },
        "G": { TileIndex: GRASS, IntitialSpritePos: SPRITE_POS[GRASS], },
        "D": { TileIndex: DBLOCK, IntitialSpritePos: SPRITE_POS[DBLOCK], },
        "O": { TileIndex: BOMBPUP, IntitialSpritePos: SPRITE_POS[DBLOCK], },
        "F": { TileIndex: FIREPUP, IntitialSpritePos: SPRITE_POS[DBLOCK], },
        "M": { TileIndex: SPEEDPUP, IntitialSpritePos: SPRITE_POS[DBLOCK], },
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
    PLAYER_MOVE_LEFT = "moveLeft",
    PLAYER_MOVE_RIGHT = "moveRight",
    PLAYER_MOVE_UP = 'moveUp',
    PLAYER_MOVE_DOWN = 'moveDown',
    PLAYER_PLACE_BOMB = "placeBomb" // space key


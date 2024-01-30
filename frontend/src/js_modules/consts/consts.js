
export const PLAYER_NAME_FORM_INPUT = 'playerName',
    CHAT_MESSAGE_FORM_INPUT_NAME = 'chatMessage',
    
    WAIT_FOR_PLAYERS = 5, //TODO set to 20 and 10
    START_IN = 2,

    MAP_TILE_SIZE = 32,
    SPRITESHEET_ROWS = 23,
    SPRITESHEET_COLUMNS = 14, // important value for calculating sprite positions

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


    POWER_BOMB = 196,
    POWER_FLAME = 197,
    POWER_SPEED = 199,

    BACKEND_MAP_CODES = {
        "B": SOLID,
        "G": GRASS,
        "D": DBLOCK,
        "O": DBLOCK,
        "F": DBLOCK,
        "M": DBLOCK,
    },

    BACKEND_POWER_CODES = {
        "B": false,
        "G": false,
        "D": false,
        "O": POWER_BOMB,
        "F": POWER_FLAME,
        "M": POWER_SPEED,
    },
    // player actions

    MOVEMENT_SPEED = 2;

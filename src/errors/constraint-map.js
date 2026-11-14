module.exports = {
  game_sessions_join_pin_key: {
    status: 409,
    code: 'JOIN_PIN_TAKEN',
    message: 'That join pin is already used by another game.',
  },
  unique_game_user: {
    status: 409,
    code: 'ALREADY_JOINED',
    message: 'You have already joined this game.',
  },
  users_user_id_key: {
    status: 409,
    code: 'USER_ID_TAKEN',
    message: 'That user ID is already taken.',
  },
  seat_user_id_fkey: {
    status: 409,
    code: 'USER_IN_USE',
    message: 'This user is still in a game and cannot be deleted.',
  },
  GAME_SESSION_player_id_fkey: {
    status: 409,
    code: 'PLAYER_IN_USE',
    message: 'This player is still in a game and cannot be deleted.',
  },
};
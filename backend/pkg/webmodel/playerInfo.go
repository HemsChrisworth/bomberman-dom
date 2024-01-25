package webmodel

import "encoding/json"

type PlayerInfo struct {
	UserName     string          `json:"playerName"`
	PlayerNumber json.RawMessage `json:"playerNumber"`
}

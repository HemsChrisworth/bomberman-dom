package webmodel

import "encoding/json"

type PlrAction struct {
	UserName string `json:"playerName"`
	Action   json.RawMessage `json:"action"`
}


package parse

import (
	"encoding/json"

	"01.kood.tech/git/Hems_Chrisworth/bomberman-dom/backend/pkg/webmodel"
)

func PayloadToInt(payload json.RawMessage) (int, error) {
	var number int
	err := json.Unmarshal(payload, &number)
	if err != nil {
		return 0, err
	}

	return number, nil
}

func PayloadToString(payload json.RawMessage) (string, error) {
	var str string
	err := json.Unmarshal(payload, &str)
	if err != nil {
		return "", err
	}

	return str, nil
}

func PayloadToChatMessage(payload json.RawMessage) (webmodel.ChatMessage, error) {
	var message webmodel.ChatMessage
	err := json.Unmarshal(payload, &message)
	return message, err
}

func PayloadToAction(payload json.RawMessage) (webmodel.PlrAction, error) {
	var action webmodel.PlrAction
	err := json.Unmarshal(payload, &action)
	return action, err
}

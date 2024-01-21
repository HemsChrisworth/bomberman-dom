package webmodel

import (
	"time"
)

type ChatMessage struct {
	UserName   string    `json:"userName,omitempty"`
	Content    string    `json:"content"`
	DateCreate time.Time `json:"dateCreate,omitempty"`
}

func (m *ChatMessage) Validate() string {
	if m.DateCreate.Before(time.Date(2024, time.January, 1, 0, 0, 0, 0, time.UTC)) {
		return "Date is too old"
	}
	if IsEmpty(m.Content) {
		return "text is missing"
	}

	return ""
}

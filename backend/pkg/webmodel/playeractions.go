package webmodel

type PlrAction struct {
	UserName string `json:"playerName"`
	Action   string `json:"action"`
}

func (pa *PlrAction) Validate() string {
	if IsEmpty(pa.UserName) {
		return "UserName is missing"
	}
	if IsEmpty(pa.Action) {
		return "Action is missing"
	}

	return ""
}

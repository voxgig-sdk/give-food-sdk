package core

type GiveFoodError struct {
	IsGiveFoodError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewGiveFoodError(code string, msg string, ctx *Context) *GiveFoodError {
	return &GiveFoodError{
		IsGiveFoodError: true,
		Sdk:              "GiveFood",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *GiveFoodError) Error() string {
	return e.Msg
}

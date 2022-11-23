package internal

import (
	"fmt"
)

func VerbosityLogging(text string, a ...any) {
	if Verbosity {
		if JsonLogging {
			JsonLogger.Debug().Msgf(text, a...)
		} else {
			fmt.Printf(text, a...)
			fmt.Println()
		}
	}
}

func InfoLogging(text string, a ...any) {
	if JsonLogging {
		JsonLogger.Debug().Msgf(text, a...)
	} else {
		fmt.Printf(text, a...)
		fmt.Println()
	}
}

// Copyright 2022 Camunda Services GmbH
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package internal

import (
	"fmt"
)

var LoggingContext map[string]interface{}

func LogVerbose(text string, a ...any) {
	if Verbosity {
		if JsonLogging {
			debug := JsonLogger.Debug()
			if LoggingContext != nil {
				debug = debug.Fields(LoggingContext)
			}
			debug.Msgf(text, a...)
		} else {
			fmt.Printf(text, a...)
			fmt.Println()
		}
	}
}

func LogInfo(text string, a ...any) {
	if JsonLogging {
		info := JsonLogger.Info()
		if LoggingContext != nil {
			info.Fields(LoggingContext)
		}
		info.Msgf(text, a...)
	} else {
		fmt.Printf(text, a...)
		fmt.Println()
	}
}

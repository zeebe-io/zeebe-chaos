package main

import (
	"bytes"
	"io"
	"testing"

	"github.com/zeebe-io/zeebe-chaos/go-chaos/cmd"
)

func Test_ExecuteRootCmd(t *testing.T) {
	// given
	expectedString := `A chaos experimenting toolkit for Zeebe.
    Perfect to inject some chaos into your brokers and gateways.

Usage:
  zbchaos [command]

Available Commands:
  brokers     Print the name of the Zeebe broker pods
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  terminate   Terminates a Zeebe broker
  topology    Print the Zeebe topology deployed in the current namespace

Flags:
  -h, --help   help for zbchaos

Use "zbchaos [command] --help" for more information about a command.
`
	rootCmd := cmd.NewCmd()
	b := bytes.NewBufferString("")
	rootCmd.SetOut(b)

	// when
	err := rootCmd.Execute()
	if err != nil {
		t.Fatal(err)
	}

	// then
	out, err := io.ReadAll(b)
	if err != nil {
		t.Fatal(err)
	}

	if string(out) != expectedString {
		t.Fatalf("expected \"%s\" got \"%s\"", expectedString, string(out))
	}
}

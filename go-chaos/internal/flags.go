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

import "github.com/camunda/zeebe/clients/go/v8/pkg/zbc"

// defines whether the functions should print verbose output
var Verbosity = false

// defines whether we running in saas or self-managed
// will be resolved automatically when creating the k8 client
var saasEnv = false

// defines if a custom kube config should be used instead of the default one found by k8s
var KubeConfigPath string

// sets the namespace to be used instead of the namespace from the current kube context
var Namespace string

var ZeebeClientCredential zbc.CredentialsProvider

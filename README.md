## Installing dependencies

After cloning the project, install the dependencies with

```bash
yarn workspaces focus -A
```

the command installs dependencies from every workspace in the monorepo

* * *

## Running the dev server

After the dependencies have been installed, run the dev server for the 'app1' application with 

```bash
yarn app1 #defined in root package.json
```

this command run the 'app1' command defined in the root package.json which is just a alias for the command

```bash
yarn workspace @apps/application_1 dev
```

* * *

- **yarn**: yarn package manager

- **workspace**: This is an option of the yarn command that allows you to run a command in a workspace of a Yarn monorepo.

- **@apps/application_1**: Name of the workspace that the command will be executed in. The name of the workspace is defined in the package.json file of the workspace

- **dev**: script from the package.json file of the target workspace to be executed

* * *

## Other commands

List all the workspaces in the monorepo 

```bash
yarn workspaces list
```

* * *

## How to make a new shared module

In the shared folder create a new folder with the name of the module.

The folder should contain:
- **package.json**
- **src folder**
  - **index.ts**
  - **files/folders with your code**


**Package.json**

If other modules are used as dependencies they have to be placed under <u>_peerDependencies_</u>, <u>_dependencies_</u> or <u>_devDependencies_</u> with their version set to <u>_"workspace:^"_</u>.

If a module is not defined in the here then the import of the module will not be recognized.

```json
{
  "name": "@shared/module_name",
  "private": true,
  "main": "./src",
  "dependencies": {
    "@shared/module_name_1": "workspace:^"
  }
}
```

**./src/index.ts**

In this file we define all the parts of the module that should be importable elsewhere.
```typescript
import { FunctionToExport } from "path/to/function/in/module";
import { ComponentToExport } from "path/to/component/in/module";

export { FunctionToExport, ComponentToExport }
```

This allows for more simple imports:
```typescript
// instead of this
import { FunctionToExport } from "@shared/module/path/to/function";

// we can do imports like this
import { FunctionToExport } from "@shared/module";
```


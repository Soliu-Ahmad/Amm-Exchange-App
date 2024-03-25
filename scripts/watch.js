const watch = require("node-watch");
/*const watch = require("node-watch");:
This line imports the node-watch module, which is used for watching file changes in a directory.*/
const { exec } = require("child_process");
/*const { exec } = require("child_process");:
This line imports the exec function from the Node.js built-in child_process module.
 The exec function is used to execute shell commands from within a Node.js script.*/
const run = () => {
  /*const run = () => { ... };:
  Defines an arrow function named run. This function will be used to compile and deploy contracts.*/
  console.log("🛠  Compiling & Deploying...");
  /*console.log("🛠 Compiling & Deploying...");:
  Outputs a log message indicating that the script is compiling and deploying.*/
  exec("yarn deploy", function (error, stdout, stderr) {
    /*exec("yarn deploy", function (error, stdout, stderr) { ... });:
  Uses the exec function to run the shell command yarn deploy. 
  The callback function handles the output and errors from the command execution.
  stdout contains the standard output, stderr contains the standard error,
  and error indicates any error that occurred during execution.*/
    console.log(stdout);
    /*console.log(stdout);:
  Outputs the standard output of the yarn deploy command.*/
    if (error) console.log(error);
    /*if (error) console.log(error);:
  Checks if there was an error during the command execution and logs the error message if one occurred.*/
    if (stderr) console.log(stderr);
    /*if (stderr) console.log(stderr);:
  Logs any error messages from the standard error stream, if present.*/
  });
};

console.log("🔬 Watching Contracts...");
/*console.log("🔬 Watching Contracts...");:
Outputs a log message indicating that the script is now watching for changes in the contracts directory.*/
watch("./contracts", { recursive: true }, function (evt, name) {
  /*watch("./contracts", { recursive: true }, function (evt, name) { ... });:
  Sets up a file watcher using the node-watch module to watch the ./contracts directory recursively.
   When a file change (evt) is detected, the callback function is triggered, and it
    logs the name of the changed file.*/
  console.log("%s changed.", name);
  /*console.log("%s changed.", name);:
Logs a message indicating which file (name) has changed in the contracts directory.*/
  run();
  /*run();:
Calls the run function defined earlier, which triggers the compilation and deployment process.*/
});
run();
/*run();:
Calls the run function again at the end of the script.
 This ensures that the compilation and deployment process is initiated when the script is run.*/
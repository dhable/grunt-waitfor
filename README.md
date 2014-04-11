# grunt-waitfor

> Block task execution until a condition passes.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-waitfor --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-waitfor');
```

## The "waitfor" task

### Overview
In your project's Gruntfile, add a section named `waitfor` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  waitfor: {
    tomcat: {
      cmd: "...",
      options: {
         exitCode: 0,
         delay: 1000,
         timeout: 60000,
         verbose: false
      },
    }
  }
});
```

### Options

#### cmd
Type: `String`

The shell command you want to execute. This is a required property.

#### options.exitCode
Type: `Number`
Default value: `0`

The command exit code that will cause waitfor to continue task execution.

#### options.delay
Type: `Number`
Default value: `1000`

The number of milliseconds waitfor will pause between executions of the command.

#### options.timeout
Type: `Number`
Default value: `60000`

The number of milliseconds that waitfor will try to execute the command looking for a matching exit code.

#### options.verbose
Type `Boolean`
Default value: `false`

When set to true, the standard output and standard error streams of the command will be output in the grunt log.

### Usage Examples
The examples below assume that part of an integration test suite being built using grunt leverages a Java tomcat servlet. Since tomcat can take a variable amount of time to initialize itself, the goal is to wait until the curl command can ping the server before launching into the next task. This is the actual use case that caused me to develop the plugin.

#### Default Options
In this example, we simply want to execute the curl command and use all of the built in default options.

```js
grunt.initConfig({
  waitfor: {
    tomcat: {
       cmd: "curl 'http://localhost:8080/my-application'"
    }
  },
});
```

Now specifying the task ```waitfor:tomcat``` will cause the curl command to execute until either it returns an exit status of 0 or 60 seconds elapse.

#### Custom Options
In this example, the server might be slow to boot making a timeout of 120 seconds and checking every 3 seconds better values.

```js
grunt.initConfig({
  waitfor: {
    tomcat: {
       cmd: "curl 'http://localhost:8080/my-application'",
       options: {
          delay: 3000,
          timeout: 120000
       }
    }
  },
});
```

Now specifying the task ```waitfor:tomcat``` will cause the curl command to execute until either it returns an exit status of 0 or 120 seconds elapse.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

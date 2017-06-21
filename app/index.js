var path = require('path');
var chalk = require('chalk');    //不同颜色的info
var util = require('util');
var Generator = require('yeoman-generator');
var yosay = require('yosay');    //yeoman弹出框
var path = require('path');
module.exports =  class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag
    }

    prompting() {
        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : 'generator-sx-web',
        }
        // , {
        //     type    : 'confirm',
        //     name    : 'cool',
        //     message : 'Would you like to enable the Cool feature?'
        // }
        ,{
            type    : 'input',
            name    : 'author',
            message : 'somnus',
        }
        ]).then((answers) => {
            this.appname = answers.name
            this.author = answers.author
        });

    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('public'),
            this.destinationPath(`${this.appname}/public`)
        );
        this.fs.copyTpl(
            this.templatePath('src'),
            this.destinationPath(`${this.appname}/src`)
        );
        this.fs.copyTpl(
            this.templatePath('builder'),
            this.destinationPath(`${this.appname}/builder`)
        );
        this.fs.copyTpl(
            this.templatePath('static'),
            this.destinationPath(`${this.appname}/static`)
        );
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath(`${this.appname}/package.json`),
            {
                name: this.appname,
                author: this.author
            }
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath(`${this.appname}/index.html`)
        );
        this.fs.copyTpl(
            this.templatePath('postcss.config.js'),
            this.destinationPath(`${this.appname}/postcss.config.js`)
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath(`${this.appname}/.babelrc`)
        );
        this.sourceRoot(`./${this.appname}`);
        this.npmInstall();
    }
};
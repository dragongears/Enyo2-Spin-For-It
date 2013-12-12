module.exports = function(grunt) {

	grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
		clean: ["deploy/*", "build/*"],
		compress: {
            "phonegap-build": {
        		    options: {
        		      archive: 'deploy/<%= pkg.id %>_<%= pkg.version %>_pgb.zip'
        		    },
        		    files: [
        		      {expand: true, cwd: 'deploy/<%= pkg.name %>/', src: ['**'], dest: ''},
        		      {flatten: true, expand: true, src: ['platforms/phonegap_build/config.xml'], dest: '/'}
        		    ]
        		  },
            "tizen": {
        		    options: {
        		      archive: 'deploy/<%= pkg.id %>_<%= pkg.version %>_tizen.zip'
        		    },
        		    files: [
        		      {expand: true, cwd: 'deploy/<%= pkg.name %>/', src: ['**'], dest: ''},
        		      {flatten: true, expand: true, src: ['platforms/tizen/config.xml'], dest: '/'}
        		    ]
        		  }
		},
		"phonegap-build": {
			debug: {
				options: {
					archive: "deploy/<%= pkg.id %>_<%= pkg.version %>.zip",
					"appId": "367891",
					"user": {
						"email": "art@dragongears.com",
						"password": "binky1802"
					}
				}
			},
			release: {
				options: {
					"isRepository": "true",
					"appId": "367891",
					"user": {
						"token": "zj3PNEbTNLpzCxDk8hHB"
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-phonegap-build');

	grunt.registerTask('default', ['clean', 'deploy', 'compress', 'palm-package']);

	grunt.registerTask('deploy', 'Create a deployable Enyo app.', function() {
		var shell = require('shelljs');

		grunt.log.writeln('Deploying app');
		shell.exec('sh tools/deploy.sh');

//		grunt.log.writeln('Copying PhoneGap Build config.xml file...');
//		grunt.file.copy('config.xml', 'deploy/' + grunt.config('pkg.name') + '/config.xml');
//
	});

	grunt.registerTask('palm-package', 'Package a webOS *.ipk from deployed app.', function() {
		var shell = require('shelljs');

        grunt.log.writeln('Creating webOS appinfo.json file from package.json...');
   		grunt.file.copy('package.json', 'deploy/' + grunt.config('pkg.name') + '/appinfo.json');

		grunt.log.writeln('Packaging webOS app...');
		shell.exec('palm-package -o deploy deploy/' + grunt.config('pkg.name') + '/');

        grunt.log.writeln('Deleting appinfo.json file...');
        grunt.file.delete('deploy/' + grunt.config('pkg.name') + '/appinfo.json');
	});

};
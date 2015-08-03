module.exports = function(grunt) {
	grunt.initConfig({
	   	pkg: grunt.file.readJSON('package.json'),
	   	postcss: {
	       	options: {
		        map: {
		            inline: false, // Save all sourcemaps as separate files...
		            annotation: 'css' // ...to the specified directory
		        },
		        processors: [
		           	require('postcss-import')({ // Import all the css files...
		           		from: "css/main.css" // ...into main.css...
		           	}),
		           	require('postcss-simple-vars')(), // ...replace the variables...
		           	require('autoprefixer-core')({browsers: ['last 2 versions', '> 1%', 'IE 8']}), // ...add vendor prefixes, supporting 99% of users, the last 2 major browser versions and IE 8...
		           	require('cssnano')({ // ...and minify the result.
	           			autoprefixer: false, // Don't run autoprefixer since we've already done that...
	           			comments: {
	           				removeAll: true // ...and remove all comments, even those marked important.s
	           			}
		           	})
		        ]
	       	},
	       	dist: {
	         	src: 'css/main.css', // Compile main.css...
	         	dest: 'css/compiled.css' // ...to compiled.css.
	       	}
	    },
	    watch: {
	      	css: {
	      		files: ['css/**/*.css'], // If any of the .css files change...
	        	tasks: ['postcss'], // ...run postcss.
	        	options: {
	        		spawn: false
	        	},
	      	},
	      	scripts: {
	      		files: ['js/**/*.js'], // If any of the .js files change...
	      		tasks: ['browserify', 'uglify'], // ...run browserify and uglify.
	      		options: {
	      			spawn: false
	      		}
	      	}
	    },
	    connect: { // Start a server...
	      	server: {
	      		options: {
      		        port: 8000 // ...running at http://localhost:8000
	      		}
	      	}
	    },
	    open: {
	    	server: {
	    		path: 'http://localhost:8000/' // Opens the website in your browser
	    	}
	    },
	    browserify: { // Transform common.js require()'s into one file
	    	client: {
		    	src: 'js/app.js', // From app.js...
		    	dest: 'js/bundle.js', // ...to bundle.js.
		    },
	    	options: {
	    		transform: ['reactify'] // Transform JSX into normal JS
	    	}
	    },
	    uglify: { // Optimize the JS file, for a full list of things UglifyJS does look here: http://lisperator.net/uglifyjs/compress
	        bundle: {
	          	files: {
		            'js/bundle.min.js': ['js/bundle.js'] // Transform bundle.js into bundle.min.js
		        }
	        }
	    },
	    copy: { // Copy files to build folder
	    	build: {
	    		files: [
	    			{expand: true, src: 'css/compiled.css', dest: 'build'}, // Copy CSS
	    			{expand: true, src: 'js/bundle.min.js', dest: 'build'}, // Copy JS
	    			{expand: true, src: '*', dest: 'build', filter: 'isFile'} // Copy the rest
	    		]
	    	}
	    }
	});

	// Load the tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-copy');
	// Set the default task to running a server and watching files
	grunt.registerTask('default', ['connect', 'open', 'watch']);
	grunt.registerTask('build', ['postcss', 'browserify', 'uglify', 'copy:build']);
};
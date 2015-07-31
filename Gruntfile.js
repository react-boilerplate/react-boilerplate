module.exports = function(grunt) {
	grunt.initConfig({
	   	pkg: grunt.file.readJSON('package.json'),
	   	postcss: {
	       	options: {
		        map: {
		            inline: false, // save all sourcemaps as separate files...
		            annotation: 'css' // ...to the specified directory
		        },
		        processors: [
		           	require('postcss-import')({ // import all the css files into main.css
		           		from: "css/main.css"
		           	}),
		           	require('postcss-simple-vars')(), // replace the variables
		           	require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes
		           	require('cssnano')(), // and minify the result
		        ]
	       	},
	       	dist: {
	         	src: 'css/main.css',
	         	dest: 'css/compiled.css'
	       	}
	    },
	    watch: {
	      	css: {
	      		files: ['css/*.css', 'css/*/*.css'], // if any of the .css files change
	        	tasks: ['postcss'], // run the css task
	        	options: {
	        		spawn: false
	        	},
	      	},
	      	scripts: {
	      		files: ['js/*.js', 'js/*/*.js'], // if any of the .js files change
	      		tasks: ['browserify', 'uglify'], // transform all the requires into js/bundle.js and then uglify js/bundle.js into js/bundle.min.js
	      		options: {
	      			spawn: false
	      		}
	      	}
	    },
	    connect: {
	      	server: {
	      		options: {
      		        port: 8000
	      		}
	      	}
	    },
	    browserify: {
	    	client: {
		    	src: 'js/app.js',
		    	dest: 'js/bundle.js',
		    },
	    	options: {
	    		transform: ['reactify'] // transform jsx into js
	    	}
	    },
	    uglify: {
	        bundle: {
	          	files: {
		            'js/bundle.min.js': ['js/bundle.js']
		        }
	        }
	    }
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// Default task
	grunt.registerTask('default', ['connect', 'watch']);
};
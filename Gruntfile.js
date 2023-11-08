'use strict';

module.exports = function (grunt) {
  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    replace:'grunt-text-replace'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Create less task for generate different theme css
  var lessArray = [];
  var lessTasks = [];
  var themes = ['default','propel','ap4default','ap4voda'];
  var path = 'app/web/static/style/';
  themes.forEach(function(theme) {
      lessTasks[theme] = {options:{paths:{},modifyVars: {},plugins: [new (require('less-plugin-clean-css'))({advanced: true})]},
                          expand: true, cwd: {}, src: ['*.less','3rd/*.less'], dest: {}, ext: '.css', files:{}};
      lessTasks[theme]['options']['paths'] = path + theme + '/css/';
      lessTasks[theme]['options']['modifyVars']['theme_current'] = theme;
      lessTasks[theme]['options']['modifyVars']['version_current'] = 'production';
      lessTasks[theme]['cwd'] = path + 'less/';
      lessTasks[theme]['dest'] = path + theme + '/css/';
      lessTasks[theme]['files'][path +  theme + '/css/index.css'] = ['*.css','3rd/*.css'];
      lessArray.push('less:' + theme);
  });

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),

    yeoman: {
      // configurable paths
      appstatic: 'app/web/static',
      templates: 'app/web/templates',
      templates_min:'app/web/templates/min',
      dist: 'static'
    },

    less: lessTasks,

    //clear file
    clean: {
      dist:{
        src: ['.tmp','<%= yeoman.dist %>/*','<%= yeoman.templates_min %>/*'],
        dot: true
      }
    },

    replace:{
    	basetemplate:{
    		src:['<%= yeoman.templates %>/base/base.html'],
    		dest:'<%= yeoman.templates_min %>/base/',
    		replacements:[{from:/<link\s+rel="stylesheet"\s+type="text\/css"\s+href="{%\s*static\s+"(\S+)"\s*%}"\s*\/>/g,
    		               to:'<link rel="stylesheet" type="text/css" href="$1" />'},
    		               {from:/<script\s+type="text\/javascript"\s+src="\s*{%\s*static\s+"(\S+)"\s*%}"\s*>\s*<\/script>/g,
    		            	   to:'<script type="text/javascript" src="$1"></script>'}]
    	},
    	moduletemplate:{
    		src:['<%= yeoman.templates %>/byoip_index.html',
    		     '<%= yeoman.templates %>/fw_index.html',
    		     '<%= yeoman.templates %>/lb_index.html',
    		     '<%= yeoman.templates %>/nat_index.html',
    		     '<%= yeoman.templates %>/nc_index.html',
    		     '<%= yeoman.templates %>/pnfw_index.html',
    		     '<%= yeoman.templates %>/sm_index.html',
    		     '<%= yeoman.templates %>/vs_index.html',
             '<%= yeoman.templates %>/llb_index.html'],
    		dest:'<%= yeoman.templates_min %>/',
    		replacements:[{from:/<link\s+rel="stylesheet"\s+type="text\/css"\s+href="{%\s*static\s+"(\S+)"\s*%}"\s*\/>/g,
	               to:'<link rel="stylesheet" type="text/css" href="$1" />'},
	               {from:/<script\s+type="text\/javascript"\s+src="\s*{%\s*static\s+"(\S+)"\s*%}"\s*>\s*<\/script>/g,
	            	   to:'<script type="text/javascript" src="$1"></script>'}]
    	},
    	basetemplate_back:{
    		src:['<%= yeoman.templates_min %>/base/*.html'],
    		overwrite:true,
    		replacements:[{from:/<link\s+rel="stylesheet"\s+href="(\S+)"\s*>/g,
    		               to:'<link rel="stylesheet" type="text/css" href="{% static "$1" %}" />'},
    		               {from:/<script\s+src="\s*(\S+)"\s*>\s*<\/script>/g,
    		            	   to:'<script type="text/javascript" src="{% static "$1" %}"></script>'}]
    	},
    	moduletemplate_back:{
    		src:['<%= yeoman.templates_min %>/*.html'],
    		overwrite:true,
    		replacements:[{from:/<link\s+rel="stylesheet"\s+href="(\S+)"\s*>/g,
	               to:'<link rel="stylesheet" type="text/css" href="{% static "$1" %}" />'},
	               {from:/<script\s+src="\s*(\S+)"\s*>\s*<\/script>/g,
	            	   to:'<script type="text/javascript" src="{% static "$1" %}"></script>'}]
    	}
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '*/**.js',
          dest: '.tmp/concat'
        }]
      }
    },
    
    ngtemplates: {
        fw: {
	    	options: {
	            module: 'NetworkAutomationPorlets',
	            htmlmin: {
	              collapseBooleanAttributes: false,
	              collapseWhitespace: true,
	              removeAttributeQuotes: false,
	              removeEmptyAttributes: false,
	              removeRedundantAttributes: false,
	              removeScriptTypeAttributes: false,
	              removeStyleLinkTypeAttributes: false
	            },
	            prefix: '/na/static/firewallrule',
	            usemin: 'firewallrule.min.js',
	          },
	          cwd: '<%= yeoman.appstatic %>/firewallrule',
	          src: ['views/*.html'],
	          dest: '.tmp/templates_firewallrule.js'
        },
        pnfw: {
	    	options: {
	            module: 'NetworkAutomationPorlets',
	            htmlmin: {
	              collapseBooleanAttributes: false,
	              collapseWhitespace: true,
	              removeAttributeQuotes: false,
	              removeEmptyAttributes: false,
	              removeRedundantAttributes: false,
	              removeScriptTypeAttributes: false,
	              removeStyleLinkTypeAttributes: false
	            },
	            prefix: '/na/static/pnfw',
	            usemin: 'pnfw.min.js'
	          },
	          cwd: '<%= yeoman.appstatic %>/pnfw',
	          src: ['views/*.html'],
	          dest: '.tmp/templates_pnfw.js'
        },
        byoip: {
	    	options: {
	            module: 'NetworkAutomationPorlets',
	            htmlmin: {
	              collapseBooleanAttributes: false,
	              collapseWhitespace: true,
	              removeAttributeQuotes: false,
	              removeEmptyAttributes: false,
	              removeRedundantAttributes: false,
	              removeScriptTypeAttributes: false,
	              removeStyleLinkTypeAttributes: false
	            },
	            prefix: '/na/static/byoip',
	            usemin: 'byoip.min.js'
	          },
	          cwd: '<%= yeoman.appstatic %>/byoip',
	          src: ['views/*.html'],
	          dest: '.tmp/templates_byoip.js'
        }
    },
    
    filerev:{
    	options:{
    		algorithm: 'md5',
    		length: 8
    	},
    	js:{
    		src:'<%= yeoman.dist %>/**/*.js'
    	},
    	css:{
    		src:'<%= yeoman.dist %>/**/*.css'
    	}    	
    },

    useminPrepare: {
      html: ['<%= yeoman.templates_min %>/**/*.html'],
      options: {
          dest: '<%= yeoman.dist %>',
          flow: {
              steps: {
                js: ['concat','uglifyjs'],
                css: ['concat', 'cssmin']
              },
              post: {
                js: [{
                  name: 'uglify',
                  createConfig: function (context, block) {
                    var generated = context.options.generated;
                    generated.options = { mangle: false};
                  }
                }]
              }
            }
        }
    },

    usemin: {
      html: ['<%= yeoman.templates_min %>/{,*/}*.html'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    }
  });

  //less task
  grunt.registerTask('build-style','less');
  //build task
  grunt.registerTask('build', [
    'clean',
    'replace:basetemplate',
    'replace:moduletemplate',
    'useminPrepare',
    'ngtemplates',
    'concat', 
    'ngAnnotate',
    'uglify',
    'filerev',
    'usemin',
    'replace:basetemplate_back',
    'replace:moduletemplate_back'
  ]);
  
};

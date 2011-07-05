# [scrollUtils]() - jQuery plugin for progress bar ui widget
================================

Usage
---------------------
See wiki on github: https://github.com/alextk/scrollUtils/wiki

Pre-compiled scripts
--------------------
If you're not interested in compiling your own version of scrollUtils, you can grab the pre-compiled scripts from the
[dist](https://github.com/alextk/scrollUtils/tree/master/dist/) directory and get started quickly. Otherwise, take a look below.


What you need to build scrollUtils
----------------------------
In order to build scrollUtils, you need to have GNU make 3.8 or later, Node.js 0.2 or later, and git 1.7 or later.
(Earlier versions might work OK, but are not tested.)

Windows users have two options:

1. Install [msysgit](https://code.google.com/p/msysgit/) (Full installer for official Git),
   [GNU make for Windows](http://gnuwin32.sourceforge.net/packages/make.htm).
   Next you gonna need to build node js exe file and then copy it into mingw/bin folder. To build node js follow this guide:
   (https://github.com/joyent/node/wiki/Building-node.js-on-mingw). To install c++/g++ compilers run:

   mingw-get install gcc g++ mingw32-make

   To install phyton, simply download it from link on the guide, and add it to PATH variable.

How to build scrollUtils
------------------
First, clone a copy of the main scrollUtils git repo by running `git clone git@github.com:alextk/scrollUtils.git`.

Then, in the main directory of the distribution (the one that this file is in), type
the following to build scrollUtils:

	make

You can also create each individually using these commands:

	make js		  # Build non-minified scrollUtils source
	make css		# Generate css from sass and copy images into dist folder
	make min 		# Build minified JS and CSS
	make pack		# Build minified and packed scrollUtils JS (smallest filesize!)

To generate documentation using jGrouseDoc-2.1 (will create docs folder inside dist folder) run:

  make doc

To build and test the source code against JSLint type this:

	make lint

Finally, you can remove all the built files using the command:

	make clean


Building to a different directory
---------------------------------
If you want to build scrollUtils to a directory that is different from the default location, you can specify the PREFIX
directory: `make PREFIX=/home/alex/jqext/ [command]`

With this example, the output files would end up in `/home/craig/qtip/dist/`.

Special thanks
--------------
Big shout-out to the jQuery team for providing the directory structure and base files for the git repo, as well as the base-files for the new NodeJS build system!
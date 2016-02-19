module.exports = function(config) {
  config.set({
    files: [
			'node_modules/jquery/dist/jquery.js',
      'dist/jquery.emojiRatings.min.js',
			'test/setup.js',
      'test/spec/*'
    ],
    plugins: ['karma-qunit', 'karma-phantomjs-launcher'],
    frameworks: ['qunit'],
    browsers: ['PhantomJS'],
    port: 9876,
    reporters: ['progress'],
    // cli runner port
    runnerPort: 9100,
		autoWatch: true,
    captureTimeout: 60000,
    logLevel: config.LOG_INFO,
    singleRun: false
  });
};

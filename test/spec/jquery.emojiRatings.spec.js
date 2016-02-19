(function ($, QUnit) {
	"use strict";

	var $testCanvas = $("#testCanvas");
	var $fixture = null;

	QUnit.module("jQuery Emoji Ratings", {
		beforeEach: function () {
			// fixture is the element where your jQuery plugin will act
			$fixture = $("<div/>");

			$testCanvas.append($fixture);
		},
		afterEach: function () {
			// we remove the element to reset our plugin job :)
			$fixture.remove();
		}
	});

	QUnit.test("is inside jQuery library", function ( assert ) {
		assert.equal(typeof $.fn.emojiRating, "function", "has function inside jquery.fn");
		assert.equal(typeof $fixture.emojiRating, "function", "another way to test it");
	});

	QUnit.test("returns jQuery functions after called (chaining)", function ( assert ) {
		assert.equal(typeof $fixture.emojiRating().on, "function", "'on' function must exist after plugin call");
	});

	QUnit.test("caches plugin instance", function ( assert ) {
		$fixture.emojiRating();
		assert.ok($fixture.data("plugin_emojiRating"), "has cached it into a jQuery data");
	});

	QUnit.test("enable custom config", function ( assert ) {
		$fixture.emojiRating({
			emoji: "U+1F64F",
			fontSize: 32,
		});

		var pluginData = $fixture.data("plugin_emojiRating");

		assert.deepEqual(pluginData.settings, {
			count: 5,
			fontSize: 32,
			emoji: "U+1F64F",
			inputName: "rating"
		}, "extend plugin settings");

	});

	QUnit.test("Appends 5 <span>s and 1 <style> element", function ( assert ) {
		$fixture.emojiRating();

		assert.equal($fixture.children().length, 6);
	});

	QUnit.test("has #colorEmojis working as expected", function ( assert ) {
		$fixture.emojiRating();

		var instance = $fixture.data("plugin_emojiRating"),
				expectedOpacity = 0.2;

		// Is last rendered emoji at initial opacity
		assert.equal(parseFloat($fixture.find("span:last-child").css("opacity"), 10).toFixed(1), expectedOpacity);

		instance.colorEmojis(5);
		assert.equal($fixture.find("span:last-child").css("opacity"), 1);
	});

}(jQuery, QUnit));

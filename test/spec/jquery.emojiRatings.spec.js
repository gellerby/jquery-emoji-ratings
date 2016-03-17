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
			inputName: "rating",
			onUpdate: null
		}, "extend plugin settings");

	});

	QUnit.test("Appends a container with class 'jqEmoji-container' with 5 <span>s and 1 <style> element", 
		function ( assert ) {
			$fixture.emojiRating();

			var container = $fixture.find("div");

			assert.equal(container.hasClass("jqEmoji-container"), true);
			assert.equal(container.children("span").length, 5);
		}
	);

	QUnit.test("has #colorEmojis working as expected", 
		function ( assert ) {
			$fixture.emojiRating();

			var instance = $fixture.data("plugin_emojiRating"),
					expectedOpacity = 0.2,
					emojiSelector = $fixture.find(".jqEmoji-container").find("span:last-child");

			function roundToHundredth(number) {
				return parseFloat(number, 10).toFixed(1);
			}

			// Is last rendered emoji at initial opacity
			assert.equal(roundToHundredth(emojiSelector.css("opacity")), expectedOpacity);

			instance.colorEmojis(5);
			assert.equal($fixture.find("span:last-child").css("opacity"), 1);
		}
	);

	QUnit.test("has click handles working as expected", 
		function ( assert ) {
			$fixture.emojiRating();

			var 
				container = $fixture.find("div"),
				NUMBER = 5;

			container.find("span:nth-child(" + NUMBER + ")").trigger("click");

			assert.equal($fixture.find(".emoji-rating").val(), NUMBER);
		}
	);

	QUnit.test("has emoji dictionary lookup working as expected", 
		function ( assert ) {
			$fixture.emojiRating({
        emoji: "poo"
      });

      var 
        container = $fixture.find("div"),
        expected = "💩",
        value = container.find("span:first-child").html();

      assert.equal(value, expected);
		}
	);

}(jQuery, QUnit));
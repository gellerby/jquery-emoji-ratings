// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	// Create the defaults once
	var 
		pluginName = "emojiRating",
		clicked = false,
		$element,
		defaults = {
			emoji: "U+2B50",
			count: 5,
			fontSize: 16,
			inputName: "rating",
			onUpdate: null
		},
    emojiDictionary = {
      smile: "U+1F603",
      wink: "U+1F609",
      laughing: "U+1F606",
      blush: "U+1F60A",
      heart_eyes: "U+1F60D",
      kissing_heart: "U+1F618",
      heart: "U+2764",
      heart_with_arrow: "U+1F498",
      broken_heart: "U+1F494",
      tongue_out_wink: "U+1F61C",
      tongue_out_eyes_closed: "U+1F61D",
      angry: "U+1F620",
      crying: "U+1F622",
      scream: "U+1F631",
      pray: "U+1F64F",
      poo: "U+1F4A9",
      star: "U+2B50",
      thinking: "U+1F914",
      hugging: "U+1F917"
    };

	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.element = element;
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	function lookupEmoji(emoji) {
		return emojiDictionary[emoji];
	}

	function decodeEmoji(emoji) {
		if (emoji.indexOf("U+") < 0) {
        emoji = lookupEmoji(emoji);		
			}
		return "&#x" + emoji.slice(2) + ";";
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function () {
			$element = $(this.element);

			this.count = 0;
			this.setupStyles();
			this.renderEmojis();
			this.handleClick();
			this.handleHover();
		},
		setupStyles: function() {
			var 
				defaultRules = "cursor:pointer;opacity:0.2;text-decoration:none;",
				fontRule = "font-size:" + this.settings.fontSize + "px;",
				styles = ".jqEmoji{" + defaultRules + fontRule + "}";

			$element.append("<style>" + styles + "</style>");
		},
		renderEmojis: function () {
			var 
				emoji = decodeEmoji(this.settings.emoji),
				count = this.settings.count,
				container = "<div class='jqEmoji-container'>",
				star;

			for (var i = 0; i < count; i++) {
				star = "<span class='jqEmoji' data-index='" + i + "'>" + emoji + "</span>";
				container += star;
			}
			container += "</div>";

			$element.append(container);
		},
		clearEmojis: function() {
			$element.find(".jqEmoji").each( function() {
				$(this).css("opacity", 0.2);
			});
		},
		colorEmojis: function(count) {
			this.clearEmojis();

			for (var i = 0; i < count; i++) {
				$element.find(".jqEmoji").eq(i).css("opacity", 1);
			}
		},
		handleClick: function() {
			var 
				self = this;

			$element.on("click", ".jqEmoji", function() {
				var 
          index = $(this).data("index"),
					count = parseInt(index, 10) + 1;

				self.colorEmojis(count);
				self.count = count;

				if (!clicked) {
					self.appendInput(count);
					clicked = true;
				} else {
					self.updateInput(count);
				}
				if ($.isFunction(self.settings.onUpdate)) {
					self.settings.onUpdate.call(self, count);
				}
			});
		},
		handleHover: function() {
			var 
				self = this;

			$element.on({
				mouseenter: function() {
					var 
						count = parseInt($(this).data("index"), 10) + 1;

					if (clicked) {
						return;
					}
					self.colorEmojis(count);
				},
				mouseleave: function() {
					if (!clicked) {
						self.clearEmojis();
					}
				}
			}, ".jqEmoji" );
		},
		appendInput: function(count) {
			var 
				inputName = this.settings.inputName,
				defaultAttrs = "<input type='hidden' class='emoji-rating'",
				inputElem = defaultAttrs + " name='" + inputName + "' value='" + count + "' />";

			$element.append(inputElem);
		},
		updateInput: function(count) {
			var 
				inputElem = $element.find("input.emoji-rating");

			inputElem.val(count);
		}
	});

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		});
	};

})( jQuery, window, document );
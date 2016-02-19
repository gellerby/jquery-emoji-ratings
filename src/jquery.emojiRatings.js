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
			defaults = {
				emoji: "U+2B50",
				count: 5,
				fontSize: 16,
				inputName: "rating"
			};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
						// call them like the example bellow
						this.setupStyles();
						this.renderEmojis();
						this.handleClick();
						this.handleHover();
				},
				decodeEmoji: function(emoji) {
					// convert unicode to html entity
					if (emoji.indexOf("U+") > -1) {
	    			return "&#x" + emoji.slice(2) + ";";
					}

					return emoji;
				},
				setupStyles: function() {
					var 
						defaultRules = "cursor:pointer;opacity:0.2;text-decoration:none;",
						fontRule = "font-size:" + this.settings.fontSize + "px;",
						styles = ".jqEmoji{" + defaultRules + fontRule + "}";

					$(this.element).append("<style>" + styles + "</style>");
				},
				renderEmojis: function () {
					var 
						emoji = this.decodeEmoji(this.settings.emoji),
						count = this.settings.count,
						container = "<div class='jqEmoji-container'>",
						star;

					for (var i = 0; i < count; i++) {
						star = "<span class='jqEmoji' data-index='" + i + "'>" + emoji + "</span>";
						container += star;
					}
					container += "</div>";

					$(this.element).append(container);
				},
				clearEmojis: function() {
					var
						$element = $(this.element);

					$element.find(".jqEmoji").each( function() {
						$(this).css("opacity", 0.2);
					});
				},
				colorEmojis: function(count) {
					var 
						$element = $(this.element);

					this.clearEmojis();

					for (var i = 0; i < count; i++) {
						$element.find(".jqEmoji").eq(i).css("opacity", 1);
					}
				},
				handleClick: function() {
					var 
						$element = $(this.element),
						self = this;

					$element.on("click", ".jqEmoji", function() {
						var 
							count = parseInt($(this).data("index"), 10) + 1;

						self.colorEmojis(count);
						if (!clicked) {
							self.appendInput(count);
							clicked = true;
						} else {
							self.updateInput(count);
						}
						
					});
				},
				handleHover: function() {
					var 
						$element = $(this.element),
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
						$element = $(this.element),
						inputName = this.settings.inputName,
						defaultAttrs = "<input type='hidden' class='emoji-rating'",
						inputElem = defaultAttrs + " name='" + inputName + "' value='" + count + "' />";

					$element.append(inputElem);
				},
				updateInput: function(count) {
					var 
						$element = $(this.element),
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
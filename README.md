# jQuery Emoji Ratings

![jQuery Emoji Ratings](https://raw.githubusercontent.com/gellerby/jquery-emojiRatings/master/img/demo.gif)

## Browser Support
[Latest Browser Support Tables from caniemoji.com](http://caniemoji.com/)

## Setup
```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="dist/jquery.emojiRatings.min.js"></script>
```

## Usage

```javascript
$('#yourElement').emojiRating(options);
```

## Options
```javascript
// Defaults
options = {
	emoji: 'U+2B50',
	count: 5,
	fontSize: 16,
	inputName: 'rating',
	onUpdate: function() {}
}
```

### Emoji
Use either Unicode Entity or shortname from dictionary below

Shortname | Emoji
--- | ---
smile | &#x1F603;
wink | &#x1F609;
laughing | &#x1F606;
blush | &#x1F60A;
heart_eyes | &#x1F60D;
kissing_heart | &#x1F618;
heart | &#x2764;
heart_with_arrow | &#x1F498;
broken_heart | &#x1F494;
tongue_out_wink | &#x1F61C;
tongue_out_eyes_closed | &#x1F61D;
angry | &#x1F620;
crying | &#x1F622;
scream | &#x1F631;
pray | &#x1F64F; 
poo | &#x1F4A9;
star | &#x2B50;
thinking | &#x1F914;
hugging | &#x1F917;

[Lookup Unicode Entity](http://apps.timwhitlock.info/emoji/tables/unicode)

```javascript
emoji: 'poo' //Default: 'star' or 'U+2B50' ⭐
```

### Count

```javascript
count: 10 //Default: 5
```

### Font Size
```javascript
fontSize: 100 //Default: 16
```

### Input Name

Will generate a hidden input with the name specified 
```html 
<input type="hidden" name="{{inputName}}" value="{{selectedIndex}}" />
```

```javascript
inputName: 'product-rating' //Default: "rating"
```

### onUpdate Callback

Called every time a rating is selected or updated with optional value

```javascript
onUpdate: function(rating) {
	console.log(rating);
}
```

### TODOs

* Add docs on styling with CSS
* More callbacks/event hooks
* Tests for callbacks/event hooks
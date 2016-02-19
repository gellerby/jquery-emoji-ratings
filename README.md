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
	inputName: 'rating'
}
```

### Emoji

[Lookup Unicode Entity](http://apps.timwhitlock.info/emoji/tables/unicode)

```javascript
emoji: 'U+1F438' //Default: U+2B50 ⭐
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

### TODOs

*Add fallback for Chrome
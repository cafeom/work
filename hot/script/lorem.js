function lor(length)
	{
		var length = length || $(this).data('lorem') || (Math.floor(Math.random() * 50) + 3);

		var charAtEndOfOut = function(char, step) {
			return out.indexOf(char, out.length - step - 1) !== -1;
		}
		var randomWord = function() {
			return words[Math.floor(Math.random() * (words.length - 1))];
		}
		var capitalize = function(word) {
			return word[0].toUpperCase() + word.slice(1)
		}

		var paragraph = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt. ut labore et dolore magna aliqua. Enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure dolor reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim est laborum.",
		words = paragraph.split(" "),
		word = "",
		out = capitalize(randomWord());

		for (var i = 1; i < length; i = i + 1)
		{
			word = randomWord();
			out += " ";
			out += (charAtEndOfOut('.', 1) || charAtEndOfOut('?', 1)) ? capitalize(word) : word.toLowerCase();
		}

		out = (charAtEndOfOut('.') || charAtEndOfOut(',') || charAtEndOfOut('?')) ? out.slice(0, -1) + "." : out + ".";
		return out;
	}

function lora(langth)
	{
		return lor(langth).replace(/\.|\,|\?/g, '');
	}
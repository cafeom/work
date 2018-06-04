///////////////////////////////////////////// Variables /////////////////////////////////////////////

	myTitle = document.getElementsByTagName('title')[0].innerText;
	myNames = ['Lee Hi','Main','Test']

///////////////////////////////////////////// Utilities /////////////////////////////////////////////

function Send(content)
	{
		chrome.runtime.sendMessage(
			{
				from : myTitle,
				content : content
			}
		);
	}
function inside(item, array)
	{
		check = false;

		for (var zzz = 0; zzz < array.length; zzz++)
		{
			if ( item == array[zzz] ) {check = true;}
		}

		return check;
	}
function isVisible(obj)
	{
	    if (obj == document) return true
	    
	    if (!obj) return false
	    if (!obj.parentNode) return false
	    if (obj.style) {
	        if (obj.style.display == 'none') return false
	        if (obj.style.visibility == 'hidden') return false
	    }
	    
	    //Try the computed style in a standard way
	    if (window.getComputedStyle) {
	        var style = window.getComputedStyle(obj, "")
	        if (style.display == 'none') return false
	        if (style.visibility == 'hidden') return false
	    }
	    
	    //Or get the computed style using IE's silly proprietary way
	    var style = obj.currentStyle
	    if (style) {
	        if (style['display'] == 'none') return false
	        if (style['visibility'] == 'hidden') return false
	    }
	    
	    return isVisible(obj.parentNode)
	}
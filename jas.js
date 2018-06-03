// when a selection is selected, that selection is indexed to a variable
// when hit a button, selection will change, with the selection type

// the concept of a selection report panel is really nice, it reports the content, images and icons due to selection

function when_selection_init()
	{
		hulk_master = selection;
	}
function selection_from_array(arr)
	{
		select(arr[0].id);

		for (var i = 1; i < arr.length; i++)
		{
			add(arr[i].id);
		}
	}
function change_selection_type(trigger_type)
	{
		$('.selectior_row').remove();

		near_me = find_stuffs_near_me(trigger_type);

		// create .selection_row elements from near_me array

		selection_row = $('<DIV/>', {type: trigger_type, class: 'selection_row'}).appendTo('#mini');
		selection_b4  = $('<DIV/>', {type: trigger_type, class: 'selection_b4'}).appendTo(selection_row);
		selection_af  = $('<DIV/>', {type: trigger_type, class: 'selection_af'}).appendTo(selection_row);

		// so depends on the trigger_type, we will have the equivalent b4 and af

		if ( trigger_type.indexOf('color') >= 0 )
		{
			selection_b4.add(selection_af).css('background-color', hulk_master[0].doc.css(trigger_type));
		}
		else if ( trigger_type.indexOf('font') >= 0 )
		{
			selection_b4.add(selection_af).text(hulk_master[0].doc.css(trigger_type));
		}

		selection_row.contextmenu(function(e)
		{
			if ( e.ctlKey == true )
			{
				selection_from_array(near_me); // you can batch replace content after this step
			}

			e.preventDefault();
		})

		// when the #mini panel shows up, we select our row with W/S keys and change the propeties with arrow keys
	}
function find_stuffs_near_me(which_type)
	{
		// use what we got to easily make this function work

		return found_stuffs;
	}

function change_selection_row(direction)
	{
		if ( direction == 'up' )
		{
			
		}
		else
		{
			
		}
	}

// https://javfinder.is/movie/watch/fhd-s1no-1style-ssni-219-adult-video-i-caught-a-reason-by-the-oil-massage-after-i-repeatedly-punctuated-the-shape-stop-kojima-minami.html
// https://www.youtube.com/watch?v=iULSAN3O8IY
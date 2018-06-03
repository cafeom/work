// when a selection is selected, that selection is indexed to a variable
// when hit a button, selection will change, with the selection type

// the concept of a selection report panel is really nice, it reports the content, images and icons due to selection

function when_selection_init()
	{
		hulk_master = selection;
	}
function change_selection_type(trigger_type)
	{
		$('.selectior_row').remove();

		near_me = find_stuffs_near_me(trigger_type);

		// create .selection_row elements from near_me array

		selection_row = $('<DIV/>', {class: 'selection_row'}).appendTo('#mini');
		selection_b4  = $('<DIV/>', {class: 'selection_b4'}).appendTo(selection_row);
		selection_af  = $('<DIV/>', {class: 'selection_af'}).appendTo(selection_row);

		// so depends on the trigger_type, we will have the equivalent b4 and af
		// btw think about how to quickly replace content (maybe better than what we've got)
	}
function find_stuffs_near_me(which_type)
	{
		// use what we got to easily make this function work

		return found_stuffs;
	}
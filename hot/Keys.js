if ( inside(myTitle, myNames) ) { $(document).ready(function(e) {

window.onkeydown = function(e)
	{
		if ( $('input, textarea, *[contenteditable="true"]').is(":focus") == false )
		{
			keychain = ''; key_map[e.code] = true;

			if ( e.code != 'F5' )
			{
				e.preventDefault();
			}
			else if ( e.shiftKey == true )
			{
				 refresh_the_page(); e.preventDefault();
			}

			if ( e.code.indexOf(/Left|Right/) < 0 )
			{
				if ( e.ctrlKey == true )  { keychain = keychain + 'Ctrl+'; }
				if ( e.shiftKey == true ) { keychain = keychain + 'Shift+'; }
				if ( e.altKey == true )   { keychain = keychain + 'Alt+'; }

				keycode = e.code; keychain = keychain.replace('Control','Ctrl').replace('Left','') + keycode.replace(/Key|Numpad|Arrow/,'').replace('Digit','D'); console.log(keychain);

				if ( global_down != undefined )
				{
					panel_station = false;

					if ( panel_down[sasori_my_man] != undefined )
					{
						if ( panel_down[sasori_my_man][keychain] )
						{
							activo(panel_down[sasori_my_man][keychain]); panel_station = true;
						}
					}

					if ( panel_station == false && global_down[keychain] != undefined )
					{
						activo(global_down[keychain]);
					}
				}

				if ( tagged_down[tagged_mode] != undefined )
				{
					if ( tagged_down[tagged_mode][keychain] != undefined )
					{
						activo(tagged_down[tagged_mode][keychain]);
					}
				}
			}
		}
		else
		{
			if ( e.key == 'Escape' )
			{
				$('H3').blur(); toggle_editable();
			}
		}
	}
window.onkeyup   = function(e)
	{
		if ( $("input, textarea").is(":focus") == false )
		{
			keychain = ''; key_map[e.code] = false;

			if ( e.code != 'F5' )
			{
				e.preventDefault();
			}

			if ( e.code.indexOf(/Left|Right/) < 0 )
			{
				if ( e.ctrlKey == true )  { keychain = keychain + 'Ctrl+'; }
				if ( e.shiftKey == true ) { keychain = keychain + 'Shift+'; }
				if ( e.altKey == true )   { keychain = keychain + 'Alt+'; }

				keycode = e.code; keychain = keychain.replace('Control','Ctrl').replace('Left','') + keycode.replace(/Key|Numpad|Arrow/,'').replace('Digit','D');

				if ( global_up != undefined )
					{
						if ( global_up[keychain] != undefined )
						{
							activo(global_up[keychain]);
						}
					}

				if ( tagged_up[tagged_mode] != undefined )
				{
					if ( tagged_up[tagged_mode][keychain] != undefined )
					{
						activo(tagged_up[tagged_mode][keychain]);
					}
				}
			}
		}
	}

/////////////////////////////////////////// Set-up Functions ///////////////////////////////////////////

window.onmousedown   = function(e)
	{
		if ( e.button == 1 )
		{
			clear(); e.preventDefault();
		}
	}
window.onmouseup     = function(e)
	{
		drag = false;
	}

window.onwheel       = function(e)
	{
		if ( e.ctrlKey == true )
		{
			e.preventDefault();
		}
	}

window.oncontextmenu = function(e)
	{
		
	}
window.onmousemove   = function(e)
	{
		clientX = e.clientX; clientY = e.clientY;
		pageX   = e.pageX;     pageY = e.pageY;
	}

////////////////////////////////////////// Keyboard Functions //////////////////////////////////////////

global_down = {

	'C'      : [toggle_panel,'#color-panel-2'],
	'V'      : [toggle_color_picker],
	'B'      : [toggle_panel,'#color-selector'],
	'Ctrl+L' : [toggle_panel,'#second-load-panel'],

	'Shift+Minus' : [simple_margin,'left'],

	// copy cut and paste //

	'F12'      : [quick_last_loading] ,
	'F11'      : [color_keys_load] ,

	// 'M'        : [grid_by_key],
	'H'        : [div_height_resizable_toggle],
	'F'        : [toggle_flex],
	'T'        : [come_to_me],
	'R'        : [resize_dance],

	'Ctrl+Shift+G' : [unwrap_all] ,

	'Add'      : [add_text],
	'Ctrl+Add' : [toggle_editable],

	'Ctrl+P'   : [capture_the_moment,'doc-standard'],
	'Ctrl+R'   : [resizable_selection],

	'Ctrl+Decimal' : [create_50px_div],

	// new canon //

	// 'Subtract' : [toggle_wireframes],
	'Subtract'  : [damn_sp_size],
	'Backquote' : [toggle_format_panel],
	'Tab'       : [toggle_save_panel],

	'Ctrl+Subtract' : [sp_refresh],

	'J'         : [double_standard] ,

	// instant change //

	'Space'      : [tell_me_col_or_row],
	'Ctrl+Enter' : [quickdraw],

	'Ctrl+E'     : [swap_mode_LP_PP],
};
global_up = {};

tagged_down = {};
tagged_up = {};

panel_down = {
	'prepare-panel' : {
		// 'Up'    : [prepare_tag_and_ingredients_switch,'Up'] ,
		// 'Down'  : [prepare_tag_and_ingredients_switch,'Down'] ,

		// 'W'     : [prepare_tag_and_ingredients_switch,'Up'] ,
		// 'S'     : [prepare_tag_and_ingredients_switch,'Down'] ,

		// 'A'     : [change_prepare_panel, 'Left'],
		// 'D'     : [change_prepare_panel, 'Right'],
		// 'Left'  : [change_prepare_panel, 'Left'],
		// 'Right' : [change_prepare_panel, 'Right'],

		'Slash' : [save_prepare_groups_to_database] ,

		'Up'    : [prepare_item_switch,'Up'] ,
		'Down'  : [prepare_item_switch,'Down'] ,

		'Q'     : [prepare_tag_switch,'Up'] ,
		'E'     : [prepare_tag_switch,'Down'] ,
		'A'     : [prepare_tag_switch, 'Up'],
		'D'     : [prepare_tag_switch, 'Down'],
		'Left'  : [prepare_tag_switch, 'Up'],
		'Right' : [prepare_tag_switch, 'Down'],

		'W'     : [prepare_ingredients_switch, 'Up'],
		'S'     : [prepare_ingredients_switch, 'Down'],

		'F'     : [add_prepare_ingredients],
	},
	'LP' : {

		'R'       : [toggle_panel,'#le-browser'],
		'T'       : [toggle_panel,'#content-panel'],
		'X'       : [toggle_panel,'#anakin'],

		'Enter'   : [toggle_black],
		'Slash'   : [mytest],

		'F8'      : [testing],
		'Ctrl+I'  : [show_the_content_input],

		'0'       : [LP_Ticket,'DIV'] ,
		'1'       : [LP_Ticket,'H3'] ,
		'2'       : [LP_Ticket,'IMG'] ,
		'3'       : [LP_Ticket,'ICON'] ,
		'Decimal' : [LP_Ticket,'LINE'] ,

		'Ctrl+0'  : [LP_Ticket,'STICKER'] ,

		'A'       : [LP_Select_Parent] ,
		'D'       : [LP_DIV_Toggle] ,
		'E'       : [LP_Select_Dups] ,

		'Ctrl+A'     : [LP_Select_In_Folder] ,

		'Up'         : [LP_Switch,'up'] ,
		'Down'       : [LP_Switch,'down'] ,
		'W'          : [LP_Switch,'up'] ,
		'S'          : [LP_Switch,'down'] ,

		'Ctrl+Up'    : [LP_Batch_Switch,'up'] ,
		'Ctrl+Down'  : [LP_Batch_Switch,'down'] ,

		'Shift+Up'   : [LP_Batch_Add,'up'] ,
		'Shift+Down' : [LP_Batch_Add,'down'] ,
		'Shift+W'    : [LP_Batch_Add,'up'] ,
		'Shift+S'    : [LP_Batch_Add,'down'] ,

		'Ctrl+Shift+Up'   : [LP_Batch_Add,'up'] ,
		'Ctrl+Shift+Down' : [LP_Batch_Add,'down'] ,
		'Ctrl+Shift+W'    : [LP_Batch_Add,'up'] ,
		'Ctrl+Shift+S'    : [LP_Batch_Add,'down'] ,

		'Ctrl+D' : [LP_Duplicate] ,
		'Delete' : [LP_Delete] ,
		'F4'     : [LP_Wrap] ,

		'Ctrl+G' : [LP_Group] ,

		'7'      : [quick_key,7],
		'8'      : [quick_key,8],
		'9'      : [quick_key,9],
		'5'      : [quick_key,5],

		'U'        : [key_u_to_update],

		'Ctrl+F'   : [really_making_a_bgi_group] ,

		'D1'       : [click_the_format,'col center center'],
		'D2'       : [click_the_format,'row center center'],
		'D3'       : [click_the_format,'row SB center'],
		'D4'       : [click_the_format,'col left center'],

		'PageUp'   : [move_selection_up_down,'up'],
		'PageDown' : [move_selection_up_down,'down'],

		'Ctrl+X'   : [cut] ,
		'Ctrl+C'   : [copy] ,
		'Ctrl+V'   : [paste] ,
		'Ctrl+Shift+V' : [paste, true] ,
		'Shift+E'  : [make_a_real_sticker] ,
		'Ctrl+B'   : [make_a_bgi_group] ,

		'Ctrl+Z'   : [undo_group] ,
		'Ctrl+H'   : [toggle_the_class,'heize'],

		'BracketLeft'  : [css_sync,'width'],
		'BracketRight' : [css_sync,'height'],
		'Backslash'    : [css_sync,'prompt'],
		'Shift+S'      : [css_sync,'prompt'],

		'Divide'       : [take_a_side],

		// Instant Change

		'Home'           : [change_group_tag_id],
		'Shift+PageUp'   : [change_group, -1],
		'Shift+PageDown' : [change_group,  1],

		'Ctrl+S'   : [quick_saving] ,

		// GoldenEye

		'Q' : [prepare_this_group] ,
	},
};

})}
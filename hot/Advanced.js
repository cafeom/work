$('panel').draggable({ cancel : 'DIV, INPUT' }).dblclick(function(e)
	{
		if ( $(e.target).prop('tagName') == 'PANEL' )
		{
			$(this).toggleClass('collasped')
		}
	}).contextmenu(function(e)
	{
		my_id = $(this).attr('id');

		if ( $(e.target).prop('tagName') == 'PANEL' )
		{
			if ( my_id == 'color-panel' )
			{
				$('body').toggleClass('coloring');
			}
			else if ( my_id == 'color-keys' )
			{
				color_keys_load();
			}
			else if ( my_id == 'color-selector' )
			{
				update_color_selector(e);
			}

			e.preventDefault();
		}

		if ( my_id == 'color-panel-2' )
		{
			if ( e.ctrlKey == false && e.shiftKey == true && e.altKey == false )
			{
				color = 'rgb(255, 255, 255)';

				color_in_row = $('<DIV/>', {class: 'color-in-row'}).appendTo('#color-row-2').attr('color', color).color_in_row();
				color_shape  = $('<DIV/>', {class: 'color_shape'}).appendTo(color_in_row).css('background-color', color);
				color_text   = $('<DIV/>', {class: 'color_text'}).appendTo(color_in_row).text(color);

				color_in_row.attr('og', color);

				$('.selecting_color_text').removeClass('selecting_color_text'); color_text.addClass('selecting_color_text');

				$('#color-row-2').sortable();
			}

			e.preventDefault();
		}
	});
$('#color-row').sortable();
function color_keys_load()
	{
		my_id = parseInt( prompt('max is ' + (color_arrays.length-1), 0) );

		if ( isNaN(my_id) == false && my_id >= 0 && my_id < color_arrays.length )
		{
			my_colors = color_arrays[my_id]; $('.color_key').remove();

			for (var i = 0; i < my_colors.length; i++)
			{
				color_key = $('<DIV/>', {class: 'color-key'}).appendTo('#color-keys').css({ backgroundColor : my_colors[i] });

				if ( my_colors[i].indexOf('a') >= 0 )
				{
					$(color_key).addClass('is_alpha')
				}
			}

			$('.color-key').color_key_click();
		}
	}

//////////////////////////////////////////////// Changer Panel Functions /////////////////////////////////////////////////

// a function fires up after we select a div

function update_changer_panel()
	{
		$('#changer').remove();

		my_propeties = {}; my_propeties_root = 'color background-color border-color font-size font-family'.split(' ');

		// we need to get all elements inside our div selections

		my_sweets = [];

		$(selection).each(function(index, value) {
							
			arr = all(selection[i].id);

			for (var i = 0; i < arr.length; i++)
			{
				my_sweets.push(arr[i]);
			}
				
		})

		console.log(my_sweets);

		// we need to search through all elements and get all the unique propeties

		for (var i = 0; i < my_propeties_root.length; i++)
		{
			my_propeties[my_propeties_root[i]] = [];

			$(my_sweets).each(function(index, value) {

				my_current_propety = my_sweets[i].doc.css(my_propeties_root[i]);
								
				if ( inside(my_current_propety, my_propeties[my_propeties_root[i]]) == false )
				{
					my_propeties[my_propeties_root[i]].push(my_current_propety);
				}

			})
		}

		// we need to create changer_row elements

		for (var i = 0; i < my_propeties_root.length; i++)
		{
			current_propeties = my_propeties[my_propeties_root[i]];

			changer_row = $('<DIV/>', {type: my_propeties_root[i], class: 'changer_row'}).appendTo('#changer');
			changer_b4  = $('<DIV/>', {type: my_propeties_root[i], class: 'changer_b4'}).appendTo(changer_row);
			changer_aft = $('<DIV/>', {type: my_propeties_root[i], class: 'changer_aft'}).appendTo(changer_row);

			for (var j = 0; j < current_propeties.length; j++)
			{
				if ( my_propeties_root[i].indexOf('color') >= 0 )
				{
					changer_b4.add(changer_aft).css('background-color', current_propeties[i]).addClass('changer_color');
				}
				else
				{
					changer_b4.add(changer_aft).text(current_propeties[i]).addClass('changer_text');;
				}
			}
		}
	}

//////////////////////////////////////////////// Content Panel Functions /////////////////////////////////////////////////

function process_the_content()
	{
		my_content = $('#content-input').val().split(/ \*\*\*\n| ------\n/g);

		for (var i = 0; i < my_content.length; i++)
		{
			my_str = my_content[i];

			if ( my_str != '' )
			{
				if ( my_str[0] == '*' )
				{
					g_count++;
					content_group = $('<DIV/>', {class: 'content_group', opseo: g_count}).appendTo('.content-groups[tag="H3"]');
					content_group.text( my_str.replace('*** ', '') );
				}
				else // my_str[0] == '-'
				{
					content_item = $('<DIV/>', {class: 'content_item'}).appendTo('.content-items[tag="H3"]');
					content_item.attr('opseo', g_count).html(my_str.replace('------ ', '').replace(/\n/g, '<br>'));

					if ( content_item.find('br').length && content_item.find('br').first().prev().length == 0 )
					{
						content_item.find('br').first().remove();
					}

					if ( content_item.find('br').length && content_item.find('br').last().prev().length == 0 )
					{
						content_item.find('br').last().remove();
					}
				}
			}
		}

		$('.content-groups[tag="H3"] .content_group').click(function(e)
		{
			opseo = $(this).attr('opseo');
			$('.content-groups[tag="H3"] .curr_group').removeClass('curr_group'); $(this).addClass('curr_group')
			$('.content-items[tag="H3"] .content_item').hide(); $('.content-items[tag="H3"] .content_item[opseo="' + opseo + '"]').show();
		}).contextmenu(function(e)
		{
			opseo = $(this).attr('opseo'); idx = 0;
			collection = $('.content-items[tag="H3"] .content_item[opseo="' + opseo + '"]');

			$(selection).each(function(index, value) {

				if ( idx == collection.length ) { idx = 0; }

				value.doc.html( $(collection[idx]).html() ); idx++;
					
			})

			e.preventDefault();
		})

		$('.content-items[tag="H3"] .content_item').contextmenu(function(e)
		{
			$(this).attr('contenteditable', true);

			e.preventDefault();
		}).click(function(e)
		{
			my_content = $(this).html();

			$(selection).each(function(index, value) { value.doc.html( my_content ); });
		})

		// init

		$('.content-groups[tag="H3"] .content_group').first().trigger('click');
	}
function show_the_content_input()
	{
		$('#content-input').removeClass('hide').focus();
	}
$('#content-input').contextmenu(function(e)
	{
		if ( confirm('process the content?') )
		{
			$(this).addClass('hide'); process_the_content();
		}

		e.preventDefault();
	})

/////////////////////////////////////////////// Image to Base64 Functions ////////////////////////////////////////////////

function toDataURL(url, callback)
	{
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var reader = new FileReader();
			reader.onloadend = function() {
				callback(reader.result);
			}
			reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	}

function mytest()
	{
		chil = $('#doc img'); the_id = 0; my_urls = [];

		toDataURL_and_beyond(chil, the_id, my_urls);
	}
function toDataURL_and_beyond(arr, idx, worked_arr)
	{
		if ( arr.length != worked_arr.length )
		{
			toDataURL( arr[idx].src , function(dataUrl) {

				worked_arr.push(dataUrl); my_new_id = idx + 1;

				toDataURL_and_beyond(arr, my_new_id, worked_arr);

			})
		}
		else
		{
			for (var i = 0; i < arr.length; i++)
			{
				arr[i].src = worked_arr[i];

				console.log(arr[i]);
			}

			alert('done!')
		}
	}

/////////////////////////////////////////////// Prepare to Save Functions ////////////////////////////////////////////////

$('#pew').contextmenu(function(e)
	{
		$.ajax({
			url  : "export.php",
			type : 'post',
			data : { action : 'testing', val : prompt('whats my val?') },
			success : function(data) { console.log(data); }
		})

		e.preventDefault();
	})

my_tags_array = `
		header hero-background-image footer
		icon-row
		input select`.replace(/\t/g,'').split('\n');

function prepare_this_group()
	{
		// should we prepare multiple selection at once ?
		// ==> yes we should, we will need that kind of function when we want to prepare multiple sections at once

		$(selection).each(function(index, value) {

			// proceed_check

			proceed_check = true;
			$('.prepared_item').each(function() {
				if ( $(this).data('id') == value.id ) { proceed_check = false; return false; }
			})

			if ( proceed_check == true )
			{
				// shell creation

				console.log(value.id); console.log(value.doc);

				prepared_item = $('<DIV/>', {class: 'prepared_item'}).appendTo('#prepared-items').text('div').data({
					id : value.id, tag : $('.prepared_tag').first().data('info'), ingredients : [], saved : false,
				});

				// shell function apply

				prepared_item.click(function(e)
				{
					$('.prepared_item.selected').removeClass('selected'); $(this).addClass('selected');

					// update the #prepared-tags and #prepared-ingredients columns

					update_prepare_tags_and_ingredients();
				})
			}

		})

		if ( $('.selected.prepared_item').length == 0 ) { $('.prepared_item').first().addClass('selected'); }

		update_prepare_tags_and_ingredients();
	}
function update_prepare_tags_and_ingredients()
	{
		my_item = $('.selected.prepared_item').first(); $('.prepared_ingredient, .prepared_tag').removeClass('selected hovering');

		my_data = $(my_item).data(); my_tag = my_data.tag; my_ingredients = my_data.ingredients;

		for (var i = 0; i < my_ingredients.length; i++)
		{
			$('.prepared_ingredient').each(function(index, value) {
				if ( $(this).data('info') == my_ingredients[i] ) { $(this).addClass('selected'); return false; }
			})
		}

		$('.prepared_tag').each(function(index, value) {
			if ( $(this).data('info') == my_tag ) { $(this).addClass('selected'); return false; }
		})

		// for your convenient

		if ( $('.hovering.prepared_ingredient').length == 0 )
		{
			$('.prepared_ingredient').first().addClass('hovering');
		}
	}

function set_up_the_prepare_panel()
	{
		for (var i = 0; i < my_tags_array.length; i++)
		{
			if ( my_tags_array[i] != '' )
			{
				my_tag_row = my_tags_array[i].split(' ');

				// shell creation

				for (var j = 0; j < my_tag_row.length; j++)
				{
					prepared_tag = $('<DIV/>', {class: 'prepared_tag'}).appendTo('#prepared-tags');
					prepared_tag.text(my_tag_row[j]).data({ pack : i, info : my_tag_row[j] });
					prepared_ingredient = $('<DIV/>', {class: 'prepared_ingredient'}).appendTo('#prepared-ingredients');
					prepared_ingredient.text(my_tag_row[j]).data({ pack : i, info : my_tag_row[j] });

					prepared_tag.click(function(e)
					{
						$('.prepared_tag').removeClass('selected'); $(this).addClass('selected');
						$('.selected.prepared_item').data('tag', $(this).data('info'));
					})

					prepared_ingredient.click(function(e)
					{
						if ( e.ctrlKey == true )
						{
							$(this).toggleClass('selected');
						}
						else
						{
							$('.prepared_ingredient').removeClass('selected'); $(this).addClass('selected');
						}

						// update to the prepared_item

						my_array_of_ingredients = [];

						$('.selected.prepared_ingredient').each(function(index, value) {
							my_array_of_ingredients.push( $(this).data('info') )
						})

						$('.selected.prepared_item').data('ingredients', my_array_of_ingredients);

					}).contextmenu(function(e)
					{
						$(this).removeClass('selected'); e.preventDefault();
					})
				}
			}
		}
	}
function add_prepare_ingredients()
	{
		if ( $('.hovering.prepared_ingredient').length )
		{
			$('.hovering.prepared_ingredient').toggleClass('selected');

			my_array_of_ingredients = [];

			$('.selected.prepared_ingredient').each(function(index, value) {
				my_array_of_ingredients.push( $(this).data('info') )
			})

			$('.selected.prepared_item').data('ingredients', my_array_of_ingredients);
		}
	}

function save_prepare_groups_to_database()
	{
		prepare_name   = prompt('prepare prefix = ?', prepare_name);
		key_black_list = 'inner outer prese icon text doc img group_id group_tag_id origin'.split(' ');

		$('.prepared_item').each(function(index, value) {

			my_group         = geet( $(this).data('id') ); console.log(my_group);
			save_name        = prepare_name + ' ' + $(this).data('tag') + ' has ' + $(this).data('ingredients');
			save_types       = [$(this).data('tag')];
			save_ingredients = $(this).data('ingredients');

			// auto padding numbers

			find_my_edge_elements(my_group.doc);

			// DOM part

			item      = my_group;
			doc_clone = item.doc.clone().oh();
			out_clone = item.outer.clone().oh();

			// Object part

			all(my_group.id); data_clone = []; discover[0].fonts = font_links; discover[0].color_arrays = color_arrays;

			for (var i = 0; i < discover.length; i++)
			{
				if ( discover[i].doc.hasClass('rowHolder') == false )
				{
					obj = discover[i]; newObj = {};

					for (var key in obj)
					{
						if ( inside(key, key_black_list) == false )
						{
							newObj[key] = obj[key];
						}
					}

					data_clone.push(newObj);
				}
			}

			data_clone = JSON.stringify(data_clone);

			// save part

			capture_and_save_the_element(my_group.doc[0], {
				action : 'post',
				name   : save_name,
				type   : JSON.stringify(save_types),
				noona  : out_clone,
				doc    : doc_clone,
				data   : data_clone,
				ingredients : JSON.stringify(save_ingredients),
			});

		})
	}
function capture_the_element(elem)
	{
		html2canvas(elem, {backgroundColor : null}).then(function(canvas) {

			scrBase64 = canvas.toDataURL("image/png");

			$(canvas).appendTo('body');

		});
	}
function capture_and_save_the_element(elem, save_obj)
	{
		html2canvas(elem, {backgroundColor : null}).then(function(canvas) {

			new_canvas = document.createElement('canvas');
			ctx        = new_canvas.getContext('2d');
			image      = new Image();

			image.onload = function(e)
			{
				if ( image.naturalWidth * image.naturalHeight < 2500000 ) { phanso = 2; } else { phanso = 1; }

				new_canvas.width  = image.naturalWidth / phanso;
				new_canvas.height = image.naturalHeight / phanso;

				ctx.drawImage(image, 0, 0, image.naturalWidth / phanso, image.naturalHeight / phanso);

				save_obj.image = new_canvas.toDataURL("image/jpg"); ajax_save(save_obj);
			}

			image.src = canvas.toDataURL("image/jpg");

		});
	}

function testing()
	{
		$(selection).each(function(index, value) {
							
			capture_the_element( value.doc[0] );

		})
	}

////////////////////////////////////////////////// Le Browser Functions //////////////////////////////////////////////////

function set_up_le_browser()
	{
		for (var i = 0; i < my_tags_array.length; i++)
		{
			if ( my_tags_array[i] != '' )
			{
				my_tag_row = my_tags_array[i].split(' ');

				for (var j = 0; j < my_tag_row.length; j++)
				{
					itag = $('<DIV/>', {class: 'itag'}).appendTo('#le-mid').text(my_tag_row[j]);
				}
			}
		}

		$('.itag').click(function(e)
		{
			if ( e.ctrlKey == false && e.shiftKey == false )
			{
				srm('sitag'); $(this).addClass('sitag');
			}
			else if ( e.ctrlKey == true && e.shiftKey == false )
			{
				$(this).toggleClass('sitag');
			}

			update_le_browser_results();
			
		}).contextmenu(function(e)
		{
			$('#le-curr-tag').text( $(this).text() );
			srm('ssitag'); $(this).addClass('ssitag');

			update_le_browser_results();

			e.preventDefault();
		})
	}
function update_le_browser_results()
	{
		current_zone = []; final_zone = []; ingredients_land = []; curr_tag = $('#le-curr-tag').text();

		$('.sitag').each(function(index, value) {
			ingredients_land.push( $(this).text() );
		})

		for (var i = 0; i < database.length; i++)
		{
			if ( inside(curr_tag, database[i][2]) )
			{
				current_zone.push([database[i], i]);
			}
		}

		if ( ingredients_land.length == 0 )
		{
			final_zone = current_zone;
		}
		else
		{
			for (var i = 0; i < current_zone.length; i++)
			{
				if ( inside(current_zone[i][0][2][0], ingredients_land) )
				{
					final_zone.push([current_zone[i][0], current_zone[i][1]]);
				}
			}
		}

		$('#le-down').empty();

		for (var i = 0; i < final_zone.length; i++)
		{
			loot_item = $('<DIV/>', {class: 'loot_item'}).appendTo('#le-down').text(final_zone[i][0][1]).data({
				id : final_zone[i][1]
			}).attr('dix', final_zone[i][1]).attr('ix', final_zone[i][0][0]);
		}

		$('.loot_item').click(function(e)
		{
			srm('sel_loot'); $(this).addClass('sel_loot'); db_item = database[$(this).data('id')];

			if ( db_item[7] != '' )
			{
				$('#le-sign').attr('src', db_item[7]);
			}
			else
			{
				$('#le-sign').removeAttr('src');
			}
		}).dblclick(function(e)
		{
			dix = parseInt($(this).attr('dix')); load_group(dix);
		}).contextmenu(function(e)
		{
			if ( e.ctrlKey == false )
			{
				delete_group(this);
			}
			else
			{
				create_mydrawrow(this);
			}

			e.preventDefault();
		});
	}
$('#le-sign').on('load', function () {

	$(this).css('width', '100%');

	if ( $(this).outerHeight() > 900 )
	{
		$('#le-preview').addClass('le-scroll');
	}
	else
	{
		$('#le-preview').removeClass('le-scroll');
	}});

///////////////////////////////////////////////// Prepare Panel Functions ////////////////////////////////////////////////

function change_prepare_panel(direction)
	{
		if ( direction == 'Right' )
		{
			if ( $('#prepare-panel .working').next().length )
			{
				$('#prepare-panel .working').removeClass('working').next().addClass('working');
			}
			else
			{
				$('#prepare-panel .working').removeClass('working'); $('#prepare-panel > *').last().addClass('working');
			}
		}
		else
		{
			if ( $('#prepare-panel .working').prev().length )
			{
				$('#prepare-panel .working').removeClass('working').prev().addClass('working');
			}
			else
			{
				$('#prepare-panel .working').removeClass('working'); $('#prepare-panel > *').first().addClass('working');
			}
		}
	}
function prepare_tag_and_ingredients_switch(direction)
	{
		if ( $('#prepared-tags').hasClass('working') )
		{
			prepare_tag_switch(direction);
		}
		else if ( $('#prepared-ingredients').hasClass('working') )
		{
			prepare_ingredients_switch(direction);
		}
		else
		{
			prepare_item_switch(direction);
		}
	}

function prepare_ingredients_switch(direction)
	{
		if ( $('.hovering.prepared_ingredient').length == 0 )
		{
			$('.prepared_ingredient').first().addClass('hovering');
		}
		else
		{
			if ( direction == 'Up' )
			{
				if ( $('.hovering.prepared_ingredient').prev().length )
				{
					$('.hovering.prepared_ingredient').removeClass('hovering').prev().addClass('hovering');
				}
				else
				{
					$('.hovering.prepared_ingredient').removeClass('hovering'); $('.prepared_ingredient').last().addClass('hovering');
				}
			}
			else
			{
				if ( $('.hovering.prepared_ingredient').next().length )
				{
					$('.hovering.prepared_ingredient').removeClass('hovering').next().addClass('hovering');
				}
				else
				{
					$('.hovering.prepared_ingredient').removeClass('hovering'); $('.prepared_ingredient').first().addClass('hovering');
				}
			}
		}

		if ( $('.hovering.prepared_ingredient').length )
		{
			my_top = $('.hovering.prepared_ingredient').position().top; scrollTop = $('#prepared-ingredients').scrollTop();

			if ( (my_top > 280) || (my_top + scrollTop < scrollTop) )
			{
				$('#prepared-ingredients').scrollTop(my_top + scrollTop);
			}
		}
	}
function prepare_tag_switch(direction)
	{
		if ( $('.selected.prepared_tag').length == 0 )
		{
			$('.prepared_tag').first().addClass('selected');
		}
		else
		{
			if ( direction == 'Up' )
			{
				if ( $('.selected.prepared_tag').prev().length )
				{
					$('.selected.prepared_tag').removeClass('selected').prev().addClass('selected');
				}
				else
				{
					$('.selected.prepared_tag').removeClass('selected'); $('.prepared_tag').last().addClass('selected');
				}
			}
			else
			{
				if ( $('.selected.prepared_tag').next().length )
				{
					$('.selected.prepared_tag').removeClass('selected').next().addClass('selected');
				}
				else
				{
					$('.selected.prepared_tag').removeClass('selected'); $('.prepared_tag').first().addClass('selected');
				}
			}
		}

		if ( $('.selected.prepared_tag').length )
		{
			my_top = $('.selected.prepared_tag').position().top; scrollTop = $('#prepared-tags').scrollTop();

			if ( (my_top > 280) || (my_top + scrollTop < scrollTop) )
			{
				$('#prepared-tags').scrollTop(my_top + scrollTop);
			}

			$('.selected.prepared_item').data('tag', $('.selected.prepared_tag').data('info'));
		}
	}
function prepare_item_switch(direction)
	{
		if ( $('.selected.prepared_item').length == 0 )
		{
			$('.prepared_item').first().addClass('selected');
		}
		else
		{
			if ( direction == 'Up' )
			{
				if ( $('.selected.prepared_item').prev().length )
				{
					$('.selected.prepared_item').removeClass('selected').prev().addClass('selected');
				}
				else
				{
					$('.selected.prepared_item').removeClass('selected'); $('.prepared_item').last().addClass('selected');
				}
			}
			else
			{
				if ( $('.selected.prepared_item').next().length )
				{
					$('.selected.prepared_item').removeClass('selected').next().addClass('selected');
				}
				else
				{
					$('.selected.prepared_item').removeClass('selected'); $('.prepared_item').first().addClass('selected');
				}
			}
		}

		if ( $('.selected.prepared_item').length )
		{
			my_top = $('.selected.prepared_item').position().top; scrollTop = $('#prepared-items').scrollTop();

			if ( (my_top > 280) || (my_top + scrollTop < scrollTop) )
			{
				$('#prepared-items').scrollTop(my_top + scrollTop);
			}

			update_prepare_tags_and_ingredients();
		}
	}

///////////////////////////////////////////////////// Swap Functions /////////////////////////////////////////////////////

function swap_mode_LP_PP()
	{
		if ( $('#LP').hasClass('hide') == false )
		{
			$('#LP').addClass('hide'); $('panel').addClass('hide2'); $('#prepare-panel').removeClass('hide hide2');

			sasori_my_man = 'prepare-panel';
		}
		else
		{
			$('#prepare-panel').addClass('hide'); $('#LP').removeClass('hide'); $('panel').removeClass('hide2');

			sasori_my_man = 'LP';
		}
	}

//////////////////////////////////////////////// Color Selector Functions ////////////////////////////////////////////////

$('.color-sort-item').click(function(e)
	{
		$(this).parent().children().removeClass('selected'); $(this).addClass('selected');

		my_tag  = $('.selected.color-sort-item[type="tag"]').attr('fn');
		my_type = $('.selected.color-sort-item[type="type"]').attr('fn');

		tags_array  = [my_tag];  if ( my_tag  == '*' ) { tags_array  = ['H3','ICON','DIV','LINE']; }
		types_array = [my_type]; if ( my_type == '*' ) { types_array = ['color','bgc','bdc']; }

		$('.color_selector_item').hide();

		for (var key in color_obj)
		{
			for (var i = 0; i < tags_array.length; i++)
			{
				for (var j = 0; j < types_array.length; j++)
				{
					if ( color_obj[key][types_array[j]] )
					{
						if ( color_obj[key][types_array[j]][tags_array[i]] == true )
						{
							$('.color_selector_item[color="' + key + '"]').show();
						}
					}
				}
			}
		}
	})
function update_color_selector(e)
	{
		color_obj = {}; keys = ['color','bgc','bdc']; $('.color_selector_item').remove();

		if ( e.ctrlKey == true )
		{
			proceed_array = elements;
		}
		else
		{
			proceed_array = [];

			$(selection).each(function(index, value) {
								
				all(value.doc);

				for (var i = 0; i < discover.length; i++)
				{
					if ( inside(discover[i], proceed_array) == false ) { proceed_array.push(discover[i]) }
				}
					
			})
		}

		$(proceed_array).each(function(index, value) {

			for (var i = 0; i < keys.length; i++)
			{
				if ( value[keys[i]] )
				{
					if ( color_obj[value[keys[i]]] == undefined ) { color_obj[value[keys[i]]] = {}; }

					if ( color_obj[value[keys[i]]][keys[i]] == undefined ) { color_obj[value[keys[i]]][keys[i]] = {}; }

					color_obj[value[keys[i]]][keys[i]][value.tag] = true;
				}
			}

		})

		for (var key in color_obj)
		{
			color_selector_item  = $('<DIV/>', {class: 'color_selector_item'}).appendTo('#colors-to-select').attr({'color' : key});
			color_selector_color = $('<DIV/>', {class: 'color_selector_color'}).appendTo(color_selector_item).css({
				'background-color' : key
			});
			color_selector_text  = $('<DIV/>', {class: 'color_selector_text'}).appendTo(color_selector_item).text(key);

			color_selector_item.color_selector_item_color_picker_functions();
		}

		$('.color_selector_item').click(function(e)
		{
			my_tag   = $('.selected.color-sort-item[type="tag"]').attr('fn');
			my_type  = $('.selected.color-sort-item[type="type"]').attr('fn');
			my_color = $(this).attr('color');

			tags_array  = [my_tag];  if ( my_tag  == '*' ) { tags_array  = ['H3','ICON','DIV','LINE']; }
			types_array = [my_type]; if ( my_type == '*' ) { types_array = ['color','bgc','bdc']; }

			select_this_too_reset = true;

			if ( e.ctrlKey == true )
			{
				proceed_array = elements;
			}
			else
			{
				proceed_array = [];

				$(selection).each(function(index, value) {

					all(value.doc);

					for (var i = 0; i < discover.length; i++)
					{
						if ( inside(discover[i], proceed_array) == false ) { proceed_array.push(discover[i]) }
					}

				})
			}

			$(proceed_array).each(function(index, value) {

				if ( inside(value.tag, tags_array) )
				{
					for (var i = 0; i < types_array.length; i++)
					{
						if ( types_array[i] == 'color' && ( value.tag == 'H3' || value.doc.hasClass('text') ) )
						{
							if ( value.color == my_color ) { select_this_too(value); }
						}
						else
						{
							key = 'has_' + types_array[i];

							if ( value[key] == true && value[types_array[i]] == my_color )
							{
								select_this_too(value);
							}
						}
					}
				}

			})
		})
	}
function select_this_too(select_this_item)
	{
		if ( select_this_too_reset == true )
		{
			select(select_this_item.id); select_this_too_reset = false;
		}
		else
		{
			add(select_this_item.id, true);
		}
	}

function toggle_color_picker()
	{
		$('#my-spectrum').toggleClass('hide');

		if ( $('#my-spectrum').hasClass('hide') == false )
		{
			$('body').addClass('coloring');
		}
		else
		{
			$('body').removeClass('coloring'); $('.selecting_color_text').removeClass('selecting_color_text wave');
		}
	}
function toggle_panel()
	{
		for (var i = 0; i < arguments.length; i++)
		{
			$(arguments[i]).toggleClass('hide');
		}
	}
function toggle_the_class(my_class)
	{
		$(selection).each(function(index, value) {
							
			value.doc.toggleClass(my_class);
				
		})
	}
$.fn.color_selector_item_color_picker_functions = function()
	{
		$(this).contextmenu(function(e)
		{
			$('selecting_color_text').removeClass('selecting_color_text wave');

			if ( e.ctrlKey == false && e.shiftKey == false )
			{
				$(this).children('.color_selector_text').addClass('selecting_color_text');

				if ( e.altKey == true )
				{
					$('.selecting_color_text').addClass('wave');
				}

				$(this).attr('current', $(this).attr('color'));
			}

			e.preventDefault();
		})

		return $(this);
	}

$('#my-spectrum').draggable({ cancel : 'DIV, H3' });
$('#spectrum').spectrum(
	{
		showAlpha : true,
		preferredFormat: "rgb",
		flat: true,
	    showInput: true,
	    move : function(tinycolor)
	    {
	    	my_color = $('INPUT.sp-input').val();

	    	if ( $('.selecting_color_text').length )
	    	{
	    		$('.selecting_color_text').prev().css('background-color', my_color);
	    		$('.selecting_color_text').text(my_color);
	    		$('.selecting_color_text').parent().attr('color', my_color);
	    	}

	    	if ( $('.selecting_color_text.wave').length )
	    	{
	    		current_color = $('.selecting_color_text.wave').parent().attr('current'); dear_diary = [];

	    		if ( $('.selecting_color_text').hasClass('color_selector_text') )
    			{
    				forward_array = [];

    				$(selection).each(function(index, value) {
    					
    					all(value.doc);

    					for (var i = 0; i < discover.length; i++)
    					{
    						if ( inside(discover[i], forward_array) == false ) { forward_array.push(discover[i]) }
    					}
    				
	    			})
    			}
	    		else
	    		{
	    			forward_array = elements;
	    		}

	    		$(forward_array).each(function(index, value) {

	    			match = false;

	    			if (value.color == current_color) { value.color = my_color; match = true; }
    				if (value.bgc   == current_color) { value.bgc   = my_color; match = true; }
					if (value.bdc   == current_color) { value.bdc   = my_color; match = true; }

					if ( match == true ) { dear_diary.push(value); }

	    		})

	    		$('.selecting_color_text.wave').parent().attr('current', my_color);

	    		apply_color(dear_diary);
	    	}
	    },
	    change : function(tinycolor, e)
    	{
    		my_color = $('INPUT.sp-input').val();

    		$("#spectrum").spectrum("set", my_color);
    		$('.selecting_color_text').prev().css('background-color', my_color);
    		$('.selecting_color_text').text(my_color);
    		$('.selecting_color_text').parent().attr('color', my_color);
    	}
	})

////////////////////////////////////////////////// Line Panel Functions //////////////////////////////////////////////////

$('.line-stat').draggable({
	start : function(e, ui)
	{
		my_original = parseInt($(this).attr('val')); my_fn = $(this).attr('fn'); merit = $(this).attr('merit');
	},
	drag : function(e, ui)
	{
		my_equation = ui.position.left - ui.originalPosition.left;

		if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == false )
		{
			if ( merit == '%' )
			{
				my_equation = Math.round(my_equation / 3);
			}
			else
			{
				my_equation = Math.round(my_equation / 2);
			}
		}

		my_val = my_original + my_equation;

		$(selection).each(function(index, value) {

			value.doc.css(my_fn, my_val + merit);

		})

		$(this).text(my_val + merit).attr({ val : my_val, merit : merit });
	}}).contextmenu(function(e)
	{
		my_fn = $(this).attr('fn'); merit = $(this).attr('merit');

		if ( e.ctrlKey == false && e.shiftKey == false )
		{
			my_val = parseInt( prompt(my_fn + ' = ?') );
		}
		else
		{
			my_val = parseInt( prompt('width height = ?') );
		}

		if ( isNaN(my_val) == false )
		{
			if ( e.ctrlKey == false && e.shiftKey == false )
			{
				$(selection).each(function(index, value) {

					value.doc.css(my_fn, my_val + merit);

				})

				$(this).text(my_val + merit).attr({ val : my_val, merit : merit });
			}
			else
			{
				$(selection).each(function(index, value) {

					value.doc.css({ width : my_val + merit, height : my_val + merit, });

				})

				$('.line-stat').eq(0).text(my_val + merit).attr({ val : my_val, merit : merit });
				$('.line-stat').eq(1).text(my_val + merit).attr({ val : my_val, merit : merit });
			}
		}

		e.preventDefault();
	})

$('.margin-stat').draggable({
	start : function(e, ui)
	{
		my_original = parseInt($(this).text()); my_fn = $(this).attr('fn');
	},
	drag : function(e, ui)
	{
		my_equation = ui.position.left - ui.originalPosition.left;

		my_val = my_original + my_equation;

		$(selection).each(function(index, value) {

			value.doc.css(my_fn, my_val + 'px'); value[my_fn] = my_val;

		})

		$(this).text(my_val);
	}}).contextmenu(function(e)
	{
		my_fn = $(this).attr('fn'); my_val = parseInt( prompt(my_fn + ' = ?', $(this).text() ) );

		if ( isNaN(my_val) == false )
		{
			$(selection).each(function(index, value) {
								
				value.doc.css(my_fn, my_val + 'px'); value[my_fn] = my_val;

			})

			$(this).text(my_val);
		}

		e.preventDefault();
	})

/////////////////////////////////////////////////// IMG Mask Functions ///////////////////////////////////////////////////

$('.img-mask-item').click(function(e)
	{
		my_class = 'img-mask-' + $(this).text();

		$(selection).each(function(index, value) {
							
			if ( value.tag == 'IMG' )
			{
				value.doc.children('IMG').removeClass( value.mask );
				value.mask = my_class;
				value.doc.children('IMG').addClass(my_class);
			}
				
		})
	})

////////////////////////////////////////////////// IMG Filter Functions //////////////////////////////////////////////////

$('.img-filter-value').draggable({
	start : function(e, ui)
	{
		my_original = parseInt($(this).attr('val')); my_fn = $(this).attr('fn'); merit = $(this).attr('merit');
	},
	drag : function(e, ui)
	{
		my_equation = ui.position.left - ui.originalPosition.left;

		if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == false )
		{
			if ( merit == '%' )
			{
				my_equation = Math.round(my_equation / 2);
			}
			else
			{
				my_equation = Math.round(my_equation / 3);
			}
		}

		if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == false )
		{
			if ( my_fn == 'blur' ) { my_equation = Math.round(my_equation / 1) / 10; }
		}

		my_val = my_original + my_equation; if ( my_val < 0 ) { my_val = 0; }

		my_key = 'filter_' + my_fn; fns = ['blur','grayscale','brightness','contrast'];

		$(selection).each(function(index, value) {

			value[my_key] = my_val + merit; my_css = '';

			for (var i = 0; i < fns.length; i++)
			{
				my_key = 'filter_' + fns[i];

				if ( value[my_key] )
				{
					my_css = my_css + ' ' + fns[i] + '(' + value[my_key] + ')';
				}
			}

			value.doc.children('IMG').css('filter', my_css);
		})

		$(this).text(my_val + merit).attr({ val : my_val, merit : merit });
	}})

/////////////////////////////////////////////////// Clip Path Functions //////////////////////////////////////////////////

my_clip_paths = {
	'gee' : {
		type : 'polygon',
		data : '80% 0, 100% 0, 100% 100%, 0% 100%, 0 50px, 75% 50px',
		keys : {
			'the-line'  : [10,12],
			'deep-up'   : [1],
			'deep-down' : [11],
		}
	}
}

function clip_path_panel_init()
	{
		for (var key in my_clip_paths)
		{
			clipitem = $('<DIV/>', {name: key, class: 'clip-path-item'}).appendTo('#clip-path-panel').text(key);
		}

		$('.clip-path-item').click(function(e)
		{
			my_name = $(this).attr('name'); my_data = my_clip_paths[my_name]; my_keys = my_data.keys;
			splits  = my_data.data.replace(/,/g, '').split(' ');

			$('#clip-prop-panel').children().not('#clip-name').remove(); $('#clip-name').text(my_name);

			for (var key in my_keys)
			{
				points   = my_keys[key].toString().replace(/,/g,' ');

				cliprow  = $('<DIV/>', {class: 'clip-path-prop-row', points : points}).appendTo('#clip-prop-panel');
				clipname = $('<DIV/>', {class: 'clip-path-prop-name'}).appendTo(cliprow).text(key);
				clipprop = $('<DIV/>', {class: 'clip-path-prop'}).appendTo(cliprow).text( splits[ my_keys[key][0]-1 ] ).attr({
					val : parseFloat( splits[ my_keys[key][0]-1 ] ), merit : splits[my_keys[key][0]-1].replace(/[0-9]/g, '')
				});
			}

			// apply to selection

			$(selection).each(function(index, value) {
								
				value.cliptype = my_data.type;
				value.clippath = splits;

				put_together_clip_path_string(value);

			})

			$('.clip-path-prop-name').click(function(e)
			{
				merit = $(this).next().attr('merit');

				if ( merit == 'px' ) { merit = '%' } else { merit = 'px' }

				$(this).next().attr({ merit : merit, val : 0 }); $(this).next().text(0 + merit);
			})

			$('.clip-path-prop').draggable({
				start : function(e, ui)
				{
					my_original = parseFloat($(this).attr('val'));
					my_points   = $(this).parent().attr('points').split(' ');
					merit       = $(this).attr('merit');
				},
				drag : function(e, ui)
				{
					my_equation = ui.position.left - ui.originalPosition.left;

					if ( merit == '%' )
					{
						if ( e.ctrlKey == true && e.shiftKey == false )
						{
							my_equation = my_equation / 10;
						}
						else if ( e.ctrlKey == false && e.shiftKey == false )
						{
							my_equation = my_equation / 2;
						}
						else if ( e.ctrlKey == false && e.shiftKey == true )
						{
							my_equation = Math.round(my_equation / 3);
						}

						my_equation = Math.round( my_equation * 10 ) / 10;
					}

					my_val = my_original + my_equation; if ( my_val < 0 ) { my_val = 0; }

					$(selection).each(function(index, value) {

						for (var i = 0; i < my_points.length; i++)
						{
							value.clippath[my_points[i] - 1] = my_val + merit;
						}

						put_together_clip_path_string(value);

					})

					$(this).text(my_val + merit).attr({ val : my_val, merit : merit });
				}})
		})
	}
function put_together_clip_path_string(elem_item)
	{
		final_str = elem_item.cliptype + '('; elem_clippath = elem_item.clippath;

		for (var i = 0; i < elem_clippath.length; i++)
		{
			final_str += elem_clippath[i];

			if ( (i != elem_clippath.length - 1) && (i % 2 == 1) ) { final_str += ',' }
			if (  i != elem_clippath.length - 1 ) { final_str += ' ' } else { final_str += ')' }
		}

		elem_item.doc.css('clip-path', final_str);
	}

//////////////////////////////////////////////// Simple Margin Functions /////////////////////////////////////////////////

function simple_margin(side)
	{
		my_margin = parseFloat( prompt('margin-' + side + '=?', selection[0].doc.css('margin-' + side)) );

		if ( isNaN(my_margin) == false )
		{
			$(selection).each(function(index, value) {
								
				value.doc.css('margin-' + side, my_margin + 'px');
					
			})
		}
	}
function tell_me_col_or_row()
	{
		space_craft = true;

		if ( selection.length > 1 )
		{
			click_the_format('row center center');
		}
		else if ( selection.length == 1 ) 
		{
			if ( selection[0].doc.hasClass('row_center_center') )
			{
				click_the_format('col center center');
			}
			else
			{
				click_the_format('row center center');
			}
		}

		space_craft = false;
	}

///////////////////////////////////////////////// Format Panel Functions /////////////////////////////////////////////////

$('.format').each(function(index, value) { $(this).attr('fn', $(this).text()); })
function toggle_format_panel() { $('#format-panel, #self-align-panel, #sp-panel, #flex-panel').toggleClass('hide'); }
$('.orientation-option').click(function(e)
	{
		my_orientation = $(this).text();

		$('.format-list[orientation="' + my_orientation + '"]').show();
		$('.format-list').not('.format-list[orientation="' + my_orientation + '"]').hide();
		$('.format[orientation="' + my_orientation + '"][main="true"]').trigger('click');
	})
$('.format').click(function(e)
	{
		my_2006_list = '.container, .resized';

		my_class = $(this).text().replace('col ','').replace(/\s/g,'_');
		srm('selected_format'); $(this).addClass('selected_format'); // for showing purposes

		row_mark = $(this).attr('orientation') == 'row'; srm('old_news');

		$(selection).each(function(index, value) {

			if ( value.tag == 'DIV' )
			{
				value.doc.removeClass(value.format);
				value.doc.addClass(my_class);
				value.format = my_class;

				if ( row_mark == true ) { value.doc.addClass('row') } else { value.doc.removeClass('row'); }

				if ( value.doc.children('.news').length )
				{
					value.doc.children(my_2006_list).removeClass('news').css({
						top : '', left : '', position : '',
					}).addClass('old_news');

					value.doc.children().not(block_list).not(my_2006_list).removeClass('news').css({
						top : '', left : '', position : '', width : '', height : ''
					}).addClass('old_news');

					apply_order(value.doc); apply_spacing(value.doc);
				}
			}
			else if ( value.tag == 'H3' )
			{
				value.doc.removeClass(value.format);
				value.doc.addClass(my_class).addClass('display_flex');
				value.format = my_class;
			}

			if ( space_craft == true ) { apply_order(value.doc); apply_spacing(value.doc); }

		})
	})
$('.orientation-option').first().click();

$('.grid-format-line-value').draggable({
	start : function(e, ui)
	{
		my_original = parseFloat($(this).text()); my_fn = $(this).attr('fn');
	},
	drag : function(e, ui)
	{
		if ( same_check('DIV') == true )
		{
			my_equation = ui.position.left - ui.originalPosition.left;

			//

			if ( my_fn == 'grid' )
			{
				my_equation = Math.round(my_equation / 7);
			}
			else
			{
				my_equation = Math.round(my_equation / 3) * 5;
			}

			//

			my_val = my_original + my_equation;

			$(selection).each(function(index, value) { value[my_fn] = my_val; });

			apply_grid(my_fn); $(this).text(my_val);
		}
	}});
function grid_by_key()
	{
		how_many = parseInt(prompt('How Many Rows ?'));

		if ( isNaN(how_many) == false )
		{
			if ( selection.length > 1 ) { LP_Group(); }

			item = selection[0]; item.grid = how_many; item.sp1 = 10; item.sp2 = 10;

			apply_grid('grid');
		}
	}

function click_the_format(format)
	{
		if ( selection.length > 1 ) { LP_Group(); }

		$('.format[fn="' + format + '"]').trigger('click');

		toggle_flex(); toggle_flex();
	}
function apply_grid(fn)
	{
		srm('old_news');

		$(selection).each(function(index, value) {
							
			if ( fn == 'grid' )
			{
				value.doc.children('.news').removeClass('news').css({
					top : '', left : '', position : '', width : '', height : ''
				}).addClass('old_news');

				grid_to_line(value.doc); line_to_grid(value);
			}
			else if ( value.doc.hasClass('grid') )
			{
				if ( fn == 'sp1' )
				{
					value.doc.children().children('SP').css('width', value.sp1 + 'px');
				}
				else
				{
					value.doc.children('SP').css('height', value.sp2 + 'px');
				}
			}
				
		})
	}

function grid_to_line(elem)
	{
		$('.rowHolder > DIV').css('width', ''); $(elem).removeClass('grid');

		$(elem).children('.rowHolder').each(function() { $(this).children().first().unwrap(); });
		$(elem).children('.dummyUnit').remove();

		sp_max(elem);
	}
function line_to_grid(my_item)
	{
		grid = my_item.grid; local = my_item.doc; c(my_item.doc); local.addClass('grid');

		for (var i = 0; i < discover.length; i++)
		{
			if ( ( i % grid ) == 0 ) { rowHolder = $('<DIV/>', {class: 'rowHolder'}).appendTo(local); }

			discover[i].doc.appendTo(rowHolder);
		}

		if ( my_item.doc.children('.rowHolder').length )
		{
			if ( $(rowHolder).children(white_list).length < grid )
			{
				deficit = grid - $(rowHolder).children(white_list).length ;
				for (var i = 0; i < deficit; i++)
				{
					dummyUnit = $('<DIV/>', {class: 'dummyUnit'}).appendTo(rowHolder);
				}
			}			
		}

		sp_max(local); /*$(local).find('IMG').each(function() { $(this).parent().css('width', '100%'); })*/

		my_item.doc.children().children('SP').css('width', my_item.sp1 + 'px');
		my_item.doc.children('SP').css('height', my_item.sp2 + 'px');
	}

//////////////////////////////////////////////////// JULIA Functions ////////////////////////////////////////////////////

function find_dimension_array(elem)
	{
		L = $(elem).offset().left;
		T = $(elem).offset().top;
		W = $(elem).outerWidth();
		H = $(elem).outerHeight();
		R = L + W;
		B = T + H;

		return [L,T,R,B];
	}

function re_order(elem)
	{
		folder_orientation(elem);

		chil = elem.children().not(block_list); TA = []; LA = [];

		for (var i = 0; i < chil.length; i++)
		{
			L = $(chil[i]).offset().left;
			T = $(chil[i]).offset().top;

			TA.push([T, chil[i]]); LA.push([L, chil[i]]);
		}

		TA.sort(Comparator_SML_0); LA.sort(Comparator_SML_0);

		if ( elem.hasClass('row') ) { my_array = LA; } else { my_array = TA; }

		for (var i = 0; i < my_array.length; i++)
		{
			$(my_array[i][1]).appendTo(elem);
		}

		sp_max(elem);
	}
function re_spacing(elem)
	{
		chil = elem.children().not(block_list); JULIA = find_dimension_array(chil[0]);

		for (var i = 1; i < chil.length; i++)
		{
			EBODY = find_dimension_array(chil[i]);

			if ( elem.hasClass('row') )
			{
				distance = EBODY[0] - JULIA[2] + 'px'; $(chil[i]).prevAll('SP').first().css('width', distance);
			}
			else
			{
				distance = EBODY[1] - JULIA[3] + 'px';
				$(chil[i]).prevAll('SP').first().css('height', distance);
			}

			JULIA = EBODY;
		}
	}

function find_the_orders(elem)
	{
		c(elem); git(elem); TA = []; LA = []; item.OHA = []; item.OVA = [];

		for (var i = 0; i < discover.length; i++)
		{
			L = $(discover[i].doc).offset().left;
			T = $(discover[i].doc).offset().top;

			TA.push([T, discover[i].id]); LA.push([L, discover[i].id]);
		}

		TA.sort(Comparator_SML_0); LA.sort(Comparator_SML_0);

		for (var i = 0; i < TA.length; i++) { item.OVA.push(TA[i][1]); }
		for (var i = 0; i < LA.length; i++) { item.OHA.push(LA[i][1]); }
	}
function find_the_spacings(elem)
	{
		git(elem); boss = item; OHA = item.OHA; OVA = item.OVA; SH_arr = []; SV_arr = [];

		get(OHA[0]); JULIA = find_dimension_array(item.doc);

		for (var i = 1; i < OHA.length; i++)
		{
			get(OHA[i]); EBODY = find_dimension_array(item.doc);

			distance = EBODY[0] - JULIA[2]; SH_arr.push(distance);

			JULIA = EBODY;
		}

		// now vertical

		get(OVA[0]); JULIA = find_dimension_array(item.doc);

		for (var i = 1; i < OVA.length; i++)
		{
			get(OVA[i]); EBODY = find_dimension_array(item.doc);

			distance = EBODY[1] - JULIA[3]; SV_arr.push(distance);

			JULIA = EBODY;
		}

		git(elem); boss.SH_arr = SH_arr; boss.SV_arr = SV_arr;
	}
function apply_spacing(elem)
	{
		git(elem); chil = $(elem).children('SP');

		if ( item.doc.hasClass('row') )
		{
			my_array = item.SH_arr;

			for (var i = 0; i < my_array.length; i++)
			{
				$(chil[i]).css({ width : my_array[i] + 'px', height : '' });
			}
		}
		else
		{
			my_array = item.SV_arr;

			for (var i = 0; i < my_array.length; i++)
			{
				$(chil[i]).css({ height : my_array[i] + 'px', width : '' });
			}
		}
	}
function apply_order(elem)
	{
		git(elem); boss = item;

		if ( boss.doc.hasClass('grid') == false )
		{
			if ( boss.doc.hasClass('row') ) { my_array = boss.OHA; } else { my_array = boss.OVA; }

			for (var i = 0; i < my_array.length; i++)
			{
				get(my_array[i]);

				item.doc.appendTo(boss.doc);
				item.outer.appendTo(boss.inner);
			}

			sp_max(boss.doc);
		}
	}

function folder_orientation(elem)
	{
		velvet = $(elem).children(); boy = 0;

		for (var i = 0; i < velvet.length; i++)
		{
			for (var j = 0; j < velvet.length; j++)
			{
				if ( i != j )
				{
					boy+=double_orientation(velvet[i], velvet[j]);
				}
			}
		}

		if ( boy >= 0 )
		{
			$(elem).removeClass('row');
		}
		else
		{
			$(elem).addClass('row');
		}
	}
function double_orientation(first, second)
	{
		first = $(first); second = $(second);

		L1 = first.offset().left;
		T1 = first.offset().top;
		W1 = first.outerWidth();
		H1 = first.outerHeight();
		R1 = L1 + W1;
		B1 = T1 + H1;

		L2 = second.offset().left;
		T2 = second.offset().top;
		W2 = second.outerWidth();
		H2 = second.outerHeight();
		R2 = L2 + W2;
		B2 = T2 + H2;

		predict = 0;

		if ( (L1 <= L2 && R1 >= L2) || (L1 <= R2 && R1 >= R2) )
		{
			predict++;
		}
		if ( (T1 <= T2 && B1 >= T2) || (T1 <= B2 && B1 >= B2) )
		{
			predict--;
		}

		return predict;
	}

function Comparator_SML_0(a, b)
	{
		if (a[0] < b[0]) return -1;
		if (a[0] > b[0]) return 1;
		return 0;
	}
function Comparator_BIG_0(a, b)
	{
		if (a[0] < b[0]) return 1;
		if (a[0] > b[0]) return -1;
		return 0;
	}

//////////////////////////////////////////////////// Align Functions ////////////////////////////////////////////////////

$('.align-self-button').click(function(e)
	{
		my_class = $(this).attr('fn'); apply_align('align-self', my_class);
	})

function quick_key(key)
	{
		$(selection).each(function(index, value) {
							
			if ( value.tag == 'DIV' || value.tag == 'IMG' || value.tag == 'ICON' )
			{
				fn = 'align-self';

				switch(key)
				{
					case 7: klass = 'align-self-start'  ; break;
					case 8: klass = 'align-self-center' ; break;
					case 9: klass = 'align-self-end'    ; break;

					case 5: klass = ''                  ; break;
				}
			}
			else
			{
				fn = 'text-align';

				switch(key)
				{
					case 7: klass = 'text-align-left'    ; break;
					case 8: klass = 'text-align-center'  ; break;
					case 9: klass = 'text-align-right'   ; break;
					case 5: klass = 'text-align-justify' ; break;
				}
			}

			value.doc.removeClass(value[fn]);
			value.doc.addClass(klass);
			value[fn] = klass;
		})
	}

function apply_align(fn, klass)
	{
		$(selection).each(function(index, value) {

			value.doc.removeClass(value[fn]);
			value.doc.addClass(klass);
			value[fn] = klass;

		})
	}

//////////////////////////////////////////////// Padding Panel Functions ////////////////////////////////////////////////

$('.p_item').draggable({
	start : function(e, ui)
	{
		my_original = parseFloat($(this).text());

		fn = $(this).attr('fn');
		ST = selection[0].doc.offset().top;
		SL = selection[0].doc.offset().left;
	},
	drag : function(e, ui)
	{
		my_equation = ui.position.left - ui.originalPosition.left;

		my_val = my_original + my_equation;

		if ( e.ctrlKey  == true ) { my_val = Math.round(my_val / 5) * 5; }
		// if ( e.shiftKey == true ) { my_val = Math.round(my_val / 10) * 10; }

		if ( my_val < 0 ) { my_val = 0; } $(this).text(my_val);

		q_bundle = ''; a_bundle = '';

		switch(fn)
		{
			case 'left': case 'right': q_bundle = "horizontal all"; break;
			case 'top': case 'bottom': q_bundle = "vertical all"; break;
			case 'all': a_bundle = "horizontal vertical left right top bottom"; break;
			case 'horizontal' : a_bundle = "left right"; q_bundle = "all"; break;
			case 'vertical'   : a_bundle = "top bottom"; q_bundle = "all"; break;
		}

		q_bundle = q_bundle.split(' '); a_bundle = a_bundle.split(' ');

		for (var i = 0; i < q_bundle.length; i++)
		{
			$('.p_item[fn="' + q_bundle[i] + '"]').text("0");
		}

		for (var i = 0; i < a_bundle.length; i++)
		{
			$('.p_item[fn="' + a_bundle[i] + '"]').text(my_val);
		}

		apply_padding();
	}});
function apply_padding()
	{
		PL = parseFloat($('.p_item[fn="left"]').text());
		PT = parseFloat($('.p_item[fn="top"]').text());
		PR = parseFloat($('.p_item[fn="right"]').text());
		PB = parseFloat($('.p_item[fn="bottom"]').text());

		padding = PT + 'px ' + PR + 'px ' + PB + 'px ' + PL + 'px';

		$(selection).each(function(index, value) {
							
			value.PL = PL; value.PT = PT; value.PR = PR; value.PB = PB;
			value.doc.css('padding', padding);

			value.doc.children('.smart_sector').find('.smart_padding[fn="top"]').css('height', value.PT + 'px');
			value.doc.children('.smart_sector').find('.smart_padding[fn="bottom"]').css('height', value.PB + 'px');
			value.doc.children('.smart_sector').find('.smart_padding[fn="left"]').css('width', value.PL + 'px');
			value.doc.children('.smart_sector').find('.smart_padding[fn="right"]').css('width', value.PR + 'px');
				
		})
	}

///////////////////////////////////////////////////// J Functions ///////////////////////////////////////////////////////

function double_standard()
	{
		$(selection).each(function(index, value) {
							
			if ( value.doc.hasClass('slate') == false )
			{
				value.doc.css({ top : '', left : '', position : '', width : '', height : '' })
				value.doc.removeClass('news').addClass('slate');
			}
				
		})

		// if ( selection.length == 1 )
		// {
		// 	item = selection[0];

		// 	if ( item.doc.hasClass('slate') == false && confirm('reverse back ?') == true )
		// 	{
		// 		my_list = item.doc.find(elem_list);

		// 		$(my_list).each(function(index, value) {
					
		// 			git(this); item.doc.css({ top : item.top , left : item.left }).addClass('news');

		// 			if ( item.tag == 'IMG' ) { item.doc.css({ width : item.width, height : item.height }) };

		// 			if ( item.tag == 'DIV' )
		// 			{
		// 				item.doc.addClass('heart_shaker');

		// 				ansil = item.doc.children().not('SP');
		// 				first = $(ansil[0]);
		// 				OL    = first.offset().left;
		// 				OT    = first.offset().top;
		// 				OW    = first.outerWidth();
		// 				OH    = first.outerHeight();
		// 				OR    = OL + OW;
		// 				OB    = OT + OH;

		// 				for (var i = 1; i < ansil.length; i++)
		// 				{
		// 					first = $(ansil[i]);
		// 					L     = first.offset().left;
		// 					T     = first.offset().top;
		// 					W     = first.outerWidth();
		// 					H     = first.outerHeight();
		// 					R     = L + W;
		// 					B     = T + H;

		// 					if ( L < OL ) { OL = L; }
		// 					if ( T < OT ) { OT = T; }
		// 					if ( R > OR ) { OR = R; }
		// 					if ( B > OB ) { OB = B; }
		// 				}

		// 				OW = OR - OL; OH = OB - OT;

		// 				for (var i = 0; i < ansil.length; i++)
		// 				{
		// 					first = $(ansil[i]);
		// 					L     = first.offset().left - OL;
		// 					T     = first.offset().top  - OT;

		// 					first.css({ top : T + 'px' , left : L + 'px' });
		// 				}

		// 				item.doc.css({
		// 					width  : OW + 'px',
		// 					height : OH + 'px',
		// 					left   : OL + 'px',
		// 					top    : OT + 'px',
		// 					position : 'absolute',
		// 				})

		// 				item.doc.removeClass('heart_shaker');
		// 			}

		// 		})
		// 	}

		// 	if ( item.open == true ) { LP_DIV_Toggle(); }
		// }
	}

////////////////////////////////////////////// color collection Functions ///////////////////////////////////////////////

$('#color-panel, #color-panel-2').on('mouseup', function(e) { active_color_fn = null; });
$('.border-option').draggable({
	start : function(e, ui)
	{
		my_original = parseFloat($(this).text()); my_fn = $(this).attr('fn');
	},
	drag : function(e, ui)
	{
		my_val = my_original + ( ui.position.left - ui.originalPosition.left );

		if ( my_val < 0 ) { my_val = 0; }

		// if ( my_fn == 'radius' && my_val > 100 ) { my_val = 100; }
		if ( my_fn == 'width' ) { my_val = Math.round(my_val / 5); }

		$(this).text(my_val); apply_border(my_fn, my_val); apply_color();
	}});
function apply_border(fn, val)
	{
		$(selection).each(function(index, value) {

			if ( fn == 'width' )
			{
				value.borderWidth = val;
			}
			else if ( fn == 'radius' )
			{
				value.borderRadius = val;
			}

		})
	}
$('.color-option').on('mousedown', function(e)
	{
		my_fn = $(this).attr('fn'); active_color_fn = my_fn;

		if ( my_fn != 'normal' )
		{
			$(selection).each(function(idx, value) { value.colorMode = my_fn; });

			my_fn = my_fn + '_mode'; $(selection).each(function(idx, value) { value[my_fn] = true; });
		}
		else
		{
			$(selection).each(function(idx, value) { value.background_mode = false; value.border_mode = false; });
		}

		apply_color();
	}).on('mouseup', function(e)
	{
		active_color_fn = null;
	}).contextmenu(function(e)
	{
		if ( $(this).attr('fn') == 'normal' )
		{
			$(this).trigger('click');
		}
		else
		{
			my_fn = $(this).attr('fn') + '_mode';

			$(selection).each(function(idx, value) { value[my_fn] = false; });

			apply_color(); e.preventDefault();
		}
	})

function apply_color(apply_color_array)
	{
		if ( apply_color_array ) { my_work_array = apply_color_array; } else { my_work_array = selection; }

		$(my_work_array).each(function(index, value) {

			switch(value.colorMode)
			{
				case 'normal':
					
					value.doc.css({ backgroundColor : '', border : '' }); value.has_bgc = false; value.has_bdc = false;
					
					break;

				case 'background':
					
					value.doc.css({ backgroundColor : value.bgc });
					
					break;

				case 'border':

					value.doc.css({ border : value.borderWidth + 'px solid ' + value.bdc });
					value.doc.css({ borderRadius : value.borderRadius + 'px' });
					
					break;
			}

			if ( value.background_mode == false ) { value.doc.css('background-color', ''); }

			if ( value.border_mode     == false ) { value.doc.css('border', ''); }
			else if ( value.borderWidth == undefined || value.borderWidth == 0 )
			{
				value.borderWidth = 1; value.doc.css({ border : value.borderWidth + 'px solid ' + value.bdc });
			}

			if ( value.tag == 'H3' )
			{
				value.doc.css('color', value.color);
			}

		})
	}

// color row

$.fn.color_in_row = function()
	{
		$(this).contextmenu(function(e)
		{
			if ( e.ctrlKey == false && e.shiftKey == false )
			{
				if ( $(this).children('.color_text').hasClass('selecting_color_text') )
				{
					$(this).children('.color_text').removeClass('selecting_color_text wave');
				}
				else
				{
					$('.color_text').removeClass('selecting_color_text wave');
					$(this).children('.color_text').addClass('selecting_color_text');
				}

				if ( e.altKey == true )
				{
					$('.selecting_color_text').addClass('wave');
				}

				$(this).attr('current', $(this).attr('color'));
			}
			else if ( e.ctrlKey == true && e.shiftKey == false )
			{
				$(this).remove();
			}

			e.preventDefault();
		});

		$(this).on('mousemove', function(e)
		{
			if ( active_color_fn != null )
			{
				color = $(this).attr('color');

				$(selection).each(function(index, value) {
									
					if ( active_color_fn == 'background' )
					{
						value.bgc = color; value.has_bgc = true;
					}
					else
					{
						value.bdc = color; value.has_bdc = true;
					}
						
				})

				apply_color();
			}
		}).click(function(e)
		{
			color = $(this).attr('color');

			$(selection).each(function(index, value) {
								
				if ( value.tag == 'H3' )
				{
					value.color = color;
				}
				else if ( value.tag == 'DIV' )
				{
					value.bgc = color;

					if ( value.doc.hasClass('text') )
					{
						value.color = color;
					}
				}

			})

			apply_color();
		})

		return $(this);
	}

$('.color-in-row').eq(0).css('background-color', 'rgb(0, 0, 0)').color_in_row();
$('.color-in-row').eq(1).css('background-color', 'rgb(255, 255, 255)').color_in_row();

/////////////////////////////////////////////////// Sticker Functions ///////////////////////////////////////////////////

$('.sticker-axis').draggable({
	start : function(e, ui)
	{
		my_original = parseFloat($(this).text()); my_axis = $(this).attr('axis'); my_fn = $(this).attr('fn');
	},
	drag : function(e, ui)
	{
		my_equation = ui.position.left - ui.originalPosition.left;

		if ( e.ctrlKey == true && e.shiftKey == false )
		{
			my_equation *= 5;
		}
		else if ( e.ctrlKey == false && e.shiftKey == true )
		{
			my_equation *= 10;
		}

		my_val = my_original + my_equation;

		$(selection).each(function(index, value) {

			if ( value.tag == 'STICKER' || value.doc.parent().wt() == 'STICKER' )
			{
				value[my_axis] = my_val; value.doc.css(my_fn, my_val + 'px');
			}

		})

		$(this).text(my_val);
	}}).contextmenu(function(e)
	{
		if ( e.shiftKey == false )
		{
			my_axis = $(this).attr('axis'); my_fn = $(this).attr('fn');

			if ( e.ctrlKey == false )
			{
				my_val = ipn();
			}
			else
			{
				my_val = 0;
			}

			$(selection).each(function(index, value) {

				if ( value.tag == 'STICKER' || value.doc.parent().wt() == 'STICKER' )
				{
					value[my_axis] = my_val; value.doc.css(my_fn, my_val + 'px');
				}

			})

			$(this).text(my_val);
		}
		else
		{
			$(selection).each(function(index, value) {

				if ( value.tag == 'STICKER' || value.doc.parent().wt() == 'STICKER' )
				{
					value.x = 0; value.y = 0; value.doc.css({ top : 0, left : 0 });
				}

			})

			$('.sticker-axis').text(0);
		}

		e.preventDefault();
	});

//////////////////////////////////////////////// Image Control Functions ////////////////////////////////////////////////

$('.image-mode').click(function(e)
	{
		if ( same_check('IMG') == true )
		{
			my_fn = $(this).attr('fn');

			$(selection).each(function(index, value) { value.imageMode = my_fn; });

			apply_image_mode();
		}
	})

$('.mask-controller').draggable({
	start : function(e, ui)
	{
		my_original = parseFloat($(this).text()); my_fn = $(this).attr('fn');
	},
	drag : function(e, ui)
	{
		if ( same_check('IMG') == true )
		{
			my_equation = ui.position.left - ui.originalPosition.left;

			if ( e.ctrlKey == true ) { my_equation *= 5; }

			my_val = my_original + my_equation;

			$(selection).each(function(index, value) { value[my_fn] = my_val; value.doc.children('IMG').css(my_fn, my_val + 'px') });

			$(this).text(my_val);
		}
	}});

function apply_image_mode()
	{
		$('.ui-resizable').resizable('destroy');

		$(selection).each(function(index, value) {

			switch(value.imageMode)
			{
				case 'aspect ratio':

					if ( value.doc.hasClass('aspect') == false )
					{
						value.doc.children('IMG').css({ top : '', left : '', width : '', height : '' });
						value.doc.css({ width : 'auto', height : 'auto' }).addClass('aspect');

						value.doc.css({ width : '300px', height : 'auto' })
						value.doc.resizable({handles: 'e, s, se', /*containment: 'parent',*/ alsoResize: '.ui-resizable'});
					}
					
					break;

				case 'fit':

					value.doc.resizable({ /*containment: 'parent',*/ alsoResize: '.ui-resizable' }).removeClass('aspect');
					value.doc.children('IMG').css({ top : '', left : '', width : '', height : '' });
					
					break;

				case 'mask':
					
					value.doc.resizable({ /*containment: 'parent',*/ alsoResize: '.ui-resizable' }).removeClass('aspect');
					value.doc.children('IMG').css('height', 'auto');
					$('.mask-controller[fn="width"').text(Math.round(value.doc.children('IMG').outerWidth()));
					
					break;
			}

		})
	}
function same_check(tag)
	{
		my_tag = selection[0].tag; my_same = true;

		for (var i = 1; i < selection.length; i++)
		{
			if ( selection[i].tag != my_tag )
			{
				my_same = false;
			}
		}

		if ( my_same == true && my_tag == tag )
		{
			return true;
		}
		else
		{
			return false;
		}
	}

////////////////////////////////////////////////// Flex Panel Functions /////////////////////////////////////////////////

function update_flex_panel()
	{
		if ( selection.length == 1 )
		{
			$('#flex-panel').empty();

			$(selection).each(function(index, value) {
								
				if ( value.doc.hasClass('grid') == false )
				{
					c(value.id);

					for (var i = 0; i < discover.length; i++)
					{
						item = discover[i];

						if ( item.flex ) { flex_value = item.flex; } else { flex_value = 1; }

						flex_item = $('<DIV/>', {class: 'flex_item'}).appendTo('#flex-panel')
						flex_item.text(flex_value).attr('flex_id', item.id);
						flex_item.on('mousewheel', function(e)
						{
							if ( e.originalEvent.deltaY > 0 ) { my_offset = -0.1; } else { my_offset = 0.1; }

							my_id = parseInt($(this).attr('flex_id')); get(my_id);

							if ( item.flex ) { flex_value = item.flex; } else { flex_value = 1; }

							if ( e.ctrlKey == true ) { my_offset *= 10; }

							flex_value = flex_value + my_offset; flex_value = Math.round( flex_value * 10 ) / 10;

							if ( flex_value < 0.1 ) { flex_value = 0.1; }

							item.doc.css('flex', flex_value + ' ' + flex_value + ' 0'); item.flex = flex_value; $(this).text(flex_value);
						})
					}
				}

			})
		}
	}

/////////////////////////////////////////////////// SP Panel Functions //////////////////////////////////////////////////

function update_SP_panel()
	{
		boss = selection[0]; $('#sp-panel').empty();

		if ( boss.doc.hasClass('grid') == false )
		{
			sp_array = []; sps = boss.doc.children('SP');

			if ( boss.doc.hasClass('row') )
			{
				sp_mode = 'row';

				for (var i = 0; i < sps.length; i++)
				{
					sp_array.push( parseFloat($(sps[i]).outerWidth()) );
				}
			}
			else
			{
				sp_mode = 'col';

				for (var i = 0; i < sps.length; i++)
				{
					sp_array.push( parseFloat($(sps[i]).outerHeight()) );
				}
			}

			for (var i = 0; i < sp_array.length; i++)
			{
				sp_indicator = $('<DIV/>', {ix: i, class: 'sp_indicator'}).appendTo('#sp-panel').text(sp_array[i]);
			}

			$('.sp_indicator').draggable({
				start : function(e, ui)
				{
					my_original = Math.round(parseFloat($(this).text()));
				},
				drag : function(e, ui)
				{
					my_equation = ui.position.left - ui.originalPosition.left;

					my_val = my_original + my_equation;

					if ( (e.ctrlKey == true) && (e.shiftKey == false) )
					{
						my_val = Math.round(my_val / 7) * 5;
					}

					if ( my_val < 0 ) { my_val = 0; }

					my_ix = parseInt($(this).attr('ix'));

					if ( sp_mode == 'row' )
					{
						selection[0].doc.children('SP').eq(my_ix).css('width', my_val + 'px');
					}
					else
					{
						selection[0].doc.children('SP').eq(my_ix).css('height', my_val + 'px');
					}

					$(this).text(my_val);
				}}).contextmenu(function(e)
				{
					if ( sp_mode == 'row' )
					{
						selection[0].doc.children('SP').eq($(this).attr('ix')).css('width', 10 + 'px');
					}
					else
					{
						selection[0].doc.children('SP').eq($(this).attr('ix')).css('height', 10 + 'px');
					}

					$(this).text(10); e.preventDefault();
				}).hover(function(e)
				{
					selection[0].doc.children('SP').eq($(this).attr('ix')).addClass('hovering');
				}, function(e)
				{
					selection[0].doc.children('SP').eq($(this).attr('ix')).removeClass('hovering');
				});
		}
	}

//////////////////////////////////////////////////// Image Functions ////////////////////////////////////////////////////

function IMG_panel_init()
	{
		folders = []; tree = [];

		$.ajax({
			url  : "image", type : 'get', async: false,
			success : function(data)
			{
				likey = $(data).find('a');
				$(likey).each(function(index, value) { if ( index > 4 ) { folders.push( this.href.replace("http://localhost:7879/","") ); } })
			}});

		////////////////////////////////////////////////////////

		for (var i = 0; i < folders.length; i++)
		{
			tree[i] = []; tree[i].name = folders[i]; tree[i].id = i;

			////////////////////////////////////////////////////////

			folder_item = $('<H3/>', {idx: i, class: 'folder_item'}).appendTo('#folders');
			folder_item.text(folders[i].replace('/',''));

			////////////////////////////////////////////////////////

			$.ajax({
				url  : "image/" + folders[i], type : 'get', async: false,
				success : function(data)
				{
					likey = $(data).find('a');
					$(likey).each(function(index, value) { if ( index > 4 ) { tree[i].push( folders[i] + this.href.replace("http://localhost:7879/","") ); } })
				}});
		}

		////////////////////////////////////////////////////////

		img_molla = 0;

		for (var k = 0; k < tree.length; k++)
		{
			zone = $('<DIV/>', {idx: k, class: 'zone'}).appendTo('#images');
			if (k != 0) { zone.addClass('super_vanish'); }

			for (var i = 0; i < tree[k].length; i++)
			{
				story = $('<DIV/>', {class: 'story'}).appendTo(zone);
				suck = $('<IMG/>', {class: 'thumbnail'}).appendTo(story);
				$(suck).attr('src', 'image/' + tree[k][i]);
				$(suck).attr('molla', img_molla); img_molla++;
				$(suck).attr('draggable', false);
			}
		}

		my_folder = tree[0];

		////////////////////////////////////////////////////////

		$('.folder_item').click(function(e)
		{
			idx = $(this).attr('idx'); Element = $('.zone[idx="' + idx + '"]'); my_folder = tree[parseInt(idx)];

			$('.zone').not(Element).addClass('super_vanish'); $(Element).removeClass('super_vanish');
		})

		////////////////////////////////////////////////////////

		$('.thumbnail').click(function(e)
		{
			mysrc = $(this).attr('src'); e.preventDefault(); red_velvet = [];

			if ( selection.length == 1 )
			{
				Element = selection[0].doc.children('IMG'); Element.attr('src', mysrc);

				if ( selection[0].doc.parent().parent().parent().hasClass('grid') )
				{
					git(selection[0].doc.parent().parent().parent());
					if ( inside(item, red_velvet) == false ) { red_velvet.push(item); }
				}
			}
			else
			{
				$(selection).each(function(index, value) {

					Element = value.doc.children('IMG');
					random  = Math.floor((Math.random() * my_folder.length));
					$(Element).attr('src', 'image/' + my_folder[random]);

					if ( value.doc.parent().parent().parent().hasClass('grid') )
					{
						git(value.doc.parent().parent().parent());
						if ( inside(item, red_velvet) == false ) { red_velvet.push(item); }
					}
						
				})
			}

			for (var i = 0; i < red_velvet.length; i++)
			{
				grid_to_line( red_velvet[i].doc );
				line_to_grid( red_velvet[i] );
			}
		}).contextmenu(function(e)
		{
			// content panel function

			content_item = $('<IMG/>', {class: 'content_item'}).appendTo('.content-items[tag="IMG"]').attr({
				src : $(this).attr('src')
			}).css({
				width : $(this).outerWidth(), height : $(this).outerHeight()
			}).click(function(e)
			{
				if ( e.ctrlKey == false )
				{
					$(this).parent().children().removeClass('sight'); $(this).addClass('sight');
				}
				else
				{
					$(this).toggleClass('sight');
				}
			}).dblclick(function(e)
			{
				mysrc = $(this).attr('src');

				$(selection).each(function(index, value) { value.doc.children('IMG').attr('src', mysrc); });
			}).contextmenu(function(e)
			{
				if ( e.ctrlKey == false && e.shiftKey == true )
				{
					if ( confirm('delete this content item?') )
					{
						$(this).remove();
					}
				}
				else if ( e.ctrlKey == true && e.shiftKey == false && $('.content-groups[tag="IMG"] .curr_group').length )
				{
					pr_opseo = $('.content-groups[tag="IMG"] .curr_group').attr('opseo');

					if ( $('.content-items[tag="IMG"] .sight').length == 0 )
					{
						my_selector = $(this);
					}
					else
					{
						my_selector = $('.content-items[tag="IMG"] .sight');
					}

					$(my_selector).each(function(index, value) {
						opseo = $(this).attr('opseo').split(',');
						if ( inside(pr_opseo, opseo) )
						{
							index = opseo.indexOf(pr_opseo);
							if (index > -1) {
								opseo.splice(index, 1);
							}
						}

						$(this).attr('opseo', opseo.toString());
					})

					$('.content-items[tag="IMG"] *').hide();
					$('.content-items[tag="IMG"] *').each(function(index, value) {
						if ( $(this).attr('opseo') )
						{
							opseo = $(this).attr('opseo').split(',');
							if ( inside(pr_opseo, opseo) ) { $(this).show(); }
						}
					})
				}
				else if ( confirm('create a new group?') && $('.content-items[tag="IMG"] .sight').length && e.ctrlKey == false && e.shiftKey == false )
				{
					my_group_name = prompt('my group name is ?'); opseo = parseInt($(this).parent().prev().attr('opseo'));

					content_group = $('<DIV/>', {class: 'content_group'}).appendTo('.content-groups[tag="IMG"]').text(my_group_name).attr({
						opseo: opseo
					}).click(function(e)
					{
						if ( e.ctrlKey == false && e.shiftKey == false )
						{
							$(this).parent().children().removeClass('curr_group'); $(this).addClass('curr_group');
							$('.content-items[tag="IMG"] *').hide(); pr_opseo = $(this).attr('opseo');

							$('.content-items[tag="IMG"] *').each(function(index, value) {
								if ( $(this).attr('opseo') )
								{
									opseo = $(this).attr('opseo').split(',');
									if ( inside(pr_opseo, opseo) ) { $(this).show(); }
								}
							})
						}
						else if ( e.ctrlKey == false && e.shiftKey == true )
						{
							$('.content-items[tag="IMG"] *').show();
							$('.content-groups[tag="IMG"] .curr_group').removeClass('curr_group');
						}
						else if ( e.ctrlKey == true && e.shiftKey == false )
						{
							$('.content-items[tag="IMG"] *').hide();
							$('.content-items[tag="IMG"] *').each(function(index, value)
							{
								if ( $(this).attr('opseo') == undefined || $(this).attr('opseo') == '' ) { $(this).show(); }
							})

							$('.content-groups[tag="IMG"] .curr_group').removeClass('curr_group');
						}
					}).dblclick(function(e)
					{
						collection = $('.content-items[tag="IMG"] .content_item:visible'); idx = 0;

						$(selection).each(function(index, value) {
											
							if ( idx == collection.length ) { idx = 0; }

							value.doc.children('IMG').attr('src', $(collection[idx]).attr('src')); idx++;
								
						})
					}).contextmenu(function(e)
					{
						if ( confirm('add .sight to this group ?') )
						{
							pr_opseo = $(this).attr('opseo');

							$('.content-items[tag="IMG"] .sight').each(function(index, value) {
								if ( $(this).attr('opseo') == undefined || $(this).attr('opseo') == '' )
								{
									$(this).attr('opseo', pr_opseo);
								}
								else
								{
									opseo = $(this).attr('opseo').split(',');
									if ( inside(pr_opseo, opseo) == false )
									{
										opseo.push(pr_opseo); $(this).attr('opseo', opseo.toString());
									}
								}
							})

							$(this).parent().children().removeClass('curr_group'); $(this).addClass('curr_group');
							$('.content-items[tag="IMG"] *').hide();
							
							$('.content-items[tag="IMG"] *').each(function(index, value) {
								if ( $(this).attr('opseo') )
								{
									opseo = $(this).attr('opseo').split(',');
									if ( inside(pr_opseo, opseo) ) { $(this).show(); }
								}
							})

							$('.content-items[tag="IMG"] .sight').removeClass('sight');
						}

						e.preventDefault();
					})

					$('.content-items[tag="IMG"] .sight').attr('opseo', opseo);

					opseo = opseo + 1; $(this).parent().prev().attr('opseo', opseo); $('.content-items[tag="IMG"] .sight').removeClass('sight');
				}

				e.preventDefault();
			});

			if ( $('.content-groups[tag="IMG"] .curr_group').length )
			{
				$(content_item).attr('opseo', $('.content-groups[tag="IMG"] .curr_group').attr('opseo'));
			}

			e.preventDefault();
		})

		////////////////////////////////////////////////////////

		$('.zone').justifiedGallery({
			rowHeight : 50,
			lastRow : 'nojustify',
			randomize : true,
			margins : 5
		});

	};

//////////////////////////////////////////////////// Icon Functions /////////////////////////////////////////////////////

for (var i = 0; i < 16; i++) { icon = $('<DIV/>', {class: 'icon'}).appendTo('#icons'); }
$('#icon-name').on('keyup', function(e)
	{
		update_icon_panel();
	})
$('.icon-pack').click(function(e)
	{
		current_pack_name = $(this).attr('pack'); current_pack = icons[current_pack_name];

		$('.selected-pack').removeClass('selected-pack'); $(this).addClass('selected-pack');

		update_icon_panel();
	})
$('.icon-pack').first().trigger('click');

function update_icon_panel()
	{
		my_name = $('#icon-name').val(); my_16 = [];

		switch(current_pack_name)
		{
			case 'FA': my_name = my_name.replace(/\s/gi, '-'); break;
			case 'MD': my_name = my_name.replace(/\s/gi, '_'); break;
		}

		for (var i = 0; i < current_pack.length; i++)
		{
			if ( current_pack[i].indexOf(my_name) >= 0 )
			{
				my_16.push(current_pack[i]);
			}

			if ( my_16.length == 16 ) { break; }
		}

		$('.icon').removeAttr('class').addClass('icon').text('');

		for (var i = 0; i < 16; i++)
		{
			if ( my_16[i] )
			{
				$('.icon').eq(i).addClass(icons_classes[current_pack_name]).attr('icon', my_16[i]);

				switch(current_pack_name)
				{
					case 'FA': $('.icon').eq(i).addClass(my_16[i]) ; break;
					case 'MD': $('.icon').eq(i).text(my_16[i])     ; break;
				}
			}
		}
	}

$('.icon').click(function(e)
	{
		my_icon = $(this).attr('icon');

		$(selection).each(function(index, value) {
							
			if ( value.tag == 'ICON' )
			{
				for (var key in icons_classes) { value.doc.removeClass(icons_classes[key]); }

				value.doc.removeClass(value.content).addClass(icons_classes[current_pack_name]).text('');

				switch(current_pack_name)
				{
					case 'FA': value.doc.addClass(my_icon) ; break;
					case 'MD': value.doc.text(my_icon)     ; break;
				}

				value.content = my_icon; value.text.text(my_icon);
			}
				
		})
	}).contextmenu(function(e)
	{
		// content panel function

		bingo = $(this).clone().appendTo('.content-items[tag="ICON"]').removeClass('icon').click(function(e)
		{
			if ( e.ctrlKey == false )
			{
				$(this).parent().children().removeClass('sight'); $(this).addClass('sight');
			}
			else
			{
				$(this).toggleClass('sight');
			}
		}).dblclick(function(e)
		{
			my_class = $(this).attr('class');

			$(selection).each(function(index, value) {
								
				value.doc.removeAttr('class'); value.doc.attr('class', my_class);
					
			})
		}).contextmenu(function(e)
		{
			if ( e.ctrlKey == false && e.shiftKey == true )
			{
				if ( confirm('delete this content item?') )
				{
					$(this).remove();
				}
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && $('.content-groups[tag="ICON"] .curr_group').length )
			{
				pr_opseo = $('.content-groups[tag="ICON"] .curr_group').attr('opseo');

				if ( $('.content-items[tag="ICON"] .sight').length == 0 )
				{
					my_selector = $(this);
				}
				else
				{
					my_selector = $('.content-items[tag="ICON"] .sight');
				}

				$(my_selector).each(function(index, value) {
					opseo = $(this).attr('opseo').split(',');
					if ( inside(pr_opseo, opseo) )
					{
						index = opseo.indexOf(pr_opseo);
						if (index > -1) {
							opseo.splice(index, 1);
						}
					}

					$(this).attr('opseo', opseo.toString());
				})

				$('.content-items[tag="ICON"] *').hide();
				$('.content-items[tag="ICON"] *').each(function(index, value) {
					if ( $(this).attr('opseo') )
					{
						opseo = $(this).attr('opseo').split(',');
						if ( inside(pr_opseo, opseo) ) { $(this).show(); }
					}
				})
			}
			else if ( confirm('create a new group?') && $('.content-items[tag="ICON"] .sight').length && e.ctrlKey == false && e.shiftKey == false )
			{
				my_group_name = prompt('my group name is ?'); opseo = parseInt($(this).parent().prev().attr('opseo'));

				content_group = $('<DIV/>', {class: 'content_group'}).appendTo('.content-groups[tag="ICON"]').text(my_group_name).attr({
					opseo: opseo
				}).click(function(e)
				{
					if ( e.ctrlKey == false && e.shiftKey == false )
					{
						$(this).parent().children().removeClass('curr_group'); $(this).addClass('curr_group');
						$('.content-items[tag="ICON"] *').hide(); pr_opseo = $(this).attr('opseo');

						$('.content-items[tag="ICON"] *').each(function(index, value) {
							if ( $(this).attr('opseo') )
							{
								opseo = $(this).attr('opseo').split(',');
								if ( inside(pr_opseo, opseo) ) { $(this).show(); }
							}
						})
					}
					else if ( e.ctrlKey == false && e.shiftKey == true )
					{
						$('.content-items[tag="ICON"] *').show();
						$('.content-groups[tag="ICON"] .curr_group').removeClass('curr_group');
					}
					else if ( e.ctrlKey == true && e.shiftKey == false )
					{
						$('.content-items[tag="ICON"] *').hide();
						$('.content-items[tag="ICON"] *').each(function(index, value)
						{
							if ( $(this).attr('opseo') == undefined || $(this).attr('opseo') == '' ) { $(this).show(); }
						})

						$('.content-groups[tag="ICON"] .curr_group').removeClass('curr_group');
					}
				}).dblclick(function(e)
				{
					pr_opseo = $(this).attr('opseo'); collection = $('.content-items[tag="ICON"] *:visible'); idx = 0;

					$(selection).each(function(index, value) {

						if ( idx == collection.length ) { idx = 0; }

						value.doc.removeAttr('class'); value.doc.attr('class', $(collection[idx]).attr('class')); idx++;

					})
				}).contextmenu(function(e)
				{
					if ( confirm('add .sight to this group ?') )
					{
						pr_opseo = $(this).attr('opseo');

						$('.content-items[tag="ICON"] .sight').each(function(index, value) {
							if ( $(this).attr('opseo') == undefined || $(this).attr('opseo') == '' )
							{
								$(this).attr('opseo', pr_opseo);
							}
							else
							{
								opseo = $(this).attr('opseo').split(',');
								if ( inside(pr_opseo, opseo) == false )
								{
									opseo.push(pr_opseo); $(this).attr('opseo', opseo.toString());
								}
							}
						})

						$(this).parent().children().removeClass('curr_group'); $(this).addClass('curr_group');
						$('.content-items[tag="ICON"] *').hide();

						$('.content-items[tag="ICON"] *').each(function(index, value) {
							if ( $(this).attr('opseo') )
							{
								opseo = $(this).attr('opseo').split(',');
								if ( inside(pr_opseo, opseo) ) { $(this).show(); }
							}
						})

						$('.content-items[tag="ICON"] .sight').removeClass('sight');
					}

					e.preventDefault();
				})

				$('.content-items[tag="ICON"] .sight').attr('opseo', opseo);

				opseo = opseo + 1; $(this).parent().prev().attr('opseo', opseo); $('.content-items[tag="ICON"] .sight').removeClass('sight');
			}

			e.preventDefault();
		});

		if ( $('.content-groups[tag="ICON"] .curr_group').length )
		{
			$(bingo).attr('opseo', $('.content-groups[tag="ICON"] .curr_group').attr('opseo'));
		}

		e.preventDefault();
	})

///////////////////////////////////////////// DIV Resizable Height Functions ////////////////////////////////////////////

function div_height_resizable_toggle()
	{
		$(selection).each(function(index, value) {
							
			value.doc.toggleClass('div_height_resizable');

			if ( value.doc.hasClass('div_height_resizable') )
			{
				value.doc.resizable({ handles : 's' });
			}
			else
			{
				value.doc.resizable('destroy');
			}
				
		})
	}
function div_height_resizable_update()
	{
		$(selection).each(function(index, value) {

			if ( value.doc.hasClass('div_height_resizable') == false )
			{
				value.doc.resizable({ handles : 's' });
			}
			else
			{
				value.doc.resizable('destroy');
			}
				
		})
	}

////////////////////////////////////////////////// Size Panel Functions /////////////////////////////////////////////////

$('.size-option').draggable({
	start : function(e, ui)
	{
		my_original = parseFloat($(this).text()); my_fn = $(this).attr('fn');
	},
	drag : function(e, ui)
	{
		my_equation = ui.position.left - ui.originalPosition.left;

		my_val = my_original + my_equation;

		if ( e.ctrlKey  == true ) { my_val = Math.round(my_val / 5) * 5; }
		if ( e.shiftKey == true ) { my_val = Math.round(my_val / 10) * 10; }

		if ( my_val < 0 ) { my_val = 0; }

		$(selection).each(function(index, value) { value.doc.css(my_fn, my_val + 'px'); });

		$(this).text(my_val);

	}}).contextmenu(function(e)
	{
		my_fn = $(this).attr('fn');

		if ( e.ctrlKey == true )
		{
			my_val = ipp();

			if ( isNaN(my_val) )
			{
				$(selection).each(function(index, value) { value.doc.css({ width : '', height : '' }); });
			}
			else
			{
				if ( my_val < 0 ) { my_val = -my_val; }

				$(selection).each(function(index, value) { value.doc.css({ width : my_val + 'px', height : my_val + 'px' }); });
			}

			$('.size-option').text(my_val);
		}
		else
		{
			my_val = ipp();

			if ( isNaN(my_val) )
			{
				$(selection).each(function(index, value) { value.doc.css(my_fn, ''); });
			}
			else
			{
				if ( my_val < 0 ) { my_val = -my_val; } $(this).text(my_val);

				$(selection).each(function(index, value) { value.doc.css(my_fn, my_val + 'px'); });
			}
		}

		e.preventDefault();
	});

/////////////////////////////////////////////////// Add Text Functions //////////////////////////////////////////////////

function add_text()
	{
		if ( selection.length ) { my_content = prompt('what content ?', selection[0].doc.text()); }

		if ( my_content != null && my_content != '' )
		{
			my_content = my_content.replace(/--/g, '<br>');

			$(selection).each(function(index, value) {

				if ( value.tag == 'H3' )
				{
					// $(value.doc).contents().filter(function() {
					// 	return this.nodeType == 3
					// }).each(function(){
					// 	this.textContent = my_content;
					// });

					$(value.doc).html(my_content);
				}
				else if ( value.doc.hasClass('text') )
				{
					// $(value.doc).text(my_content)
					$(value.doc).html(my_content);
				}
					
			})
		}
	}
function toggle_editable()
	{
		if ( $('#doc H3').first().attr('contenteditable') == undefined )
		{
			$('#doc H3').attr('contenteditable', true);
		}
		else
		{
			$('#doc H3').removeAttr('contenteditable');
		}

		$('.content_item[contenteditable="true"]').removeAttr('contenteditable');
	}

///////////////////////////////////////////////// Text Panel Functions //////////////////////////////////////////////////

$('.text-format').click(function(e)
	{
		my_fn = $(this).attr('fn');

		switch(my_fn)
		{
			case 'bold':
				
				my_weight = parseInt( prompt('font-weight == x * 100') );

				if ( isNaN(my_weight) == false )
				{
					$(selection).each(function(index, value) {
										
						value.doc.css('font-weight', my_weight * 100);

					})
				}
				
				break;

			case 'italic':
				
				$(selection).each(function(index, value) {
									
					value.doc.toggleClass('italic');
						
				})
				
				break;

			case 'line':

				if ( selection[0].doc.hasClass('td-line-through') == false && selection[0].doc.hasClass('td-underline') == false )
				{
					my_line = 0;
				}
				else if ( selection[0].doc.hasClass('td-underline') )
				{
					my_line = 1;
				}
				else
				{
					my_line = 2;
				}

				$(selection).each(function(index, value) {
									
					switch(my_line)
					{
						case 0 : value.doc.removeClass('td-line-through').addClass('td-underline') ; break;
						case 1 : value.doc.removeClass('td-underline').addClass('td-line-through') ; break;
						case 2 : value.doc.removeClass('td-underline td-line-through') ; break;
					}
						
				})
				
				break;

			case 'flex':

				if ( selection[0].doc.hasClass('h3_flex') ) { flex_move = false; } else { flex_move = true; }
				
				$(selection).each(function(index, value) {
									
					if ( flex_move == true )
					{
						value.doc.addClass('h3_flex');
					}
					else
					{
						value.doc.removeClass('h3_flex');
					}
						
				})
				
				break;
		}
	})
$('.text-format').contextmenu(function(e)
	{
		my_fn = $(this).attr('fn');

		switch(my_fn)
		{
			case 'size':
				
				my_size = parseInt( prompt('font-size = ?') );

				if ( isNaN(my_size) == false )
				{
					$(selection).each(function(index, value) {
										
						value.doc.css('font-size', my_size + 'px');

					})
				}
				
				break;
		}

		e.preventDefault();
	})
$('.font-size-format').draggable({
	start : function(e, ui)
	{
		my_original = parseInt(selection[0].doc.css('font-size'));
	},
	drag : function(e, ui)
	{
		my_equation = ui.position.left - ui.originalPosition.left;

		if ( e.ctrlKey == false && e.shiftKey == false )
		{
			my_equation = Math.round(my_equation / 3);
		}
		else if ( e.ctrlKey == true && e.shiftKey == false )
		{
			my_equation = Math.round(my_equation / 1.5);
		}

		my_val = my_original + my_equation;

		$(selection).each(function(index, value) {

			value.doc.css('font-size', my_val + 'px');
			value.size = my_val;

		})

		$(this).text(my_val);
	}})

/////////////////////////////////////////////////// Toggle Functions ////////////////////////////////////////////////////

$('.toggle-option').click(function(e)
	{
		my_fn = $(this).attr('fn');

		// $(this).toggleClass('selected-toggle-option');

		switch(my_fn)
		{
			case 'bgi'    : make_a_bgi_group()            ; break;
			case 'f1'     : make_group_flex1()            ; break;
			case 'height' : div_height_resizable_toggle() ; break;
		}

		$('.toggle-option').removeClass('selected-fn');

		if ( selection[0].doc.hasClass('has_bgi') ) { $('.toggle-option[fn="bgi"]').addClass('selected-fn'); }
		if ( selection[0].doc.hasClass('div_height_resizable') ) { $('.toggle-option[fn="height"]').addClass('selected-fn'); }
	})

function make_group_flex1()
	{
		if ( selection.length )
		{
			if ( selection[0].doc.hasClass('f1') ) { my_option = false; } else { my_option = true; }
		}

		$(selection).each(function(index, value) {
							
			if ( value.tag == 'DIV' )
			{
				if ( my_option == true )
				{
					value.doc.addClass('f1');
				}
				else
				{
					value.doc.removeClass('f1');
				}
			}
				
		})
	}
function resizable_selection()
	{
		$('.ui-resizable').resizable('destroy'); $('.just-dance').resizable({
			start : function(e)
			{
				$(this).addClass('resized');
			}
		});
	}

////////////////////////////////////////////////// Utilities Functions //////////////////////////////////////////////////

function css_sync(type)
	{
		if ( type == 'prompt' ) { type = prompt('css sync custom propety'); }

		css_sync_dictionary = [
			['all','width height'],
			['h', 'height'],
			['w', 'width'],
		];

		for (var i = 0; i < css_sync_dictionary.length; i++)
		{
			if ( type == css_sync_dictionary[i][0] ) { type = css_sync_dictionary[i][1]; }
		}

		my_split = type.split(' ');

		if ( selection.length > 1 && confirm('sync [' + my_split + '] ?') )
		{
			for (var i = 0; i < my_split.length; i++)
			{
				my_type = my_split[i]; base_value = selection[0].doc.css(my_type);

				for (var j = 1; j < selection.length; j++)
				{
					selection[j].doc.css(my_type, base_value);
				}
			}
		}
	}
function create_50px_div()
	{
		LP_Ticket('DIV');

		$(selection).each(function(index, value) {
							
			value.doc.css({ width : '50px', height : '50px', border : '1px solid white' }).addClass('text');
			value.bdc = 'white'; value.borderWidth = 1;

			value.text.text('INPUT');

		})

		resizable_selection();
	}

/////////////////////////////////////////////////// Number Functions ////////////////////////////////////////////////////

function ipn()
	{
		my_number_input = parseFloat( prompt('Input Value', 0) );

		if ( isNaN(my_number_input) )
		{
			my_number_input = 0;
		}

		return my_number_input;
	}
function ipp()
	{
		my_number_input = parseFloat( prompt('Input Value', 0) ); return my_number_input;
	}

//////////////////////////////////////////////// Auto Padding Functions /////////////////////////////////////////////////

function find_my_edge_elements(elem)
	{
		value = git(elem);

		if ( value.tag == 'DIV' && value.doc.find('*').not(block_list).not('DIV').length )
		{
			chil = value.doc.find('*').not('DIV').not(block_list); TA = []; LA = []; RA = []; BA = [];

			for (var i = 0; i < chil.length; i++)
			{
				git(chil[i]);

				TA.push([item.top,   item.id]);
				BA.push([item.bottom,item.id]);
				LA.push([item.left,  item.id]);
				RA.push([item.right, item.id]);
			}

			TA.sort(Comparator_SML_0);
			BA.sort(Comparator_BIG_0);
			LA.sort(Comparator_SML_0);
			RA.sort(Comparator_BIG_0);

			value.mT = TA[0][1];
			value.mB = BA[0][1];
			value.mL = LA[0][1];
			value.mR = RA[0][1];
		}

		item = value;
	}

$('.auto-padding-item').click(function(e)
	{
		my_fn = $(this).attr('fn');

		$(selection).each(function(index, value) {

			if ( my_fn.indexOf('top') >= 0 )
			{
				top_item = get(value.mT);

				distance = top_item.top - top_item.doc.offset().top;
				distance = Math.round(distance);

				if ( distance > 0 )
				{
					value.doc.css('padding-top', distance + 'px'); value.PT = distance;
				}
			}

			if ( my_fn.indexOf('bottom') >= 0 )
			{
				bottom_item = get(value.mB);

				distance = bottom_item.bottom - bottom_item.doc.offset().bottom;
				distance = Math.round(distance);

				if ( distance > 0 )
				{
					value.doc.css('padding-bottom', distance + 'px'); value.PB = distance;
				}
			}
			
			if ( my_fn.indexOf('horizontal') >= 0 )
			{
				left_item = get(value.mL); right_item = get(value.mR);

				left_distance  = left_item.left   - left_item.doc.offset().left;
				right_distance = ( right_item.doc.offset().left + right_item.doc.outerWidth() ) - right_item.right;

				left_distance  = Math.round(left_distance );
				right_distance = Math.round(right_distance);

				if ( left_distance  > 0 ) { value.doc.css('padding-left' , left_distance  + 'px'); value.PL = left_distance;  }
				if ( right_distance > 0 ) { value.doc.css('padding-right', right_distance + 'px'); value.PR = right_distance; }
			}

			smart_sector = value.doc.children('.smart_sector');
			smart_sector.find('.smart_padding[fn="top"]').css('height', value.PT + 'px');
			smart_sector.find('.smart_padding[fn="left"]').css('width', value.PL + 'px');
			smart_sector.find('.smart_padding[fn="bottom"]').css('height', value.PB + 'px');
			smart_sector.find('.smart_padding[fn="right"]').css('width', value.PR + 'px');

		})
	})

///////////////////////////////////////////////////// Unrap Stuffs //////////////////////////////////////////////////////

function unwrap_all()
	{
		swipe = selection[0].id; all_in(swipe); my_ids = [];

		for (var i = 0; i < discover.length; i++)
		{
			if ( discover[i].tag != 'DIV' ) { my_ids.push(discover[i].id) }
		}

		for (var i = 0; i < my_ids.length; i++)
		{
			hush = geet(my_ids[i]);

			if ( hush.left )
			{
				hush.doc.contextmenu_width().addClass('news');
				hush.doc.css({ position : 'absolute', top : hush.top, left : hush.left });
			}

			select(hush.id); cut(); select(swipe); paste(true);
		}

		select(swipe); sp_max(selection[0].doc.parent()); LP_Delete();
	}

/////////////////////////////////////////////////////// Be Smart ////////////////////////////////////////////////////////

function update_to_be_smart(elem, engage)
	{
		elem = $(elem); sophia = gaet(elem);

		if ( elem.hasClass('smart') == false )
		{
			elem.addClass('smart non'); elem.children('.smart_sector').remove();

			elem.off('hover').hover(function(e)
			{
				$(this).addClass('super_smart').parents().removeClass('super_smart');
			}, function(e)
			{
				$(this).removeClass('super_smart').parents("div").first().addClass('super_smart');
			})

			smart_sector  = $('<DIV/>', {class: 'smart_sector'}).appendTo(sophia.doc);
			smart_padding = $('<DIV/>', {sid: sophia.id, fn: "left", class: 'smart_padding'}).appendTo(smart_sector);

			smart_block   = $('<DIV/>', {sid: sophia.id, class: 'smart_block'}).appendTo(smart_sector);
			smart_padding = $('<DIV/>', {sid: sophia.id, fn: "top", class: 'smart_padding'}).appendTo(smart_block);
			smart_content = $('<DIV/>', {sid: sophia.id, class: 'smart_content'}).appendTo(smart_block);

			create_smart_flex_and_smart_sp(sophia.id);

			smart_padding = $('<DIV/>', {sid: sophia.id, fn: "bottom", class: 'smart_padding'}).appendTo(smart_block);
			smart_padding = $('<DIV/>', {sid: sophia.id, fn: "right", class: 'smart_padding'}).appendTo(smart_sector);

			sophia.doc.children('SP').smart_sp_drag().smart_sp_click().smart_sp_contextmenu();
			smart_sector.find('.smart_sp').smart_flex_sp_drag().smart_flex_sp_click().smart_flex_sp_contextmenu();
			smart_sector.find('.smart_padding').smart_padding_drag();
		}
		else if ( engage == true )
		{
			if ( elem.hasClass('non') )
			{
				elem.children('SP').smart_sp_drag().smart_sp_click().smart_sp_contextmenu();
			}
			else
			{
				create_smart_flex_and_smart_sp(sophia.id);
			}
		}

		// smart padding size update (new canon)

		smart_sector = sophia.doc.children('.smart_sector');
		smart_sector.find('.smart_padding[fn="top"]').css('height', sophia.PT + 'px');
		smart_sector.find('.smart_padding[fn="left"]').css('width', sophia.PL + 'px');
		smart_sector.find('.smart_padding[fn="bottom"]').css('height', sophia.PB + 'px');
		smart_sector.find('.smart_padding[fn="right"]').css('width', sophia.PR + 'px');
	}
function create_smart_flex_and_smart_sp(id)
	{
		c(id); smart_block_list = ['IMG', 'ICON', 'LINE'];
		sophia = geet(id); smart_content = sophia.doc.children('.smart_sector').find('.smart_content').empty();

		for (var i = 0; i < discover.length; i++)
		{
			leone = discover[i];

			if ( inside(leone.tag, smart_block_list) == false )
			{
				smart_flex = $('<DIV/>', {sid: leone.id, class: 'smart_flex'}).appendTo(smart_content);
			}
		}

		smart_children = smart_content.children('.smart_flex');

		for (var i = 1; i < smart_children.length; i++)
		{
			smart_sp = $('<DIV/>', {sid: id, ssp: i-1, class: 'smart_sp'}).insertBefore(smart_children[i]);
		}

		smart_content.children('.smart_sp').smart_flex_sp_drag().smart_flex_sp_contextmenu().smart_flex_sp_click();
	}

function toggle_flex()
	{
		$(selection).each(function(index, value) {

			if ( value.doc.hasClass('smart') == false )
			{
				update_to_be_smart(value.doc); value.doc.removeClass('non');
			}
			else
			{
				value.doc.toggleClass('non'); update_to_be_smart(value.doc, true);
			}

			if ( value.doc.children('.container').length == 1 && value.doc.children('.col').length == 1 )
			{
				if ( value.doc.hasClass('row') ) { value.doc.addClass('img_and_div'); }

				if ( value.doc.attr('class').indexOf('_SB_') >= 0 )
				{
					value.doc.removeClass('img_and_div');
				}
			}

		})
	}

$.fn.smart_hover   = function()
	{
		$(this).hover(function(e) {
			
		}, function(e) {
			if ( dragging == false ) { $(this).removeClass('hovering'); }
		})

		$(this).on('mousemove', function(e)
		{
			if ( $('.hovering').length == 0 ) { $(this).addClass('hovering') }
		})

		return $(this);
	}

$.fn.smart_sp_click = function()
	{
		$(this).click(function(e)
		{
			if ( e.ctrlKey == false && e.shiftKey == true && e.altKey == false )
			{
				target = gaet( $(this).parent() ); select(target.id);
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == false )
			{
				if ( confirm('clear width prev item ?') == true )
				{
					personal = gaet($(this).prev());
					personal.mWidth = undefined; personal.doc.css('width', '');
				}
			}
			else if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == true )
			{
				if ( confirm('clear width next item ?') == true )
				{
					personal = gaet($(this).prev());
					if ( $(this).next('.col, h3').length ) { personal = gaet($(this).next('div, h3')); }
					personal.mWidth = undefined; personal.doc.css('width', '');
				}
			}
		})

		return $(this);
	}
$.fn.smart_sp_contextmenu = function()
	{
		$(this).contextmenu(function(e)
		{
			target = gaet( $(this).parent() );

			if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == false )
			{
				target.PL = 20; target.PR = 20;
				target.doc.css({ 'padding-right' : '20px', 'padding-left' : '20px' }); update_smart_padding_panel(target);
			}
			else if ( e.ctrlKey == true && e.shiftKey == true && e.altKey == false )
			{
				target.PL = 20; target.PR = 20; target.PT = 10; target.PB = 10;
				target.doc.css({ 'padding' : '10px 20px' }); update_smart_padding_panel(target);
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == true )
			{
				target.css('height', ''); target.mHeight = undefined;
			}

			e.preventDefault();
		})

		return $(this);
	}
$.fn.smart_sp_drag = function()
	{
		$(this).draggable({ start : function(e, ui)
		{
			general = gaet( $(this).parent() ); srm('hovering'); $('.super_smart').trigger('mouseleave');

			// get value

			if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == false ) // normal SP
			{
				$(this).addClass('hovering');

				if ( general.doc.hasClass('row') )
				{
					my_sp_value = $(this).outerWidth();
				}
				else
				{
					my_sp_value = $(this).outerHeight();
				}

				if ( selection.length > 1 )
				{
					sp_multiple = false;

					for (var i = 0; i < selection.length; i++)
					{
						if ( selection[i].id == general.id ) { sp_multiple = true; }
					}

					if ( sp_multiple == true )
					{
						my_index = general.doc.children('SP').index( $(this) );

						for (var i = 0; i < selection.length; i++)
						{
							selection[i].doc.children('SP').eq(my_index).addClass('hovering');
						}
					}
				}
			}
			else if ( e.ctrlKey == false && e.shiftKey == true && e.altKey == false ) // all SP
			{
				$(this).siblings('SP').add(this).addClass('hovering');

				if ( general.doc.hasClass('row') )
				{
					my_sp_value = $(this).outerWidth();
				}
				else
				{
					my_sp_value = $(this).outerHeight();
				}

				if ( selection.length > 1 )
				{
					sp_multiple = false;

					for (var i = 0; i < selection.length; i++)
					{
						if ( selection[i].id == general.id ) { sp_multiple = true; }
					}

					if ( sp_multiple == true )
					{
						for (var i = 0; i < selection.length; i++)
						{
							selection[i].doc.children('SP').addClass('hovering');
						}
					}
				}
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == false ) // prev flex
			{
				target = $(this).prev(); personal = gaet(target);

				if ( personal.mWidth ) { mWidth = personal.mWidth } else { mWidth = $(target).outerWidth(); }
			}
			else if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == true ) // next flex
			{
				if ( $(this).next('div, h3').length )
				{
					target = $(this).next('div, h3');
				}
				else
				{
					target = $(this).prev();
				}

				personal = gaet(target);

				if ( personal.mWidth ) { mWidth = personal.mWidth } else { mWidth = $(target).outerWidth(); }
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == true ) // height drag
			{
				personal = gaet( $(this).parent() );

				if ( personal.mHeight ) { mHeight = personal.mHeight; } else { mHeight = personal.doc.outerHeight(); }
			}

		}, drag : function(e, ui)
		{
			// my equation

			if ( general.doc.hasClass('row') )
			{
				my_equation = ui.position.left - ui.originalPosition.left;
			}
			else
			{
				my_equation = ui.position.top - ui.originalPosition.top;
			}

			// my functions

			if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == false )  // normal SP
			{
				my_value = my_sp_value + my_equation;

				if ( my_value < 0 ) { my_value = 0; }

				if ( general.doc.hasClass('row') )
				{
					$(this).add('.hovering').css('width', my_value + 'px');
				}
				else
				{
					$(this).add('.hovering').css('height', my_value + 'px');
				}
			}
			else if ( e.ctrlKey == false && e.shiftKey == true && e.altKey == false )  // all SP
			{
				my_value = my_sp_value + my_equation;

				if ( my_value < 0 ) { my_value = 0; }

				if ( general.doc.hasClass('row') )
				{
					$(this).siblings('SP').add(this).add('.hovering').css('width', my_value + 'px');
				}
				else
				{
					$(this).siblings('SP').add(this).add('.hovering').css('height', my_value + 'px');
				}
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == false ) // prev width
			{
				my_value = mWidth + my_equation; if ( my_value < 0 ) { my_value = 0; }

				target.css('width', my_value + 'px'); personal.mWidth = my_value;
			}
			else if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == true ) // next width
			{
				my_value = mWidth + my_equation; if ( my_value < 0 ) { my_value = 0; }

				target.css('width', my_value + 'px'); personal.mWidth = my_value;
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == true ) // height drag
			{
				my_equation = ui.position.top - ui.originalPosition.top;

				my_value = mHeight + my_equation; if ( my_value < 0 ) { my_value = 0; }

				personal.doc.css('height', my_value + 'px'); personal.mHeight = my_value;
			}
		}, stop : function(e, ui) { srm('hovering'); }}).smart_hover();

		return $(this);
	}

$.fn.smart_flex_sp_click = function()
	{
		$(this).click(function(e)
		{
			if ( e.ctrlKey == false && e.shiftKey == true && e.altKey == false )
			{
				target = gaet( $(this).parents('.smart').first() ); select(target.id);
			}
		})

		return $(this);
	}
$.fn.smart_flex_sp_contextmenu = function()
	{
		$(this).contextmenu(function(e)
		{
			target = gaet( $(this).parents('.smart').first() );

			if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == false )
			{
				target.PL = 20; target.PR = 20;
				target.doc.css({ 'padding-right' : '20px', 'padding-left' : '20px' }); update_smart_padding_panel(target);
			}
			else if ( e.ctrlKey == true && e.shiftKey == true && e.altKey == false )
			{
				target.PL = 20; target.PR = 20; target.PT = 10; target.PB = 10;
				target.doc.css({ 'padding' : '10px 20px' }); update_smart_padding_panel(target);
			}
			else if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == true )
			{
				if ( confirm('make all flex to 1 ?' == true) )
				{
					$(this).siblings('.smart_flex').css('flex', '1 1 0');
					target.doc.children('DIV, H3').css('flex', '1 1 0');

					target.doc.children('DIV, H3').each(function(index, value) {
						current_chil = gaet(this); current_chil.flex = 1;
					})
				}
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == true )
			{
				target.css('height', ''); target.mHeight = undefined;
			}

			e.preventDefault();
		})

		return $(this);
	}
$.fn.smart_flex_sp_drag = function()
	{
		$(this).draggable({ start : function(e, ui)
		{
			general = geet( parseInt($(this).attr('sid')) );

			srm('hovering'); dragging = true; $('.super_smart').trigger('mouseleave');

			// get value

			if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == false ) // normal SP
			{
				sp_index  = parseInt( $(this).attr('ssp') );
				sp_target = general.doc.children('SP').eq(sp_index);

				$(this).addClass('hovering');

				if ( general.doc.hasClass('row') )
				{
					my_sp_value = $(this).outerWidth();
				}
				else
				{
					my_sp_value = $(this).outerHeight();
				}
			}
			else if ( e.ctrlKey == false && e.shiftKey == true && e.altKey == false ) // all SP
			{
				sp_index  = parseInt( $(this).attr('ssp') );
				sp_target = general.doc.children('SP').eq(sp_index);

				$(this).siblings('.smart_sp').add(this).addClass('hovering');

				if ( general.doc.hasClass('row') )
				{
					my_sp_value = $(this).outerWidth();
				}
				else
				{
					my_sp_value = $(this).outerHeight();
				}
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == false ) // prev flex
			{
				flex_target = $(this).prev(); flex_target.addClass('hovering');

				personal = geet( parseInt($(flex_target).attr('sid')) );
				my_flex  = personal.flex; if ( my_flex == undefined ) { my_flex = 1; }
			}
			else if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == true ) // next flex
			{
				if ( $(this).next().hasClass('smart_flex') )
				{
					flex_target = $(this).next();
				}
				else
				{
					flex_target = $(this).prev();
				}

				flex_target.addClass('hovering');

				personal = geet( parseInt($(flex_target).attr('sid')) );
				my_flex  = personal.flex; if ( my_flex == undefined ) { my_flex = 1; }
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == true ) // height drag
			{
				personal = gaet( $(this).parents('.smart').first() );

				if ( personal.mHeight ) { mHeight = personal.mHeight; } else { mHeight = personal.doc.outerHeight(); }
			}

		}, drag : function(e, ui)
		{
			// my equation

			if ( general.doc.hasClass('row') )
			{
				my_equation = ui.position.left - ui.originalPosition.left;
			}
			else
			{
				my_equation = ui.position.top - ui.originalPosition.top;
			}

			// my functions

			if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == false )  // normal SP
			{
				my_value = my_sp_value + my_equation;

				if ( my_value < 0 ) { my_value = 0; }

				if ( general.doc.hasClass('row') )
				{
					sp_target.add(this).css('width', my_value + 'px');
				}
				else
				{
					sp_target.add(this).css('height', my_value + 'px');
				}
			}
			else if ( e.ctrlKey == false && e.shiftKey == true && e.altKey == false ) // all SP
			{
				my_value = my_sp_value + my_equation;

				if ( my_value < 0 ) { my_value = 0; }

				if ( general.doc.hasClass('row') )
				{
					sp_target.siblings('SP').add(sp_target).add( $(this).siblings('.smart_sp').add(this) ).css('width', my_value + 'px');
				}
				else
				{
					sp_target.siblings('SP').add(sp_target).add( $(this).siblings('.smart_sp').add(this) ).css('height', my_value + 'px');
				}
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == false ) // prev flex
			{
				my_value      = my_flex + my_equation / 100;
				personal.flex = my_value;

				$(flex_target).add(personal.doc).css('flex', my_value + ' ' + my_value + ' 0');
			}
			else if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == true )
			{
				my_equation   = -my_equation;
				my_value      = my_flex + my_equation / 100;
				personal.flex = my_value;

				$(flex_target).add(personal.doc).css('flex', my_value + ' ' + my_value + ' 0');
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == true ) // height drag
			{
				my_equation = ui.position.top - ui.originalPosition.top;

				my_value = mHeight + my_equation; if ( my_value < 0 ) { my_value = 0; }

				personal.doc.css('height', my_value + 'px'); personal.mHeight = my_value;
			}
		}, stop : function(e,ui) { srm('hovering'); dragging = false; }}).smart_hover();

		return $(this);
	}

$.fn.smart_padding_drag = function()
	{
		$(this).draggable({ start : function(e)
		{
			sid = parseInt($(this).attr('sid')); personal = get(sid);
			$(this).addClass('hovering'); my_fn = $(this).attr('fn');

			switch(my_fn)
			{
				case 'top'   : my_padding_value = personal.PT; break;
				case 'left'  : my_padding_value = personal.PL; break;
				case 'bottom': my_padding_value = personal.PB; break;
				case 'right' : my_padding_value = personal.PR; break;
			}
		}, drag : function(e, ui)
		{
			if ( my_fn == 'left' || my_fn == 'right' )
			{
				my_equation = ui.position.left - ui.originalPosition.left;
			}
			else
			{
				my_equation = ui.position.top - ui.originalPosition.top;
			}

			if ( my_fn == 'right' ) { my_equation = -my_equation; }
			
			my_value = my_padding_value + my_equation;

			if ( e.ctrlKey == true ) { my_value = Math.round(my_value / 5) * 5; }

			// part 2

			fns = [my_fn];

			if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == true )
			{
				switch(my_fn)
				{
					case 'left': case 'right': fns = ['left','right']; break;
					case 'top': case 'bottom': fns = ['top','bottom']; break;
				}
			}
			else if ( e.ctrlKey == false && e.shiftKey == true && e.altKey == false )
			{
				fns = ['top','bottom','left','right'];
			}

			for (var i = 0; i < fns.length; i++)
			{
				mini_fn = fns[i];

				personal.doc.css('padding-' + mini_fn, my_value + 'px');

				if ( mini_fn == 'left' || mini_fn == 'right' )
					 { $('.smart_padding[sid="' + sid + '"][fn="' + mini_fn + '"]').css('width' , my_value + 'px'); }
				else { $('.smart_padding[sid="' + sid + '"][fn="' + mini_fn + '"]').css('height', my_value + 'px'); }

				switch(mini_fn)
				{
					case 'top'   : personal.PT = my_value; break;
					case 'left'  : personal.PL = my_value; break;
					case 'bottom': personal.PB = my_value; break;
					case 'right' : personal.PR = my_value; break;
				}
			}

			// update padding panel

			$('.p_item[fn="left"]').text(personal.PL);  $('.p_item[fn="top"]').text(personal.PT);
			$('.p_item[fn="right"]').text(personal.PR); $('.p_item[fn="bottom"]').text(personal.PB);

			$('.p_item[fn="vertical"]').text( (personal.PT + personal.PB) / 2 );
			$('.p_item[fn="horizontal"]').text( (personal.PL + personal.PR) / 2 );
			$('.p_item[fn="all"]').text( (personal.PL + personal.PR + personal.PT + personal.PB) / 4 );

		}, stop : function(e) { $(this).removeClass('hovering'); }}).smart_hover();

		return $(this);
	}
function update_smart_padding_panel(tit)
	{
		$('.p_item[fn="left"]').text(tit.PL);  $('.p_item[fn="top"]').text(tit.PT);
		$('.p_item[fn="right"]').text(tit.PR); $('.p_item[fn="bottom"]').text(tit.PB);

		$('.p_item[fn="vertical"]').text( (tit.PT + tit.PB) / 2 );
		$('.p_item[fn="horizontal"]').text( (tit.PL + tit.PR) / 2 );
		$('.p_item[fn="all"]').text( (tit.PL + tit.PR + tit.PT + tit.PB) / 4 );

		tit.doc.children('.smart_sector').find('.smart_padding[fn="top"]').css('height', tit.PT + 'px');
		tit.doc.children('.smart_sector').find('.smart_padding[fn="bottom"]').css('height', tit.PB + 'px');
		tit.doc.children('.smart_sector').find('.smart_padding[fn="left"]').css('width', tit.PL + 'px');
		tit.doc.children('.smart_sector').find('.smart_padding[fn="right"]').css('width', tit.PR + 'px');
	}

$('.sector-item').click(function(e)
	{
		my_fn = $(this).attr('fn');

		if ( my_fn == 'flex' )
		{
			$(selection).each(function(index, value) {
								
				value.doc.removeClass('non'); update_to_be_smart(value.doc, true);

			})
		}
	})
$('.full-moon-item').click(function(e)
	{
		my_fn = $(this).attr('fn');

		if ( my_fn == 'full-moon' )
		{
			$('.just-dance').toggleClass('full-moon');

			if ( $('.just-dance').first().hasClass('full-moon') )
			{
				$(this).addClass('selected-fn');
			}
			else
			{
				$(this).removeClass('selected-fn');
			}
		}
		else if ( my_fn == 'width-100' )
		{
			$('.just-dance').toggleClass('width-100');

			if ( $('.just-dance').first().hasClass('width-100') )
			{
				$(this).addClass('selected-fn');
			}
			else
			{
				$(this).removeClass('selected-fn');
			}
		}
	})

////////////////////////////////////////////////////// Come To Me ///////////////////////////////////////////////////////

function come_to_me()
	{
		if ( selection[0].doc.hasClass('to_me') ) { mode = 'clear' } else { mode = 'to me' }

		$(selection).each(function(index, value) {
							
			if ( mode == 'clear' )
			{
				if ( value.doc.hasClass('ui-draggable') )
				{
					value.doc.draggable('destroy');
					value.doc.css({ top : '', left : '', position : '' });
				}
			}
			else
			{
				value.doc.draggable().css({ top : pageY, left : pageX, position : 'absolute' });
			}
				
		})
	}
function resize_dance()
	{
		$('.just-dance').resizable();
	}
function damn_sp_size()
	{
		my_number = parseFloat( prompt('children SP size') )

		if ( isNaN(my_number) == false )
		{
			$(selection).each(function(index, value) {

				if ( value.doc.hasClass('row') )
				{
					value.doc.children('SP').css('width', my_number + 'px');
					value.doc.children('.smart_sector').find('.smart_sp').css('width', my_number + 'px');
				}
				else
				{
					value.doc.children('SP').css('height', my_number + 'px');
					value.doc.children('.smart_sector').find('.smart_sp').css('height', my_number + 'px');
				}

			})
		}
	}

function key_u_to_update()
	{
		$(selection).each(function(index, value) {

			update_to_be_smart(value.doc, true);

		})
	}

function sp_refresh()
	{
		$(selection).each(function(index, value) {

			sp_max(value.doc); update_to_be_smart(value.doc, true);

		})
	}

function quick_saving()
	{
		main = gaet($('#doc').children().first()); select(main.id);

		my_name = prompt('save as ?', database[database.length-1][1]);

		if ( my_name != '' && my_name != ' ' && my_name != null )
		{
			save_selection_to_database( my_name, database[database.length-1][2] );
		}
	}
function quick_last_loading()
	{
		$('.load_item').last().dblclick(); main = gaet($('#doc').children().first()); select(main.id);
	}

function take_a_side()
	{
		my_code = parseInt( prompt('my_code is ?') );

		switch(my_code)
		{
			case 4:

				$(selection).each(function(index, value) {

					value.doc.removeClass(value['align-self']);
					value.doc.addClass('align-self-start');
					value['align-self'] = 'align-self-start';
									
					value.PL = 20; value.PR = 0; value.PT = 0; value.PB = 0;

					smart_sector = value.doc.children('.smart_sector');
					smart_sector.find('.smart_padding').css({ width : '', height : '' });
					smart_sector.find('.smart_padding[fn="left"]').css('width', '20px')

					value.doc.css('padding', '').css('padding-left', '20px');
						
				})
				
				break;

			case 6:

				$(selection).each(function(index, value) {

					value.doc.removeClass(value['align-self']);
					value.doc.addClass('align-self-end');
					value['align-self'] = 'align-self-end';

					value.PL = 20; value.PR = 0; value.PT = 0; value.PB = 0;
					
					smart_sector = value.doc.children('.smart_sector');
					smart_sector.find('.smart_padding').css({ width : '', height : '' });
					smart_sector.find('.smart_padding[fn="right"]').css('width', '20px')

					value.doc.css('padding', '').css('padding-right', '20px');
						
				})
				
				break;
		}
	}

//////////////////////////////////////////////////// Flame Functions ////////////////////////////////////////////////////

$('.flame-item').click(function(e)
	{
		my_fn = $(this).attr('fn'); $(this).toggleClass('selected-flame');

		switch(my_fn)
		{
			case 'flamingo': $('#doc').toggleClass('flamingo'); break;
		}
	})

//////////////////////////////////////////////// PHP Playlist Functions /////////////////////////////////////////////////

function ajax_addplaylist(playlistname)
	{
		playlistname = playlistname.replace(/["]/g, '\\"').replace(/[']/g, "\\'").replace('_','\\_');

		$.ajax({
			url  : "export.php",
			type : 'post',
			data : { action : 'addplaylist', name : playlistname },
			success : function(data) { console.log(data); }
		})

		save_tag = $('<DIV/>', {class: 'save-tag'}).appendTo('#save-tags').text(playlistname).save_tag_init();
	}
function ajax_loadplaylist()
	{
		$.ajax({
			url  : "export.php",
			type : 'post', async: false,
			data : { action : 'loadplaylist' },
			success : function(data)
			{
				list_of_playlists = JSON.parse(data);
			}
		});

		// do something here

		for (var i = 0; i < list_of_playlists.length; i++)
		{
			save_tag = $('<DIV/>', {ix: list_of_playlists[i][0], class: 'save-tag'}).appendTo('#save-tags').text(list_of_playlists[i][1]);

			second_tag = $('<DIV/>', {class: 'second_tag'}).appendTo('#second-tags').text(list_of_playlists[i][1]).second_tag();
		}

		save_panel_init();
	};

$.fn.second_tag = function()
	{
		$(this).click(function(e)
		{
			$(this).addClass('selected_second_tag'); second_tag_update();
		}).contextmenu(function(e)
		{
			srm('selected_second_tag'); second_tag_update();
			$(this).addClass('selected_second_tag');

			e.preventDefault();
		})

		return $(this);
	}
function second_tag_update()
	{
		my_second_tags = []; $('.second_load_item').remove();

		$('.selected_second_tag').each(function(index, value) {
			
			my_second_tags.push( $(this).text() );

		})

		for (var i = 0; i < my_second_tags.length; i++)
		{
			for (var j = 0; j < database.length; j++)
			{
				if ( inside(my_second_tags[i], database[j][2]) == true )
				{
					my_name = database[j][1];

					second_load_item = $('<DIV/>', {class: 'second_load_item'}).appendTo('#second-items').click(function(e)
					{
						if ( e.ctrlKey == true ) { dix = parseInt($(this).attr('dix')); load_group(dix); }
					}).dblclick(function(e)
					{
						dix = parseInt($(this).attr('dix')); load_group(dix);
					}).text(my_name).attr({ dix: j, ix : database[j][0] }).contextmenu(function(e)
					{
						delete_group(this); e.preventDefault();
					});
				}
			}
		}
	}

/////////////////////////////////////////////////// Saving Functions ////////////////////////////////////////////////////

function save_panel_init()
	{
		$('#save-panel, #first-load-panel').hide();
		
		$('#save-name').contextmenu(function(e)
			{
				$(this).text( prompt('save name ?') ); e.preventDefault();
			})

		$.fn.save_tag_init = function(e)
		{
			$(this).click(function(e)
			{
				if ( e.ctrlKey == false ) { srm('selected-save-tag'); }

				$(this).addClass('selected-save-tag');
			}).contextmenu(function(e)
			{
				if ( e.ctrlKey == false && e.shiftKey == false )
				{
					if ( confirm('save selection to database ?') == true ) { save_selection_to_database(); }
				}
				else if ( e.ctrlKey == true && e.shiftKey == false )
				{
					my_name = prompt('save name ?');

					if ( my_name != null && my_name != '' )
					{
						ajax_addplaylist(my_name);
					}
				}
				else if ( e.ctrlKey == true && e.shiftKey == true )
				{
					if ( confirm('delete this playlist ?') == true )
					{
						ix = parseInt($(this).attr('ix'));

						$.ajax({
							url : "export.php",
							type : 'post', async: false,
							data : {
								action : 'removeplaylist', id : ix
							},
							success : function(data) { console.log(data); }
						});

						$(this).remove();
					}
				}

				e.preventDefault();
			})

			return $(this);
		}

		$('.save-tag').save_tag_init();
	}
function toggle_save_panel()
	{
		$('#save-panel, #first-load-panel').toggle();
	}

function save_selection_to_database(save_name_choice, save_types_choice)
	{
		key_black_list = 'inner outer prese icon text doc img group_id group_tag_id origin'.split(' ');

		if ( save_name_choice ) { save_name = save_name_choice } else { save_name = $('#save-name').text(); }

		if ( save_types_choice )
		{
			save_types = save_types_choice;
		}
		else
		{
			save_types = [];

			$('.selected-save-tag').each(function(index, value) {
				save_types.push( $(this).text() )
			})
		}

		// auto padding numbers

		find_my_edge_elements(selection[0].doc);

		// DOM part

		item      = selection[0];
		doc_clone = item.doc.clone().oh();
		out_clone = item.outer.clone().oh();

		// Object part

		all(selection[0].id); data_clone = []; discover[0].fonts = font_links; discover[0].color_arrays = color_arrays;

		for (var i = 0; i < discover.length; i++)
		{
			if ( discover[i].doc.hasClass('rowHolder') == false )
			{
				obj = discover[i]; newObj = {};

				for (var key in obj)
				{
					if ( inside(key, key_black_list) == false )
					{
						newObj[key] = obj[key];
					}
				}

				data_clone.push(newObj);
			}
		}

		data_clone = JSON.stringify(data_clone);

		// save part

		save_ingredients = '[]'; // just for here
		save_image       = '';   // just for here

		ajax_save({
			action : 'post',
			name   : save_name,
			type   : JSON.stringify(save_types),
			noona  : out_clone,
			doc    : doc_clone,
			data   : data_clone,
			ingredients : save_ingredients,
			image       : save_image,
		});

		load_item = $('<DIV/>', {class: 'load_item'}).appendTo('#first-load-panel').text(save_name);
		database.push(['', save_name, save_types]);
	}

/////////////////////////////////////////////////// Loading Functions ///////////////////////////////////////////////////

function load_group(group_id)
	{
		group    = database[group_id];
		new_out  = $(group[3].replace(/\\_/g,'_')).insertAfter(selection[0].outer);
		new_doc  = $(group[4].replace(/\\_/g,'_')).insertAfter(selection[0].doc);
		new_data = JSON.parse(group[5].replace(/\\_/g,'_'));

		// new stuff

		new_data[0].group_id     = group_id;

		if ( last_group_load_tag != null )
		{
			for (var i = 0; i < database[group_id][2].length; i++)
			{
				if ( database[group_id][2][i] == last_group_load_tag )
				{
					new_data[0].group_tag_id = i; break;
				}
			}
		}
		else
		{
			new_data[0].group_tag_id = 0;
		}

		// object insert

		the_id = selection[0].id; id_time = [];
		outs   = $(new_out).find('.LP_Outer').addBack(new_out);
		docs   = $(new_doc).find('*').not(baebae_list).add(new_doc);

		// start font

		if ( new_data[0].fonts )
		{
			for (var i = 0; i < new_data[0].fonts.length; i++) { font_links.push( new_data[0].fonts[i] ); }
			for (var i = 0; i < font_links.length; i++) { $(font_links[i]).appendTo('head'); }			
		}

		// start colors

		if ( new_data[0].color_arrays )
		{
			for (var i = 0; i < new_data[0].color_arrays.length; i++)
			{
				current_array = new_data[0].color_arrays[i];

				if ( inside(current_array, color_arrays) == false )
				{
					color_arrays.push(current_array);
				}
			}
		}

		// end colors

		for (var i = 0; i < new_data.length; i++)
		{
			obj = new_data[i]; newObj = {};

			for (var key in new_data[i])
			{
				newObj[key] = obj[key];
			}

			newId        = lastIndex++;

			if ( i == 0 ) { my_id = newId; }

			id_time[newObj.id] = newId;

			newObj.id    = newId;
			newObj.doc   = $(docs[i]);
			newObj.outer = $(outs[i]);
			newObj.inner = newObj.outer.children().last();
			newObj.prese = newObj.outer.children().first();
			newObj.icon  = newObj.prese.children().first();
			newObj.text  = newObj.prese.children().last();

			newObj.prese.reindent().events();
			newObj.doc.alt_to_select();

			if ( newObj.tag == 'H3' ) { newObj.doc.contextmenu_width(); }

			temp.push(newObj);
		}

		// id recall

		for (var i = 0; i < temp.length; i++)
		{
			if ( temp[i].tag == 'DIV' )
			{
				temp[i].mT = id_time[temp[i].mT];
				temp[i].mB = id_time[temp[i].mB];
				temp[i].mL = id_time[temp[i].mL];
				temp[i].mR = id_time[temp[i].mR];
			}
		}

		$(new_doc).find('.smart_padding, .smart_flex, .smart_sp, .smart_block, .smart_content').each(function(index, value) {
			current_sid = parseInt($(this).attr('sid'));
			$(this).attr('sid', id_time[current_sid]);
		})

		$(new_doc).find('.smart').off('hover').hover(function(e)
		{
			$(this).addClass('super_smart').parents().removeClass('super_smart');
		}, function(e)
		{
			$(this).removeClass('super_smart').parents("div").first().addClass('super_smart');
		})

		$(new_doc).find('.smart_padding').smart_padding_drag();
		$(new_doc).find('.smart_sp').smart_flex_sp_drag().smart_flex_sp_contextmenu().smart_flex_sp_click();
		$(new_doc).find('.smart > sp').smart_sp_drag().smart_sp_contextmenu().smart_sp_click();

		// dup recall

		old_dups = [];

		for (var i = 0; i < temp.length; i++)
		{
			if ( inside(temp[i].dup, old_dups) == false )
			{
				if ( temp[i].dup != null )
				{
					old_dups.push(temp[i].dup); dupIndex++;

					for (var j = 0; j < temp.length; j++)
					{
						if ( temp[j].dup == old_dups[old_dups.length-1] )
						{
							temp[j].newDup = dupIndex;
						}
					}
				}
			}
		}

		for (var i = 0; i < temp.length; i++)
		{
			temp[i].dup = temp[i].newDup; delete temp[i].newDup; elements.push(temp[i]);
		}

		// clean things up

		temp.length = 0; LP_Delete(); select(my_id); last_group_load_tag = null;
	}
function delete_group(elem)
	{
		ix = parseInt($(elem).attr('ix'));

		if ( confirm('delete ?') == true )
		{
			$.ajax({
				url : "export.php",
				type : 'post', async: false,
				data : {
					action : 'delete', id : ix
				},
				success : function(data) { console.log(data); }
			});

			$(elem).remove();
		}
	}

function change_group_tag_id()
	{
		if ( selection[0].group_id )
		{
			tags_array = database[selection[0].group_id][2]; prompt_message = '';

			for (var i = 0; i < tags_array.length; i++)
			{
				prompt_message = prompt_message + i + ' = ' + tags_array[i] + '\n';
			}

			my_val = parseInt(prompt(prompt_message, 0));

			if ( isNaN( my_val ) == false && my_val < tags_array.length )
			{
				selection[0].group_tag_id = my_val;
			}
			else
			{
				selection[0].group_tag_id = 0;
			}
		}
	}
function change_group(indent)
	{
		if ( selection[0].group_id != undefined && horde[ database[selection[0].group_id][2][selection[0].group_tag_id] ].length )
		{
			sasori = horde[ database[selection[0].group_id][2][selection[0].group_tag_id] ];

			for (var i = 0; i < sasori.length; i++)
			{
				if ( sasori[i] == selection[0].group_id ) { deidara = i+indent; break; }
			}

			if ( deidara >= sasori.length ) { deidara = 0; }
			if ( deidara < 0 ) { deidara = sasori.length-1; }

			load_group(sasori[deidara]);

			last_group_load_tag = database[selection[0].group_id][2][selection[0].group_tag_id];
		}
	}

//////////////////////////////////////////////////////// Beyond /////////////////////////////////////////////////////////

function create_mydrawrow(shell)
	{
		ix = $(shell).attr('ix'); my_draw_name = prompt('my name?');

		proceed = true;

		for (var i = 0; i < quickdrawbase.length; i++)
		{
			if ( quickdrawbase[i][0] == my_draw_name )
			{
				proceed = false; break;
			}
		}

		if ( proceed == true )
		{
			mydrawrow   = $('<DIV/>', {class: 'mydrawrow'}).appendTo('#quickdraw').attr({ ix : ix });
			mykey       = $('<DIV/>', {class: 'mykey'}).appendTo(mydrawrow).text(my_draw_name);
			myloadgroup = $('<DIV/>', {class: 'myloadgroup'}).appendTo(mydrawrow).text($(shell).text());

			ajax_save({
				action : 'quickdrawadd',
				mykey  : my_draw_name,
				myid   : ix
			})

			mydrawrow.mydrawfunction(); quickdrawbase.push(mykey, ix);
		}
		else {
			alert('key existed!');
		}
	}
$.fn.mydrawfunction = function()
	{
		$(this).contextmenu(function(e)
		{
			quickdraw_delete( $(this) );

			e.preventDefault();
		})

		return $(this);
	}

function quickdraw()
	{
		my_name = prompt('what do you call?');

		for (var i = 0; i < quickdrawbase.length; i++)
		{
			if ( quickdrawbase[i][0] == my_name )
			{
				ix = quickdrawbase[i][1];

				for (var j = 0; j < database.length; j++)
				{
					if ( database[j][0] == ix )
					{
						load_group(j); break;
					}
				}

				break;
			}
		}
	}

//////////////////////////////////////////////////// Ajax Functions /////////////////////////////////////////////////////

function ajax_save(obj)
	{
		for (var key in obj)
		{
			obj[key] = obj[key].replace(/["]/g, '\\"').replace(/[']/g, "\\'").replace('_','\\_');
		}

		$.ajax({
			url  : "export.php",
			type : 'post',
			data : obj,
			success : function(data) { console.log(data); }
		})
	}
function ajax_load()
	{
		$.ajax({
			url  : "export.php",
			type : 'post', async: false,
			data : { action : 'load' },
			success : function(data)
			{
				database = JSON.parse(data);
			}
		});

		for (var i = 0; i < database.length; i++)
		{
			database[i][2] = JSON.parse( database[i][2] );
		}
	};

function quickdraw_load()
	{
		$.ajax({
			url  : "export.php",
			type : 'post', async: false,
			data : { action : 'quickdrawload' },
			success : function(data)
			{
				quickdrawbase = JSON.parse(data);

				for (var i = 0; i < quickdrawbase.length; i++)
				{
					ix = quickdrawbase[i][1];

					for (var j = 0; j < database.length; j++)
					{
						if ( database[j][0] == ix )
						{
							my_name = database[j][1]; break;
						}
					}

					mydrawrow   = $('<DIV/>', {class: 'mydrawrow'}).appendTo('#quickdraw').attr({ ix : ix });
					mykey       = $('<DIV/>', {class: 'mykey'}).appendTo(mydrawrow).text(quickdrawbase[i][0]);
					myloadgroup = $('<DIV/>', {class: 'myloadgroup'}).appendTo(mydrawrow).text( my_name );

					mydrawrow.mydrawfunction();
				}
			}
		});
	}
function quickdraw_delete(elem)
	{
		if ( confirm('delete ?') == true )
		{
			mykey = $(elem).children().first().text();

			$.ajax({
				url : "export.php",
				type : 'post', async: false,
				data : {
					action : 'quickdrawdelete', mykey : mykey
				},
				success : function(data) { console.log(data); }
			});

			$(elem).remove();
		}
	}

function first_load()
	{
		ajax_load(); quickdraw_load();

		for (var i = 0; i < database.length; i++)
		{
			my_name = database[i][1];

			load_item = $('<DIV/>', {class: 'load_item'}).appendTo('#first-load-panel').click(function(e)
			{
				if ( e.ctrlKey == true ) { dix = parseInt($(this).attr('dix')); load_group(dix); }
			}).dblclick(function(e)
			{
				dix = parseInt($(this).attr('dix')); load_group(dix);
			}).text(my_name).attr({ dix: i, ix : database[i][0] }).contextmenu(function(e)
			{
				if ( e.ctrlKey == false )
				{
					delete_group(this);
				}
				else
				{
					create_mydrawrow(this);
				}

				e.preventDefault();
			});
		}

		// interesting phase

		horde = {};

		for (var i = 0; i < database.length; i++)
		{
			for (var j = 0; j < database[i][2].length; j++)
			{
				if ( horde[database[i][2][j]] == undefined )
				{
					horde[database[i][2][j]] = [];
				}

				horde[database[i][2][j]].push(i);
			}
		}

	};

if ( myTitle == 'Main' )
	{
		ajax_loadplaylist(); IMG_panel_init(); clip_path_panel_init(); first_load();
		set_up_the_prepare_panel(); set_up_le_browser();
	}
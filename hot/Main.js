tagged_mode = null; key_map = {}; drag = false; doc_width = $(document).width();
lastIndex   = 0   ; dupIndex = 0; last_dup = null; dup_id = 0; dragging = false;
black_list  = 'BR, .smart_sector, .smart_flex, .smart_sp, .smart_padding, .smart_block, .smart_content, IMG, SP, STICKER, .ui-resizable-handles';
block_list  = 'BR, .smart_sector, .smart_flex, .smart_sp, .smart_padding, .smart_block, .smart_content, IMG, SP, STICKER, .rowHolder, .ui-resizable-handles';
baebae_list = 'BR, .smart_sector, .smart_flex, .smart_sp, .smart_padding, .smart_block, .smart_content, IMG, SP, .rowHolder, .ui-resizable-handles';
white_list  = '.row, .col, .container, H3, ICON, LINE';
elem_list   = '.col, .container, H3, ICON, LINE';

elements    = []; selection = []; fresh = []; temp = []; cock_block = true; undo_mode = null; active_color_fn = null; g_count = 0;
font_links  = []; color_arrays = []; color_obj = {}; last_group_load_tag = null; space_craft = false; sasori_my_man = 'LP'; prepare_name = '?';

//////////////////////////////////////////////////////////// LP Core //////////////////////////////////////////////////////////////

function LP_Ticket(tag)
	{
		if ( selection.length )
		{
			$(selection).each(function(index, value) {
								
				if ( value.open == true )
				{
					LP_Create(tag, 'inside', value.id);
				}
				else
				{
					LP_Create(tag, 'beside', value.id);
				}
					
			})
		}
		else
		{
			LP_Create(tag, 'inside', '#LP_Inside');
		}

		apply(fresh);
	}
function LP_Create(tag, pos, local)
	{
		if ( local != '#LP_Inside' && local != '#PZ_Inside' )
		{
			docLocal  = doc(local);

			if ( pos == 'inside' )
			{
				local = inner(local);
			}
			else
			{
				local = outer(local);
			}
		}
		else
		{
			docLocal = '#doc';
		}

		/////////////////////////////////////////////////////////////////////////////////////////////////

		if ( pos == 'inside' )
		{
			LP_Outer = $('<DIV/>', {class: 'LP_Outer'}).appendTo(local);
		}
		else
		{
			LP_Outer = $('<DIV/>', {class: 'LP_Outer'}).insertAfter(local);
		}

		LP_Prese = $('<DIV/>', {class: 'LP_Prese'}).appendTo(LP_Outer);

		if ( tag == 'DIV' || 'H3' || 'ICON' || 'STICKER' )
		{
			LP_Inner = $('<DIV/>', {class: 'LP_Inner'}).appendTo(LP_Outer);
		}

		LP_Icon = $('<ICON/>', {class: 'LP_Icon'}).appendTo(LP_Prese);

		switch(tag)
		{
			case 'DIV'    : $(LP_Icon).addClass('fa fa-folder') ; break;
			case 'H3'     : $(LP_Icon).addClass('fa fa-font') ; break;
			case 'IMG'    : $(LP_Icon).addClass('fa fa-picture-o') ; break;
			case 'ICON'   : $(LP_Icon).addClass('fa fa-font-awesome') ; break;
			case 'LINE'   : $(LP_Icon).addClass('fa fa-window-minimize') ; break;
			case 'STICKER': $(LP_Icon).addClass('fa fa-cloud') ; break;
		}

		LP_Text = $('<DIV/>', {class: 'LP_Text'}).appendTo(LP_Prese); $(LP_Text).text(tag.toLowerCase());

		///////////////////////////////////////////////////////////////////////////////////////////////// Modern

		obj = {
			id     : lastIndex,
			dup    : null,
			outer  : LP_Outer,
			prese  : LP_Prese,
			icon   : LP_Icon,
			text   : LP_Text,
			tag    : tag,
		};

		obj = object_default(obj);

		if ( tag == 'DIV' || 'H3' || 'ICON' || 'STICKER' ) { obj.inner = LP_Inner; obj.open = false; }

		fresh.push(obj); elements.push(obj); get(lastIndex);
		CreateElement(tag, pos, docLocal); lastIndex++;

		/////////////////////////////////////////////////////////////////////////////////////////////////

		$(LP_Prese).reindent().events();
	}
function LP_DIV_Toggle(fast)
	{
		base = selection[0].open;

		for (var i = 1; i < selection.length; i++)
		{
			if (selection[i].open != base) {base = true}
		}

		$(selection).each(function(index, value) {

			if ( inside(value.tag, ['H3','DIV','ICON','STICKER']) )
			{
				if ( base == true )
				{
					if (value.tag == 'DIV'     ) { value.icon.removeClass('fa-folder-open-o'); }
					if (value.tag == 'H3'      ) { value.icon.removeClass('fa-file-text-o'); }
					if (value.tag == 'ICON'    ) { value.icon.removeClass('fa-fort-awesome'); }
					if (value.tag == 'STICKER' ) { value.icon.removeClass('fa-cloud-upload'); }
					if ( fast == true ) { value.inner.hide() } else { value.inner.slideUp(150); } value.open = false;
				}
				else
				{
					if (value.tag == 'DIV'     ) { value.icon.addClass('fa-folder-open-o'); }
					if (value.tag == 'H3'      ) { value.icon.addClass('fa-file-text-o'); }
					if (value.tag == 'ICON'    ) { value.icon.addClass('fa-fort-awesome'); }
					if (value.tag == 'STICKER' ) { value.icon.addClass('fa-cloud-upload'); }
					if ( fast == true ) { value.inner.hide() } else { value.inner.slideDown(150); } value.open = true;
				}
			}
				
		})
	}

function LP_Duplicate()
	{
		times = parseInt(prompt('how many ?')) - 1; LP_Duplicate_Core(times);
	}
function LP_Duplicate_Core(times)
	{
		if ( times > 0 )
		{
			$(selection).each(function(index, value) {

				all(value.doc); if (value.doc.hasClass('ui-resizable')) { value.doc.resizable('destroy'); }

				for (var i = 0; i < discover.length; i++)
				{
					if ( discover[i].dup == null ) { discover[i].dup = dupIndex++; }
				}

				for (var i = 0; i < times; i++)
				{
					part_1 = value.outer.clone().insertAfter(value.outer);
					part_2 = value.doc.clone().insertAfter(value.doc);

					LP_Duplicate_Power(value, part_1, part_2);
				}

				fresh.push(value); sp_max(value.doc.parent());

			})

			apply(fresh);
		}
	}
function LP_Duplicate_Power(item, outer_item, doc_item)
	{
		all(item.doc);
		LP_Array  = $(outer_item).find('.LP_Outer').add(outer_item);
		DOC_Array = $(doc_item).find('*').not(black_list).add(doc_item);

		for (var i = 0; i < discover.length; i++)
		{
			obj = {};

			for (var kiss in discover[i])
			{
				if ( kiss != 'id' )
				{
					obj[kiss] = discover[i][kiss];
				}
			}

			obj.outer = $(LP_Array[i]);
			obj.doc   = $(DOC_Array[i]);
			obj.id    = lastIndex;
			obj.dpi   = undefined;

			if ( (obj.tag == 'H3') || (obj.tag == 'DIV') ) { obj.inner = obj.outer.children().last(); }

			obj.prese = obj.outer.children().first();
			obj.icon  = obj.prese.children().first();
			if (discover[i].open) {obj.open = discover[i].open}
			obj.prese.events();

			lastIndex++; elements.push(obj); if (i == 0) {fresh.push(obj)}
		}
	}
function LP_Wrap()
	{
		// for undo purposes

		get_originalPosition(); undo_mode = 'group';

		// LP_Wrap

		selection = []; $('.just-dance').each(function(index, value) { git(this); selection.push(item); });

		$(selection).each(function(index, value) { temp.push(value); });

		selection[0].open = false; LP_Create('DIV', 'beside', selection[0].id);

		item = elements[elements.length-1];
		item.icon.addClass('fa-folder-open-o'); item.open = true;
		clear(); select(item.id);

		$(temp).each(function(index, value) {

			value.doc.appendTo(item.doc);
			value.outer.appendTo(item.inner);

			$(value.outer).find('.LP_Prese').each(function(index, value) { $(this).reindent(); })
				
		})

		apply(temp); sp_max( elements[elements.length-1].doc.parent() ); cock_block = true; undo_end = selection[0].doc.parent();
	}
function LP_Delete()
	{
		$(selection).each(function(index, value) {
							
			my_index = $(".LP_Prese:visible").index(value.prese) - 1;
			my_index = $('.LP_Prese:visible').eq(my_index); git(my_index); fresh.push(item);

			my_index = elements.indexOf(value); pr = value.doc.parent();

			// old canon

			if ( value.dpi ) { value.dpi.remove(); }

			value.doc.clearsp(); value.doc.remove(); value.outer.remove(); elements.splice(my_index, 1);

			sp_max(value);

		})

		apply(fresh); cock_block = true;
	}

function LP_Group()
	{
		LP_Wrap(); LP_Select_Parent();

		if ( selection[0].doc.children('.news').length )
		{
			selection[0].doc.addClass('heart_shaker');

			ansil = selection[0].doc.children().not('SP');
			first = $(ansil[0]);
			OL    = first.offset().left;
			OT    = first.offset().top;
			OW    = first.outerWidth();
			OH    = first.outerHeight();
			OR    = OL + OW;
			OB    = OT + OH;

			for (var i = 1; i < ansil.length; i++)
			{
				first = $(ansil[i]);
				L     = first.offset().left;
				T     = first.offset().top;
				W     = first.outerWidth();
				H     = first.outerHeight();
				R     = L + W;
				B     = T + H;

				if ( L < OL ) { OL = L; }
				if ( T < OT ) { OT = T; }
				if ( R > OR ) { OR = R; }
				if ( B > OB ) { OB = B; }
			}

			OW = OR - OL; OH = OB - OT;

			for (var i = 0; i < ansil.length; i++)
			{
				first = $(ansil[i]);
				L     = first.offset().left - OL;
				T     = first.offset().top  - OT;

				first.css({ top : T + 'px' , left : L + 'px' });
			}

			selection[0].doc.css({
				width  : OW + 'px',
				height : OH + 'px',
				left   : OL + 'px',
				top    : OT + 'px',
				position : 'absolute',
			})

			item = selection[0]; apply(item);
			find_the_orders(item.doc);
			find_the_spacings(item.doc);
			find_my_edge_elements(item.doc);
			item.doc.removeClass('heart_shaker').addClass('news');
		}
	}

function CreateElement(tag, pos, local)
	{
		if ( pos == 'inside' )
		{
			Element = $('<' + tag + '/>').appendTo(local);
		}
		else
		{
			Element = $('<' + tag + '/>').insertAfter(local);
		}

		if ( tag == 'IMG' )
		{
			$(Element).attr('draggable', false);
			$(Element).wrap("<div class='container'></div>");
		}

		switch(tag)
		{
			case 'H3'  : $(Element).text(lor(4)); break;
			case 'IMG' : $(Element).attr('src', "image/seolhyun/Seolhyun.jpg"); Element = $(Element).parent(); break;
			case 'ICON': $(Element).addClass('fa fa-font-awesome') ; break;
			case 'DIV' : $(Element).addClass('col') ; break;
			case 'LINE': $(Element).addClass('sac') ; line_handle = $('<DIV/>', {class: 'line_handle'}).appendTo(Element); break;
		}

		tagged_mode = tag;

		// Modern

		item.doc = Element;

		if ( tag == 'ICON' ) {item.content = 'fa-font-awesome'};
		if ( tag == 'IMG'  ) {item.img     = Element.children().first()};
		if ( tag == 'LINE' ) {item.handle  = line_handle};

		// SP part

		if ( $(Element).parent().children().length > 1 ) { SP = $('<SP/>').insertBefore( Element ); }

		$(Element).alt_to_select();
	}
function object_default(obj)
	{
		obj.PL = 0; obj.PT = 0; obj.PR = 0; obj.PB = 0;

		switch(obj.tag)
		{
			case 'DIV':
				
				
				break;

			case 'ICON':
				
				
				
				break;

			case 'LINE':
				
				
				
				break;

			case 'STICKER':
				
				
				
				break;

			case 'H3':
				
				
				
				break;

			case 'IMG':
				
				obj.imageMode = 'fit';
				
				break;
		}

		return obj;
	}

////////////////////////////////////////////////////////// Copy And Cut ///////////////////////////////////////////////////////////

function copy()
	{
		srm('copy cut'); CPM = 'copy'; $(selection).each(function(index, value) { value.doc.addClass('copy'); })
	}
function cut()
	{
		srm('copy cut'); CPM = 'cut'; $(selection).each(function(index, value) { value.doc.addClass('copy cut'); })
	}
function paste(before)
	{
		my_selection = selection; srm('mew');

		$(my_selection).each(function(index, value) {

			$('.copy').each(function() {
				
				old_item = git(this); select(item.id); LP_Duplicate_Core(1); item = selection[0];

				if ( before == true )
				{
					item.doc.insertBefore(value.doc);
					item.outer.insertBefore(value.outer);
				}
				else if ( value.open == true )
				{
					item.doc.appendTo(value.doc);
					item.outer.appendTo(value.inner);
				}
				else
				{
					item.doc.insertAfter(value.doc);
					item.outer.insertAfter(value.outer);
				}

				item.id = lastIndex++;

				item.doc.removeClass('copy cut').addClass('mew').alt_to_select(); item.prese.reindent();

			})

			if ( value.open == true ) { sp_max(value.doc); } else { sp_max(value.doc.parent()); }
			
		})

		// the IMG tag is a little bit buggy right now, because of the resizable function

		$('.cut').each(function(index, value) { git(this); select(item.id); LP_Delete(); });
		$('.mew').each(function(index, value) {

			i = git(this); if ( index == 0 ) { select(i.id); } else { add(i.id, true) }

			if ( CPM == 'cut' ) { item.doc.addClass('copy cut'); }

		});
	}

function make_a_real_sticker()
	{
		if ( selection.length > 1 )
		{
			// LP_Wrap

			undo_mode = 'sticker';

			primary = selection[0]; secondary = []; secondary_smash = [];

			for (var i = 1; i < selection.length; i++)
			{
				secondary_unit = selection[i]; secondary.push(secondary_unit);

				my_top  = -(primary.doc.offset().top  - secondary_unit.doc.offset().top);
				my_left = -(primary.doc.offset().left - secondary_unit.doc.offset().left);

				secondary_smash.push({ top : my_top, left : my_left });
			}

			select(primary.id); if ( primary.open == false ) { LP_DIV_Toggle(); }

			LP_Ticket('STICKER'); LP_DIV_Toggle(); sticker = selection[0];

			for (var i = 0; i < secondary.length; i++)
			{
				select(secondary[i].id); cut(); select(sticker.id); paste();
			}

			select(primary.id);

			// spacing

			sticker.doc.css({ top : 0 , left : 0 });
			sticker.doc.find('*').removeClass('news').addClass('old_news');

			secondary = sticker.doc.children().not(baebae_list);

			for (var i = 0; i < secondary.length; i++)
			{
				secondary_unit = $(secondary[i]); console.log(secondary_unit);
				secondary_unit.css({ top : secondary_smash[i].top, left : secondary_smash[i].left });
			}

			cock_block = true;
		}
	}
function make_a_bgi_group()
	{
		$(selection).each(function(index, value) { value.doc.toggleClass('has_bgi') });
	}
function really_making_a_bgi_group()
	{
		click_the_format('col center center'); make_a_bgi_group();
	}

function move_selection_up_down(direction)
	{
		if ( selection.length )
		{
			cut(); my_old_selection = [];

			for (var i = 0; i < selection.length; i++) { my_old_selection[i] = selection[i]; }

			if ( direction == 'up' )
			{
				LP_Switch('up');

				if ( selection[0].doc.attr('id') != 'main' )
				{
					paste(true);
				}
				else
				{
					select_multiple(my_old_selection)
				}
			}
			else
			{
				$(selection).each(function(index, value) { if ( value.open == true ) { value.inner.hide(); return false; } })

				LP_Switch('down'); paste();

				$(selection).each(function(index, value) { if ( value.open == true ) { value.inner.show(); return false; } })
			}
		}
	}
function select_multiple(arr)
	{
		for (var i = 0; i < arr.length; i++)
		{
			if ( i == 0 )
			{
				select(arr[0].id);
			}
			else
			{
				add(arr[i].id, true)
			}
		}
	}

function get_originalPosition()
	{
		oG_selection = []; $('.just-dance').each(function(index, value) { git(this); oG_selection.push(item); });

		$(oG_selection).each(function(index, value) {
							
			if ( value.doc.parent().hasClass('rowHolder') ) { myPR = value.doc.parent().parent() }
			else { myPR = value.doc.parent(); }

			git(myPR); my_index = item.inner.children().index(value.outer);

			value.origin = [my_index, myPR];

		})
	}
function undo_group()
	{
		if ( undo_mode == 'group' )
		{
			$(oG_selection).each(function(index, value) {
								
				select(value.id);

				value.inner.hide();
				value.open = false;
				value.icon.removeClass('fa-folder-open-o fa-file-text-o fa-fort-awesome fa-cloud-upload');
				value.doc.addClass('vitas');

				cut();

				my_index = value.origin[0];

				if ( my_index != 0 )
				{
					target = value.origin[1].children().not(block_list).eq(my_index);
					git(target); select(item.id); open_check = false;

					if ( item.open == true )
					{
						item.open = false; item.inner.hide(); open_check = true;
					}

					paste();

					if ( open_check == true )
					{
						item.open = true; item.inner.show();
					}
				}
				else
				{
					myPR = value.origin[1];

					if ( myPR.children().not(block_list).length )
					{
						target = myPR.children().not(block_list).eq(my_index);
						git(target); select(item.id); paste(true);
					}
					else
					{
						myPR = git(myPR); if ( myPR.open == false ) { myPR.open = true; my_false = true; }
						select(myPR.id); paste();
						if ( my_false == true ) { my_false = false; myPR.open = false; }
					}
				}

			})

		 	git(undo_end); select(item.id); LP_Delete(); undo_mode = null;
		}
		else if ( undo_mode == 'sticker' )
		{
			$(primary.doc.children('STICKER')).each(function(index, value) {
				
				chil = $(this).children().not(block_list);

				for (var i = 0; i < chil.length; i++)
				{
					git(chil[i]); select(item.id); cut(); select(primary.id); paste(true);
				}

			})

			$(primary.doc.children('STICKER')).each(function(index, value) {
				
				git(this); select(item.id); LP_Delete();

			})

			LP_DIV_Toggle(true); sp_max(primary.doc.parent())
		}

		$('.old_news').each(function(index, value) {
		 		
				git(this); item.doc.removeClass('old_news').addClass('news').css({
					top : item.top, left : item.left
				})

	 	})

	 	$('.vitas').each(function(index, value) {

	 		git(this);

	 		if ( index == 0 )
	 		{
	 			select(item.id);
	 		}
	 		else
	 		{
	 			add(item.id, true);
	 		}

	 	})
	}

/////////////////////////////////////////////////////////// LP Select /////////////////////////////////////////////////////////////

function LP_Switch(side)
	{
		if ( side == 'down' ) { my_index = $(".LP_Prese:visible").index($('.LP_Selected').last()); }
		else                  { my_index = $(".LP_Prese:visible").index($('.LP_Selected').first()) ; }
		if ( side == 'down' ) { my_index++; } else { my_index--; }
		my_index = $('.LP_Prese:visible').eq(my_index);

		git(my_index); fresh.push(item);

		apply(fresh);
	}
function LP_Batch_Add(side)
	{
		transfer();

		$(selection).each(function(index, value) {

			my_index = $(".LP_Prese:visible").index(value.prese);
			if ( side == 'down' ) { my_index++; } else { my_index--; }
			my_index = $('.LP_Prese:visible').eq(my_index); git(my_index); fresh.push(item);

		})

		apply(fresh);
	}
function LP_Batch_Switch(side)
	{
		$(selection).each(function(index, value) {

			my_index = $(".LP_Prese:visible").index(value.prese);
			if ( side == 'down' ) { my_index++; } else { my_index--; }
			my_index = $('.LP_Prese:visible').eq(my_index); git(my_index); fresh.push(item);

		})

		apply(fresh);
	}

function LP_Select_Parent()
	{
		$(selection).each(function(index, value) {
							
			p(value.doc);

			if ($.inArray(item, fresh) === -1) { fresh.push(item); }
				
		})

		apply(fresh);
	}
function LP_Select_In_Folder()
	{
		$(selection).each(function(index, value) {
							
			sib(value.doc); $(discover).each(function(index, value) { fresh.push(value); })
				
		});

		apply(fresh);
	}
function LP_Select_Dups()
	{
		$(selection).each(function(index, value) {
							
			for (var i = 0; i < elements.length; i++)
			{
				if ( elements[i].dup == value.dup )
				{
					fresh.push(elements[i]);
				}
			}
				
		})

		apply(fresh);
	}

///////////////////////////////////////////////////////// Key Functions ///////////////////////////////////////////////////////////

function sp_max(pax)
	{
		stuffs = $(pax).find('.col').add(pax);

		$(stuffs).each(function() {

			chill = $(this).children().not(black_list);
			chill.first().prevAll('SP').remove();
			chill.first().nextAll().not(black_list).each(function() {

				array = $(this).prevUntil(white_list, 'SP'); sp_check = false;

				for (var i = 0; i < array.length; i++)
				{
					if ( sp_check == false ) { sp_check = true } else { $(array[i]).remove(); }
				}

				if ( sp_check == false )
				{
					SP = $('<SP/>').insertBefore( this );
				}

				if (chill.length == 1) { chill.first().nextAll('SP').remove(); }

			})

			chill.last().nextAll('SP').remove();
				
		})
	}

///////////////////////////////////////////////////////////// Pascal //////////////////////////////////////////////////////////////

function geet(id)
	{
		for (var i = 0; i < elements.length; i++)
		{
			if ( elements[i].id == id )
			{
				titem = elements[i]; break;
			}
		}

		return titem;
	}
function gaet(hub)
	{
		if ( hub.length == undefined ) { hub = $(hub); }

		if ( $(hub).hasClass('LP_Text') )
		{
			$(elements).each(function(index, value) { if ( value.text[0] == hub[0] ) { titem = value; return false; } })
			type = 'text';
		}
		if ( $(hub).hasClass('LP_Icon') )
		{
			$(elements).each(function(index, value) { if ( value.icon[0] == hub[0] ) { titem = value; return false; } })
			type = 'icon';
		}
		if ( $(hub).hasClass('LP_Outer') )
		{
			$(elements).each(function(index, value) { if ( value.outer[0] == hub[0] ) { titem = value; return false; } })
			type = 'outer';
		}
		else if ( $(hub).hasClass('LP_Inner') )
		{
			$(elements).each(function(index, value) { if ( value.inner[0] == hub[0] ) { titem = value; return false; } })
			type = 'inner';
		}
		else if ( $(hub).hasClass('LP_Prese') )
		{
			$(elements).each(function(index, value) { if ( value.prese[0] == hub[0] ) { titem = value; return false; } })
			type = 'prese';
		}
		else if ( $(hub).hasClass('dp_item') )
		{
			$(elements).each(function(index, value) { if ( value.dpi[0] == hub[0] ) { titem = value; return false; } })
			type = 'dpi';
		}
		else
		{
			$(elements).each(function(index, value) { if ( value.doc[0] == hub[0] ) { titem = value; return false; } })
			type = 'doc';
		}

		return titem;
	}

function get(id)
	{
		for (var i = 0; i < elements.length; i++)
		{
			if ( elements[i].id == id )
			{
				item = elements[i]; break;
			}
		}

		return item;
	}
function git(hub)
	{
		if ( hub.length == undefined ) { hub = $(hub); }

		if ( $(hub).hasClass('LP_Text') )
		{
			$(elements).each(function(index, value) { if ( value.text[0] == hub[0] ) { item = value; return false; } })
			type = 'text';
		}
		if ( $(hub).hasClass('LP_Icon') )
		{
			$(elements).each(function(index, value) { if ( value.icon[0] == hub[0] ) { item = value; return false; } })
			type = 'icon';
		}
		if ( $(hub).hasClass('LP_Outer') )
		{
			$(elements).each(function(index, value) { if ( value.outer[0] == hub[0] ) { item = value; return false; } })
			type = 'outer';
		}
		else if ( $(hub).hasClass('LP_Inner') )
		{
			$(elements).each(function(index, value) { if ( value.inner[0] == hub[0] ) { item = value; return false; } })
			type = 'inner';
		}
		else if ( $(hub).hasClass('LP_Prese') )
		{
			$(elements).each(function(index, value) { if ( value.prese[0] == hub[0] ) { item = value; return false; } })
			type = 'prese';
		}
		else if ( $(hub).hasClass('dp_item') )
		{
			$(elements).each(function(index, value) { if ( value.dpi[0] == hub[0] ) { item = value; return false; } })
			type = 'dpi';
		}
		else
		{
			$(elements).each(function(index, value) { if ( value.doc[0] == hub[0] ) { item = value; return false; } })
			type = 'doc';
		}

		return item;
	}
function aze(gag)
	{
		if ( typeof gag == 'number' ) { get(gag); } else { git(gag); }
	}
function doc(id)
	{
		aze(id); return item.doc;
	}
function outer(id)
	{
		aze(id); return item.outer;
	}
function inner(id)
	{
		aze(id); return item.inner;
	}
function prese(id)
	{
		aze(id); return item.prese;
	}
function icon(id)
	{
		aze(id); return item.icon;
	}
function text(id)
	{
		aze(id); return item.text;
	}

function p(pascal)
	{
		if ( typeof pascal == 'number' ) { get(pascal); pascal = item.doc; } ;

		git(pascal);

		if ( item.doc.parent().hasClass('rowHolder') )
		{
			git(pascal.parent().parent());
		}
		else
		{
			git(pascal.parent());
		}
	}
function next(pascal)
	{
		if ( typeof pascal == 'number' ) { get(pascal); pascal = item.doc; }

		pascal = pascal.nextAll(":not(" + black_list + ")").first();

		if (pascal.length) { git(pascal); return item[type]; } else { return false }
	}
function prev(pascal)
	{
		if ( typeof pascal == 'number' ) { get(pascal); pascal = item.doc; }

		pascal = pascal.prevAll(":not(" + black_list + ")").first();

		if (pascal.length) { git(pascal); return item[type]; } else { return false }
	}

function sib(pascal)
	{
		git(pascal); discover = [];

		if (item.doc.parent().attr('id') == 'doc') {
			for (var i = 0; i < elements.length; i++)
			{
				if ( elements[i].doc.parent().attr('id') == 'doc' )
				{
					discover.push(elements[i]);
				}
			}
		}
		else { p(pascal); c(item.doc); }
	}
function all(pascal)
	{
		if ( typeof pascal == 'number' ) { get(pascal); pascal = item.doc; }

		pascal = pascal.find('*').not(baebae_list).add(pascal); discover = [];

		if (pascal.length) { for (var i = 0; i < pascal.length; i++) { git(pascal[i]); discover.push(item); } }
	}
function all_in(pascal)
	{
		if ( typeof pascal == 'number' ) { get(pascal); pascal = item.doc; }

		pascal = pascal.find('*').not(baebae_list); discover = [];

		if (pascal.length) { for (var i = 0; i < pascal.length; i++) { titem = gaet(pascal[i]); discover.push(titem); } }
	}
function c(pascal)
	{
		if ( typeof pascal == 'number' ) { get(pascal); pascal = item.doc; }

		pascal = pascal.children(":not(" + black_list + ")"); discover = [];

		if (pascal.length) { for (var i = 0; i < pascal.length; i++) { git(pascal[i]); discover.push(item); } }
	}
function cf(pascal)
	{
		if ( typeof pascal == 'number' ) { get(pascal); pascal = item.doc; }

		pascal = pascal.children(":not(" + black_list + ")").first();

		if (pascal.length) { git(pascal); return item[type]; } else { return false }
	}
function cl(pascal)
	{
		if ( typeof pascal == 'number' ) { get(pascal); pascal = item.doc; }

		pascal = pascal.children(":not(" + black_list + ")").last();

		if (pascal.length) { git(pascal); return item[type]; } else { return false }
	}

/////////////////////////////////////////////////////// Utilities ////////////////////////////////////////////////////////

function clear()
	{
		selection.length = 0; srm('LP_Selected'); srm('just-dance');
		$('.container.ui-resizable').resizable('destroy');
	}
function update()
	{
		srm('LP_Selected'); $(selection).each(function(index, value) { add(value.id, false); });
	}
function apply(array)
	{
		clear();

		$(array).each(function(index, value) { selection.push( value );	})

		update(); react(); array.length = 0;
	}
function transfer()
	{
		$(selection).each(function(index, value) { fresh.push(value); })
	}

function add(id, mark)
	{
		if ( typeof id == 'number' ) { get(id); } else { git(id); }

		item.prese.addClass('LP_Selected');

		if (mark == true) { selection.push(item); react(); }
	}
function select(id)
	{
		if ( typeof id == 'number' ) { get(id); } else { git(id); }

		fresh.push(item); apply(fresh);
	}

function srm(klass)
	{
		split = klass.split(' ');

		for (var i = 0; i < split.length; i++)
		{
			$('.' + split[i]).removeClass(split[i]);
		}
	}
function activo(package)
	{
		args = [];

		for (var i = 1; i < package.length; i++)
		{
			args.push(package[i]);
		}

		package[0].apply(this, args);
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

function refresh_the_page()
	{
		elements = []; selection = []; $('#doc, #LP_Inside').empty(); lastIndex = 0;

		LP_Ticket('DIV'); LP_DIV_Toggle(); $('#doc > div').first().attr('id', 'main');
	}

//////////////////////////////////////////////////// jQuery Utilities ////////////////////////////////////////////////////

$.fn.events   = function()
	{
		$(this).click(function(e)
		{
			if ( (e.ctrlKey == false) && (e.shiftKey == false) )
			{
				select($(this));
			}
			else if ( (e.ctrlKey == true) && (e.shiftKey == false) )
			{
				add($(this), true);
			}
			else if ( (e.ctrlKey == false) && (e.shiftKey == true) )
			{
				it_index = $(".LP_Prese:visible").index( $('.LP_Selected').first() );
				my_index = $(".LP_Prese:visible").index( $(this) );

				if ( it_index < my_index ) { my_row = [it_index, my_index] }
				else                       { my_row = [my_index, it_index] }

				clear();

				for (var i = my_row[0]; i <= my_row[1]; i++)
				{
					add( $(".LP_Prese:visible").eq(i) , true );
				}
			}
		})
	}
$.fn.reindent = function()
	{
		myPR = $(this).parents('.LP_Inner').length * 10 + 7;
		$(this).css('padding-left', myPR + 'px'); return $(this);
	}
$.fn.clearsp  = function()
	{
		if ( $( $(this).parent() ).index(this) == 1 || 0 )
		{
			$(this).next('SP').remove();
		}
		else
		{
			$(this).prev('SP').remove();
		}
	}

$.fn.gh  = function()
	{
		return $(this).height()
	}
$.fn.gw  = function()
	{
		return $(this).width()
	}
$.fn.ga  = function()
	{
		L = $(this).offset().left; T = $(this).offset().top;
		W = $(this).outerWidth(); H = $(this).outerHeight();
		R = L + W; B = T + H;
	}
$.fn.oh  = function()
	{
		return $(this)[0].outerHTML;
	}
$.fn.wt  = function()
	{
		return $(this).prop('tagName');
	}

$.fn.alt_to_select     = function()
	{
		$(this).on('mousemove', function(e)
		{
			if ( e.altKey == true && e.metaKey == false && e.buttons == 0 )
			{
				check = false; if ( $('#main').hasClass('just-dance') && selection.length == 1 ) { check = true; }

				git(this);

				if ( $(this).parent().attr('id') == 'main' )
				{
					if ( check == true || selection.length == 0 || cock_block == true )
					{
						select(item.id); cock_block = false;
					}
					else
					{
						if ( e.ctrlKey == true )
						{
							if ( $(this).hasClass('just-dance') == false ) { add(item.id, true); }
						}
						else if ( item.tag != 'IMG' )
						{
							if ( $(this).hasClass('just-dance') == false ) { add(item.id, true); }
						}
					}
				}
			}
		}); return $(this);
	}
$.fn.contextmenu_width = function(e)
	{
		$(this).contextmenu(function(e)
		{
			git(this);

			if ( $(this).attr('width') )
			{
				$(this).removeAttr('width'); $(this).css('width', '');

				item.right = item.left + $(this).outerWidth();
			}
			else
			{
				$(this).css('width', item.width); $(this).attr('width', true);

				item.right = item.left + item.width;
			}

			e.preventDefault();
		})

		return $(this);
	}

$.fn.color_key_click_o = function()
	{
		$(this).click(function(e)
		{
			if ( e.ctrlKey == true )
			{
				color = $(this).css('background-color'); check = true;

				$('.color-in-row').each(function(index, value) {
					if ( $(this).attr('color') == color )
					{
						check = false; return false;
					}
				})

				if ( check == true )
				{
					color_in_row = $('<DIV/>', {class: 'color-in-row'}).appendTo('#color-row-2').attr('color', color).color_in_row();
					color_shape  = $('<DIV/>', {class: 'color_shape'}).appendTo(color_in_row).css('background-color', color);
					color_text   = $('<DIV/>', {class: 'color_text'}).appendTo(color_in_row).text(color);
				}

				$('#color-row-2').sortable();
			}
			else
			{
				color = $(this).attr('color'); check = true;

				$('.color-in-row').each(function(index, value) {
					if ( $(this).attr('color') == color && $(this).parent().attr('id') == 'color-row-2' )
					{
						check = false; return false;
					}
				})

				if ( check == true )
				{
					color_in_row = $('<DIV/>', {class: 'color-in-row'}).appendTo('#color-row').css({
						backgroundColor : color
					}).attr('color', color).color_in_row();
				}
			}
		})

		return $(this);
	}
$.fn.color_key_click   = function()
	{
		$(this).click(function(e)
		{
			color = $(this).css('background-color'); check = true;

			$('.color-in-row').each(function(index, value) {
				if ( $(this).attr('color') == color )
				{
					check = false; return false;
				}
			})

			if ( check == true )
			{
				color_in_row = $('<DIV/>', {class: 'color-in-row'}).appendTo('#color-row-2').attr('color', color).color_in_row();
				color_shape  = $('<DIV/>', {class: 'color_shape'}).appendTo(color_in_row).css('background-color', color);
				color_text   = $('<DIV/>', {class: 'color_text'}).appendTo(color_in_row).text(color);

				color_in_row.attr('og', color);
			}

			$('#color-row-2').sortable();
		})

		return $(this);
	}

//////////////////////////////////////////////////// React Functions /////////////////////////////////////////////////////

$('#LP').draggable({ cancel : "DIV" }).mousedown(function(e)
	{
		id = $(this).attr('id'); srm('S_Panel'); $(this).addClass('S_Panel'); panel_mode = id;
	});
$('#doc').mousedown(function(e) // clear selection with empty click
	{
		if ( e.button == 0 )
		{
			if ( e.ctrlKey == false && e.shiftKey == false && e.ctrlKey == false && $(e.target).hasClass('ui-draggable') == false )
			{
				if ( $(e.target).attr('class') )
				{
					if ( $(e.target).attr('class').indexOf('ui-resizable') == -1 ) { select(elements[0].id); }
				}
				else
				{
					select(elements[0].id);
				}
			}
			else if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == false )
			{
				dance = $(e.target);

				if ( $(dance).parent().hasClass('container') )
				{
					dance = $(dance).parent();
				}

				select(dance);
			}
			else if ( e.ctrlKey == true && e.shiftKey == true )
			{
				dance = $(e.target);

				if ( $(dance).parent().hasClass('container') )
				{
					dance = $(dance).parent();
				}

				add(dance, true);
			}
			else if ( e.ctrlKey == false && e.shiftKey == true && $(e.target).wt() != 'SP' )
			{
				dance = $(e.target);

				if ( $(dance).parent().hasClass('container') )
				{
					dance = $(dance).parent();
				}

				select(dance, true);

				// important part

				dance = gaet(dance); PRs = dance.doc.parentsUntil('#main').last();

				if ( PRs.length == 0 ) { PRs = dance.doc.parentsUntil('#doc').last(); }

				if ( dance.tag == 'H3' )
				{
					chil = PRs.find('H3');
					dance_fz = dance.doc.css('font-size');
					dance_co = dance.doc.css('color');

					for (var i = 0; i < chil.length; i++)
					{
						if ( e.altKey == false && e.metaKey == false )
						{
							if ( $(chil[i]).css('font-size') == dance_fz && $(chil[i]).css('color') == dance_co )
							{
								add( $(chil[i]), true );
							}
						}
					}
				}
				else if ( dance.tag == 'ICON' )
				{
					chil = PRs.find('ICON');
					dance_fz = dance.doc.css('font-size');

					for (var i = 0; i < chil.length; i++)
					{
						if ( e.altKey == false && e.metaKey == false )
						{
							if ( $(chil[i]).css('font-size') == dance_fz )
							{
								add( $(chil[i]), true );
							}
						}
					}
				}
			}

			if ( e.metaKey == true )
			{
				dance = $(e.target);

				if ( $(dance).parent().hasClass('container') )
				{
					dance = $(dance).parent();
				}

				select(dance, true);

				// important part

				dance = gaet(dance); PRs = dance.doc.parentsUntil('#main').last();

				if ( PRs.length == 0 ) { PRs = dance.doc.parentsUntil('#doc').last(); }

				if ( dance.tag == 'H3' )
				{
					chil = PRs.find('H3');
					dance_fz = dance.doc.css('font-size');
					dance_co = dance.doc.css('color');
					dance_ff = dance.doc.css('font-family');
					dance_fw = dance.doc.css('font-weight');

					for (var i = 0; i < chil.length; i++)
					{
						if ( e.ctrlKey == true && e.shiftKey == false && e.altKey == false )
						{
							if ( $(chil[i]).css('font-family') == dance_ff )
							{
								add( $(chil[i]), true );
							}
						}
						else if ( e.ctrlKey == false && e.shiftKey == false && e.altKey == true )
						{
							if ( $(chil[i]).css('font-weight') == dance_fw && $(chil[i]).css('font-family') == dance_ff )
							{
								add( $(chil[i]), true );
							}
						}
						else if ( e.ctrlKey == false && e.shiftKey == true && e.altKey == false )
						{
							if ( $(chil[i]).css('color') == dance_co )
							{
								add( $(chil[i]), true );
							}
						}
					}
				}
				else if ( dance.tag == 'ICON' )
				{
					chil = PRs.find('ICON');
					dance_fz = dance.doc.css('font-size');
					dance_co = dance.doc.css('color');

					for (var i = 0; i < chil.length; i++)
					{
						if ( e.ctrlKey == false && e.shiftKey == true && e.altKey == false )
						{
							if ( $(chil[i]).css('color') == dance_co )
							{
								add( $(chil[i]), true );
							}
						}
					}

					// metakey + altkey

					if ( e.altKey == true && e.ctrlKey == false && e.shiftKey == false )
					{
						lastDance = gaet(dance.doc.prevAll().not(baebae_list).first());

						while( (lastDance.tag == 'ICON') && ( Math.abs(lastDance.top - dance.top) < 100 ) && (lastDance.doc.css('font-size') == dance_fz) && (lastDance.doc.css('color') == dance_co) )
						{
							add(lastDance.id, true); hamir = gaet(lastDance.doc.prevAll().not(baebae_list).first());

							if ( hamir != lastDance ) { lastDance = hamir } else { break; }
						}

						lastDance = gaet(dance.doc.nextAll().not(baebae_list).first());

						while( (lastDance.tag == 'ICON') && ( Math.abs(lastDance.top - dance.top) < 100 ) && (lastDance.doc.css('font-size') == dance_fz) && (lastDance.doc.css('color') == dance_co) )
						{
							add(lastDance.id, true); hamir = gaet(lastDance.doc.nextAll().not(baebae_list).first());

							if ( hamir != lastDance ) { lastDance = hamir } else { break; }
						}
					}
				}
			}
		}
	})

function react()
	{
		// clear old selection

		srm('just-dance'); for (var i = 0; i < selection.length; i++) { selection[i].doc.addClass('just-dance'); }

		$('.ui-resizable').resizable('destroy');

		if ( selection.length )
		{
			// same check

			tag = selection[0].tag; same = true;

			for (var i = 1; i < selection.length; i++) { if (selection[i].tag != tag) { same = false; } }

			// if same

			if ( same == true )
			{
				tagged_mode = tag; show_panels_as_tag();

				switch(tag)
				{
					case 'IMG':
						
						apply_image_mode();
						
						break;

					case 'DIV':
						
						/*update_SP_panel(); update_flex_panel();*/ srm('selected-fn');

						if ( selection[0].doc.hasClass('smart') )                { $('.sector-item[fn="flex"').addClass('selected-fn') }
						if ( selection[0].doc.hasClass('full-moon') )            { $('.full-moon-item').addClass('selected-fn') }
						if ( selection[0].doc.hasClass('has_bgi') )              { $('.toggle-option[fn="bgi"]').addClass('selected-fn'); }
						if ( selection[0].doc.hasClass('div_height_resizable') ) { $('.toggle-option[fn="height"]').addClass('selected-fn'); }
						
						break;
				}
			}

			// if not same is ok too

			item = selection[0];

			$('.p_item[fn="left"]').text(item.PL);  $('.p_item[fn="top"]').text(item.PT);
			$('.p_item[fn="right"]').text(item.PR); $('.p_item[fn="bottom"]').text(item.PB);

			$('.p_item[fn="vertical"]').text( (item.PT + item.PB) / 2 );
			$('.p_item[fn="horizontal"]').text( (item.PL + item.PR) / 2 );
			$('.p_item[fn="all"]').text( (item.PL + item.PR + item.PT + item.PB) / 4 );

			// stickers part

			$('STICKER > *').not('.ui-draggable').addClass('y').draggable({ axis : 'y', drag : function()
				{
					if ( $(this).hasClass('y') )
					{
						my_val = parseFloat($(this).css('top')); $('.sticker-axis[axis="y"').text(my_val);
					}
					else
					{
						my_val = parseFloat($(this).css('left')); $('.sticker-axis[axis="x"').text(my_val);
					}
				}}).contextmenu(function (e) {
				if ($(this).hasClass('y')) {
					$(this).removeClass('y'); $(this).draggable('option','axis','x');
				} else {
					$(this).addClass('y'); $(this).draggable('option','axis','y');
				} e.preventDefault();
			});

			// contenteditable remastered

			if ( $('h3 > div').not('.smart_sector').length )
			{
				wake_up = [];

				$('h3 div').not('.smart_sector').each(function(index, value) {

					if ( $(this).text() != '' )
					{
						$(this).appendTo( $(this).parents('h3').first() )

						if ( inside($(this).parents('h3').first(), wake_up) == false )
						{
							wake_up.push($(this).parents('h3').first());
						}
					}
					
				})

				for (var i = 0; i < wake_up.length; i++)
				{
					$(wake_up[i]).html( $(wake_up[i]).html().replace(/<div>/g, '<br>').replace(/<\/div>/g,'') )
				}
			}

			// content panel .le-contents

			$('.le-contents').hide(); $('.le-contents[tag="' + tagged_mode + '"]').show();
		}
	}
function show_panels_as_tag()
	{
		general_tag = tagged_mode.toLowerCase();

		$('panel').each(function(index, value) {

			my_tag = $(this).attr('tag');

			if ( my_tag )
			{
				my_tag = my_tag.toLowerCase();

				if ( my_tag == general_tag )
				{
					$(this).removeClass('hide');
				}
				else
				{
					$(this).addClass('hide');
				}
			}

		})

		if ( selection[0].tag == 'STICKER' || selection[0].doc.parent().wt() == 'STICKER' )
		{
			$('panel[tag="sticker"]').removeClass('hide');

			$('.sticker-axis[axis="x"').text(item.x);
			$('.sticker-axis[axis="y"').text(item.y);
		}

		if ( selection[0].doc.hasClass('text') ) { $('panel[tag="h3"]').removeClass('hide'); }
	}

/////////////////////////////////////////////////// Document Functions ///////////////////////////////////////////////////

function toggle_wireframes()
	{
		if ( $('#wires:visible').length ) { $('#wires').hide(); } else { $('#wires').show(); }
	}
function toggle_black()
	{
		$('body').toggleClass('black');
	}

function capture_the_moment(my_id)
	{
		visible_panels = $('panel:visible').hide(); $('html, body').css('background-color', 'rgba(0,0,0,0)');

		$('#doc').addClass('border-container');

		html2canvas(document.body, {backgroundColor : null}).then(function(canvas) {

			if ( my_id ) { $('#' + my_id).remove(); $(canvas).attr('id', my_id) };

			document.body.appendChild(canvas);

		});

		setTimeout(function() {

			$(visible_panels).show(); $('html, body').css('background-color', '');

			$('#doc').removeClass('border-container');

			// flip flop

			grid_horizontal_array = []; grid_vertical_array = [];

			$(elements).each(function(index, value) {

				if ( value.tag != 'DIV' )
				{
					T = value.doc.offset().top;
					L = value.doc.offset().left;
					W = value.doc.outerWidth();
					H = value.doc.outerHeight();
					B = T + H;
					R = L + W;

					grid_horizontal_array.push(L, R);
					grid_vertical_array.push(T, B);
				}

			});

			grid_horizontal_array.sort(sortNumber); grid_vertical_array.sort(sortNumber);

			$('canvas').hide();

		}, 2000);
	}
function sortNumber(a,b) { return a - b; }

////////////////////////////////////////////////////// A New Hope ////////////////////////////////////////////////////////

LP_Ticket('DIV'); LP_DIV_Toggle(); $('#doc > div').first().attr('id', 'main');

// $('.load_item').last().dblclick(); setTimeout(function() { capture_the_moment('doc-standard'); }, 1000)
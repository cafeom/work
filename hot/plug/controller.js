if ( inside(myTitle, myNames) == false && indexOf_ex(myTitle, ex_array) == false ) { $(document).ready(function(e) {

	font_links = $('<DIV/>', {class: 'hide', id: 'font_links'}).appendTo('body');
	red_veltet = $('<DIV/>', {id: 'red_veltet'}).appendTo('body');

	window.onmousemove = function(e)
		{
			pageX = e.pageX; pageY = e.pageY;
		}
	window.onkeydown   = function(e)
		{
			key = e.key.toLowerCase();

			if ( (e.ctrlKey == false) && (e.shiftKey == false) && (e.altKey == false) )
			{
				     if ( key == 'enter'  ) { clone_all_text(); }
				else if ( key == 'g'      ) { add_zone_clit(); }
				
				else if ( key == '`'      ) { $('#font_zone, #font_links').toggleClass('hide'); }
				else if ( key == 'q'      ) { basic_scan(); }

				else if ( key == 'f'      ) { first_get_all_images(); }
				else if ( key == 'delete' ) { ambition_delete(); }
				else if ( key == 'w'      ) { ambition_step_up(); }

				else if ( key == '0'      ) { bad_boy_down(); send_wireframe(); }
				else if ( key == '7'      ) { you_clouds_rain(); }
				else if ( key == '8'      ) { dont_come_back(); }
				else if ( key == '9'      ) { tag_all_text(); alert('tag_all_text done') }

				else if ( key == '/'      ) { collect_colors(); }
				else if ( key == '*'      ) { collect_fonts(); }
				else if ( key == '-'      ) { $('.ambition, .master_wu').remove(); }
				else if ( key == 'insert' ) { already_list = []; }
			}
			if ( (e.ctrlKey == true) && (e.shiftKey == false) && (e.altKey == false) )
			{
				     if ( key == 'z'      ) { ambition_reset(); }
			    else if ( key == 'enter'  ) { icon_clone_order(); }
			    else if ( key == '7'      ) { tag_all_text(); you_clouds_rain }
			    else if ( key == '-'      ) { $('.ambition_porn, .activated_icons').removeClass('ambition_porn activated_icons'); }

			    e.preventDefault();
			}
			if ( (e.ctrlKey == false) && (e.shiftKey == false) && (e.altKey == true) )
			{
			         if ( key == 'enter'  ) { image_clone_order(); }
			}
		}

})}

//////////////////////////////////////////////// RE-BYE /////////////////////////////////////////////////

ex_array = ['youtube','google','javfinder'];

function indexOf_ex(le_title, le_array)
	{
		le_title = le_title.toLowerCase(); le_wiay = false;

		for (var i = 0; i < le_array.length; i++)
		{
			if ( le_title.indexOf( le_array[i].toLowerCase() ) >= 0 )
			{
				le_wiay = true; break;
			}
		}

		return le_wiay;
	}

//////////////////////////////////////////////// RE-BYE /////////////////////////////////////////////////

function first_get_all_images()
	{
		stuffs = $('body *:visible'); elem_images = []; before_images = []; after_images = [];

		for (var i = 0; i < stuffs.length; i++)
		{
			if ( $(stuffs[i]).prop('tagName') == 'IMG' )
			{
				elem_images.push($(stuffs[i]).attr('addict', stuffs[i].src));
			}

			if ( $(stuffs[i]).css('background-image') != 'none' )
			{
				elem_images.push($(stuffs[i]).attr('addict', $(stuffs[i]).css('background-image').replace('url"','').replace('"','') ));
			}

			before_image = window.getComputedStyle(stuffs[i], ':before').getPropertyValue('background-image');
			after_image  = window.getComputedStyle(stuffs[i], ':after' ).getPropertyValue('background-image');

			if ( before_image != 'none' ) { before_images.push(stuffs[i]); }
			if ( after_image  != 'none' ) {  after_images.push(stuffs[i]); }
		}

		for (var i = 0; i < elem_images.length; i++)
		{
			$(elem_images[i]).attr('imgid', i);

			ambition = $('<DIV/>', {class: 'ambition'}).appendTo('body').css({
				top    : $(elem_images[i]).offset().top,
				left   : $(elem_images[i]).offset().left,
				width  : $(elem_images[i]).outerWidth(),
				height : $(elem_images[i]).outerHeight(),
			}).resizable().draggable().attr('imgix', i).attr('imgstep', 0).on('mousedown', function(e)
			{
				current_ambition = $(this);
			});

			$(ambition).attr('src', $(elem_images[i]).attr('addict'));
		}

		$('.ambition').contextmenu(function(e)
		{
			$(this).toggleClass('ambition_porn'); e.preventDefault();
		}).on('mousemove', function(e)
		{
			if ( e.ctrlKey == true )
			{
				$(this).addClass('ambition_porn');
			}
		})
	}
function ambition_reset()
	{
		ambition_target = $('*[imgid="' + $(current_ambition).attr('imgix') + '"]');

		current_ambition.css({
			top    : $(ambition_target).offset().top,
			left   : $(ambition_target).offset().left,
			width  : $(ambition_target).outerWidth(),
			height : $(ambition_target).outerHeight(),
		})
	}
function ambition_delete()
	{
		current_ambition.remove();
	}
function ambition_step_up()
	{
		ambition_target = $('*[imgid="' + $(current_ambition).attr('imgix') + '"]');
		current_step    = parseInt($(current_ambition).attr('imgstep'));
		current_prs     = $(ambition_target).parents();

		current_ambition.css({
			top    : $(current_prs[current_step]).offset().top,
			left   : $(current_prs[current_step]).offset().left,
			width  : $(current_prs[current_step]).outerWidth(),
			height : $(current_prs[current_step]).outerHeight(),
		})

		$(current_ambition).attr('imgstep', current_step++);
	}
function image_clone_order()
	{
		my_images = [];

		$('.ambition_porn').each(function(index, value) {
			
			my_images.push({
				top    : $(this).offset().top,
				left   : $(this).offset().left,
				width  : $(this).outerWidth(),
				height : $(this).outerHeight(),
				src    : $(this).attr('src')
			})

		})

		Send({ type : 'image-clone', images : my_images });
	}

function icon_clone_order()
	{
		my_icons = []; key_array = ['content','font-family','font-size','color'];

		$('.activated_icons').each(function(index, value) {

			content_map = {};

			for (var i = 0; i < key_array.length; i++)
			{
				content_map[key_array[i]] = $(this).attr(key_array[i]);
			}

			content_map.left = $(this).offset().left;
			content_map.top  = $(this).offset().top;

			my_icons.push(content_map);

		})

		Send({ type : 'icon-clone', icons : my_icons });
	}

/////////////////////////////////////////////// Beside Me ///////////////////////////////////////////////

function basic_scan()
	{
		chil = $('body *:visible');

		for (var i = 0; i < chil.length; i++)
		{
			get_icon_position(chil[i]);
		}
	}
function get_icon_position(elem)
	{
		T = $(elem).offset().top;
		L = $(elem).offset().left;

		// cuz nothing can fuck wit us

		before_content = window.getComputedStyle(elem, ':before').getPropertyValue('content');
		after_content  = window.getComputedStyle(elem, ':after' ).getPropertyValue('content');

		if ( before_content != '' )
		{
			before_base = before_content;

			if ( before_content.indexOf('\\') < 0 ) { before_content = before_content.charCodeAt(1).toString(16); }
			
			if ( before_content.match(/[a-z]/g) )
			{
				before_top     = parseFloat(window.getComputedStyle(elem, ':before').getPropertyValue('top'));
				before_left    = parseFloat(window.getComputedStyle(elem, ':before').getPropertyValue('left'));
				before_mg_top  = parseFloat(window.getComputedStyle(elem, ':before').getPropertyValue('margin-top'));
				before_mg_left = parseFloat(window.getComputedStyle(elem, ':before').getPropertyValue('margin-left'));

				f_before_top   = T;
				f_before_left  = L;

				if ( isNaN(before_top) == false  ) { f_before_top  = f_before_top + before_top;   }
				if ( isNaN(before_left) == false ) { f_before_left = f_before_left + before_left; }

				if ( isNaN(before_mg_top) == false  ) { f_before_top  = f_before_top + before_mg_top   }
				if ( isNaN(before_mg_left) == false ) { f_before_left = f_before_left + before_mg_left }

				master_wu = $('<DIV/>', {class: 'master_wu'}).appendTo('body').css({ top : f_before_top, left : f_before_left });
				master_wu.attr({
					'content'     : before_base,
					'font-family' : window.getComputedStyle(elem, ':before').getPropertyValue('font-family'),
					'font-size'   : window.getComputedStyle(elem, ':before').getPropertyValue('font-size'),
					'color'       : window.getComputedStyle(elem, ':before').getPropertyValue('color'),
				}).click(function(e) { $(this).addClass('activated_icons'); }).on('mousemove', function(e)
				{
					if ( e.ctrlKey == true )
					{
						$(this).addClass('activated_icons');
					}
				}).draggable().contextmenu(function(e) { $(this).removeClass('activated_icons'); e.preventDefault(); });
			}
		}

		if ( after_content != '' )
		{
			after_base = after_content;

			if ( after_content.indexOf('\\') < 0 ) { after_content = after_content.charCodeAt(1).toString(16); }
			
			if ( after_content.match(/[a-z]/g) )
			{
				after_top     = parseFloat(window.getComputedStyle(elem, ':after').getPropertyValue('top'));
				after_left    = parseFloat(window.getComputedStyle(elem, ':after').getPropertyValue('left'));
				after_mg_top  = parseFloat(window.getComputedStyle(elem, ':after').getPropertyValue('margin-top'));
				after_mg_left = parseFloat(window.getComputedStyle(elem, ':after').getPropertyValue('margin-left'));

				f_after_top   = T;
				f_after_left  = L;

				if ( isNaN(after_top) == false  ) { f_after_top  = f_after_top + after_top;   }
				if ( isNaN(after_left) == false ) { f_after_left = f_after_left + after_left; }

				if ( isNaN(after_mg_top) == false  ) { f_after_top  = f_after_top + after_mg_top   }
				if ( isNaN(after_mg_left) == false ) { f_after_left = f_after_left + after_mg_left }

				master_wu = $('<DIV/>', {class: 'master_wu'}).appendTo('body').css({ top : f_after_top, left : f_after_left });
				master_wu.attr({
					'content'     : after_base,
					'font-family' : window.getComputedStyle(elem, ':after').getPropertyValue('font-family'),
					'font-size'   : window.getComputedStyle(elem, ':after').getPropertyValue('font-size'),
					'color'       : window.getComputedStyle(elem, ':after').getPropertyValue('color'),
				}).click(function(e) { $(this).addClass('activated_icons'); }).on('mousemove', function(e)
				{
					if ( e.ctrlKey == true )
					{
						$(this).addClass('activated_icons');
					}
				}).draggable().contextmenu(function(e) { $(this).removeClass('activated_icons'); e.preventDefault(); });
			}
		}
	}

//////////////////////////////////////////////// Bad Boy ////////////////////////////////////////////////

function bad_boy_down()
	{
		if ( $('.bad_boy').length == 0 )
		{
			$('body *:visible').each(function(index, value) {
				
				bad_boy = $('<DIV/>', {class: 'bad_boy'}).appendTo('#red_veltet').css({
					width : $(this).outerWidth(), height : $(this).outerHeight(),
					top : $(this).offset().top, left : $(this).offset().left, 
				});

			})
		}
		else { $('.bad_boy').remove(); }
	}
function send_wireframe()
	{
		wireframe = [];

		$('body *:visible').each(function(index, value) {

			if ( $(this).offset().left < 1900 )
			{
				L = $(this).offset().left;
				T = $(this).offset().top;
				W = $(this).outerWidth();
				H = $(this).outerHeight();

				if ( W > 0 && H > 0 )
				{
					wireframe.push([$(this).prop('tagName'), L, T, W, H]);
				}
			}
			
		});

		Send({ type : 'wireframe', data : wireframe });
	}

/////////////////////////////////////////////// Functions ///////////////////////////////////////////////

already_list = []; font_list = []; font_generated = false;

function you_clouds_rain()
	{
		black_listed_tags = ['noscript','script']; clouds = [];

		$('body *:visible').not(already_list).each(function(index, value) {
			
			if ( this.childNodes && isVisible(this) && inside($(this).prop('tagName').toLowerCase(), black_listed_tags) == false )
			{
				childNodes = this.childNodes;

				for (var i = 0; i < childNodes.length; i++)
				{
					if ( childNodes[i].nodeName == '#text' )
					{
						content = childNodes[i].wholeText.replace(/\s\s+/g,'');

						if ( content != '' && content != ' ' && content != '\n' )
						{
							if ( inside(this, clouds) == false ) { $(this).attr('content', content); clouds.push(this); }
						}
					}
				}
			}

		})

		$(clouds).each(function(index, value) {
			
			$(this).contextmenu(function(e)
			{
				$(this).toggleClass('dance-dance');

				if ( $(this).hasClass('dance-dance') ) { $(this).addClass('just-just') }
				else { $(this).removeClass('just-just') }

				e.preventDefault();
			})

		})

		alert('you_clouds_rain complete');
	}
function dont_come_back()
	{
		diva = []; doc_width = document.body.clientWidth; $('.just-just').removeClass('just-just');

		$('.dance-dance').not(already_list).each(function(index, value) {

			rect = this.getBoundingClientRect(); my_item = $(this);
			L    = rect.left + rect.width / 2;
			T    = rect.top  + rect.height / 2;

			AL   = rect.left + 3;
			AT   = rect.top  + 3;

			get_text_real_position(my_item);

			my_styles = {
				'font-size'        : my_item.css('font-size'),
				'font-family'      : my_item.css('font-family'),
				'font-weight'      : my_item.css('font-weight'),
				'font-style'       : my_item.css('font-style'),
				'line-height'      : my_item.css('line-height'),
				'text-decoration'  : my_item.css('text-decoration'),
				'text-transform'   : my_item.css('text-transform'),
				'text-align'       : my_item.css('text-align'),
				'letter-spacing'   : my_item.css('letter-spacing'),
				'word-spacing'     : my_item.css('word-spacing'),

				'width'            : MW,
				'left'             : ML,
				'top'              : MT,

				'padding'          : my_item.css('padding'),
				'color'            : my_item.css('color'),
				'background-color' : my_item.css('background-color'),
				'border'           : my_item.css('border'),
				'border-radius'    : my_item.css('border-radius'),

				// beta

				'min-width'        : my_item.css('min-width'),
				'min-height'       : my_item.css('min-height'),
			}

			if (np == true) { delete my_styles.padding }

			diva.push([ $(this).attr('content') , my_styles]); already_list.push(this);
			
		})

		Send({ type : 'text-clone' , content : diva });
	}

function tag_all_text()
	{
		black_listed_tags = ['noscript','script'];

		$('body *:visible').not(already_list).each(function(index, value) {

			pr_tag = $(this).prop('tagName');

			if ( inside( $(this).css('font-family') , font_list ) == false ) { font_list.push( $(this).css('font-family') ) }
			
			if ( this.childNodes && isVisible(this) && inside($(this).prop('tagName').toLowerCase(), black_listed_tags) == false )
			{
				childNodes = this.childNodes; text_node_count = 0;

				for (var i = 0; i < childNodes.length; i++)
				{
					if ( childNodes[i].nodeName == '#text' ) { text_node_count++; }
				}

				if ( text_node_count != childNodes.length )
				{
					for (var i = 0; i < childNodes.length; i++)
					{
						if ( childNodes[i].nodeName == '#text' )
						{
							content = childNodes[i].wholeText.replace(/\s\s+/g,'');

							if ( content != '' && content != ' ' && content != '\n' )
							{
								if ( content.indexOf('script') < 0 )
								{
									if ( inside(pr_tag, ['H1','H2','H3','H4','H5','H6']) )
									{
										new_shit = document.createElement("div"); $(new_shit).text(content).addClass('c-diva c_diva');
									}
									else
									{
										new_shit = document.createElement("virgin"); $(new_shit).text(content);
									}

									childNodes[i].replaceWith( new_shit );
								}
							}
						}
					}
				}
			}

		})

		generate_all_fonts();
	}
function get_text_real_position(friday)
	{
		test_container = $('<DIV/>', {class: 'test_container'}).appendTo('body');
		test_text      = $('<DIV/>', {class: 'test_text'}).appendTo(test_container).text( friday.text() );

		test_container.css({
			top : friday.offset().top, left : friday.offset().left,
			width : friday.outerWidth(), height : friday.outerHeight(),
			padding : friday.css('padding'), position : 'absolute'
		})

		test_text.css({
			'font-size'       : friday.css('font-size'),
			'font-family'     : friday.css('font-family'),
			'font-weight'     : friday.css('font-weight'),
			'font-style'      : friday.css('font-style'),
			'line-height'     : friday.css('line-height'),
			'text-decoration' : friday.css('text-decoration'),
			'text-transform'  : friday.css('text-transform'),
			'letter-spacing'  : friday.css('letter-spacing'),
			'word-spacing'    : friday.css('word-spacing'),
			'display'         : 'inline',
		})

		my_alignment = 'test_' + friday.css('text-align'); test_container.addClass(my_alignment);

		bgc_check = friday.css('background-color') == 'rgba(0, 0, 0, 0)';
		bgi_check = friday.css('background-image') == 'none';
		bor_check = friday.css('border-width') == '0px';

		if ( bgc_check == true && bgi_check == true && bor_check == true )
		{
			ML = test_text.offset().left;
			MT = test_text.offset().top;
			MW = test_text.outerWidth();
			MH = test_text.outerHeight();
			np = true;
		}
		else
		{
			ML = friday.offset().left;
			MT = friday.offset().top;
			MW = friday.outerWidth();
			MH = friday.outerHeight();
			np = false;
		}

		$('.test_container, .test_text').remove();
	}
function clone_all_text()
	{
		tag_all_text(); diva = []; doc_width = document.body.clientWidth;

		$('body *:visible').not(already_list).each(function(index, value) {

			if ( index % 100 == 0 ) { console.log(index); }

			if ( this.childNodes && isVisible(this) )
			{
				childNodes = this.childNodes;

				for (var i = 0; i < childNodes.length; i++)
				{
					if ( childNodes[i].nodeName == '#text' )
					{
						content = childNodes[i].wholeText.replace(/\s\s+/g,'');

						if ( content != '' && content != ' ' && content != '\n' )
						{
							tag = $(this).prop('tagName').toLowerCase();

							if ( inside(tag, black_listed_tags) == false )
							{
								rect = this.getBoundingClientRect(); my_item = $(this);
								L    = rect.left + rect.width / 2;
								T    = rect.top  + rect.height / 2;

								AL   = rect.left + 3;
								AT   = rect.top  + 3;

								get_text_real_position(my_item);

								if ( document.elementFromPoint(L, T) == this || document.elementFromPoint(AL, AT) == this )
								{
									my_styles = {
										'font-size'        : my_item.css('font-size'),
										'font-family'      : my_item.css('font-family'),
										'font-weight'      : my_item.css('font-weight'),
										'font-style'       : my_item.css('font-style'),
										'line-height'      : my_item.css('line-height'),
										'text-decoration'  : my_item.css('text-decoration'),
										'text-transform'   : my_item.css('text-transform'),
										'text-align'       : my_item.css('text-align'),
										'letter-spacing'   : my_item.css('letter-spacing'),
										'word-spacing'     : my_item.css('word-spacing'),

										'width'            : MW,
										'left'             : ML,
										'top'              : MT,

										'padding'          : my_item.css('padding'),
										'color'            : my_item.css('color'),
										'background-color' : my_item.css('background-color'),
										'border'           : my_item.css('border'),
										'border-radius'    : my_item.css('border-radius'),

										// beta

										'min-width'        : my_item.css('min-width'),
										'min-height'       : my_item.css('min-height'),
									}

									if (np == true) { delete my_styles.padding }

									diva.push([content, my_styles]); already_list.push(this);
								}
							}
						}
					}
				}
			}

		})
		console.log('clone info');
		Send({ type : 'text-clone' , content : diva });
	}
function generate_all_fonts()
	{
		if ( font_generated == false )
		{
			for (var i = 0; i < font_list.length; i++)
			{
				font_list[i] = font_list[i].replace(/\s/gi,'+');
			}
			console.log(font_list);
			Send({ type : 'get-fonts' , fonts : font_list }); font_generated = true;			
		}
	}

//////////////////////////////////////////// Color Collector ////////////////////////////////////////////

function collect_colors()
	{
		brit = $('body, body *'); color_collection = [];

		for (var i = 0; i < brit.length; i++)
		{
			my_color = $(brit[i]).css('background-color');

			if ( my_color != 'rgba(0, 0, 0, 0)' )
			{
				if ( inside(my_color, color_collection) == false )
				{
					color_collection.push(my_color);
				}
			}
		}

		Send({ type : 'collect_colors', data : color_collection })
	}

//////////////////////////////////////////// Font Collector /////////////////////////////////////////////

function collect_fonts()
	{
		font_collection = [];

		$('.selected_font').each(function(index, value) {

			fontWeight = $(this).attr('font-weight'); if ( fontWeight ) { fontWeight = fontWeight.replace(/'/g,''); }
			fontStyle  = $(this).attr('font-style'); if ( fontStyle ) { fontStyle = fontWeight.replace(/'/g,''); }
			
			font_collection.push({
				fontName : $(this).attr('font-family'),
				format : $(this).attr('format'),
				fontWeight : fontWeight,
				fileName : $(this).attr('download'),
				fontStyle : fontStyle,
			});

		})

		Send({ type : 'collect-fonts', fonts : font_collection });
	}
chrome.runtime.onMessage.addListener(function(request) { if ( myTitle == 'Main' ) { message = request.message; switch(message.type) {

case 'text-clone':

	select(elements[0].id);

	for (var i = 0; i < message.content.length; i++)
	{
		LP_Ticket('H3'); item = elements[elements.length-1];

		item.doc.text(message.content[i][0]);

		for (var key in message.content[i][1])
		{
			if ( key == 'width' )
			{
				item[key] = message.content[i][1][key];
			}
			else
			{
				item.doc.css(key, message.content[i][1][key]);
			}

			if ( key == 'color' ) { item.color = message.content[i][1][key]; }
			if ( key == 'background-color' ) { item.bgc = message.content[i][1][key]; }
		}

		item.doc.contextmenu_width().addClass('news');

		// what is love

		item.top    = message.content[i][1].top;
		item.left   = message.content[i][1].left;
		item.right  = item.doc.outerWidth()  + item.left;
		item.bottom = item.doc.outerHeight() + item.top;
	}
	
	break;

case 'get-fonts':

	for (var i = 0; i < message.fonts.length; i++)
	{
		my_link = '<link href="https://fonts.googleapis.com/css?family=';
		my_key  = ':100,100i,300,300i,400,400i,700,700i,900,900i" rel="stylesheet"/>';
		message.fonts[i] = message.fonts[i].replace(/\,.+/g,'').replace(/\"/g,'');

		my_link = my_link + message.fonts[i] + my_key;

		$(my_link).appendTo('head'); font_links.push(my_link);
	}
	
	break;

case 'icon-clone':
	
	c_icons = message.icons; select(elements[0].id);

	for (var i = 0; i < c_icons.length; i++)
	{
		c_icons[i].content = c_icons[i].content.replace(/"/g,'');
		LP_Ticket('ICON'); item = elements[elements.length-1];

		item.doc.html(c_icons[i].content).addClass('FI');

		for (var key in c_icons[i])
		{
			if ( key != 'content' ) { item.doc.css(key, c_icons[i][key]); }
		}

		item.doc.removeClass('fa fa-font-awesome');
		item.doc.css({ top : c_icons[i].top, left : c_icons[i].left });
		item.doc.addClass('news');

		// what is love

		item.top    = c_icons[i].top;
		item.left   = c_icons[i].left;
		item.right  = item.doc.outerWidth()  + item.left;
		item.bottom = item.doc.outerHeight() + item.top;

		item.cicon = c_icons[i].content;
	}
	
	break;

case 'image-clone':

	my_images = message.images; select(elements[0].id);

	for (var i = 0; i < my_images.length; i++)
	{
		LP_Ticket('IMG'); item = elements[elements.length-1];

		item.doc.css({
			'width'  : my_images[i].width,
			'height' : my_images[i].height,
			'top'    : my_images[i].top,
			'left'   : my_images[i].left,
		})

		item.top    = my_images[i].top;
		item.left   = my_images[i].left;
		item.width  = my_images[i].width;
		item.height = my_images[i].height;

		item.right  = my_images[i].width  + item.left;
		item.bottom = my_images[i].height + item.top;

		my_images[i].src = my_images[i].src.replace('url(','').replace(')','')
		my_images[i].src = my_images[i].src.replace(/"/g,'');

		item.doc.children('IMG').attr('src', my_images[i].src);
		item.doc.addClass('news unset');
	}
	
	break;

case 'wireframe':

	frame_data = message.data; $('.wireframe').remove();

	$('html, body').css('background-color', 'rgba(0,0,0,0)');
	
	for (var i = 0; i < frame_data.length; i++)
	{
		wireframe = $('<DIV/>', {class: 'wireframe'}).appendTo('#wires').css({
			left   : frame_data[i][1] + 'px',
			top    : frame_data[i][2] + 'px',
			width  : frame_data[i][3] + 'px',
			height : frame_data[i][4] + 'px',
		});

		frame_data[i][3] = frame_data[i][3] + frame_data[i][1];
		frame_data[i][4] = frame_data[i][4] + frame_data[i][2];
	}

	html2canvas(document.body, {backgroundColor : null}).then(function(canvas) {
		document.body.appendChild(canvas);
	});

	// frame data now contains [tag, left, top, right, bottom];
	
	break;

case 'collect_colors':

	my_colors = message.data; $('#color-keys').empty();

	for (var i = 0; i < my_colors.length; i++)
	{
		color_key = $('<DIV/>', {class: 'color-key'}).appendTo('#color-keys').css({
			backgroundColor : my_colors[i]
		});

		if ( my_colors[i].indexOf('a') >= 0 )
		{
			$(color_key).addClass('is_alpha')
		}
	}

	if ( inside(my_colors, color_arrays) == false )
	{
		if ( check == false ) { color_arrays.push(my_colors); }
	}

	$('.color-key').color_key_click();
	
	break;

case 'collect-fonts':
	
	my_fonts = message.fonts;

	for (var i = 0; i < my_fonts.length; i++)
	{
		var newStyle = document.createElement('style');
		newStyle.appendChild(document.createTextNode("\
			@font-face {\
				font-family: " + my_fonts[i].fontName + ";\
				src: url('font/" + my_fonts[i].fileName + "') format('" + my_fonts[i].format +"');\
				font-weight: " + my_fonts[i].fontWeight + ";\
				font-style: " + my_fonts[i].fontStyle + ";\
			}\
			"));

		document.head.appendChild(newStyle); font_links.push( $(newStyle).oh().replace(/\t/g, '') );
	}
	
	break;

}}});
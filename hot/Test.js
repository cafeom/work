// fonts = [];

// $.ajax({
// 	url  : 'http://localhost:7896/font/',
// 	type : 'get', async: false,
// 	success : function(data)
// 	{
// 		$(data).find('a').each(function(index, value) {

// 			href = $(this).attr('href');

// 			if ( href.indexOf('.') >= 0 )
// 			{
// 				href = $(this).attr('href'); fonts.push(['http://localhost:7896/font/' + href, href]);
// 			}

// 		})
// 	}
// });

// for (var i = 0; i < 10; i++)
// {
// 	split = fonts[i][1].replace(/%20/gi,' ').split(' -porn- ')[1];
// 	parse = $('<DIV/>', {class: 'parse'}).appendTo('#finder').text(split).attr('link', fonts[i][0]);
// }

// function get_date(link)
// 	{
// 		var xhr = $.ajax({
// 			url: link,
// 			success: function(response) {
// 				console.log( "Last Modified: " + xhr.getResponseHeader("date") );
// 			}
// 		});
// 	}

//////////////////////////////////////////////////////////////////////////////////

// drag = false; dragMode = null;

// $('.handle').on('mousedown', function(e) {

// 	X = e.pageX; Y = e.pageY; drag = true;

// 	og_left   = $('#master').offset().left;
// 	og_top    = $('#master').offset().top;
// 	og_width  = $('#master').outerWidth();
// 	og_height = $('#master').outerHeight();
// 	og_right  = og_left + og_width;
// 	og_bottom = og_top  + og_height;

// 	dragMode  = $(this).attr('id');

// })

// $(window).on('mousemove', function(e) { if ( drag == true ) {

// 	offsetX = e.pageX - X; offsetY = e.pageY - Y;

// 	if ( e.altKey == false && e.ctrlKey == false )
// 	{
// 		switch(dragMode)
// 		{
// 			case 'bottom': new_height = offsetY + og_height; $('#master').css('height', new_height + 'px'); break;
// 			case 'right' : new_width  = offsetX + og_width ; $('#master').css('width' , new_width  + 'px'); break;

// 			case 'left'  :

// 				new_left  = offsetX  + og_left      ; $('#master').css('left'  , new_left  + 'px');
// 				new_width = -offsetX + og_width - 2 ; $('#master').css('width' , new_width + 'px');			
// 				break;

// 			case 'top':

// 				new_top    =  offsetY + og_top        ; $('#master').css('top'    , new_top    + 'px');
// 				new_height = -offsetY + og_height - 2 ; $('#master').css('height' , new_height + 'px');			
// 				break;

// 			case 'se':
				
// 				new_height = offsetY + og_height ; $('#master').css('height', new_height + 'px');
// 				new_width  = offsetX + og_width  ; $('#master').css('width' , new_width  + 'px');
// 				break;
// 		}
// 	}
// 	else
// 	{
// 		switch(dragMode)
// 		{
// 			case 'bottom':
				
// 				new_top = og_top - offsetY - 2 ; new_height = offsetY * 2 + og_height ;
// 				$('#master').css({ top : new_top + 'px', height : new_height + 'px' });				
// 				break;

// 			case 'top':
				
// 				new_top = og_top + offsetY - 2 ; new_height = -offsetY * 2 + og_height ;
// 				$('#master').css({ top : new_top + 'px', height : new_height + 'px' });				
// 				break;

// 			case 'left':
				
// 				new_left = og_left + offsetX - 2 ; new_width = -offsetX * 2 + og_width ;
// 				$('#master').css({ left : new_left + 'px', width : new_width + 'px' });				
// 				break;

// 			case 'right':
				
// 				new_left = og_left - offsetX - 2 ; new_width = offsetX * 2 + og_width ;
// 				$('#master').css({ left : new_left + 'px', width : new_width + 'px' });				
// 				break;

// 			case 'se':

// 				new_top    = og_top - offsetY - 2    ; new_left  = og_left - offsetX - 2  ;
// 				new_height = offsetY * 2 + og_height ; new_width = offsetX * 2 + og_width ;

// 				$('#master').css({
// 					top   : new_top + 'px'  , left   : new_left + 'px',
// 					width : new_width + 'px', height : new_height + 'px'
// 				})
				
// 				break;
// 		}
// 	}

// }})

// $(window).on('mouseup', function(e) {

// 	drag = false;

// })

//////////////////////////////////////////////////////////////////////////////////

$('.boy').draggable();
$('.boy').contextmenu(function(e)
	{
		folder_orientation('#velvet');

		e.preventDefault();
	})

function folder_orientation(prE)
	{
		velvet = $(prE).children(); boy = 0;

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

		console.log(boy);

		if ( boy >= 0 )
		{
			console.log('col');
		}
		else
		{
			console.log('row');
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

function stacked_checker(elem, folder)
	{
		folder = $(folder).children().not('SP').not(elem); stacked = false;

		L2 = $(elem).offset().left;
		T2 = $(elem).offset().top;
		W2 = $(elem).outerWidth();
		H2 = $(elem).outerHeight();
		R2 = L2 + W2;
		B2 = T2 + H2;

		for (var i = 0; i < folder.length; i++)
		{
			L1 = $(folder[i]).offset().left;
			T1 = $(folder[i]).offset().top;
			W1 = $(folder[i]).outerWidth();
			H1 = $(folder[i]).outerHeight();
			R1 = L1 + W1;
			B1 = T1 + H1;

			if ( ((L1 <= L2 && R1 >= L2) || (L1 <= R2 && R1 >= R2)) && ((T1 <= T2 && B1 >= T2) || (T1 <= B2 && B1 >= B2)) )
			{
				stacked = true; break;
			}
		}

		return stacked;
	}

//////////////////////////////////////////////////////////////////////////////////

$('#finger').draggable({ snap : '.line', drag : function(e)
	{
		
	}, stop : function(e)
	{
		phanzom_zone_finder();
	}});

// move the trigger

my_step = 0;

window.onkeydown = function(e)
	{
		if ( e.key == 'd' )
		{
			my_step = move_on(my_step, dimension,  1);
		}
		else if ( e.key == 'a' )
		{
			my_step = move_on(my_step, dimension, -1);
		}

		move_to_the_line();
	}
function move_on(step, arr, check)
	{
		if ( check > 0 )
		{
			step++; if ( step == arr.length ) { step = 0; }
		}
		else
		{
			step--; if ( step == -1 ) { step = arr.length - 1; }
		}

		return step;
	}
function move_to_the_line()
	{
		elem = $(dimension[my_step][1]);

		my_width = $('#finger').outerWidth();
		her_left = elem.offset().left;

		$('#finger').css({ left : (her_left - my_width) + 'px' , top : (elem.offset().top + 100) + 'px' })
		$('#finger').trigger('mouseup');
	}

function phanzom_zone_finder()
	{
		L = $('#finger').offset().left;
		W = $('#finger').outerWidth();
		R = L + W - 3;
		V = true;

		for (var i = 0; i < dimension.length-1; i++)
		{
			if ( dimension[i][0] <= L && dimension[i][0] <= R )
			{
				if ( i == dimension.length-2 )
				{
					my_step = i+1; V = false;
				}
				else
				{
					if ( dimension[i+1][0] >= L && dimension[i+1][0] >= R )
					{
						if ( L - dimension[i][0] < dimension[i+1][0] - R )
						{
							my_step = i;
						}
						else
						{
							my_step = i+1;
						}

						V = false; break;
					}					
				}
			}
		}

		if ( V == true ) { my_step = 0; }
	}

// establish

function establish_the_link(elem)
	{
		chill = $(elem).children(); dimension = [];

		for (var i = 0; i < chill.length; i++)
		{
			dimension.push([ $(chill[i]).offset().left , chill[i] ]);
		}

		dimension.sort(Comparator);
	}
function Comparator(a, b)
	{
		if (a[0] < b[0]) return -1;
		if (a[0] > b[0]) return  1;
		return 0;
	}

establish_the_link('#like');

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


$('.item').draggable({
	start : function(e, ui)
	{
		my_original = parseFloat($(this).text());
	},
	drag : function(e, ui)
	{
		my_val = my_original + ( ui.position.left - ui.originalPosition.left ); $(this).text(my_val);

		fn = $(this).attr('fn'); q_bundle = ''; a_bundle = '';

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
			$('.item[fn="' + q_bundle[i] + '"]').text("0");
		}

		for (var i = 0; i < a_bundle.length; i++)
		{
			$('.item[fn="' + a_bundle[i] + '"]').text(my_val);
		}
	}
});
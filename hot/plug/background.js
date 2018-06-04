chrome.runtime.onMessage.addListener(function(message)
{
	messageFrom = message.from;
	messageContent = message.content;

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

		chrome.windows.getAll({populate : true}, function (window_list)
		{
			var list = [];
			for(var i = 0; i < window_list.length ; i++)
			{
				list = list.concat(window_list[i].tabs);
			}

			for (var i = 0; i < list.length; i++)
			{
				if ( list[i].title == 'Main' )
				{
					controllerID = list[i].id; controller_WIN = list[i].windowId;
				}
				else if ( list[i].title != 'Extensions' )
				{
					document_ID = list[i].id; document_WIN = list[i].windowId; break;
				}
			}

			if ( messageFrom == 'Main' )
			{
				chrome.tabs.sendMessage(document_ID, {
					from : messageFrom,
					message: messageContent
				});
			}
			else
			{
				chrome.tabs.sendMessage(controllerID, {
					from : messageFrom,
					message: messageContent
				});
			}
		});
	});
})
^F1::
	Reload
Return

!D::
	WinGet, curtrans, Transparent, A
	WinGet, currentWindow, ID, A
	    if curtrans > 200
	    {
	        WinSet, Transparent, 150, A
	        WinSet, AlwaysOnTop, on, ahk_id %currentWindow%
	        WinSet, ExStyle, +0x80020, ahk_id %currentWindow%
	    }
	    else
	    {
	        WinSet, Transparent, OFF, A
	        WinSet, Transparent, 255, A
	        Winset, AlwaysOnTop, off, ahk_id %currentWindow%
	        WinSet, ExStyle, -0x80020, ahk_id %currentWindow%
	    }
Return

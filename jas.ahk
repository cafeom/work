^F1::
	Reload
Return

!A::
	WinGet, curtrans, Transparent, A
	if (curtrans != 0)
	{
	    WinSet, Transparent, 0, A
	    WinSet, AlwaysOnTop, on, A
	    WinSet, ExStyle, +0x80020, A	
	}
	else
	{
		WinSet, Transparent, OFF, A
		WinSet, Transparent, 255, A
		Winset, AlwaysOnTop, off, A
		WinSet, ExStyle, -0x80020, A
	}
	
Return

!D::
	WinGet, curtrans, Transparent, A
	if (curtrans != 45)
	{
	    WinSet, Transparent, 45, A
	    WinSet, AlwaysOnTop, on, A
	    WinSet, ExStyle, +0x80020, A	
	}
	else
	{
		WinSet, Transparent, OFF, A
		WinSet, Transparent, 255, A
		Winset, AlwaysOnTop, off, A
		WinSet, ExStyle, -0x80020, A
	}

Return

!F::
	WinGet, curtrans, Transparent, A
	if (curtrans != 55)
	{
	    WinSet, Transparent, 55, A
	    WinSet, AlwaysOnTop, on, A
	    WinSet, ExStyle, +0x80020, A	
	}
	else
	{
		WinSet, Transparent, OFF, A
		WinSet, Transparent, 255, A
		Winset, AlwaysOnTop, off, A
		WinSet, ExStyle, -0x80020, A
	}

Return

F2::
	IfWinActive, ahk_exe vlc.exe
	{
		WinMinimize, ahk_exe vlc.exe
	}
	else
	{
		WinActivate, ahk_exe vlc.exe
	}
Return
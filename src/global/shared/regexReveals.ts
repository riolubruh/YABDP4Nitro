export default {
	PROFILE_EFFECTS: /fx\d+/,
	DISPLAY_NAME_STYLES: /S\{[^}]*?\}/,
	DECORATION: /\/a\d+/,
	NAMEPLATE: /n\{[^}]*?\}/,
	PROFILE_PICTURE: /P\{[^}]*?\}/,
	PROFILE_FRAME: /pf\d+/,
	PROFILE_COLORS: /\[#([a-fA-F0-9]+),#([a-fA-F0-9]+)\]/,
	// dont ask dude....
	TYPING_STYLES: /t\{([0-9a-f]{2})(?:,([^}]*))?}/i,
};

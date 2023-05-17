<div class="help">
	<h1>Please read carefully before use.</h1>
	<br />
	Welcome to our online game store! This is the help page, designed to guide you through the various
	features of our website. If you need to close this page, simply click on the “?” button located in
	the bottom right corner of your screen. Our homepage is divided into two main sections: the button
	and taskbar area, which includes the help button, menu button, taskbar, and clock display; and the
	desktop area, where you can interact with our website’s workspace. We hope you enjoy your shopping
	experience with us!
	<br />
	<br />
	<h2>Part 1: Menu</h2>
	<br />
	The menu icon, represented by two horizontal lines, is located in the top left corner of the screen.
	When clicked, the icon transforms into an “X” shape and reveals the menu options. To close the menu,
	simply click on the “X” icon or anywhere on the central desktop area. This will return you to your
	previous workspace.
	<br />
	<br />
	<h2>Part 2: Menu Elements</h2>
	<br />
	Our menu system is comprised of five dynamic components, designed to adjust according to the user’s
	hierarchical status (guest, user, or admin). For guest users, the menu options include Home, Product,
	Payment, Login, and Sign up. For registered users, the options are Home, Product, Payment, Log out,
	and User. For administrative users, the menu includes Home, Product, Statistics, Log out, and Admin.
	Let's explore by pressing and running
	<br />
	<br />
	<h2>Part 3: Windows</h2>
	<br />
	The windows are designed with titlebar and content section. titlebar includes a trio of buttons, a
	drag-and-drop section, and a title. The window can be stretched and moved flexibly. Also, there is
	an icon with the title of the page below the taskbar. You click it to temporarily minimize the window
	as well as restore the original size. The default size of the window is 640x520, so the minimum user
	screen is required to be HD or higher (ie 1280x720). Design for the phone screen will be made in the
	near future.
	<br />
	<br />
	<h2>Side note: Product</h2>
	<br />
	The product allows users to scroll vertically to quickly jump between pages, and horizontally to view
	content more slowly. Scrolling can be a bit jerky. When the product is first opened, a certain game
	is displayed on the first page. If the user scrolls down with their mouse or touchpad, the website
	will scroll to the left until the end, where they will see a list of games and two buttons that allow
	them to explore more games.
	<br /> However, if the user scrolls up from the original position, they will see a search section.
	The user can search for games in this section using the prefixes mentioned in the "Pro tips"
	section, such as: <br />
	<br />&nbsp;&nbsp;&nbsp;&nbsp;name: minecraft
	<br />&nbsp;&nbsp;&nbsp;&nbsp;genre: sandbox <br /> <br />
	<code>Full code: "name: [game name] | genre: [game genre]"</code><br /> <br />
	It is not necessary to enter both fields. The user can search by name or genre, and they do not need
	to enter the full name or genre. For example, the user can enter "name: mine" and still get results.
	<br /> The user can scroll endlessly.
	<br />
	<br />
	<h2>Side note 2: Admin (admin page)</h2>
	<br />
	To delete a member, an administrator must first enter the member's full name in the search bar. Upon
	clicking the "X" button, an administrator will see a strange animated GIF. If the administrator hovers
	their mouse over the GIF, they will see a message that reads, "Remove [username]" This is to ensure
	that administrators do not delete members arbitrarily and that they make a deliberate decision before
	taking this action.
	<br />We believe this is an effective method of preventing administrators from accidentally or
	thoughtlessly deleting members. It also helps to ensure that administrators are aware of the
	consequences of deleting a member.
</div>

<style lang="scss">
	.help {
		position: relative;
		width: 100%;
		height: 100%;
		color: #fafafa;
		padding: 32px;
		overflow: hidden;
		overflow-y: scroll;
		scrollbar-width: thin;
		scrollbar-color: #fafafa #1a1a1a;
		font-family: sans-serif;
		line-height: 1.3;
		&::-webkit-scrollbar {
			width: 8px;
			border: 1px solid #fafafa;
			border-radius: 100px;
		}
		&::-webkit-scrollbar-thumb {
			background: #fafafa;
			border: 1px solid #1a1a1a;
			border-radius: 100px;
		}
	}

	h1 {
		font-size: 24px;
		font-weight: 600;
	}
	h2 {
		font-size: 20px;
		font-weight: 600;
	}
	code {
		font-style: italic;
	}
</style>

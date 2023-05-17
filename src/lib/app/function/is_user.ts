import {
	login_logout,
	login_logout_link,
	signup_user,
	signup_user_link
} from '$lib/main_screen/navigation/change_text';

export function is_user() {
	fetch('http://localhost:3000/isuser', {
		method: 'GET',
		credentials: 'include'
	})
		.then((r) => {
			r.json().then((d) => {
				if (d.result) {
					switch (d.data) {
						case 'user':
							login_logout.set('Log out');
							login_logout_link.set('logout');
							signup_user.set('User');
							signup_user_link.set('user');
							break;
						case 'admin':
							login_logout.set('Log out');
							login_logout_link.set('logout');
							signup_user.set('Admin');
							signup_user_link.set('admin');
							break;
					}
				} else {
					// there is something wrong, for now
				}
			});
		})
		.catch((err) => {
			console.error(err);
		});
}

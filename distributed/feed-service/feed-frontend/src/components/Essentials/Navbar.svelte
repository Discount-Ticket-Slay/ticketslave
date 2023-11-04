<script>
	function redirectToCognito() {
		const cognitoURL =
			'https://ticketslave.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=4ash60bkicla7a4tdjdkob3pqu&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcognito-callback';
		window.location.href = cognitoURL;
	}
</script>

<nav class="bg-cottage-brown p-4 flex justify-between items-center">
	<div class="text-white text-xl font-serif">
		<button class="text-white" onclick="window.location.href = '/'">ticketSlave</button>
	</div>
	<ul class="flex space-x-4">
		<li>
			<button class="text-gray-600 hover:underline" onclick="window.location.href = '/'"
				>Home</button
			>
		</li>
		<li>
			<button class="text-gray-600 hover:underline" onclick="window.location.href = '/'"
				>About</button
			>
		</li>
		<li>
			<button class="text-gray-600 hover:underline" onclick="window.location.href = '/'">FAQ</button
			>
		</li>
		<li>
			<button class="text-gray-600 hover:underline" onclick="window.location.href = '/'"
				>Contact</button
			>
		</li>
	</ul>
	<button
		class="bg-cottage-dark-brown text-white px-4 py-2 rounded hover:shadow-xl hover:text-white"
		onclick={redirectToCognito}>Log In</button
	>
</nav>

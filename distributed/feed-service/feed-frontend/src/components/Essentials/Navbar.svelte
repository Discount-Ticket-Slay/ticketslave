<!--
	TODO: display icon in Navbar and Footer
-->

<script>
	
	const redirectToCognito = () => {
		if(typeof window !== "undefined") {
			const cognitoURL =
				'https://cs203cry.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=38vedjrqldlotkn6g9glq0sq9n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.ticketslave.org%2Ffeed%2Fauth%2Fcognito-callback';
			window.location.href = cognitoURL;
		
	}
	}
</script>

<nav class="bg-cottage-brown p-4 flex justify-between items-center">
	<!--logo-->
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

	<!--login button-->
	<button
		class="bg-cottage-dark-brown text-white px-4 py-2 rounded hover:shadow-xl hover:text-white"
		on:click={redirectToCognito}>Log In</button
	>
</nav>

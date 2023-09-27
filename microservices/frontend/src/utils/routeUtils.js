export async function changeRoute(currentRoute) {
    const token = getTokenFromCookie('jwtToken'); // Extract the JWT token from cookies
    if (!token) {
        // If the JWT is not present, redirect to Cognito login page
        window.location.href = 'https://ticketslave.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=4ash60bkicla7a4tdjdkob3pqu&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcognito-callback';
        return;
    }

    try {
        // Request to the backend to verify route permission
        const response = await fetch('/api/route-permission?route=' + currentRoute, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (response.status !== 200) {
            // Unauthorized or forbidden, redirect to Cognito login page
            window.location.href = 'https://ticketslave.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=4ash60bkicla7a4tdjdkob3pqu&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcognito-callback';
        }
        // Otherwise, the user is permitted and stays on the route

    } catch (error) {
        console.error('Error verifying route permission:', error);
        window.location.href = 'https://ticketslave.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=4ash60bkicla7a4tdjdkob3pqu&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcognito-callback';  // Fallback to login on any error
    }
}

function getTokenFromCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

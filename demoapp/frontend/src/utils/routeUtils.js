export async function changeRoute(currentRoute, state) {
    const token = getTokenFromCookie('jwtToken'); // Extract the JWT token from cookies

    console.log("Capturing URL at: ", new Date().toISOString());
    console.log("URL: ", window.location.href);


    if (!token) {
        redirectToCognito(state);
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
            redirectToCognito(state);
        }
        // Otherwise, the user is permitted and stays on the route

    } catch (error) {
        console.error('Error verifying route permission:', error);
        redirectToCognito(state); // Fallback to login on any error
    }
}

function getTokenFromCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}


function redirectToCognito(state) {
    let encodedState = encodeURIComponent(state);
    // let redirectUrl = 'https://ticketslave.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=4ash60bkicla7a4tdjdkob3pqu&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcognito-callback&state=' + encodedState; // Local
    // let redirect_uri = 'https://ticketslave.auth.ap-southeast-1.amazoncognito.com/login?client_id=4ash60bkicla7a4tdjdkob3pqu&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcognito-callback&state=' + encodedState; // Local
       let redirect_uri =  'https://ticketslave.auth.ap-southeast-1.amazoncognito.com/login?client_id=4ash60bkicla7a4tdjdkob3pqu&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fcognito-callback'
    //    let redirectUrl = 'https://ticketslave.auth.ap-southeast-1.amazoncognito.com/login?client_id=4ash60bkicla7a4tdjdkob3pqu&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=https%3A%2F%2Fwww.ticketslave.org%2Fauth%2Fcognito-callback&state=' + encodedState; // Production
    window.location.href = redirect_uri;
}

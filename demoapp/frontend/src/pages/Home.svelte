<script>
    import "carbon-components-svelte/css/white.css";
    const loginButtonStyle = "text-decoration: none;";
    function redirectToCognito() {
        const cognitoURL =
            "https://ticketslave.auth.ap-southeast-1.amazoncognito.com/login?client_id=4ash60bkicla7a4tdjdkob3pqu&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=https%3A%2F%2Fwww.ticketslave.org%2Fauth%2Fcognito-callback";
        window.location.href = cognitoURL;
    }
</script>

<div class="content">
    <p class="logo">ticketSlave</p> 
    <a href="#/feed" class="button" style="text-decoration: none;"
        >Browse Events</a
    >
    <div class="login-buttons">
        <button on:click={redirectToCognito} class="button login-button" style={loginButtonStyle}>Log In / Sign Up</button>
        <!-- <a href="/#/signup" class="button login-button" style={loginButtonStyle}
            >Sign up</a
        > -->
    </div>
</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=GFS+Didot&display=swap');

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center; 
        height: 100vh; 
        margin: 0; 
        padding: 0; 
        background-color: beige;
    }

    .logo {
        font-family: 'GFS Didot', serif;
        font-size: 6rem;

        animation: fadeIn ease 3s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .login-buttons {
        margin-top: 2vh;
    }

    .button {
        display: inline-block;
        padding: .75rem 1.25rem;
        border-radius: 10rem;
        color: #555;
        text-transform: uppercase;
        font-size: 1rem;
        letter-spacing: .15rem;
        transition: all .3s;
        position: relative;
        overflow: hidden;
        z-index: 1;
        cursor: pointer;
    }

    .button::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #D2B48C;
        border-radius: 10rem;
        z-index: -2;
    }

    .button::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: #b6916b;
        transition: all .3s;
        border-radius: 10rem;
        z-index: -1;
    }

    .button:hover {
        color: #fff;
    }

    .button:hover::before {
        width: 100%;
    }
</style>

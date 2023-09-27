<script>
    import from user '../user';
    let username = '';
    let password = '';
    let currentError - null;

    const login = () =>{
        fetch('localhost:8080/#/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username, password, password})
        })
        .then((res) => {
            if(res.status < 299) return res.json()
            if(res.status > 299) currentError = "fak"
        })
    }

</script>
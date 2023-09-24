export function changeRoute(route){
    window.location.href = route;
    // fetch(`http://localhost:8080/verify?route=${route}`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': "yes"
    //     }
    // })
    // .then(response => {
    //     if(response.ok){
    //         window.location.href = route;
    //     } else if (response.status === 403){
    //         window.location.href = "/#/login";
    //     }
    // })
    // .catch(error => {
    //     console.error(error);
    // });
}
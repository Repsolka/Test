/*onmessage = function(e){
    if ( e.data === "start" ) {
        console.log("Hello from worker")
        done()
    }
};*/

/*function done(){
    // Send back the results to the parent page
    postMessage("done");
}*/
/*const x = {
    title: '',
    image: '',
    fields: null
}*/
let done = (result) => {
    console.log(result)
    postMessage(result);
}
let done1 = (result) => {
    alert(result);
}
onmessage = (e) => {
    /*if ( e.data === "start" ) {
        console.log("Hello from worker")
        done()
    }*/
    console.log(e.data)
    let form = e.data.form
    console.log(form)
    fetch('https://cors-anywhere.herokuapp.com/' + e.data.url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        // signal: this.controller.signal,
        body: JSON.stringify({form})
    })
        .then(res => res.json())
        .then(result => {
                if(e.data.method === 'get') {
                    done({title: result.title, image: result.image, fields: result.fields})
                    /*x.title= result.title
                    x.image = result.image
                    x.fields = result.fields*/
                    //postMessage("done")
                    //e.data.setState(result.title, result.image, result.fields)
                } else if(e.data.method === 'post') {
                    done(result.result)
                    // this.props.dataIsFetching(false)
                }
                /* /!*return {
                     obj: {
                         title: result.title,
                         image: result.image,
                         fields: result.fields
                     }
                 };*!/!*/
            }
        )
        .catch(error => {
            console.log(error)
        })
}


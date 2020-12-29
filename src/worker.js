let done = (result) => {
    postMessage(result);
}

 onmessage = (e) => {

     let form = e.data.form

     fetch('https://cors-anywhere.herokuapp.com/' + e.data.url, {
         method: 'POST',
         credentials: 'same-origin',
         mode: 'cors',
         headers: {
             'Content-Type': 'application/json'
         },
         referrerPolicy: 'no-referrer',
         body: JSON.stringify({form})
     })
         .then(res => res.json())
         .then(result => {
                 if(e.data.method === 'get') {
                     done({title: result.title, image: result.image, fields: result.fields})
                 } else if(e.data.method === 'post') {
                     done(result.result)
                 }
             }
         )
         .catch(error => {
             console.log(error)
         })
 }


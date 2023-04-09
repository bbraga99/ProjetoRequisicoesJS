const readPosts = async () => {
    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Loading...'

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    if(json.lenght > 0) {
        postArea.innerHTML = '';

        for(let i in json) {
            let postHtml = `
            <div>
                <h1>${json[i].title}</h1>
                <h1>${json[i].body}</h1>
                <hr><hr>
            </div>
            `
            postArea.innerHTML += postHtml;
        }
    } else {
        postArea.innerHTML = 'No posts to display'
    }
}

const addNewPost = async (title,body) => {
     await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: 2
        })
     });

     document.querySelector('#titleField').value = ' ';
     document.querySelector('#bodyField').value = ' ';

     readPosts();
}

let insert = document.querySelector('#insertButton');

insert.addEventListener('click', () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if(title && body) {
        addNewPost(title,body);
    } else {
        alert('Please fill in all fields');
    }
})

readPosts();
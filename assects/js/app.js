let cl = console.log;

const postContainer = document.getElementById("postContainer")
const postForm = document.getElementById("postForm")
const titleControl = document.getElementById("title")
const contentControl = document.getElementById("content")

let baseUrl = `https://jsonplaceholder.typicode.com/posts`

const templating = (arr) =>{
    let result = ``;
    arr.forEach(ele =>{
        result += `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-header">
                                <h3>${ele.title}</h3>
                            </div>
                            <div class="card-body">
                                <P>${ele.body}</P>
                            </div>
                            <div class="card-footer text-right">
                                <button class="btn btn-primary">Edit</button>
                                <button class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
        
                `
    })

    postContainer.innerHTML = result;
}

const makeApiCall = (methodName, url, body) =>{
    let xhr = new XMLHttpRequest();

    xhr.open(methodName, url);

    xhr.onload = function(){
       if(xhr.status === 200 || xhr.status === 201){
        cl(xhr.status)
        // cl(xhr.response)

        let data = JSON.parse(xhr.response)

        if(methodName === "GET"){
            templating(data)
        }
       } 
       
    }

    xhr.send(body);
}

makeApiCall("GET", baseUrl);

generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};

const onPostSubmit = (eve) =>{
    eve.preventDefault()
    cl(`Post Sumbitted !!!`)

    let postObj = {
        title : titleControl.value,
        body : contentControl.value,
        userId : Math.floor(Math.random() * 10) + 1,
        id : generateUuid()
    }

    cl(postObj)

    cl(postObj.id)

    makeApiCall("POST", baseUrl, JSON.stringify(postObj))
}

postForm.addEventListener("submit", onPostSubmit)
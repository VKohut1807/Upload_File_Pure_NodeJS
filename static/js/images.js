function getImages() {
    let status = (response) => {
        if (response.status !== 200) {
            return Promise.reject(new Error(response.statusText));
        }
        return Promise.resolve(response);
    }
    let json = (response) => response.json();

    fetch(`/images`)
        .then(status)
        .then(json)
        .then(data => {
            console.log("data ", data);
            showDB(data)
        })
        .catch(() => {
            console.log("error!!!!!");
        })
}
getImages();

function showDB(data) {
    let images = document.querySelector(".images");
    let row = "";

    for (let i = 0; i < data.length; i++) {
        row +=
            `<tr>
                <td><b>${data[i].id}</b></td>
                <td>${data[i].image_name}</td>
                <td>${data[i].file_name}</td>
                <td>${data[i].user_name}</td>
            </tr>`;
    }
    images.innerHTML = row;
}

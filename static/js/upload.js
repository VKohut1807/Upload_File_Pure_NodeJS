function uploadFile(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let file = target.files[0];
    let filesLoaded = document.querySelector(".filesLoaded");

    fetch(`/uploads/${file.name}`, {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: file
    })
        .then(
            response => {
                event = null;
                showUploadedFile(file.name);
                return response;
            }
        ).then(
            success => console.log(`file-"${file.name}" was loaded successfully: "${success.statusText}"`)
        )
        .catch(error => {
            console.error(error)
        })
    filesLoaded.style.visibility = "visible";
}

function showUploadedFile(data) {
    document.querySelector(".iconImage").src = "images/" + data;
    document.querySelector("input[name='fileName']").value = data;
}

function submitForm(event) {
    event.preventDefault();
    let form = document.querySelector("form").elements;
    let filesLoaded = document.querySelector(".filesLoaded");
    let iconImage = document.querySelector(".iconImage");

    fetch("/save-form", {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: JSON.stringify({
            "upload": form.upload.value,
            "imageName": form.imageName.value,
            "fileName": form.fileName.value,
            "userName": form.userName.value,
        })
    })
        .then(res => res)
        .then(res => console.log(`file was send successfully to DB: "${res.statusText}"`))
        .catch(error => {
            console.error(error)
        })
    filesLoaded.style.visibility = "hidden";
    iconImage.src = "./images/logo.png";
    form.upload.value = "";
    form.imageName.value = "";
    form.fileName.value = "";
    form.userName.value = "";
}

document.querySelector(".inputUpload").addEventListener("change", uploadFile);
document.querySelector("form").addEventListener("submit", submitForm);
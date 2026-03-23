import React, {useState} from "react";

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState();

    const handleFile = (e) => {
        console.log(e, 'event');
        setSelectedFile(e.target.files[0]);
    }

    const handleUpload = () => {
        if(!selectedFile) {
            alert('Please select a file to upload');
            return;
        }
        const forms = new FormData();
        forms.append('file', selectedFile);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: forms
        }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
    }
    return (
        <>
        <h4>File Upload</h4>
        <input type='file' onChange={(e) => handleFile(e)} />
        <button onClick={() => handleUpload()}>Upload</button>
        </>
    )
}

export default FileUpload
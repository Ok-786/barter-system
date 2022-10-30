import { Button } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import './ImageUpload.css';

const ImageUpload = (props) => {
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState([]);
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(() => {
        const arr = [];
        console.log('file')
        console.log(file)
        if (!file) {
            return;
        }
        file.forEach((f, index) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (fileReader.readyState == 2)
                    props.setFileReader((prev) => [...prev, fileReader.result]);
            };
            fileReader.readAsDataURL(f);
        })
    }, [file]);

    console.log('fileReader')
    console.log(previewUrl)

    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files) {
            pickedFile = Array.from(event.target.files);
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }

        console.log(pickedFile);
        props.onInput(pickedFile, props.id, fileIsValid);
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div >
            <input
                id={props.id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                multiple
                // accept=".jpg,.png,.jpg"
                onChange={pickedHandler}
            />

            {!props.rounded &&
                <div className={`image-upload ${props.center && 'center'}`}>
                    <Button color='primary' onClick={pickImageHandler}><b>PICK IMAGE</b></Button>
                </div>}

            {
                props.rounded &&
                <div>
                    <div style={{ marginTop: '-3vh' }}>
                        <br />
                        <span> <Button color='secondary' style={{ borderRadius: '20px' }} variant='outlined' onClick={pickImageHandler} ><b>PICK IMAGE</b></Button></span>
                    </div>
                </div>
            }

        </div>
    );
}

export default ImageUpload;

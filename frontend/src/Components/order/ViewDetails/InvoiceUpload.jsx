
import React, { useEffect, useState } from 'react';

const InvoiceUpload = () => {
  const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
  // handle the change
    const handleImage = (e) => {
        const file = e.target.files[0];
        const img = URL.createObjectURL(file);
        setPhotoPreview(img);
        setPhoto(file);
    };
  // handle the cloud upload
    const imageUpload = async () => {
        const formData = new FormData();
        formData.append('file', photo);
        formData.append('upload_preset', 'vgvxg0kj');
        let res = await fetch('https://api.cloudinary.com/v1_1/djo5zsnlq/image/upload', {
            method: 'post',
            body: formData
        })
        const myImage = await res.json();
        return myImage.url;

    }
  return (
    <form className="row p-24">
        <div className="col-12 mb-3">
            <div>
                <label htmlFor="invoice" className="mb-3 fs-5 fw-bold">Invoice Upload:</label>
            </div>
            <input onChange={handleImage} type="file" className="bank-input" />
            <div className="image w-25 mb-3">
              <img width="100%" name="image" src={photoPreview ? photoPreview : ''} alt="" />
          </div>
        </div>
        <div className="col-12 mb-3">
            <button className="btn btn-dark">Upload</button>
        </div>
    </form>
  )
}

export default InvoiceUpload

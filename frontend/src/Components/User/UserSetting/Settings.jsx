import React, { useState } from 'react'

const Settings = () => {
    const[data,setData] = useState({
        username:"John Doe",
        email:"JohnDoe@gmail.com",
        address:"Xyz New York City",
        phoneNo:"134567952",
        country:"USA",
        language:"English",
        image:"http://localhost:3000/static/media/avatar.ead651e178d810a8d0f1.png"
    })
    const handleChange = (e) => {
        const val = e.target.value
        const name = e.target.name
        setData((pre) =>({
            ...pre,
            [name]:val
        }))
    }
    const handlerSubmit = (e) => {
        e.preventDefault()
        console.log(data)
    }
    const openFilePicker = () => {
        document.getElementById('file').click();
      }
    
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setData((pre) => ({
            ...pre,
            image: URL.createObjectURL(file)
        }))
    }

  return (
    <div className='layout-content'>
        <div>
            <div className='row'>
                <div className='col-12'>
                    <div className='card p-24'>
                        <form className='row' onSubmit={handlerSubmit}>
                            <div className='col-12 my-2'>
                                <h6 className='color-78' style={{fontSize:'1.125rem'}}>Profile Details</h6>
                            </div>
                            <div className='col-12 my-1'>
                                <div className='profile-img'>
                                    <img src={data.image} />
                                </div>
                                <form className='d-flex flex-column justify-center gap-4 my-3'>
                                    <div className='d-flex flex-wrap gap-2'>
                                        <button type='button' className='upload-btn' onClick={openFilePicker}>
                                            Upload new photo
                                        </button>
                                        <input type="file" id='file' name='image' accept='.jpeg,.png,.jpg' hidden onChange={handleFileUpload}/>
                                    </div>
                                </form>
                            </div>
                            <hr />
                            <div className='col-12 my-2'>
                                <div className='row'>
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <div className='mb-2'>
                                            <label htmlFor="username" style={{fontSize:".8125rem",fontWeight:"400"}}>User Name</label>
                                        </div>
                                        <input type="text" id='username' name='username' value={data.username} onChange={handleChange} className='input-details' />
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <div className='mb-2'>
                                            <label htmlFor="email" style={{fontSize:".8125rem",fontWeight:"400"}}>Email</label>
                                        </div>
                                        <input type="email" id='email' name='email' value={data.email} onChange={handleChange} className='input-details' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-2'>
                                <div className='row'>
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <div className='mb-2'>
                                            <label htmlFor="address" style={{fontSize:".8125rem",fontWeight:"400"}}>Address</label>
                                        </div>
                                        <input type="text" id='address' name='address' value={data.address} onChange={handleChange} className='input-details' />
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <div className='mb-2'>
                                            <label htmlFor="phoneNo" style={{fontSize:".8125rem",fontWeight:"400"}}>Phone Number</label>
                                        </div>
                                        <input type="number" id='phoneNo' name='phoneNo' value={data.phoneNo} onChange={handleChange} className='input-details' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-2'>
                                <div className='row'>
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <div className='mb-2'>
                                            <label htmlFor="country" style={{fontSize:".8125rem",fontWeight:"400"}}>Country</label>
                                        </div>
                                        <input type="text" id='country' name='country' value={data.country} onChange={handleChange} className='input-details' />
                                    </div>
                                    <div className='col-12 col-md-6 col-lg-6'>
                                        <div className='mb-2'>
                                            <label htmlFor="language" style={{fontSize:".8125rem",fontWeight:"400"}}>Language</label>
                                        </div>
                                        <input type="text" id='language' name='language' value={data.language} onChange={handleChange} className='input-details' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-2'>
                                <button type='submit' className='upload-btn'>
                                    Save Change
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings

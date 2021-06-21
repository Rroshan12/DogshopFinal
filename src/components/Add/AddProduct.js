
import React, { useState } from 'react'
import { storage, firestore } from '../../firebase/config'
import './add.style.scss'
import {useHistory} from 'react-router-dom'

function AddProduct() {
    const history = useHistory();

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }


    const addProduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    firestore.collection('Products').add({
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductImg: url
                    }).then(() => {
                        setProductName('');
                        setProductPrice(0)
                        setProductImg('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
    }
    return (
        <div className='container'>
        <br />
        <h2>ADD PRODUCTS</h2>
        <hr />
        <form autoComplete="off" className='form-group' onSubmit={addProduct}>
            <label htmlFor="product-name">Product Name</label>
            <input type="text" className='form-control' required
                onChange={(e) => setProductName(e.target.value)} value={productName} />
            <br />
            <label htmlFor="product-price">Product Price</label>
            <input type="number" className='form-control' required
                onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
            <br />
            <label htmlFor="product-img">Product Image</label>
            <input type="file" className='form-control' id="file" required
                onChange={productImgHandler} />
            <br />
            <button className="addproduct-btn" type="submit" >ADD</button>
            <button className="addproduct-btn" onClick={()=>history.push("/orders")}>Orders</button>
        </form>
        {error && <span className='error-msg'>{error}</span>}
    </div>
    )
}

export default AddProduct

import { useContext, useState } from 'react';
import './newProduct.scss';
import { MovieContext } from '../../../contextApi/movieContext/MovieContext';
import storage from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { createMovie } from '../../../contextApi/movieContext/apiCalls';

import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { dispatch } = useContext(MovieContext);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [showBox, setShowBox] = useState(false);
  const navigate = useNavigate();
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant='determinate' {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant='body2' color='text.secondary'>{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const itemRef = ref(storage, 'items/' + fileName);
      const uploadTask = uploadBytesResumable(itemRef, item.file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = parseInt(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressPercentage(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  const handleUpload = (e) => {
    setShowBox(true);
    e.preventDefault();
    upload([
      { file: img, label: 'img' },
      { file: imgTitle, label: 'imgTitle' },
      { file: imgSm, label: 'imgSm' },
      { file: trailer, label: 'trailer' },
      { file: video, label: 'video' },
    ]);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };
  console.log(movie);
  const handleCreate = () => {
    createMovie(movie, dispatch);
    navigate('/dashboard/movies');
  };
  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Movie</h1>
      <form className='addProductForm'>
        <div className='addProductItem'>
          <label>Image</label>
          <input
            type='file'
            id='img'
            name='img'
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className='addProductItem'>
          <label>Title image</label>
          <input
            type='file'
            id='imgTitle'
            name='imgTitle'
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className='addProductItem'>
          <label>Thumbnail image</label>
          <input
            type='file'
            id='imgSm'
            name='imgSm'
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className='addProductItem'>
          <label>Title</label>
          <input
            type='text'
            placeholder='John Wick'
            name='title'
            onChange={handleChange}
          />
        </div>
        <div className='addProductItem'>
          <label>Description</label>
          <input
            type='text'
            placeholder='description'
            name='desc'
            onChange={handleChange}
          />
        </div>
        <div className='addProductItem'>
          <label>Year</label>
          <input
            type='text'
            placeholder='Year'
            name='year'
            onChange={handleChange}
          />
        </div>
        <div className='addProductItem'>
          <label>Genre</label>
          <input
            type='text'
            placeholder='Genre'
            name='genre'
            onChange={handleChange}
          />
        </div>
        <div className='addProductItem'>
          <label>Duration</label>
          <input
            type='text'
            placeholder='Duration'
            name='limit'
            onChange={handleChange}
          />
        </div>

        <div className='addProductItem'>
          <label>Is Series?</label>
          <select name='isSeries' id='isSeries' onChange={handleChange}>
            <option value='false'>No</option>
            <option value='true'>Yes</option>
          </select>
        </div>
        <div className='addProductItem'>
          <label>Trailer</label>
          <input
            type='file'
            name='trailer'
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className='addProductItem'>
          <label>Video</label>
          <input
            type='file'
            name='video'
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded === 5 ? (
          <button className='addProductButton' onClick={handleCreate}>
            Create
          </button>
        ) : (
          <button className='addProductButton' onClick={handleUpload}>
            Upload
          </button>
        )}
        {showBox && (
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progressPercentage} />
          </Box>
        )}
      </form>
    </div>
  );
}

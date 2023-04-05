import { useContext, useEffect, useState, useRef } from "react";
import "./newProduct.scss";
import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import { S3 } from "aws-sdk";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import axios from "axios";
import { server_url } from "src/constants/variables";
export default function AddNewProduct() {
  const [product, setProduct] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const [productImgs, setProductImgs] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [sample, setSample] = useState(null);
  const [hotAlbumPoster, setHotAlbumPoster] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [showBox, setShowBox] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleVariants, setVisibleVariants] = useState(false);
  const [isVariantFieldsSaved, setIsVariantFieldsSaved] = useState(false);
  const [selectDisabled, setSelectDisabled] = useState(false);
  const [productDescFields, setProductDescFields] = useState([
    {
      field: "",
      value: "",
    },
  ]);
  const [productVariants, setProductVariants] = useState([{}]);
  const [productVariantFields, setProductVariantFields] = useState([
    "stock",
    "",
  ]);

  const [coverImageFile, setCoverImageFile] = useState("");
  const [productImageFile, setProductImageFile] = useState("");

  const [coverImgUploaded, setCoverImageUploaded] = useState("");
  const [productImgUploaded, setProductImageUploaded] = useState([]);

  const navigate = useNavigate();

  const fetchAxios = async () => {
    const axiosInstanceCopy = await createAxios();
    setAxiosInstance(axiosInstanceCopy);
  };
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  const getPresignedUrl = async () => {
    const response = await axios.get(server_url + "presigned_url");
    return response.data;
  };
  
  const handleUpload = async (e) => {
    e.preventDefault();

    // uploading image

    console.log(coverImageFile);
    console.log(productImageFile);

    try {
      const formData = new FormData();
      formData.append("file", coverImageFile);

      const config = {
        headers: {
           "Content-Type": coverImageFile.type 
          },
      }

      const presignedUrl = await getPresignedUrl();

      await axios.put(presignedUrl.url, formData,config);

      console.log("cover image uploaded successfully");
      console.log(presignedUrl.downloadAbleUrl);

      setCoverImageUploaded(presignedUrl.downloadAbleUrl);
      
      newProduct["coverImage"] = presignedUrl.downloadAbleUrl;
    } catch (error) {
      console.error(error);
    }

    let imageList = [];
    const promises = productImageFile.map(async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const presignedUrl = await getPresignedUrl();
        console.log(presignedUrl.url);
        await axios.put(presignedUrl.url, formData, {
          headers: { "Content-Type": file.type },
        });
        console.log(`File ${file.name} uploaded successfully`);
        setProductImageUploaded((oldObj) => [
          ...oldObj,
          presignedUrl.downloadAbleUrl,
        ]);
        imageList = [...imageList, presignedUrl.downloadAbleUrl];
      } catch (error) {
        console.error(error);
      }
    });
    await Promise.all(promises);
    console.log("All files uploaded successfully");

    console.log(imageList);

    newProduct["coverImage"];
    newProduct["images"] = imageList;
    console.log(discount);
    let newProduct = {};
    console.log(product);
    newProduct["title"] = product.title;
    newProduct["price"] = product.price;
    newProduct["description"] = product.description;
    if (product.productType === "release") {
      newProduct["productType"] = "release";
      newProduct["sample"] = sample;
      newProduct["hotAlbumPoster"] = hotAlbumPoster;
      newProduct["compiledBy"] = product.compiledBy;
    }
    if (product.productType === "goods") {
      console.log(productDescFields);
      newProduct["discount"] = discount;
      newProduct["variant"] = productVariants;
      newProduct["tags"] = product.tags;
      newProduct["productDetails"] = productDescFields;
    }
    console.log(newProduct);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const handleDiscount = (e) => {
    const value = e.target.value;
    console.log(value);
    setDiscount({ ...discount, [e.target.name]: value });
  };
  const handleProductDescriptionInput = (event, index) => {
    const { name, value } = event.target;
    console.log(productDescFields);
    let data = [...productDescFields];
    data[index][name] = value;
    setProductDescFields(data);
  };
  const handleCreate = () => {
    navigate("/dashboard/movies");
  };
  const removeFields = (index) => {
    let data = [...productDescFields];
    data.splice(index, 1);
    setProductDescFields(data);
  };

  const addFields = () => {
    let newfield = { field: "", value: "" };
    setProductDescFields([...productDescFields, newfield]);
  };

  const removeVariantField = () => {
    let data = [...productVariantFields];
    data.splice(data.length - 1, 1);
    setProductVariantFields(data);
  };
  const handleVariantFieldInput = (event, index) => {
    let data = [...productVariantFields];
    data[index] = event.target.value;
    console.log(data);
    setProductVariantFields(data);
  };
  const addVariantField = () => {
    setProductVariantFields([...productVariantFields, ""]);
  };
  const saveVariantFields = () => {
    setIsVariantFieldsSaved(true);
  };

  const handleVariantFieldValue = (event, iindex, jindex) => {
    const { value } = event.target;
    let data = [...productVariants];
    console.log(productVariantFields[jindex]);
    data[iindex][productVariantFields[jindex]] = value;
    console.log(data);
    setProductVariants(data);
  };

  const addVariantColumn = () => {
    setProductVariants([...productVariants, {}]);
  };

  const removeVariant = (index) => {
    let data = [...productVariants];
    data.splice(index, 1);
    setProductVariants(data);
  };

  // upload image

  const selectFiles = (e) => {
    e.target.name == "coverImage"
      ? setCoverImageFile(e.target.files[0])
      : setProductImageFile([...e.target.files]);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>ProductType?</label>
          <select
            disabled={selectDisabled}
            name="productType"
            id="productType"
            onChange={(e) => {
              handleChange(e), setSelectDisabled(true);
            }}
          >
            <option value="none" selected disabled hidden>
              Select an Option
            </option>
            <option value="goods">goods</option>
            <option value="release">release</option>
          </select>
        </div>
        {Boolean(selectDisabled) && (
          <>
            <div className="addProductItem">
              <label>CoverImage</label>
              <input
                type="file"
                accept="image/*"
                name="coverImage"
                onChange={selectFiles}
              />
            </div>
            <div className="addProductItem">
              <label>Product Images</label>
              <input
                type="file"
                multiple
                name="productImages"
                accept="image/*"
                onChange={selectFiles}
              />
            </div>
            <div className="addProductItem">
              <label>Title</label>
              <input
                type="text"
                placeholder="John Wick"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input
                type="text"
                placeholder="description"
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Price</label>
              <input
                type="text"
                placeholder="Price"
                name="price"
                onChange={handleChange}
              />
            </div>

            {Boolean(product?.productType === "release") && (
              <>
                <div className="addProductItem">
                  <label>Sample</label>
                  <input
                    type="file"
                    name="sample"
                    onChange={(e) => setSample(e.target.files[0])}
                  />
                </div>
                <div className="addProductItem">
                  <label>Hot Album Poster</label>
                  <input
                    type="file"
                    name="hotAlbumPoster"
                    onChange={(e) => setHotAlbumPoster(e.target.files[0])}
                  />
                </div>
                <div className="addProductItem">
                  <label>Compiled by?</label>
                  <input
                    type="text"
                    placeholder="CompiledBy"
                    name="compiledBy"
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {Boolean(product?.productType != "release") && (
              <>
                <div className="addProductItem">
                  <label>Tags</label>
                  <input
                    type="text"
                    placeholder="Tags"
                    name="tags"
                    onChange={handleChange}
                  />
                </div>
                <div className="addProductItem">
                  <label>Discount percentage</label>
                  <input
                    type="text"
                    placeholder="discount"
                    name="value"
                    onChange={handleDiscount}
                  />
                </div>
                <div className="addProductItem">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Start Date of Discount"
                      name="startDate"
                      value={discount?.startDate}
                      onChange={(newValue) => {
                        setDiscount({ ...discount, ["startDate"]: newValue });
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="addProductItem">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="End Date of Discount"
                        name="endDate"
                        value={discount?.endDate}
                        onChange={(newValue) => {
                          setDiscount({ ...discount, ["endDate"]: newValue });
                        }}
                      />
                    </LocalizationProvider>
                  </LocalizationProvider>
                </div>
                <div className="addProductItem">
                  <CButton
                    className="addProductButton"
                    style={{
                      backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0.4rem",
                    }}
                    onClick={() => setVisible(!visible)}
                  >
                    Add Product details
                  </CButton>
                  <CModal
                    size="xl"
                    scrollable
                    visible={visible}
                    onClose={() => setVisible(false)}
                  >
                    <CModalHeader>
                      <CModalTitle>Add product description...</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      Add field Name and their respective values.
                    </CModalBody>
                    <CModalBody>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {productDescFields?.map((entity, index) => (
                          <div style={{ display: "flex" }} key={index}>
                            <input
                              type="text"
                              placeholder="field"
                              name="field"
                              value={entity.field}
                              onChange={(e) =>
                                handleProductDescriptionInput(e, index)
                              }
                            />
                            <input
                              type="text"
                              placeholder="value"
                              name="value"
                              value={entity.value}
                              onChange={(e) =>
                                handleProductDescriptionInput(e, index)
                              }
                            />
                            <CButton
                              style={{
                                width: "80px",
                                fontSize: "14px",
                                padding: "0.2rem",
                                background: "red",
                                margin: "0.2rem",
                                border: "none",
                              }}
                              onClick={() => removeFields(index)}
                            >
                              Remove
                            </CButton>
                          </div>
                        ))}
                      </div>

                      <CButton
                        style={{
                          width: "80px",
                          fontSize: "14px",
                          padding: "0.2rem",
                          background: "green",
                        }}
                        onClick={addFields}
                      >
                        Add More...
                      </CButton>
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        color="secondary"
                        onClick={() => setVisible(false)}
                      >
                        Close
                      </CButton>
                      <CButton color="primary">Save changes</CButton>
                    </CModalFooter>
                  </CModal>
                </div>
                <div className="addProductItem">
                  <CButton
                    className="addProductButton"
                    style={{
                      backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0.4rem",
                    }}
                    onClick={() => setVisibleVariants(!visibleVariants)}
                  >
                    Add Product variants
                  </CButton>
                  <CModal
                    size="xl"
                    scrollable
                    visible={visibleVariants}
                    onClose={() => setVisibleVariants(false)}
                  >
                    <CModalHeader>
                      <CModalTitle>Add product variants...</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      Add field Name and their respective values.
                    </CModalBody>
                    <CModalBody>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <React.Fragment>
                          <div style={{ display: "flex" }}>
                            {!Boolean(isVariantFieldsSaved) && (
                              <div
                                style={{
                                  minWidth: "200px",
                                  textAlign: "center",
                                }}
                              >
                                <h4>stock</h4>
                              </div>
                            )}

                            {Boolean(isVariantFieldsSaved)
                              ? productVariantFields?.map(
                                  (variantField, jindex) => (
                                    <div
                                      style={{
                                        minWidth: "200px",
                                        textAlign: "center",
                                      }}
                                      key={jindex}
                                    >
                                      <h4>{variantField}</h4>
                                    </div>
                                  )
                                )
                              : productVariantFields?.map(
                                  (variantField, jindex) =>
                                    jindex > 0 ? (
                                      <input
                                        type="text"
                                        key={jindex}
                                        placeholder="field"
                                        name="field"
                                        value={variantField}
                                        onChange={(e) =>
                                          handleVariantFieldInput(e, jindex)
                                        }
                                      />
                                    ) : (
                                      ""
                                    )
                                )}
                            {!Boolean(isVariantFieldsSaved) && (
                              <>
                                <CButton
                                  style={{
                                    width: "80px",
                                    fontSize: "14px",
                                    padding: "0.2rem",
                                    background: "red",
                                    margin: "0.2rem",
                                    border: "none",
                                  }}
                                  onClick={addVariantField}
                                >
                                  Add column
                                </CButton>
                                <CButton
                                  style={{
                                    width: "80px",
                                    fontSize: "14px",
                                    padding: "0.2rem",
                                    background: "red",
                                    margin: "0.2rem",
                                    border: "none",
                                  }}
                                  onClick={removeVariantField}
                                >
                                  Remove column
                                </CButton>
                                <CButton
                                  style={{
                                    width: "80px",
                                    fontSize: "14px",
                                    padding: "0.2rem",
                                    background: "green",
                                    margin: "0.2rem",
                                    border: "none",
                                  }}
                                  onClick={saveVariantFields}
                                >
                                  Save fields
                                </CButton>
                              </>
                            )}
                          </div>
                        </React.Fragment>
                      </div>
                      {Boolean(isVariantFieldsSaved) && (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {productVariants?.map((variant, index) => (
                            <>
                              <div style={{ display: "flex" }}>
                                {productVariantFields?.map(
                                  (variantValue, jindex) => (
                                    <input
                                      type="text"
                                      key={jindex}
                                      placeholder={variantValue}
                                      name="field"
                                      value={variant[variantValue]}
                                      onChange={(e) =>
                                        handleVariantFieldValue(
                                          e,
                                          index,
                                          jindex
                                        )
                                      }
                                    />
                                  )
                                )}
                                <CButton
                                  style={{
                                    width: "80px",
                                    fontSize: "14px",
                                    padding: "0.2rem",
                                    background: "red",
                                    margin: "0.2rem",
                                    border: "none",
                                  }}
                                  onClick={() => removeVariant(index)}
                                >
                                  Remove
                                </CButton>
                              </div>
                            </>
                          ))}

                          <CButton
                            style={{
                              width: "80px",
                              fontSize: "14px",
                              padding: "0.2rem",
                              background: "green",
                            }}
                            onClick={addVariantColumn}
                          >
                            Add More...
                          </CButton>
                        </div>
                      )}
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        color="secondary"
                        onClick={() => setVisibleVariants(false)}
                      >
                        Close
                      </CButton>
                      <CButton color="primary">Save changes</CButton>
                    </CModalFooter>
                  </CModal>
                </div>
                <>
                  {coverImgUploaded != "" && (
                    <div className="addProductItem">
                      <h3>Preview (cover Image)</h3>
                      <img src={coverImgUploaded} alt=""  />
                    </div>
                  )}
                </>
                <>
                  {productImgUploaded != undefined &&
                    productImgUploaded != null &&
                    productImgUploaded.length > 0 && (
                      <>
                        <h3>Preview (product Image)</h3>p
                        {roductImgUploaded.map((el) => (
                          <div className="addProductItem">
                            <img src={el} alt="" />
                          </div>
                        ))}
                      </>
                    )}
                </>
              </>
            )}

            {uploaded === 5 ? (
              <button
                className="addProductButton"
                type="submit"
                onClick={handleCreate}
              >
                Create
              </button>
            ) : (
              <button
                className="addProductButton"
                type="submit"
                onClick={handleUpload}
              >
                Upload
              </button>
            )}
            {showBox && (
              <Box sx={{ width: "100%" }}>
                <LinearProgressWithLabel value={progressPercentage} />
              </Box>
            )}
          </>
        )}
      </form>
    </div>
  );
}


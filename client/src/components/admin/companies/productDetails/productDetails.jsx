import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./productDetails.scss";
import { unlinkProduct } from "../../../../repository/companiesRepository";

const ProductDetailsCard = (props) => {
    const [tableData,setTableData] = useState(props.data);
    const navigate = useNavigate();
    const handleUnlink = (e,product_id) => {
      e.target.innerText = 'Unlinking'
      e.target.disabled = true
      unlinkProduct(props.comp_id,product_id).then((result) => {
        setTableData(state => (state.filter(i => i.product_id != product_id)))
      }).catch((err) => {
        navigate('/admin')
      })
    }
    useEffect(() => {
        new DataTable("#example");
    },[])
  return (
    <>
      <div className="kssia_productDetailsCardWrapper">
        <div className="kssia_productDetailsCardContainer">
          <div className="kssia_productDetailsCardHeader">
            <button className="kssia_adminViewButton_v2" onClick={() => {navigate(`/admin/unlinkedProducts/${props.comp_id}/${props.comp_name}`)}}>Link Products</button>
          </div>
          <div className="kssia_productDetailsCardContent">
            <table
              id="example"
              className="table table-striped"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((obj) => {
                  return (
                    <tr scope="row" key={obj.product_id}>
                      <td>{obj.product_id}</td>
                      <td>{obj.product_name}</td>
                      <td>
                        <img src={obj.product_image} alt={obj.product_name} />
                      </td>
                      <td>
                        <button onClick = {(e) => {handleUnlink(e,obj.product_id)}}type="button" className="kssia_adminDeleteButton">
                          Unlink
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsCard;

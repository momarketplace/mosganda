
import React from 'react'
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import PreviewIcon from '@mui/icons-material/Preview';

function Store(props) {
    const { store } = props
    return (
        <div key = { store._id } className="card product">
            <Link to={`/store/${store._id}`}>
                        <h5 style={{ textAlign: "center" }}>{ store.name }</h5>
                    </Link>
                <Link to ={`/store/${store._id}`}>
                     {/* image size should be 680px by 830px */}
                <img className="medium" src = {store.image} alt ={store.name} />

                </Link>
            <div className="card-body">
                <div style={{padding:"5px"}}>
                    <p>{ `${store.description.substring(0,50)}...`}</p>
                </div>
                <div className='card-body-span card-body-span-store'>
                    <span>
                        <Link to ={`/store/${store._id}`}>
                            <Button variant="contained" color="success" size="small">
                                <PreviewIcon />
                        View store
                        </Button>
                    </Link>
                    </span>
                    <span>{store.city}</span>
                    
                </div>
             
            </div>
        </div>

    )
}

export default Store
import { useState } from "react"
import { Button, Modal, Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"

const Room = ({
  _id,
  name,
  phoneNumber,
  type,
  maxCount,
  description,
  imageUrls,
  fromDate,
  toDate,
  alreadyBooked,
}) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className='row bs'>
      <div className='col-md-4'>
        <img src={imageUrls[0]} className='smallImg' />
      </div>
      <div className='col-md-7' style={{ marginLeft: "10px" }}>
        <h1>{name}</h1>
        <p>Max Count: {maxCount}</p>
        <p>Phone Number: {phoneNumber}</p>
        <p>Type: {type}</p>

        <div style={{ float: "right" }}>
          <Link style={{cursor: alreadyBooked ? "none" : ""}}  to={`/book/${_id}/${fromDate}/${toDate}`}>
            <button
              disabled={(fromDate && toDate ? false : true) || (alreadyBooked ? true : false)}
              className={`btn m-2 ${
                alreadyBooked ? "btn-danger" : "btn-primary"
              }`}
            >
              {alreadyBooked ? "Not Available" : "Book Now"}
            </button>
          </Link>
          <button onClick={handleShow} className='btn btn-primary'>
            View Details
          </button>
        </div>
      </div>
      {/*  */}
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel='' nextLabel=''>
            {imageUrls.map((url, index) => {
              return (
                <Carousel.Item key={index}>
                  <img className='d-block w-100 bigImg' src={url} />
                </Carousel.Item>
              )
            })}
          </Carousel>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  */}
    </div>
  )
}

export default Room

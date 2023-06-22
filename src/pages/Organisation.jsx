import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Input } from 'reactstrap';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import OrganisationService from '../services/organisation.service';

const Organisation = () => {
  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const toggle = () => setModal(!modal);
  const [organisations, setOrganisations] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [id, setOrganisationsId] = useState(null); // Store the ID of the organisations being updated
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    OrganisationService.getAll()
      .then((res) => {
        console.log("Response data:", res.data);
        setOrganisations(res.data);
         })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
      });
  }, [reload]);
  
  // Dropdown state
  const [showDropdown, setShowDropdown] = useState([]);

  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const organisationsData = {
      name: name,
      website: website
    };
    
    // Create new organisations
    OrganisationService.add(organisationsData)
      .then(response => {
        console.log('organisation added successfully:', response.data);
        setReload(true);
        toggle(); // Close the modal
      })
      .catch(error => {
        console.error('Error adding organisation:', error);
      });
  };
   // Update server
   const handleUpdate = (id, updatedData) => {
    OrganisationService.update(id, updatedData)
      .then(response => {
        console.log('organisations updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating organisations:', error);
      });
  };

  // Delete server
  const handleRemove = (organisations) => {
   OrganisationService.deleteOne(organisations.id)
      .then(response => {
        console.log('organisation deleted successfully:', response.data);
        setReload(true);
      })
      .catch(error => {
        console.error('Error deleting server:', error);
      });
  };


  return (
    <div>
      <div className="container-project mt-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="title-project">Organisations</h1>
            <button className="btn-add-project" onClick={toggle}>
              <i>
                <Icon icon="material-symbols:add-box" />
              </i>
              Add new Organisation
            </button>
            <div className="search-container">
              <Input
                type="text"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="project-list">
            {organisations.length > 0 && (
  organisations.map((organisation) => {
    return (
      <div className="project-card" key={organisation.id}>
        <h5 className="card-title row">
          {organisation.name}
          <i className="icon-card">
            <Icon icon="uiw:setting" />
          </i>
        </h5>
        <p>{organisation.website}</p>
      </div>
    );
  })
)}

            </div>
          </div>
        </div>
      </div>
      <Modal
        className="model mt-0"
        isOpen={modal}
        toggle={toggle}
        unmountOnClose={unmountOnClose}
      >
        <ModalBody className="model-body mt-0">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-2">
              <label htmlFor="ControlInput" className="form-label">
                Organization Name
              </label>
              <Input
                className="form-control-model"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">
               Website
          
                </label>
                <Input
                  className="form-control-model"
                  type="text"
                  id="website"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            
            <div className="form-btn">
              <button className="cancel-button" onClick={toggle}>
                Cancel
              </button>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Organisation;

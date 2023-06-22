import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Input } from 'reactstrap';
import { Icon } from '@iconify/react';
import ApplicationService from '../services/application.service';
import { useNavigate, useParams  } from 'react-router-dom';

const Application = () => {
  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const toggle = () => setModal(!modal);
  const [applications, setApplication] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [project, setProject] = useState("");
  const [id, setApplicationId] = useState(null); // Store the ID of the project being updated
  const [reloadApplications, setReloadApplications] = useState(false);

  const navigate = useNavigate();
    // Dropdown state
    const [showDropdown, setShowDropdown] = useState(Array(applications.length).fill(false));
    const [selectedApplication, setSelectedApplication] = useState(null);
  

    const { Project_id } = useParams();

  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };
  useEffect(() => {
    ApplicationService.getAll()
      .then((res) => {
        console.log("Response data:", res.data);
        setApplication(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
      });
  }, [reloadApplications]);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const ApplicationData = {
      name: name,
      description: description,
      source: source,
      project:project
    };
      // Create new project
      ApplicationService.add(ApplicationData)
        .then(response => {
          console.log('Project added successfully:', response.data);
          setReloadApplications(true);
          toggle(); // Close the modal
        })
        .catch(error => {
          console.error('Error adding project:', error);
        });
    
  };
   // Update server
   const handleUpdate = (id, updatedData) => {
    ApplicationService.update(id, updatedData)
      .then(response => {
        console.log('Project updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating project:', error);
      });
  };

  // Delete server
  const handleRemove = (application) => {
    ApplicationService.deleteOne(application.id)
      .then(response => {
        console.log('Project deleted successfully:', response.data);
        setReloadApplications(true);
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
            <h1 className="title-project">Project Application</h1>
            <button className="btn-add-project" onClick={toggle}>
              <i>
                <Icon icon="material-symbols:add-box" />
              </i>
              Add new Application
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
              {applications &&
                applications .filter((app) => app.project === Project_id )
                .map((app, index) => {
                  return (
                    <div className="project-card" key={app.id}>
                      <h5 className="card-title row">
                        {app.name}
                        <i className="icon-card"onClick={() => {
                    const updatedShowDropdown = [...showDropdown];
                    updatedShowDropdown[index] = !updatedShowDropdown[index];
                    setShowDropdown(updatedShowDropdown);
                    setSelectedApplication(app);
                  }}>
                          <Icon icon="uiw:setting" />
                        </i>
                      </h5>
                      <p>{app.source}</p>
                      <p>{app.description}</p>
                  {showDropdown[index] && selectedApplication && (
                    <div className='project-dropdown'>
                      <ul> 
                      <li  className="dropdown-item " onClick={() => handleUpdate(selectedApplication)}> 
                      <Icon icon="el:edit" />
                       Update
                        </li>
                        <li  className="dropdown-item " onClick={() => handleRemove(selectedApplication)}> 
                        <Icon icon="ph:trash" />
                        Remove
                        </li>
                       
                      </ul>
                    </div>
                  )}
                  
                    </div>
                  );
                })}
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
                Application Name
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
                Description
              </label>
              <Input
                type="textarea"
                className="form-control-model textarea"
                id="type"
                name="type"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
               <div className="mb-2">
                <label htmlFor="ControlInput" className="form-label">
                Source
                </label>
                <Input
                  className="form-control-model"
                  type="text"
                  id="source"
                  name="source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="ControlInput" className="form-label">
                  Project
                </label>
                <Input
                  className="form-control-model"
                  type="text"
                  id="name"
                  name="name"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                />
              </div>
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

export default Application;

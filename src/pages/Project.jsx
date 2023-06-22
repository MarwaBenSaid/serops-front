import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Input } from 'reactstrap';
import { Icon } from '@iconify/react';
import ProjectService from '../services/project.service';
import { useNavigate } from 'react-router-dom';

const Project = () => {
  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const toggle = () => setModal(!modal);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [id, setProjectId] = useState(null); // Store the ID of the project being updated
  const [reloadProjects, setReloadProjects] = useState(false);

  const navigate = useNavigate();
    // Dropdown state
    const [showDropdown, setShowDropdown] = useState(Array(projects.length).fill(false));
    const [selectedProject, setSelectedProject] = useState(null);
  



  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };
  useEffect(() => {
    ProjectService.getAll()
      .then((res) => {
        console.log("Response data:", res.data);
        setProjects(res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
      });
  }, [reloadProjects]);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const projectData = {
      name: name,
      type: type,
      organisation: organisation
    };
      // Create new project
      ProjectService.add(projectData)
        .then(response => {
          console.log('Project added successfully:', response.data);
          setReloadProjects(true);
          toggle(); // Close the modal
        })
        .catch(error => {
          console.error('Error adding project:', error);
        });
    
  };


  // Delete server
  const handleRemove = (project) => {
    ProjectService.deleteOne(project.id)
      .then(response => {
        console.log('Project deleted successfully:', response.data);
        setReloadProjects(true);
      })
      .catch(error => {
        console.error('Error deleting server:', error);
      });
  };
  const handleApp = (project) => {
    navigate(`/projects/applications`);
  };
  const handleUpdate = (project) => {
    navigate(`/projects/update`);
  };


  return (
    <div>
      <div className="container-project mt-5">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="title-project">Projects</h1>
            <button className="btn-add-project" onClick={toggle}>
              <i>
                <Icon icon="material-symbols:add-box" />
              </i>
              Add new Project
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
              {projects &&
                projects.map((proj,index) => {
                  return (
                    <div className="project-card" key={proj.id}>
                      <h5 className="card-title row">
                        {proj.name}
                        <i className="icon-card"onClick={() => {
                    const updatedShowDropdown = [...showDropdown];
                    updatedShowDropdown[index] = !updatedShowDropdown[index];
                    setShowDropdown(updatedShowDropdown);
                    setSelectedProject(proj);
                  }}>
                          <Icon icon="uiw:setting" />
                        </i>
                      </h5>
                      <p>{proj.type}</p>
                    
                  {showDropdown[index] && selectedProject && (
                    <div className='project-dropdown'>
                      <ul className='drop-menu'> 
                      <li  className="dropdown-item " onClick={() => handleUpdate(selectedProject)}> 
                      <Icon icon="el:edit" />
                       Update
                        </li>
                        <li  className="dropdown-item " onClick={() => handleRemove(selectedProject)}> 
                        <Icon icon="ph:trash" />
                        Remove
                        </li>
                        <li  className="dropdown-item " onClick={() => handleApp(selectedProject)}> 
                       Applications
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
                Project Name
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
                Type
              </label>
              <Input
                type="textarea"
                className="form-control-model textarea"
                id="type"
                name="type"
                rows="3"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <div className="mb-2">
                <label htmlFor="ControlInput" className="form-label">
                  Company Name
                </label>
                <Input
                  className="form-control-model"
                  type="text"
                  id="name"
                  name="name"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
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

export default Project;

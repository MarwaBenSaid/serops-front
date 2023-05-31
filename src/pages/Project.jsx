import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalBody, Input } from 'reactstrap';
import { Icon } from '@iconify/react';

const Project = () => {
  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const [projects, setProjects] = useState([]);

  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/projects/all', {
          headers: {
            Authorization: 'Bearer <4c093551eb6819572d98d561cdecb004530865f7>',
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    // Assuming you have form data for the new project
    const newProjectData = {
      name: 'New Project',
      description: 'Project description',
    };

    try {
      const response = await axios.post('http://localhost:8000/projects/new', newProjectData, {
        headers: {
          Authorization: 'Bearer <4c093551eb6819572d98d561cdecb004530865f7>',
        },
      });
      console.log('New project added:', response.data);
      // Optionally, you can update the projects state with the newly added project
      setProjects([...projects, response.data]);
    } catch (error) {
      console.error('Error adding new project:', error);
    }

    toggle();

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

            {/* Rest of the code */}
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
              {projects.map((project) => (
                <div className="project-card" key={project.id}>
                  <h5 className="card-title row">
                    {project.name}
                    <i className="icon-card">
                      <Icon icon="uiw:setting" />
                    </i>
                  </h5>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal className="model mt-0" isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
        <ModalBody className="model-body mt-0">
          <form>
            <div className="mb-2">
              <label htmlFor="ControlInput" className="form-label">
                Project Name
              </label>
              <Input className="form-control-model" type="text" id="project-name" name="project-name" />
            </div>
            <div className="mb-2">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Description
              </label>
              <Input type="textarea" className="form-control-model textarea" id="project-description" name="project-description" rows="3" />
            </div>
          </form>
          <form className="form-btn">
            <button className="cancel-button" onClick={toggle}>
              Cancel
            </button>
            <button className="submit-button" onClick={handleAddProject}>
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Project;

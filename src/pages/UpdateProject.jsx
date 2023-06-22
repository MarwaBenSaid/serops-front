import React, { useState } from 'react';
import ProjectService from '../services/project.service';

function UpdateProject() {
  const [project, setProject] = useState({
    id: '',
    name: '',
    type: '',
    organisation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent form submission
    const { id, ...updatedData } = project; // Extract the id and remove it from the updatedData
    ProjectService.update(id, updatedData)
      .then((response) => {
        console.log('Project updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating project:', error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="card-profil">
        <div className="col-lg-6 col-md-12">
          <div className="card-body mt-5">
            <form autoComplete="off" onSubmit={handleUpdate}>
              <div className="mb-2">
                <label htmlFor="id" className="form-label">
                  ID Project
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="id"
                  name="id"
                  value={project.id}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={project.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="type"
                  name="type"
                  value={project.type}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="organisation" className="form-label">
                  Company
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="organisation"
                  name="organisation"
                  value={project.organisation}
                  onChange={handleChange}
                />
              </div>
              <button className="btn text-center" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
                  />
                </svg>
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProject;

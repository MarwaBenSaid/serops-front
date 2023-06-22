import React , { useEffect, useState } from 'react';
import {
  Modal,
  ModalBody,
  Input
} from 'reactstrap';
import "../Styles/List.css";
import "../Styles/Add.css";
import "../Styles/Code.css"
import { Icon } from '@iconify/react';
import UserService from '../services/user.service';
export default function User() {
    const [modal, setModal] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);
    const toggle = () => setModal(!modal);
 // Server data
 const [users, setUsers] = useState([]);
 const [error, setError] = useState("");

     // Form data
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    UserService.getAll()
      .then((res) => {
        console.log('Response data:', res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error('Error:', err);
        setError(err.message);
      });
  }, []);

    const changeUnmountOnClose = (e) => {
      let { value } = e.target;
      setUnmountOnClose(JSON.parse(value));
    };
    // Add user
  const handleAddUser = () => {
    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      role: role,
      status: status,
      password: password,
    };

    UserService.add(data)
      .then((response) => {
        console.log('User added successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  };
  
  
      return (
          <div>
          <div className="container-project mt-5">
          <div className="row ">
          <div className="col-lg-6">
          <h1 className="title-project">Users</h1>
          <button className='btn-add-project'  onClick={toggle}>
          <i><Icon icon="material-symbols:add-box"  /></i>
            Invit new user
          </button>
        
          <Modal className=" model  mt-0 " isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
    <ModalBody className='model-body mt-0'> 
      
        <form onSubmit={handleAddUser}> 
      <div className="mb-2">
      <label for="ControlInput" className="form-label"> Firstname</label>
      <Input className="form-control-model" type="text" id="first_name" name="first_name" value={first_name}
                      onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className="mb-2">
      <label for="ControlInput" className="form-label"> Lastname</label>
      <Input className="form-control-model" type="text" id="last_name" name="last_name" 
      value={last_name}
      onChange={(e) => setLastName(e.target.value)}
      />
      </div>
      
    <div className="mb-2">
      <label for="ControlInput" className="form-label">Email</label>
      <Input className="form-control-model" type="text" id="email" name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="mb-2">
      <label for="ControlInput" className="form-label">Phone</label>
      <Input className="form-control-model" type="text" id="phone" name="phone" 
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      />
      </div>
    <div className="mb-2">
      <label for="ControlInput" className="form-label">Role</label>
      <Input className="select-model" type="select" id="role" name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
            
            <option> Developer</option>
            <option>Devops</option>
          
          </Input>
    </div>
    <div className="mb-2">
      <label for="ControlInput" className="form-label">Status</label>
      <Input className="select-model" type="select" id="status" name="status" 
      
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      >
            
            <option>Active</option>
            <option>Suspended</option>
            <option>Disabled</option>
          
          </Input>
    </div>
    </form>
    <form className='form-btn'>
    <button className="  cancel-button"   onClick={toggle}>
            Cancel
          </button>
          <button className="  submit-button"  onClick={handleAddUser}>
            Send invitation
          </button>
          </form>
    </ModalBody>
    
      </Modal>
              
  
  
        <div className="code-container">
        <div className="server-list">
       
        {users &&
              users.map((user,index) => (
                <div className="server-card" key={user.id}>
                  <h5 className="card-title row">{user.first_name} {user.last_name}</h5>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                  <p>Role: {user.role}</p>
                  <p>Status: {user.status}</p>
                </div>
              ))}
    </div>
    </div>
  
  
  </div>
      
    
        </div>
        </div>
        </div>
      );
  };
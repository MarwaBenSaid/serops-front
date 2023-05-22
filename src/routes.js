import Dashboard from './pages/Dashboard';
import Application from './pages/Application';
import Code from './pages/Code';
import User from './pages/User';
import Server from './pages/Server';
import Project from './pages/Project';
import AddProject from './pages/AddProject';
import Add from './pages/Add';
import Profile from './pages/Profile';
import RegisterPart1 from './components/RegisterPart1';
import RegisterPart2 from './components/RegisterPart2';
import RegisterPart3 from './components/RegisterPart3';
import Login from './components/Login';
import Environment from './pages/Environment';
var routes = [
    
    {
        path: "/sign1",
        name: "Register Part 1",
        component: RegisterPart1,
        layout: "/auth",
      },
      {
        path: "/sign2",
        name: "Register Part 2",
        component: RegisterPart2,
        layout: "/auth",
      },
      {
        path: "/sign3",
        name: "Register Part 3",
        component: RegisterPart3,
        layout: "/auth",
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
        layout: "/",
      },
    
      {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        layout: "/admin",
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        layout: "/admin",
      },
      {
        path: "/projects",
        name: "Projects",
        component: Project,
        layout: "/admin",
      },
      {
        path: "/code",
        name: "Code",
        component: Code,
        layout: "/admin",
      },
      {
        path: "/application",
        name: "Application",
        component: Application,
        layout: "/admin",
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/server",
        name: "Server",
        component: Server,
        layout: "/admin",
      },
      {
        path: "/addproject",
        name: "Add Project",
        component: AddProject,
        layout: "/admin",
      },
      {
        path: "/add",
        name: "Add",
        component: Add,
        layout: "/admin",
      },
      {
        path: "/project/application",
        name: "Project Application",
        component: Application,
        layout: "/admin",
      },
      {
        path: "/project/application/environment",
        name: "Environment",
        component: Environment,
        layout: "/admin",
      },
      {
        path: "/user",
        name: "User",
        component: User,
        layout: "/admin",
      },

   
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      layout: "/admin",
    },

 
    
   
  ];
  export default routes;
  
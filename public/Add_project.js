import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";


const alert = document.getElementById('alert');
const form = document.getElementById('AddProjectForm');


const firebaseConfig = {
    apiKey: "AIzaSyD0P6ejeCDPqeRsFaHNoQNyOBNXqDbyNFw",
    authDomain: "project-universe-fdbcd.firebaseapp.com",
    databaseURL: "https://project-universe-fdbcd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "project-universe-fdbcd",
    storageBucket: "project-universe-fdbcd.appspot.com",
    messagingSenderId: "649654916941",
    appId: "1:649654916941:web:08fddde4d2eca1036cc904",
    measurementId: "G-12K3N21MPY"
};

// firebase.initializeApp(firebaseConfig);
//   const database = firebase.database()
//   const ref = database.ref("projectDetails")

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const projectDetailsRef = ref(database, "projectDetails");


form.addEventListener("submit",(e)=>{
    
  e.preventDefault();
  
  const ProjectLevel = document.getElementById('project-level').value;
  const ProjectName = document.getElementById('project-name').value;
  const ProjectLink = document.getElementById('project-link').value;
  const GitHubLink = document.getElementById('githubLink').value;
  const Material = document.getElementById('material').value;
  const Image = document.getElementById('image-upload').value;


//   push(projectDetailsRef,{
//     ProjectLevel: ProjectLevel,
//     ProjectName: ProjectName,
//     ProjectLink: ProjectLink,
//     GitHubLink: GitHubLink,
//     Material: Material,
//     Image: Image
//   });

//   console.log(ProjectLevel, ProjectName, ProjectLink, GitHubLink, Material, Image);

//   // alert.style.display="block"

//   // setTimeout(()=>{
//   //     alert.style.display="none"
//   // },2000)

//   form.reset()

// })

push(projectDetailsRef,{
  ProjectLevel: ProjectLevel,
  ProjectName: ProjectName,
  ProjectLink: ProjectLink,
  GitHubLink: GitHubLink,
  Material: Material,
  Image: Image
}).then(() => {
  console.log(ProjectLevel, ProjectName, ProjectLink, GitHubLink, Material, Image);
  form.reset();
});
})
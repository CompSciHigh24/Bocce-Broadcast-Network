// const Form = document.querySelector("form");
 
const Update = document.querySelector("#update")
console.log(Update)
const Delete = document.querySelector("#form_delete")
console.log(Delete)
// Task 7
// Attatch an event listener to the form
// Inside the event listener create an HTTP POST request which uses the form input as the request body.
// Form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const comment = new FormData(Form);
//   const reqBody = Object.fromEntries(comment);
//   fetch("/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(reqBody),
//   }).then(() => {
//     window.location.href = "/";
//   });
// });

// Delete.addEventListener("click", (e) =>{
//   fetch("/profile/username", {
//     method:"DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(reqBody),
//   }).then((res)=>{
//     if(res.ok){
//       console.log("User Successfully Deleted");
//     }else{
//       console.log(res.statusText);
//     }
//   }).then(() =>{
//      window.location.href = "/";
//   });
// })

let button = document.querySelector("#form_update")
console.log(button)

Update.addEventListener("submit",(e) =>{
  e.preventDefault();

  const updatedForm = new FormData(Update);
  const reqBody = Object.fromEntries(updatedForm);
  console.log(reqBody)
  console.log(button.value)
  fetch("/profile/" + button.value,{
    method:"PATCH",
    headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      }).then((res)=>{
        if(res.ok){
          console.log("User Successfully Updated");
        }else{
          console.log(res.statusText);
        }
      }).then(() =>{
         window.location.href = "/";
      });
    })

let button_delete = document.querySelector("#form_delete")
console.log(button_delete)

    button_delete.addEventListener("click", (e) =>{
      e.preventDefault();
      // const reqBody = Object.fromEntries(deleteForm);
      //   console.log(reqBody)
      //   console.log(button.value)
      fetch("/profile/"+ button.value,{
        method:"DELETE"
      }).then((res)=>{
        if(res.ok){
          console.log("User Successfully Deleted");
        }else{
          console.log(res.statusText);
        }
      }).then(() =>{
         window.location.href = "/";
      });
    })
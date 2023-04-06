const form = document.getElementById("form");
const  get =async ()=>{
  await axios.get("http://localhost:5001/all").then(async (rows) => {
    console.log(rows.data);
  //   const rows1= await rows.data.json();
    let body = document.getElementById("tbody");
    let x = "";
    rows.data.forEach((row, i) => {
      x += `<tr>
      <td>${i + 1}</td>
      <td>${row.firstname}</td>
      <td>${row.lastname}</td>
      <td>${row.email}</td>
      <td>${row.dob}</td>
      <td>${row.gender}</td>
      <td>${row.city}</td>
      <td>${row.state_}</td>
      <td>${row.country}</td>
      </tr>`;
    });
    body.innerHTML = x;
  });
}
get();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = document.getElementById("First").value;
  const lastName = document.getElementById("Last").value;
  const email = document.getElementById("Email").value;
  const dob = document.getElementById("DOB").value;
  const city = document.getElementById("City").value;
  const state = document.getElementById("State").value;
  const country = document.getElementById("Country").value;
  const address = document.getElementById("Address").value;
  const male = document.getElementById("Male").checked;

  const gender = male ? "Male" : "Female";

  if (firstName === "") {
    document.getElementById("field1").innerText =
      "Please Enter Your First Name";
  }

  if (lastName === "") {
    document.getElementById("field2").innerText = "Please Enter Your Last Name";
  }

  if (!email.includes("@")) {
    document.getElementById("field3").innerText = "Please Enter A valid Email";
  }
  if (dob === "") {
    document.getElementById("field4").innerText =
      "Please Enter Your Date OF Birth";
  }
  if (city === "") {
    document.getElementById("field6").innerText = "Please Enter Your city";
  }
  if (state === "") {
    document.getElementById("field7").innerText = "Please Enter Your State";
  }

  if (country === "") {
    document.getElementById("field8").innerText = "Please Enter Your Country";
  }

  if (address === "") {
    document.getElementById("field9").innerText = "Please Enter Your Address";
  }

  if (
    firstName != "" &&
    lastName != "" &&
    dob != "" &&
    email != "" &&
    city != "" &&
    gender != "" &&
    state != "" &&
    country != "" &&
    address != ""
  ) {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dob: dob,
      city: city,
      gender: gender,
      state: state,
      country: country,
      address: address,
    };
    await axios
      .post("http://localhost:5001/", data)
      .then((res) => {
        console.log(res);
        get();
      }
        );
      }
});

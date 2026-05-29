  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;


    try {

      const response = await fetch(

        "https://wildlife-anatomy-served-sciences.trycloudflare.com",

        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })

        }

      );


      const data = await response.json();

      alert(data.message);


      console.log(data);

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  });
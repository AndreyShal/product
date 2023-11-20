addEventListener("DOMContentLoaded", (event) => {
  async function logMovies() {
    const response = await fetch("http://localhost:8000/products?_sort=dateAndTime&_order=desc", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const movies = await response.json();

    let listItem = movies.map((el) => {
      let d = new Date(el.dateAndTime);
      let date = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}<br/>${d.getUTCHours()}:
      ${d.getUTCMinutes() < 10 ? '0' + d.getUTCMinutes() : d.getUTCMinutes()}:
      ${d.getUTCSeconds() < 10 ? '0' + d.getUTCSeconds() : d.getUTCSeconds()}`
      return `<tr>
      <th scope="row">${el.id}</th>
      <td>${el.name}</td>
      <td>${el.price}</td>
      <td>${date}</td>
    </tr>`
    }).join("")

    document.querySelector("tbody").innerHTML = listItem;
  }

  logMovies()

  function closeModal() {
    document.getElementById('overlay').classList.remove('is-visible');
    document.getElementById('modal').classList.remove('is-visible');
  }

  document.getElementById('btn-modal').addEventListener('click', function () {
    document.getElementById('overlay').classList.add('is-visible');
    document.getElementById('modal').classList.add('is-visible');
  });

  document.getElementById('close-icon').addEventListener('click', function () {
    closeModal()
  });


  document.getElementById('close-btn').addEventListener('click', function () {
    closeModal()
  });

  document.getElementById('overlay').addEventListener('click', function () {
    closeModal()
  });

  const titleInput = document.getElementById("title");
  const priceInput = document.getElementById("price");
  const dateAndTimeInput = document.getElementById("date-and-time");

  priceInput.addEventListener("input", (e) => {
    priceInput.style.border = "1px solid red";
    if(e.target.value <= 0) {
      document.getElementById("price-warning").style.display = "block";
      priceInput.style.border = "1px solid red";
    } else {
      document.getElementById("price-warning").style.display = "none";
      priceInput.style.border = "1px solid gray";
    }
  })

  document.getElementById("submit-btn").addEventListener("click", (e) => {
    e.preventDefault()

    if (titleInput.value === "" && priceInput.value === "" && dateAndTimeInput.value === "") return;

    fetch("http://localhost:8000/products"
      , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'name': titleInput.value,
          'price': priceInput.value,
          'dateAndTime': dateAndTimeInput.value
        })
      }).then(response => response.json())
      .then(() => {
        document.querySelector("tbody").innerHTML = "";
        document.querySelector("form").reset()
        closeModal();
        logMovies()
      })
  })
});
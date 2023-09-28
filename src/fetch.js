export default function fetchData() {
  fetch("http://localhost:3000/user/12")
    .then(response => response.json())
    .then(data => console.log(data.data))
}